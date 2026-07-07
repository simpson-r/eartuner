# EarTuner

EarTuner is a web application for practicing and improving ear training through interactive music exercises.

Users can practice intervals, chords, and scales, customize their exercises, and track their progress over time.

## Features

- Interval, chord, scale, and scale degree listening exercises
- Multiple instrument sound options (i.e. piano, guitar)
- Progress tracking and practice statistics
- Daily streaks
- Passwordless authentication
- Light and dark mode
- Responsive design

## Tech Stack

- Next.js
- React
- TypeScript
- Prisma
- PostgreSQL
- Auth.js
- TanStack Query
- Chakra UI
- Tone.js

## Getting Started

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

## Environment Variables

Create a `.env` file and configure the required variables, including:

- Database connection
- Authentication secret
- Email provider credentials
- OAuth/API credentials (if applicable)

## License

This project is intended as a portfolio project.