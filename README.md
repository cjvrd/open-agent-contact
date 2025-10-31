# Open Agent Contact App

A simple full‑stack example app for collecting and managing contact requests.

- Frontend: React
- Backend: Node.js, Express
- Database: Postgres via Prisma schema (Kysely types generated with prisma‑kysely)

## Quick start with Docker

Prerequisites:

- Docker Desktop or Docker Engine

Clone the repo:

```zsh
git clone https://github.com/cjvrd/open-agent-contact.git
```

Open the repo folder:

```zsh
cd open-agent-contact
```

Build the docker containers:

```zsh
docker compose up --build
```

Then open:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Postgres: localhost:5432 (user: postgres, password: postgres, db: postgres)

## API

Base URL: `http://localhost:3000`

- GET `/contacts` — list all contacts
- POST `/contacts` — create a new contact
- DELETE `/contacts/:id` — soft delete contact (status=DELETED)
- PATCH `/contacts/:id` — verify contact (verified=true)

## Notes on the project

- There is no .env file for simplicity sake, it's all hardcoded.
- It's mimicking a bigger production codebase (within reason), with file structure/library decisions.
- Using a soft delete for the contact delete, the logic was that a business might want to keep user data.
