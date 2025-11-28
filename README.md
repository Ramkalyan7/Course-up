# Course-up

AI course builder — Learn anything for free.

Course-up is a Next.js + TypeScript application that helps generate and organize AI-powered learning courses. It uses Prisma for the database, NextAuth for authentication, the Perplexity AI SDK for content generation, Tailwind CSS for styling, and Redux for client state management.

Features
- Generate course content using the Perplexity AI SDK
- User authentication with NextAuth
- Type-safe API and forms using TypeScript and Zod
- Database access via Prisma and a relational database (Postgres or SQLite for local dev)
- Tailwind CSS (v4) for layout and styling
- Dockerfile for containerized deployment

Tech stack
- Next.js 16 (React 19)
- TypeScript
- Prisma (ORM)
- NextAuth (authentication)
- Perplexity AI SDK
- Redux Toolkit + React Redux
- Tailwind CSS
- Zod for schema validation

Getting started
These instructions assume you have Node.js (>= 18), pnpm/npm/yarn, and a database (for production use Postgres; for local development you can use SQLite).

1) Clone the repo

   git clone https://github.com/Ramkalyan7/Course-up.git
   cd Course-up

2) Install dependencies

   npm install

3) Create environment variables
Create a .env file at the project root (do NOT commit this file). Example variables the app expects:

   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/courseup?schema=public

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # Perplexity AI (used to generate course content)
   PERPLEXITY_API_KEY=your_perplexity_api_key_here

   # Optional runtime
   NODE_ENV=development

If you prefer SQLite for local development, set DATABASE_URL to sqlite:./dev.db

4) Set up Prisma

   # generate client (runs automatically when you run a migration as well)
   npx prisma generate

   # create migration and apply it locally (adjust name as appropriate)
   npx prisma migrate dev --name init

5) Run the development server

   npm run dev

The app will be available at http://localhost:3000 by default.

Available scripts
- npm run dev — run Next.js in development mode
- npm run build — build the app for production
- npm run start — start the production server after build
- npm run lint — run ESLint
- npm run test:backend — run backend tests/script (uses tsx scripts/test-backend.ts)

Docker
Build and run with Docker (the repository includes a Dockerfile and .dockerignore):

   # build image
   docker build -t course-up .

   # run container (example mapping port 3000)
   docker run -e DATABASE_URL="your_database_url" -e NEXTAUTH_SECRET="your_secret" -p 3000:3000 course-up

When running via Docker you still need to provide the required environment variables to the container.

Deployment
- Vercel: Next.js apps deploy well to Vercel. Set environment variables in your Vercel project settings (DATABASE_URL, NEXTAUTH_SECRET, PERPLEXITY_API_KEY, NEXTAUTH_URL, etc.).
- Docker: Push the built image to your container registry and run it on your infrastructure, providing the same environment variables.

Authentication
NextAuth is configured in the project. Ensure NEXTAUTH_SECRET and NEXTAUTH_URL are set in your environment. Providers (GitHub, Google, Credentials, etc.) can be configured via environment variables or the adapter used in the project.

Perplexity AI integration
The project depends on @perplexity-ai/perplexity_ai to generate course content. Set PERPLEXITY_API_KEY in your environment before using features that call Perplexity. Treat this key as a secret.
