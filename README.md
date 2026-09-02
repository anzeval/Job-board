# Job Board

A MERN application for tracking job applications.

## Live Demo

[Open Job Board](https://job-board-client-dww9.onrender.com)

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
   CLIENT_URL=http://localhost:5173
   ```

Do not commit `server/.env`. It is already excluded by `.gitignore`.

## Environment variables

| Variable | Description |
| --- | --- |
| `PORT` | Port used by the Express server. Use `5000` to match the Vite proxy. |
| `MONGODB_URL` | Full MongoDB connection string. |
| `JWT_SECRET` | Secret used to sign and verify authentication tokens. |
| `CLIENT_URL` | Frontend origin allowed to access the API. Use `http://localhost:5173` locally. |
| `VITE_API_URL` | Public API URL used by the deployed client. It is optional locally because Vite uses a proxy. |

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

## Deployment environment variables

When the client and server are deployed to different domains, configure the
following values in the hosting provider.

Server:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=https://your-client-domain.onrender.com
```

Client:

```env
VITE_API_URL=https://your-server-domain.onrender.com/api/v1
```

Do not add a trailing slash to these URLs. The client URL is used by the server
to allow cross-origin requests, and the API URL is included in the client at
build time.
