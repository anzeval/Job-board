import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import JobCard from '../components/JobCard.jsx';

const defaultFilters = {
  search: '',
  status: 'all',
  jobType: 'all',
  sort: 'latest',
};

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletingJobId, setDeletingJobId] = useState(null);
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    const params = {
      sort: appliedFilters.sort,
      page,
      limit: 10,
    };

    if (appliedFilters.search) {
      params.search = appliedFilters.search;
    }

    if (appliedFilters.status !== 'all') {
      params.status = appliedFilters.status;
    }

    if (appliedFilters.jobType !== 'all') {
      params.jobType = appliedFilters.jobType;
    }

    try {
      const { data } = await api.get('/jobs', { params });

      setJobs(data.jobs);
      setTotalJobs(data.totalJobs);
      setNumOfPages(data.numOfPages);
    } catch (error) {
      setJobs([]);
      setTotalJobs(0);
      setNumOfPages(0);
      setErrorMessage(
        error.response?.data?.msg || 'Unable to load jobs. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();
    setPage(1);
    setAppliedFilters({
      ...draftFilters,
      search: draftFilters.search.trim(),
    });
  };

  const handleClearFilters = () => {
    const clearedFilters = { ...defaultFilters };

    setDraftFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setPage(1);
  };

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm('Delete this job?');

    if (!confirmed) {
      return;
    }

    setDeletingJobId(jobId);
    setErrorMessage('');

    try {
      await api.delete(`/jobs/${jobId}`);

      if (jobs.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      } else {
        await fetchJobs();
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || 'Unable to delete job. Please try again.',
      );
    } finally {
      setDeletingJobId(null);
    }
  };

  return (
    <section>
      <div className="mb-7">
        <p className="text-sm font-medium text-blue-700">Applications</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          All Jobs
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Review and manage every opportunity in your pipeline.
        </p>
      </div>

      <form
        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4"
        onSubmit={handleApplyFilters}
      >
        <label className="text-sm font-medium text-slate-700">
          Search by position
          <input
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="search"
            type="search"
            placeholder="e.g. Frontend Developer"
            value={draftFilters.search}
            onChange={handleFilterChange}
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Status
          <select
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-950 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="status"
            value={draftFilters.status}
            onChange={handleFilterChange}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Job type
          <select
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-950 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="jobType"
            value={draftFilters.jobType}
            onChange={handleFilterChange}
          >
            <option value="all">All job types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Sort
          <select
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-950 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="sort"
            value={draftFilters.sort}
            onChange={handleFilterChange}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </label>

        <div className="flex flex-col gap-3 sm:flex-row md:col-span-2 xl:col-span-4">
          <button
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            type="submit"
          >
            Apply Filters
          </button>
          <button
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            type="button"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </form>

      {errorMessage && (
        <p
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {loading && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-sm text-slate-500 shadow-sm">
          Loading jobs...
        </div>
      )}

      {!loading && (jobs.length > 0 || !errorMessage) && (
        <p className="mb-4 mt-7 text-sm font-medium text-slate-600">
          {totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found
        </p>
      )}

      {!loading && jobs.length === 0 && !errorMessage && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No jobs found
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Try changing your filters or add a new opportunity to your
            dashboard.
          </p>
          <Link
            className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            to="/dashboard/add-job"
          >
            Add a job
          </Link>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="grid gap-5 xl:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isDeleting={deletingJobId === job._id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && numOfPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((currentPage) => currentPage - 1)}
          >
            Prev
          </button>
          <span className="text-sm font-medium text-slate-600">
            Page {page} of {numOfPages}
          </span>
          <button
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            disabled={page >= numOfPages}
            onClick={() => setPage((currentPage) => currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default AllJobsPage;
