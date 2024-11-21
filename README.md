## Project Setup

1. Set up the `.env` and configuring the necessary environment variables.
2. Install dependencies and run

   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```
   a. If you are running the backend for first time run the following command to setup database schema

   ```bash
    npm run push
   ````

3. To create, update, or delete tables, edit `src/config/schema.ts` to make the necessary changes. After making changes to the schema, run the following commands:
   ```bash
   npm run generate && npm run push
   ```
