# Recruitment System

A full-stack recruitment pipeline application built for the ZeloraTech Software Engineer Intern technical challenge.

## Tech Stack

- **Frontend:** React 19 (Vite) + CSS Modules (no Tailwind)
- **Backend:** Node.js + Express 4
- **Data:** In-memory store with JSON seed data (no database required)

## Features

- Kanban board view with four pipeline stages: **Applying Period → Screening → Interview → Test**
- **Create candidates** via the "+ New Candidate" form with full field validation
- Move candidates between stages via the candidate detail modal
- **"Detail ›" column filter** — click to isolate a single stage across the board; click again to clear
- **"+ Add Assessment"** button on unscored cards — one click marks assessment as done via API
- **"···" card menu** — opens a quick-action dropdown (mark assessment done, view move-to-stage options)
- **Empty-state** shown in columns when no candidates match the current filter
- Search candidates by name, filter by score range, sort by applied date / name / score
- Star rating display (half-star precision) for scored candidates
- Referred candidate badge (green), Assessment done badge (blue)
- Responsive layout (mobile-friendly)
- 55 pre-seeded candidates matching the UI design (Applying: 27, Screening: 23, Interview: 3, Test: 2)

## Project Structure

```
recruitment-system/
├── client/             # React frontend (Vite + CSS Modules)
│   └── src/
│       ├── components/ # Layout, TopNav, JobHeader, KanbanBoard, CandidateCard,
│       │               # StageColumn, FilterBar, CandidateModal
│       ├── hooks/      # useCandidates (data fetching + state)
│       ├── pages/      # RecruitmentPage
│       └── services/   # api.js (REST client)
├── server/             # Express REST API backend
│   └── src/
│       ├── controllers/
│       ├── data/       # In-memory candidates store + seed data
│       ├── models/
│       └── routes/
├── README.md
└── package.json        # Root scripts to run both together
```

## Quick Start

### Prerequisites
- Node.js >= 18

### 1. Install all dependencies

```bash
npm run install:all
```

### 2. Configure environment (optional)

```bash
cp server/.env.example server/.env
```

Default values (`server/.env.example`):
```
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Run both frontend and backend

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
| GET | `/api/candidates` | List all candidates (supports filters below) |
| GET | `/api/candidates/:id` | Get a single candidate |
| POST | `/api/candidates` | Create a new candidate |
| PUT | `/api/candidates/:id` | Update candidate fields |
| DELETE | `/api/candidates/:id` | Delete a candidate |
| PATCH | `/api/candidates/:id/stage` | Move candidate to a new stage |

### Query Parameters for `GET /api/candidates`

| Parameter | Values | Description |
|-----------|--------|-------------|
| `stage` | `Applying Period`, `Screening`, `Interview`, `Test` | Filter by stage |
| `sort` | `name`, `appliedAt`, `score` | Sort field |
| `order` | `asc`, `desc` | Sort direction |
| `page` | number | Page number (default: 1) |
| `limit` | number (max 100) | Results per page (default: 20) |

### Candidate Object Shape

```json
{
  "id": "uuid",
  "name": "Jane Anderson",
  "stage": "Screening",
  "appliedAt": "2024-01-15T00:00:00.000Z",
  "score": 4,
  "isReferred": false,
  "hasAssessment": true
}
```

## Assumptions & Decisions

- **No database** — in-memory array resets on server restart; no setup beyond `npm install` required
- **Stage order is fixed:** Applying Period → Screening → Interview → Test
- **Scores are rated 1–5** displayed as half-star ratings in the UI
- **Avatar initials fallback** — colour derived from candidate name, no image uploads
- **CORS** configured for `http://localhost:5173` by default (override via `CLIENT_ORIGIN` env var)
- **Vite proxy** — all `/api` requests from the frontend are proxied to `:5000` in development
- **CSS Modules** used throughout; zero Tailwind dependencies

## Author

Built as part of the ZeloraTech Software Engineer Intern technical assessment.

