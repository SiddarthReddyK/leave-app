import React, { useState, useEffect } from 'react';
import ApplyLeaveForm from './ApplyLeaveForm';

const StudentDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [statusFilter, setStatusFilter] = useState('all');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState({ regular: 0, emergency: 0 });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchLeaves();
    fetchLeaveBalance();
  }, []);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leaves/my-leaves`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leaves/balance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLeaveBalance(data);
    } catch (error) {
      console.error('Error fetching leave balance:', error);
    }
  };

  const filteredLeaves = leaves.filter((leave) => {
    const leaveDate = new Date(leave.startDate);
    const monthMatch = leaveDate.getMonth() === selectedMonth;
    const statusMatch = statusFilter === 'all' || leave.status === statusFilter;
    return monthMatch && statusMatch;
  });

  const handleApplySuccess = () => {
    setShowApplyForm(false);
    fetchLeaves();
    fetchLeaveBalance();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-400';
      case 'approved':
        return 'bg-green-50 text-green-700 border-l-4 border-green-400';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-l-4 border-red-400';
      default:
        return 'bg-gray-50 text-gray-700 border-l-4 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-secondary-100">
      <nav className="bg-white shadow-xl sticky top-0 z-10 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">EduLeave</h1>
          <div className="flex items-center space-x-6">
            <span className="text-lg font-bold text-secondary-600">{user?.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-bold text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-primary-500 mb-8">Welcome Back!</h2>
          
          {/* Leave Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Regular Leaves Left</h3>
              <p className="text-6xl font-bold text-blue-600 mb-2">{leaveBalance.regular}</p>
              <p className="text-base text-blue-700 font-medium">Out of 3 total</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-900 mb-3">Emergency Leaves Left</h3>
              <p className="text-6xl font-bold text-orange-600 mb-2">{leaveBalance.emergency}</p>
              <p className="text-base text-orange-700 font-medium">Out of 1 total</p>
            </div>
          </div>
          
          <button 
            onClick={() => setShowApplyForm(true)}
            disabled={leaveBalance.regular === 0 && leaveBalance.emergency === 0}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
              leaveBalance.regular === 0 && leaveBalance.emergency === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-xl hover:-translate-y-1 shadow-lg'
            }`}
          >
            + Apply Leave
          </button>
          {leaveBalance.regular === 0 && leaveBalance.emergency === 0 && (
            <p className="text-red-600 text-lg mt-3 font-bold">No leaves remaining</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h3 className="text-3xl font-bold text-primary-500 mb-8">Leave History</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-lg font-bold text-secondary-600 mb-3">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-5 py-3 text-base border-2 border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleDateString('en-US', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-bold text-secondary-600 mb-3">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-5 py-3 text-base border-2 border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-secondary-600 text-lg font-medium">Loading...</p>
          ) : filteredLeaves.length === 0 ? (
            <p className="text-secondary-600 text-lg font-medium">No leaves found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-accent">
                    <th className="pb-4 text-base font-bold text-secondary-700">Start Date</th>
                    <th className="pb-4 text-base font-bold text-secondary-700">End Date</th>
                    <th className="pb-4 text-base font-bold text-secondary-700">Type</th>
                    <th className="pb-4 text-base font-bold text-secondary-700">Reason</th>
                    <th className="pb-4 text-base font-bold text-secondary-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave) => (
                    <tr key={leave._id} className={`border-b border-accent hover:bg-background transition-colors duration-200 ${getStatusColor(leave.status)}`}>
                      <td className="py-4 text-base font-medium">{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className="py-4 text-base font-medium">{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className="py-4 text-base font-medium">{leave.leaveType}</td>
                      <td className="py-4 text-base">{leave.reason}</td>
                      <td className="py-4">
                        <span className={`px-4 py-2 rounded-lg text-sm font-bold ${getStatusColor(leave.status)}`}>
                          {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showApplyForm && (
          <ApplyLeaveForm 
            onClose={() => setShowApplyForm(false)} 
            onSuccess={handleApplySuccess}
            leaveBalance={leaveBalance}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
