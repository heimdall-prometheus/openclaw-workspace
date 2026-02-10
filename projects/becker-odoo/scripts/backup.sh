#!/bin/bash
# Becker Odoo Backup Script
# Uploads to Cloudflare R2: becker-odoo-backups

set -e

# ============== CONFIG ==============
BACKUP_DIR="/var/backups/odoo"
DATETIME=$(date +%Y-%m-%d_%H-%M)
DOW=$(date +%u)
DOM=$(date +%d)
MONTH=$(date +%m)

# Environments
ENVS=("dev" "test")
DB_USER="odoo"

# ============== FUNCTIONS ==============

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >&2
}

backup_database() {
    local env=$1
    local db_name="odoo_${env}"
    local container="odoo-${env}-db"
    local backup_file="${BACKUP_DIR}/${env}/db_${DATETIME}.sql.gz"
    
    mkdir -p "${BACKUP_DIR}/${env}"
    log "Backing up database: ${db_name}"
    docker exec ${container} pg_dump -U ${DB_USER} ${db_name} | gzip > "${backup_file}"
    echo "${backup_file}"
}

backup_filestore() {
    local env=$1
    local volume_path="/var/lib/docker/volumes/${env}_odoo-${env}-web-data/_data/filestore"
    local backup_file="${BACKUP_DIR}/${env}/filestore_${DATETIME}.tar.gz"
    
    mkdir -p "${BACKUP_DIR}/${env}"
    log "Backing up filestore"
    if [ -d "${volume_path}" ]; then
        tar -czf "${backup_file}" -C "${volume_path}" . 2>/dev/null || tar -czf "${backup_file}" --files-from /dev/null
    else
        tar -czf "${backup_file}" --files-from /dev/null
    fi
    echo "${backup_file}"
}

upload_to_r2() {
    local file=$1
    local dest=$2
    
    log "Uploading: $(basename ${file}) -> ${dest}"
    
    python3 << EOF
import boto3
from botocore.config import Config

s3 = boto3.client('s3',
    endpoint_url='https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com',
    aws_access_key_id='fba6fd5a52259788403b98521e965376',
    aws_secret_access_key='ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e',
    config=Config(signature_version='s3v4')
)

import os
filename = os.path.basename("${file}")
key = "${dest}" + filename

s3.upload_file("${file}", "becker-odoo-backups", key)
print(f"Uploaded: {key}")
EOF
}

determine_retention_folder() {
    if [ "$DOM" = "01" ] && [ "$MONTH" = "01" ]; then
        echo "yearly"
    elif [ "$DOM" = "01" ]; then
        echo "monthly"
    elif [ "$DOW" = "7" ]; then
        echo "weekly"
    else
        echo "daily"
    fi
}

cleanup_old_backups() {
    local env=$1
    find "${BACKUP_DIR}/${env}" -type f -mtime +3 -delete 2>/dev/null || true
}

# ============== MAIN ==============

log "========== Becker Odoo Backup Started =========="

RETENTION=$(determine_retention_folder)
log "Retention: ${RETENTION}"

for env in "${ENVS[@]}"; do
    log "=== Environment: ${env} ==="
    
    DB_FILE=$(backup_database "${env}")
    [ -f "${DB_FILE}" ] && upload_to_r2 "${DB_FILE}" "${env}/${RETENTION}/"
    
    FS_FILE=$(backup_filestore "${env}")
    [ -f "${FS_FILE}" ] && upload_to_r2 "${FS_FILE}" "${env}/${RETENTION}/"
    
    cleanup_old_backups "${env}"
done

log "========== Backup Completed =========="
