#!/bin/bash
set -euo pipefail

# Uso: ./deploy.sh user@ip /caminho/no/servidor
SSH_TARGET="${1:?Informe user@ip}"
REMOTE_DIR="${2:-/opt/patient-system}"

echo "==> Sincronizando arquivos para $SSH_TARGET:$REMOTE_DIR"
rsync -az --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.env*' \
  --exclude='postgres_data' \
  . "$SSH_TARGET:$REMOTE_DIR"

echo "==> Iniciando deploy no servidor"
ssh "$SSH_TARGET" bash <<EOF
  set -euo pipefail
  cd "$REMOTE_DIR"
  docker compose -f docker-compose.prod.yml pull --quiet 2>/dev/null || true
  docker compose -f docker-compose.prod.yml up --build -d
  docker compose -f docker-compose.prod.yml image prune -f 2>/dev/null || true
  echo "Deploy concluído."
EOF
