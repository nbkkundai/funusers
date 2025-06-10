# User Management System

A modern React application for managing users and their tasks, built with TypeScript, Vite, and Supabase.

## Features

- User management (create and view users)
- Task management per user
- Interactive dashboard with task counts
- Modern UI with Shadcn/UI components
- Responsive design with Tailwind CSS

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **UI Components:** 
  - Shadcn/UI
  - Tailwind CSS
  - Recharts for data visualization
  - React Hook Form for form handling
- **Backend:** Supabase
- **State Management:** React Hooks
- **Routing:** React Router DOM

## Getting Started

1. **Installation**

```bash
npm install
```

2. **Development**

```bash
npm run dev
```

3. **Build**

```bash
npm run build
```

## Project Structure

```
src/
├── api/           # API integration layer
├── components/    # React components
│   └── ui/       # Shadcn UI components
├── hooks/         # Custom React hooks
├── integrations/ # Third-party integrations
├── lib/          # Utility functions
├── pages/        # Route pages
└── types/        # TypeScript type definitions
```

## Environment Setup

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Dependencies

- React v18
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form
- Zod
- Supabase Client

## Development

The project uses ESLint for code quality and TypeScript for type safety. The configuration can be found in:
- `eslint.config.js`
- `tsconfig.json`

## License

MIT# funusers
