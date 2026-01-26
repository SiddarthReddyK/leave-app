import React, { useState, useEffect } from 'react';

const TeacherDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPendingLeaves();
  }, []);

  const fetchPendingLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leaves/pending`, {
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

  const handleApprove = async (leaveId) => {
    if (!window.confirm('Are you sure you want to approve this leave?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leaves/${leaveId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (response.ok) {
        fetchPendingLeaves();
      }
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (leaveId) => {
    if (!window.confirm('Are you sure you want to reject this leave?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leaves/${leaveId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (response.ok) {
        fetchPendingLeaves();
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-500">EduLeave</h1>
          <div className="flex items-center space-x-4">
            <span className="text-secondary-600">{user?.name}</span>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/';
              }}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-primary-500 mb-8">Pending Leave Requests</h2>

        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <p className="text-secondary-600">Loading...</p>
          ) : leaves.length === 0 ? (
            <p className="text-secondary-600">No pending leave requests</p>
          ) : (
            <div className="space-y-4">
              {leaves.map((leave) => (
                <div key={leave._id} className="border border-accent rounded-lg p-4 hover:bg-background transition">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-secondary-600">Student</p>
                      <p className="font-semibold text-primary-500">{leave.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600">Class</p>
                      <p className="font-semibold text-primary-500">{leave.studentClass}</p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600">Leave Dates</p>
                      <p className="font-semibold">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary-600">Type</p>
                      <p className="font-semibold">{leave.leaveType}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-secondary-600">Reason</p>
                    <p>{leave.reason}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(leave._id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleReject(leave._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
