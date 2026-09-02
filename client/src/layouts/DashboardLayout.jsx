import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navLinkClassName = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-center text-sm font-medium transition md:text-left ${
    isActive
      ? 'bg-blue-50 text-blue-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
  }`;

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-slate-50 md:grid md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 bg-white md:border-b-0 md:border-r">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 md:sticky md:top-0 md:h-screen md:flex-col md:flex-nowrap md:items-stretch md:px-5 md:py-7">
          <Link
            className="flex items-center gap-3 font-semibold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            to="/dashboard/all-jobs"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-200">
              J
            </span>
            Job Board
          </Link>

          <nav
            className="order-3 grid w-full grid-cols-3 gap-1 md:order-none md:mt-7 md:flex md:flex-col"
            aria-label="Dashboard navigation"
          >
            <NavLink className={navLinkClassName} to="all-jobs">
              All Jobs
            </NavLink>
            <NavLink className={navLinkClassName} to="add-job">
              Add Job
            </NavLink>
            <NavLink className={navLinkClassName} to="profile">
              Profile
            </NavLink>
          </nav>

          <button
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:mt-auto"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
