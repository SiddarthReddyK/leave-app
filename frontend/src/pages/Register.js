import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    collegeId: '',
    department: '',
    classAssigned: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Invalid email format');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.role === 'student' && !formData.classAssigned) {
      setError('Class is required for students');
      return false;
    }
    if (formData.role === 'teacher' && !formData.department) {
      setError('Department is required for teachers');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        collegeId: formData.collegeId,
      };

      if (formData.role === 'student') {
        registrationData.classAssigned = formData.classAssigned;
      } else if (formData.role === 'teacher') {
        registrationData.department = formData.department;
        registrationData.classAssigned = formData.classAssigned;
      } else if (formData.role === 'admin') {
        registrationData.department = formData.department;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = Array.isArray(data.errors)
          ? data.errors.map(err => `${err.field}: ${err.message}`).join(', ')
          : data.message || 'Registration failed';
        setError(errorMessage);
        return;
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-primary-500 mb-2">EduLeave</h1>
        <p className="text-secondary-600 mb-6">Create Your Account</p>

        {error && (
          <div 
            role="alert" 
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {success && (
          <div 
            role="alert" 
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4"
            aria-live="polite"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-primary-500 mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-required="true"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-primary-500 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@college.com"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-required="true"
              required
            />
          </div>

          <div>
            <label htmlFor="collegeId" className="block text-sm font-semibold text-primary-500 mb-2">
              College ID
            </label>
            <input
              id="collegeId"
              type="text"
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              placeholder="STU001"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-primary-500 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-required="true"
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {formData.role === 'student' && (
            <div>
              <label htmlFor="classAssigned" className="block text-sm font-semibold text-primary-500 mb-2">
                Class
              </label>
              <input
                id="classAssigned"
                type="text"
                name="classAssigned"
                value={formData.classAssigned}
                onChange={handleChange}
                placeholder="CS-A"
                className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-required="true"
                required
              />
            </div>
          )}

          {(formData.role === 'teacher' || formData.role === 'admin') && (
            <div>
              <label htmlFor="department" className="block text-sm font-semibold text-primary-500 mb-2">
                Department
              </label>
              <input
                id="department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Computer Science"
                className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-required="true"
                required
              />
            </div>
          )}

          {formData.role === 'teacher' && (
            <div>
              <label htmlFor="teacherClass" className="block text-sm font-semibold text-primary-500 mb-2">
                Assigned Class
              </label>
              <input
                id="teacherClass"
                type="text"
                name="classAssigned"
                value={formData.classAssigned}
                onChange={handleChange}
                placeholder="CS-A"
                className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-primary-500 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-required="true"
              required
            />
            <p className="text-xs text-secondary-600 mt-1">Min 8 characters</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-primary-500 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-required="true"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
            aria-busy={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-secondary-600 text-sm mt-6">
          Already have an account?{' '}
          <Link 
            to="/" 
            className="text-primary-500 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
