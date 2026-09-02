import { Link } from 'react-router-dom';

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  interview: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  declined: 'bg-red-50 text-red-700 ring-red-600/20',
};

const JobCard = ({ job, isDeleting, onDelete }) => {
  const createdDate = new Date(job.createdAt).toLocaleDateString();

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-slate-950">
            {job.position}
          </h2>
          <p className="mt-1 truncate text-sm font-medium text-slate-500">
            {job.company}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusStyles[job.status] || 'bg-slate-100 text-slate-700 ring-slate-600/20'}`}
        >
          {job.status}
        </span>
      </div>

      <dl className="mt-6 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Location
          </dt>
          <dd className="mt-1 text-sm font-medium text-slate-700">
            {job.jobLocation}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Job type
          </dt>
          <dd className="mt-1 text-sm font-medium capitalize text-slate-700">
            {job.jobType}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Created
          </dt>
          <dd className="mt-1 text-sm font-medium text-slate-700">
            <time dateTime={job.createdAt}>{createdDate}</time>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          to={`/dashboard/add-job?edit=${job._id}`}
          state={{ job }}
        >
          Edit
        </Link>
        <button
          className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete(job._id)}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </article>
  );
};

export default JobCard;
