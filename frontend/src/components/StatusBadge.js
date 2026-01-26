import React from 'react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    approved: 'bg-green-100 text-green-700 border border-green-300',
    rejected: 'bg-red-100 text-red-700 border border-red-300',
  };

  const statusEmoji = {
    pending: '🟡',
    approved: '🟢',
    rejected: '🔴',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${statusStyles[status]}`}>
      {statusEmoji[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
