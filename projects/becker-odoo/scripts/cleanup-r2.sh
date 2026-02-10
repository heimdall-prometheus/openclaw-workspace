#!/bin/bash
# R2 Backup Retention Cleanup
# Removes old backups according to retention policy

set -e

# R2 Config
R2_BUCKET="becker-odoo-backups"
R2_ENDPOINT="https://e1625bd206eaa162677dba0e5bc1569f.r2.cloudflarestorage.com"
R2_ACCESS_KEY="fba6fd5a52259788403b98521e965376"
R2_SECRET_KEY="ada428935a82fb5cc82e92b39aa11265016274fff9a636aa3a108dfcf032da9e"

# Retention Policy (in days)
DAILY_KEEP=30      # 30 days
WEEKLY_KEEP=84     # 12 weeks
MONTHLY_KEEP=365   # 12 months
YEARLY_KEEP=1825   # 5 years

RCLONE_OPTS="--s3-provider Cloudflare --s3-access-key-id ${R2_ACCESS_KEY} --s3-secret-access-key ${R2_SECRET_KEY} --s3-endpoint ${R2_ENDPOINT} --s3-no-check-bucket"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

cleanup_folder() {
    local folder=$1
    local max_age=$2
    
    log "Cleaning ${folder} (keeping ${max_age} days)"
    rclone delete "r2:${R2_BUCKET}/${folder}" ${RCLONE_OPTS} --min-age ${max_age}d 2>/dev/null || true
}

log "========== R2 Retention Cleanup Started =========="

for env in dev test prod; do
    cleanup_folder "${env}/daily" ${DAILY_KEEP}
    cleanup_folder "${env}/weekly" ${WEEKLY_KEEP}
    cleanup_folder "${env}/monthly" ${MONTHLY_KEEP}
    cleanup_folder "${env}/yearly" ${YEARLY_KEEP}
done

log "========== R2 Retention Cleanup Completed =========="
