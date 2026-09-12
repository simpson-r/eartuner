# EarTuner

EarTuner is a web application for practicing and improving ear training through interactive music exercises.

Users can practice intervals, chords, and scales, customize their exercises, and track their progress over time.

<img width="750" height="420" alt="Screenshot 2026-09-12 at 15 33 44" src="https://github.com/user-attachments/assets/40c9166a-dd8d-427f-ab89-90b0954da29a" />


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

Generate the Prisma client and run database migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

## Environment Variables

Create a `.env` file and configure the required variables, including:

- Database connection
- Authentication secret
- Email provider credentials
