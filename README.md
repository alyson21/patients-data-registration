# Patient System

Sistema de gerenciamento de pacientes com autenticação JWT, controle de roles e interface React.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (incluso no Docker Desktop)

## Como rodar localmente

```bash
git clone <url-do-repositorio>
cd patient-system
docker compose up --build
```

Aguarde todos os serviços subirem. Na primeira execução o banco de dados será inicializado e as tabelas criadas automaticamente.

## Portas (desenvolvimento)

| Serviço   | URL                          |
|-----------|------------------------------|
| Frontend  | http://localhost:5173        |
| Backend   | http://localhost:3000        |
| PostgreSQL| localhost:5432               |

## Criar usuário admin (desenvolvimento)

```bash
docker compose exec backend \
  node scripts/create-admin.js "Nome" email@exemplo.com senha123
```

## Variáveis de ambiente

As variáveis possuem valores padrão e o sistema funciona sem configuração adicional.
Para customizar, crie um arquivo `.env` na raiz com as variáveis desejadas:

```env
JWT_SECRET=sua-chave-secreta-forte
DB_PASSWORD=sua-senha-do-banco
```

Referência completa: `.env.prod.example`.

## Parar a aplicação

```bash
docker compose down        # para os containers
docker compose down -v     # para e apaga o banco de dados
```

> **Atenção:** as tabelas são criadas automaticamente apenas quando o volume do banco está vazio (primeira execução). Se você já rodou o projeto antes e as tabelas estiverem faltando, reinicie do zero com `docker compose down -v` antes de subir novamente.

---

## Deploy em VPS

### Pré-requisitos no servidor

- Debian 12 (ou Ubuntu)
- Acesso root via SSH

### 1. Instalar Docker no servidor

```bash
apt update && apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian bookworm stable" > /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin rsync
systemctl enable --now docker
```

### 2. Criar chave SSH (máquina local)

```bash
ssh-keygen -t ed25519 -C "deploy" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
```

### 3. Autorizar a chave no servidor

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "COLE_A_CHAVE_PUBLICA_AQUI" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 4. Criar o `.env` no servidor

```bash
mkdir -p /opt/patient-system
nano /opt/patient-system/.env
```

Preencha com base no `.env.prod.example`. Gere valores seguros:

```bash
openssl rand -hex 64   # para JWT_SECRET
openssl rand -hex 32   # para DB_PASSWORD
```

### 5. Fazer o deploy (máquina local)

```bash
./deploy.sh root@IP_DO_SERVIDOR /opt/patient-system
```

### 6. Criar usuário admin

```bash
# No servidor
cd /opt/patient-system
docker compose -f docker-compose.prod.yml exec backend \
  node scripts/create-admin.js "Nome" email@exemplo.com senha123
```

---

## Migrar para HTTPS (quando tiver domínio)

1. Aponte o DNS do domínio para o IP do servidor (registro tipo A)
2. Edite o `Caddyfile` trocando `:80` pelo domínio:
   ```
   seudominio.com {
       encode gzip
       reverse_proxy /api/* backend:3000
       reverse_proxy frontend:80
   }
   ```
3. Atualize o `.env` no servidor:
   ```env
   DOMAIN=seudominio.com
   VITE_API_URL=https://seudominio.com/api
   ```
4. Rode o deploy novamente:
   ```bash
   ./deploy.sh root@IP_DO_SERVIDOR /opt/patient-system
   ```

O Caddy obtém o certificado HTTPS automaticamente via Let's Encrypt.

---

## Observabilidade (Loki + Grafana)

Opcional. Coleta e visualiza os logs da aplicação.

**Subir com observabilidade:**
```bash
docker compose -f docker-compose.yml -f docker-compose.observability.yml up --build
```

**Acessar o Grafana:** http://localhost:3001 — login `admin / admin`

**Ver logs no Grafana:**
1. Menu lateral → **Explore**
2. Selecione a fonte **Loki**
3. Digite a query e clique em **Run query**

| Query | O que mostra |
|---|---|
| `{service="backend"}` | todos os logs do backend |
| `{service="backend"} \|= "error"` | apenas erros |
| `{container=~".+"}` | logs de todos os containers |

**Parar a observabilidade:**
```bash
docker compose -f docker-compose.observability.yml down
```

---

## Estrutura

```
patient-system/
├── api-node/              # Backend Node.js + Express
│   ├── src/
│   ├── migrations/
│   └── scripts/
├── frontend/              # Frontend React + Vite + Tailwind
│   └── src/
├── .github/workflows/     # CI/CD GitHub Actions
├── docker-compose.yml     # Desenvolvimento
├── docker-compose.prod.yml# Produção
├── Caddyfile              # Reverse proxy + HTTPS
├── deploy.sh              # Deploy manual via SSH
└── .env.prod.example      # Referência de variáveis de produção
```
