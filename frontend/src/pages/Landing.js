import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-eggshell to-accentLight">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accentLight rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-md bg-white shadow-lg top-0">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            EduLeave
          </h1>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-6 py-3 text-lg font-bold text-primary-600 hover:text-primary-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-accent to-accentLight text-white font-bold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-7xl font-bold text-primary-600 mb-6">
            Smart Leave Management
          </h2>
          <p className="text-2xl text-primary-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your leave requests with EduLeave. A modern, intuitive platform designed for educational institutions to manage student and teacher leaves efficiently.
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-5 bg-gradient-to-r from-accent to-accentLight text-white font-bold rounded-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Start Managing Leaves Now
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-md bg-opacity-90 border-t-4 border-accent">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accentLight rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-primary-600 mb-4">Easy Requests</h3>
            <p className="text-lg text-primary-600 leading-relaxed">
              Submit leave requests in seconds with our intuitive interface. No complicated forms or lengthy processes.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-md bg-opacity-90 border-t-4 border-blush">
            <div className="w-16 h-16 bg-gradient-to-br from-blush to-secondary-400 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-primary-600 mb-4">Real-time Tracking</h3>
            <p className="text-lg text-primary-600 leading-relaxed">
              Track your leave balance and request status in real-time. Know exactly how many leaves you have left.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-md bg-opacity-90 border-t-4 border-primary-600">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-primary-600 mb-4">Instant Approvals</h3>
            <p className="text-lg text-primary-600 leading-relaxed">
              Teachers can approve or reject requests instantly. Automated workflow saves time for everyone involved.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl shadow-2xl p-12 text-center">
          <h3 className="text-5xl font-bold text-white mb-6">Ready to Get Started?</h3>
          <p className="text-2xl text-white mb-10">
            Join your institution and start managing leaves smarter today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-eggshell transition-all duration-300 text-lg transform hover:-translate-y-1"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-lg transform hover:-translate-y-1"
            >
              Already have an account?
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 text-center">
          <p className="text-lg text-primary-600 font-medium">
            Built for educational institutions. Designed for simplicity.
          </p>
          <p className="text-base text-primary-500 mt-2">
            © 2026 EduLeave. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
