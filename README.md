This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First create or start the database:

    docker compose --project-directory docker up -d

If the image already exists

    docker compose --project-directory docker start

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database interactions

The persistency layer is handled by [prisma](https://www.prisma.io/docs).
Use PostgreSQL 17 as DB.

Initialize prisma (it shouldn't be necessary to do this anymore):
    
    npx prisma init --datasource-provider postgresql --output generated/prisma

Adapt `DATABASE_URL` in the `.env` file with the correct connection string. For local development the credential should match the ones in `docker/docker-compose.yaml`.

When the `schema.prisma` is modified, run

    npx prisma generate

to generate the javascript and typescript code from the schema file.

## Migrations

To create and apply migrations to the dev database use

    npx prisma migrate dev

    