import React, { useState } from 'react';
import DatePicker from '../components/DatePicker';

const ApplyLeaveForm = ({ onClose, onSuccess, leaveBalance }) => {
  const [formData, setFormData] = useState({
    leaveType: 'regular',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const isLeaveTypeDisabled = (type) => {
    return leaveBalance && leaveBalance[type] === 0;
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (!formData.reason) {
      newErrors.reason = 'Reason is required';
    } else if (formData.reason.length < 10) {
      newErrors.reason = 'Reason must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/leaves/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const fieldErrors = {};
          data.errors.forEach(err => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          setServerError(data.message || 'Failed to submit leave');
        }
        return;
      }

      onSuccess();
    } catch (err) {
      setServerError('Error connecting to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-3xl max-w-md w-full p-8">
        <h2 className="text-4xl font-bold text-primary-500 mb-6">Apply Leave</h2>

        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg mb-6 font-medium">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-bold text-primary-500 mb-3">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full px-5 py-3 text-base border-2 border-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              required
            >
              <option value="regular" disabled={isLeaveTypeDisabled('regular')}>
                Regular {leaveBalance && `(${leaveBalance.regular} left)`} {isLeaveTypeDisabled('regular') && '- No leaves available'}
              </option>
              <option value="emergency" disabled={isLeaveTypeDisabled('emergency')}>
                Emergency {leaveBalance && `(${leaveBalance.emergency} left)`} {isLeaveTypeDisabled('emergency') && '- No leaves available'}
              </option>
            </select>
          </div>

          <div>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(date) => {
                setFormData({ ...formData, startDate: date });
                if (errors.startDate) {
                  setErrors({ ...errors, startDate: '' });
                }
              }}
              minDate={getTodayDate()}
              error={errors.startDate}
            />
          </div>

          <div>
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(date) => {
                setFormData({ ...formData, endDate: date });
                if (errors.endDate) {
                  setErrors({ ...errors, endDate: '' });
                }
              }}
              minDate={getTodayDate()}
              error={errors.endDate}
            />
          </div>

          <div>
            <label className="block text-lg font-bold text-primary-500 mb-3">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide the reason for your leave (min. 10 characters)"
              rows="4"
              className={`w-full px-5 py-3 text-base border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.reason ? 'border-red-500 focus:ring-red-500' : 'border-accent focus:ring-primary-500'
              }`}
              required
            />
            <p className="text-sm text-secondary-600 mt-2 font-medium">
              {formData.reason.length}/10 characters minimum
            </p>
            {errors.reason && <p className="text-red-600 text-sm mt-2 font-medium">{errors.reason}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || (leaveBalance && leaveBalance[formData.leaveType] === 0)}
              className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base disabled:transform-none"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-secondary-100 hover:bg-secondary-200 text-secondary-600 font-bold py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
