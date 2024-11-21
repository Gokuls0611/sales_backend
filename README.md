## Project Setup

1. Ensure Docker is installed on your system.
2. Set up the `.env` file by copying `.env.example` to `.env` and configuring the necessary environment variables.
3. Build the Docker containers:
   ```bash
   docker compose build
   ```
4. Start the Docker containers:
   ```bash
   docker compose up
   ```
5. Install dependencies and run

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

7. To create, update, or delete tables, edit `src/config/schema.ts` to make the necessary changes. After making changes to the schema, run the following commands:
   ```bash
   npm run generate && npm run push
   ```
