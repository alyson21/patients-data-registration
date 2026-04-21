# Patient System

Sistema de gerenciamento de pacientes com autenticação JWT, controle de roles e interface React.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (incluso no Docker Desktop)

## Como rodar

```bash
git clone <url-do-repositorio>
cd patient-system
docker compose up --build
```

Aguarde todos os serviços subirem. Na primeira execução o banco de dados será inicializado e as tabelas criadas automaticamente.

## Portas

| Serviço   | URL                          |
|-----------|------------------------------|
| Frontend  | http://localhost:5173        |
| Backend   | http://localhost:3000        |
| PostgreSQL| localhost:5432               |

## Criar usuário admin

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

Referências completas: `api-node/.env.example` e `frontend/.env.example`.

## Parar a aplicação

```bash
docker compose down        # para os containers
docker compose down -v     # para e apaga o banco de dados
```

## Estrutura

```
patient-system/
├── api-node/        # Backend Node.js + Express
│   ├── src/
│   ├── migrations/
│   └── scripts/
└── frontend/        # Frontend React + Vite + Tailwind
    └── src/
```
