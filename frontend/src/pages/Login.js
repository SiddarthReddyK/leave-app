import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"></div>
      
      <main className="bg-white rounded-2xl shadow-3xl p-10 max-w-md w-full backdrop-blur-md">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary-500 mb-2">EduLeave</h1>
          <p className="text-lg text-secondary-600 font-medium">Smart Leave Management</p>
        </div>

        {error && (
          <div 
            role="alert" 
            className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg mb-6 font-medium"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="block text-lg font-bold text-primary-500 mb-3">
              Email or College ID
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@college.com"
              className="w-full px-5 py-3 text-base border-2 border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              aria-required="true"
              aria-describedby="email-error"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-bold text-primary-500 mb-3">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3 text-base border-2 border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              aria-required="true"
              aria-describedby="password-error"
              required
            />
          </div>

          <fieldset>
            <legend className="text-lg font-bold text-primary-500 mb-3 block">Login As</legend>
            <div className="grid grid-cols-3 gap-3" role="group">
              {['student', 'teacher', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                  className={`py-3 px-4 rounded-xl font-bold text-base transition-all duration-300 transform ${
                    role === r
                      ? 'bg-primary-500 text-white shadow-lg -translate-y-1'
                      : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200 hover:-translate-y-0.5'
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
            aria-busy={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <a 
          href="#" 
          className="block text-center text-primary-500 text-base font-bold hover:text-primary-600 mt-6 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 transition"
        >
          Forgot Password?
        </a>

        <p className="text-center text-secondary-600 text-base mt-6">
          New user?{' '}
          <Link 
            to="/register" 
            className="text-primary-500 font-bold hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1 transition"
          >
            Register here
          </Link>
        </p>

        <p className="text-center text-secondary-400 text-sm mt-8 border-t border-accent pt-5 font-medium">
          Demo credentials available. Password must be at least 8 characters.
        </p>
      </main>
    </div>
  );
};

export default Login;
