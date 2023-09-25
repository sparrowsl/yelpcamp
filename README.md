# YelpCamp

## Technologies

- [Express](https://expressjs.com) - JavaScript Backend framework
- [SvelteKit](https://kit.svelte.dev) - JavaScript Meta framework
- [UnoCSS](https://unocss.dev) - CSS framework
- [Prisma](https://prisma.io) - Database ORM

## Prerequisites

What things you need to install the software

- Node 18+ and above
- Experience using:
  - HTML, CSS
  - JavaScript
  - Express
  - TailwindCSS
  - Svelte (useful but optional)

## Test Locally

- Add `DATABASE_URL="file:./dev.db"` inside `.env` for the backend folder
- Run the `npm run seed` command to seed the database tables with dummy data
- Run the `npm run setup` command to install necessary NPM packages for both frontend and backend
- Run `npm run start:frontend` to start only frontend server
- Run `npm run start:backend` to start only backend server in watch mode
- Run `npm run start:dev` to start both servers
- Run `npm run deploy` to build and deploy for production
