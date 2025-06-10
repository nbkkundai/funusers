# User Management System

A modern React application for managing users and their tasks, built with TypeScript, Vite, and SQLite backend.

## Features

- User management (create and view users)
- Task management per user
- Interactive dashboard with task counts
- Modern UI with Shadcn/UI components
- Responsive design with Tailwind CSS
- RESTful API with Express and SQLite

## Tech Stack

### Frontend
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **UI Components:** 
  - Shadcn/UI
  - Tailwind CSS
  - React Hook Form for form handling
- **State Management:** React Hooks
- **Routing:** React Router DOM

### Backend
- **Server:** Express.js
- **Database:** SQLite3
- **API:** RESTful endpoints

## Project Structure

```
├── src/                    # Frontend source code
│   ├── api/               # API client integration
│   ├── components/        # React components
│   │   └── ui/           # Shadcn UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Route pages
│   └── types/            # TypeScript type definitions
│
├── server/                # Backend source code
│   ├── src/              # Server source files
│   │   ├── index.ts      # Express server setup
│   │   └── types/        # Shared type definitions
│   └── database.sqlite   # SQLite database file
```

## Getting Started

1. **Installation**

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

2. **Development**

```bash
# Start the backend server (from server directory)
npm run dev

# Start the frontend development server (from root directory)
npm run dev
```

3. **Build**

```bash
# Build the frontend
npm run build

# Build the backend
cd server
npm run build
```

## Environment Setup

The application uses the following default ports:
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3001`

## API Endpoints

- `GET /api/users` - Get all users with task counts
- `POST /api/users` - Create a new user
- `GET /api/users/:userId/tasks` - Get tasks for specific user
- `POST /api/users/:userId/tasks` - Create a task for user
- `PUT /api/tasks/:taskId/toggle` - Toggle task completion status

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage report

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Testing

The project includes unit tests using:
- Vitest for test runner
- Testing Library for React components
- MSW for API mocking

## Dependencies

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form

### Backend
- Express.js
- SQLite3
- CORS

## Development

The project uses:
- ESLint for code quality
- TypeScript for type safety
- Prettier for code formatting

Configuration can be found in:
- `tsconfig.json`
- `tsconfig.app.json`
- `vitest.config.ts`

## License

MIT