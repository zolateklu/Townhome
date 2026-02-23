# Townhome - Appointment Management System

Full-stack appointment management application with JWT authentication, built with FastAPI backend and Next.js frontend.

## Features

- **JWT Authentication** - Secure token-based authentication with 24-hour expiration
- **Appointment Management** - Create and view appointments with client details
- **Protected API Endpoints** - All appointment operations require authentication
- **State Management** - React Context API with localStorage persistence
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **TypeScript** - Full type safety across the frontend

## Tech Stack

**Backend:**
- FastAPI (Python web framework)
- JWT tokens (python-jose)
- Pydantic (data validation)
- CORS enabled for localhost:3000

**Frontend:**
- Next.js 16 (App Router)
- TypeScript
- React Context API for state management
- Tailwind CSS for styling
- localStorage for data persistence

## Setup

### Backend

```bash
cd backend
pip3 install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on http://localhost:8000

**API Documentation:** http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:3000

## Test Credentials

- **Username:** `testuser`
- **Password:** `testpass123`

## API Endpoints

### Authentication
- `POST /auth/login` - Login and receive JWT token
- `GET /auth/me` - Get current user info (requires JWT)

### Appointments
- `POST /api/appointments` - Create new appointment (requires JWT)
- `GET /api/appointments` - Get user's appointments (requires JWT)

## Appointment Object

```typescript
{
  id: number
  client_name: string
  service_date: string        // "YYYY-MM-DD"
  service_type: string        // "mowing" | "installation" | "maintenance"
  estimated_duration: number  // minutes
  created_at: string         // ISO timestamp
  user_id: number
}
```

## Project Structure

```
Townhome/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js pages
│   │   ├── components/     # React components
│   │   ├── context/        # State management
│   │   └── lib/            # API utilities
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore
└── README.md
```

## Architecture

### Backend
- In-memory storage for appointments (demo purposes)
- JWT tokens with HS256 algorithm
- User-specific appointment filtering
- Auto-incrementing appointment IDs
- ISO timestamp for creation tracking

### Frontend
- **Context Providers:**
  - `AuthContext` - Manages authentication state
  - `AppointmentContext` - Manages appointment data
- **Components:**
  - `LoginForm` - User authentication
  - `Dashboard` - Main app interface
  - `AppointmentForm` - Create appointments
  - `AppointmentList` - Display appointments
- **API Layer:** Centralized in `lib/api.ts`
- **Persistence:** localStorage for offline access

## Security Notes

⚠️ **This is a demo application. For production:**

- Use environment variables for `SECRET_KEY`
- Implement proper password hashing (bcrypt/argon2)
- Add refresh tokens for better security
- Use HTTPS in production
- Implement rate limiting
- Add CSRF protection
- Use a real database (PostgreSQL, MongoDB, etc.)
- Add input validation and sanitization
- Implement proper error handling
- Add logging and monitoring

## Development

### Backend Development
```bash
# Install dependencies
pip3 install -r requirements.txt

# Run with auto-reload
uvicorn main:app --reload

# View API docs
open http://localhost:8000/docs
```

### Frontend Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT

