import { useState } from 'react';
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(
    () => searchParams.get('mode') !== 'login',
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate, token } = useAuth();
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/dashboard" replace />;
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
    setIsLoading(true);

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const requestData = isRegister
        ? formData
        : {
            email: formData.email,
            password: formData.password,
          };
      const { data } = await api.post(endpoint, requestData);

      authenticate(data);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || 'Something went wrong. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister((currentMode) => !currentMode);
    setErrorMessage('');
  };

  const pageTitle = isRegister ? 'Create your account' : 'Welcome back';
  const submitButtonText = isRegister ? 'Create account' : 'Sign in';

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10 sm:px-6">
      <section className="w-full max-w-md">
        <Link
          className="mx-auto mb-8 flex w-fit items-center gap-3 text-lg font-semibold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          to="/"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-200">
            J
          </span>
          Job Board
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            {pageTitle}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {isRegister
              ? 'Start tracking your job applications in one place.'
              : 'Sign in to continue to your application dashboard.'}
          </p>

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-950 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-100"
                id="password"
                name="password"
                type="password"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                minLength={8}
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMessage && (
              <p
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
                role="alert"
              >
                {errorMessage}
              </p>
            )}

            <button
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : submitButtonText}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isRegister ? 'Already have an account?' : 'New to Job Board?'}{' '}
            <button
              className="font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              onClick={toggleMode}
              disabled={isLoading}
            >
              {isRegister ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
