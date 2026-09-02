# Job Board

A MERN application for tracking job applications.

## Prerequisites

- Node.js 20.19 or newer
- npm
- A MongoDB database, for example MongoDB Atlas

## Local setup

1. Clone the repository and open the project directory.

2. Install the root dependencies:

   ```bash
   npm install
   ```

3. Install the server dependencies:

   ```bash
   npm install --prefix server
   ```

4. Install the client dependencies:

   ```bash
   npm install --prefix client
   ```

5. Create the server environment file:

   ```bash
   cp server/.env.example server/.env
   ```

6. Add the required values to `server/.env`:

   ```env
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret
   ```

Do not commit `server/.env`. It is already excluded by `.gitignore`.

## Environment variables

| Variable | Description |
| --- | --- |
| `PORT` | Port used by the Express server. Use `5000` to match the Vite proxy. |
| `MONGODB_URL` | Full MongoDB connection string. |
| `JWT_SECRET` | Secret used to sign and verify authentication tokens. |

## Development

Run the client and server together from the project root:

```bash
npm run dev
```

The application will be available at:

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

The root command uses `concurrently` to run both development servers.

To run them separately, use two terminals:

```bash
npm run dev --prefix server
```

```bash
npm run dev --prefix client
```
