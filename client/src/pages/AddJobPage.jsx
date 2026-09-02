import { useEffect, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import api from '../api/axios.js';

const defaultFormData = {
  position: '',
  company: '',
  jobLocation: '',
  status: 'pending',
  jobType: 'full-time',
};

const getJobFormData = (job) => ({
  position: job.position,
  company: job.company,
  jobLocation: job.jobLocation,
  status: job.status,
  jobType: job.jobType,
});

const AddJobPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editId = searchParams.get('edit');
  const isEditMode = Boolean(editId);
  const job = location.state?.job;
  const [formData, setFormData] = useState(() =>
    isEditMode && job ? getJobFormData(job) : { ...defaultFormData },
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(
      isEditMode && job ? getJobFormData(job) : { ...defaultFormData },
    );
    setErrorMessage('');
  }, [isEditMode, job]);

  if (isEditMode && !job) {
    return (
      <section className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          Edit Job
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Job data is not available. Please return to All Jobs and select Edit
          again.
        </p>
        <Link
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          to="/dashboard/all-jobs"
        >
          Back to All Jobs
        </Link>
      </section>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const payload = {
      position: formData.position.trim(),
      company: formData.company.trim(),
      jobLocation: formData.jobLocation.trim(),
      status: formData.status,
      jobType: formData.jobType,
    };

    if (!payload.position || !payload.company || !payload.jobLocation) {
      setErrorMessage('Please provide position, company, and job location.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await api.patch(`/jobs/${editId}`, payload);
      } else {
        await api.post('/jobs', payload);
      }

      navigate('/dashboard/all-jobs');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || 'Unable to save job. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitButtonText = isEditMode ? 'Save Changes' : 'Add Job';
  const submittingButtonText = isEditMode ? 'Saving...' : 'Adding...';

  return (
    <section className="max-w-3xl">
      <div className="mb-7">
        <p className="text-sm font-medium text-blue-700">Applications</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          {isEditMode ? 'Edit Job' : 'Add Job'}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {isEditMode
            ? 'Update the details for this opportunity.'
            : 'Add a new opportunity to your application pipeline.'}
        </p>
      </div>

      <form
        className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-7"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-medium text-slate-700">
          Position
          <input
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-normal text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="position"
            type="text"
            placeholder="e.g. Frontend Developer"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Company
          <input
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-normal text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="company"
            type="text"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-700 sm:col-span-2">
          Job location
          <input
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-normal text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="jobLocation"
            type="text"
            placeholder="e.g. Warsaw or Remote"
            value={formData.jobLocation}
            onChange={handleChange}
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Status
          <select
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-normal text-slate-950 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="interview">Interview</option>
            <option value="declined">Declined</option>
          </select>
        </label>

        <label className="text-sm font-medium text-slate-700">
          Job type
          <select
            className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-normal text-slate-950 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
          </select>
        </label>

        {errorMessage && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 sm:col-span-2"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
          <button
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? submittingButtonText : submitButtonText}
          </button>
          <Link
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            to="/dashboard/all-jobs"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default AddJobPage;
