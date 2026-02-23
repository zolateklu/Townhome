# Townhome - FastAPI + Next.js Auth Demo

Minimal implementation of JWT authentication with FastAPI backend and Next.js frontend.

## Setup

### Backend
```bash
cd backend
pip3 install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on http://localhost:8000

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:3000

## Features

- JWT authentication with token expiration
- Protected API endpoints
- React Context for state management
- Responsive design (mobile-first)
- API integration with error handling

## Demo Credentials
- Username: `demo`
- Password: `password`

## Architecture

**Backend:**
- FastAPI with JWT tokens
- HTTPBearer security scheme
- CORS enabled for localhost:3000

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Context API for auth state
- CSS Modules for styling
- localStorage for token persistence

## Security Notes

⚠️ This is a minimal demo. For production:
- Use environment variables for SECRET_KEY
- Implement proper password hashing (bcrypt)
- Add refresh tokens
- Use HTTPS
- Implement rate limiting
- Add CSRF protection
