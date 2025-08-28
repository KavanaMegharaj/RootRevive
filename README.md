# Kredo Catalogue (MERN)

Wave wonders website

## Quick Start

### 1) Backend
```bash
cd server
copy .env.example .env   # Windows PowerShell: Copy-Item .env.example .env
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd ../client
npm install
npm run dev
```
Then open http://localhost:5173

### Admin Login
- Email: `admin@kredo.in`
- Password: `Admin@123`

Change `JWT_SECRET` before deploying. Set `MONGO_URI` to your MongoDB (local or Atlas).

## Useful Links
- GitHub: https://github.com/KavanaMegharaj/RootRevive
- Backend: http://localhost:5002/api
