import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link className="flex items-center gap-3 font-semibold" to="/">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-sm font-bold shadow-lg shadow-blue-950/40">
            J
          </span>
          Job Board
        </Link>

        <Link
          className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          to="/register?mode=login"
        >
          Sign in
        </Link>
      </header>

      <main className="mx-auto flex max-w-7xl items-center px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:min-h-[calc(100vh-88px)] lg:px-12 lg:py-24">
        <section className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Your job search, organized
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Keep every opportunity moving forward.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Track applications, interviews, and outcomes in one focused
            workspace built for your next career move.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold shadow-lg shadow-blue-950/40 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              to="/register"
            >
              Create an account
            </Link>
            <Link
              className="rounded-xl border border-white/15 px-6 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              to="/register?mode=login"
            >
              Sign in
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
