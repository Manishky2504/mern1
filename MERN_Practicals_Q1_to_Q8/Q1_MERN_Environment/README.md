# Practical 1 — Set up the MERN development environment

## Structure
```text
Q1_MERN_Environment/
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    └── README.md
```

## Backend
From `backend`, run:
```bash
npm install
npm start
```
The API server runs on port 5000.

## Frontend
Create the Vite React app inside `frontend` using:
```bash
npm create vite@latest . -- --template react
npm install
npm install axios
npm run dev
```
The Vite-generated React files are created by that command; they are not duplicated here as boilerplate.
