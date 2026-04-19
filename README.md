# Recruitment System

A full-stack recruitment pipeline application built for the ZeloraTech Software Engineer Intern technical challenge.

## Tech Stack

- **Frontend:** React (Vite) + CSS Modules
- **Backend:** Node.js + Express
- **Data:** In-memory store with JSON seed data

## Project Structure

```
recruitment-system/
├── client/         # React frontend (Vite + React)
├── server/         # Express REST API backend
├── README.md
└── package.json    # Root scripts to run both together
```

## Quick Start

### Prerequisites
- Node.js >= 18

### Install all dependencies

```bash
npm run install:all
```

### Run both frontend and backend

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Run separately

```bash
# Backend only
npm run dev:server

# Frontend only
npm run dev:client
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/candidates | List all candidates |
| GET | /api/candidates/:id | Get single candidate |
| POST | /api/candidates | Create candidate |
| PUT | /api/candidates/:id | Update candidate |
| DELETE | /api/candidates/:id | Delete candidate |
| PATCH | /api/candidates/:id/stage | Move candidate to new stage |
| GET | /api/candidates?stage=Screening | Filter by stage |
| GET | /api/candidates?page=1&limit=10 | Paginate results |

## Assumptions & Decisions

- In-memory data store used — data resets on server restart (no database required to run)
- Stage order is fixed: Applying Period → Screening → Interview → Test
- Scores are rated 1–5 (displayed as stars in the UI)
- Candidate avatars use initials-based fallback when no photo is provided
- CORS is enabled for local development (frontend on :5173, backend on :5000)

## Author

Built as part of the ZeloraTech Software Engineer Intern technical assessment.
