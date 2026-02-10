#!/bin/bash
# Restore TEST environment from latest backup
# Used by CI/CD to reset state before E2E tests

set -e

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "========== Restoring TEST Environment =========="

# Config
BACKUP_DIR="/var/backups/odoo/test"
DB_CONTAINER="odoo-test-db"
DB_NAME="odoo_test"
DB_USER="odoo"
ODOO_CONTAINER="odoo-test"

# Find latest backup
LATEST_DB=$(ls -t ${BACKUP_DIR}/db_*.sql.gz 2>/dev/null | head -1)
LATEST_FS=$(ls -t ${BACKUP_DIR}/filestore_*.tar.gz 2>/dev/null | head -1)

if [ -z "$LATEST_DB" ]; then
    log "ERROR: No database backup found!"
    exit 1
fi

log "Using backup: $(basename $LATEST_DB)"

# Stop Odoo
log "Stopping Odoo..."
docker stop $ODOO_CONTAINER || true

# Restore database
log "Restoring database..."
docker exec $DB_CONTAINER psql -U $DB_USER -c "DROP DATABASE IF EXISTS ${DB_NAME};"
docker exec $DB_CONTAINER psql -U $DB_USER -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"
gunzip -c "$LATEST_DB" | docker exec -i $DB_CONTAINER psql -U $DB_USER $DB_NAME

# Restore filestore if exists
if [ -n "$LATEST_FS" ]; then
    log "Restoring filestore..."
    VOLUME_PATH="/var/lib/docker/volumes/test_odoo-test-web-data/_data/filestore"
    sudo rm -rf ${VOLUME_PATH}/* 2>/dev/null || true
    sudo mkdir -p ${VOLUME_PATH}
    sudo tar -xzf "$LATEST_FS" -C ${VOLUME_PATH}
    sudo chown -R 101:101 ${VOLUME_PATH}
fi

# Start Odoo
log "Starting Odoo..."
docker start $ODOO_CONTAINER

# Wait for ready
log "Waiting for Odoo to be ready..."
timeout 60 bash -c 'until curl -s http://localhost:8169/web/login > /dev/null; do sleep 2; done'

log "========== TEST Environment Restored =========="
