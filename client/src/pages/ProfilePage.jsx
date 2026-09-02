import { useAuth } from '../context/AuthContext.jsx';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <section className="max-w-2xl">
      <div className="mb-7">
        <p className="text-sm font-medium text-blue-700">Account</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Your account information.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50 text-lg font-bold uppercase text-blue-700">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-slate-950">
              {user?.name}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Name
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-slate-800">
              {user?.name}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Email
            </dt>
            <dd className="mt-1.5 break-words text-sm font-medium text-slate-800">
              {user?.email}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default ProfilePage;
