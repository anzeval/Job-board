import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-16 text-center text-white">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-400">
          The page you are looking for does not exist or may have moved.
        </p>
        <Link
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-950/40 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          to="/"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
};

export default ErrorPage;
