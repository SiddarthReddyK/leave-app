import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const query = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      
      const [leavesRes, statsRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/api/leaves/all${query}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${process.env.REACT_APP_API_URL}/api/leaves/stats`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      const leavesData = await leavesRes.json();
      const statsData = await statsRes.json();

      setLeaves(leavesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeaves = leaves.filter((leave) =>
    leave.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-500">EduLeave Admin</h1>
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
        <h2 className="text-3xl font-bold text-primary-500 mb-8">Dashboard</h2>

        {loading ? (
          <p className="text-secondary-600">Loading...</p>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-secondary-600 text-sm mb-2">Total Leaves</p>
                <p className="text-3xl font-bold text-primary-500">{stats?.totalLeaves}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-secondary-600 text-sm mb-2">Approved</p>
                <p className="text-3xl font-bold text-green-500">{stats?.approvedLeaves}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-secondary-600 text-sm mb-2">Approval Rate</p>
                <p className="text-3xl font-bold text-blue-500">{stats?.approvedRate}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-secondary-600 text-sm mb-2">Emergency</p>
                <p className="text-3xl font-bold text-yellow-500">{stats?.emergencyLeaves}</p>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-primary-500 mb-2">Search</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by student name"
                    className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-500 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Leaves Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {paginatedLeaves.length === 0 ? (
                <p className="text-secondary-600">No leaves found</p>
              ) : (
                <>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-accent">
                          <th className="pb-3 font-semibold text-secondary-600">Student</th>
                          <th className="pb-3 font-semibold text-secondary-600">Dates</th>
                          <th className="pb-3 font-semibold text-secondary-600">Type</th>
                          <th className="pb-3 font-semibold text-secondary-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedLeaves.map((leave) => (
                          <tr key={leave._id} className="border-b border-accent hover:bg-background">
                            <td className="py-3">{leave.studentName}</td>
                            <td className="py-3">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="py-3">{leave.leaveType}</td>
                            <td className="py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                leave.status === 'approved' ? 'bg-green-100 text-green-700' :
                                leave.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-secondary-600">
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-accent rounded-lg hover:bg-background disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-accent rounded-lg hover:bg-background disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
