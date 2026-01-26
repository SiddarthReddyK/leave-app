import React, { useState } from 'react';

const DatePicker = ({ value, onChange, minDate, label, error }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = newDate.toISOString().split('T')[0];
    onChange(dateString);
    setShowCalendar(false);
  };

  const isDateDisabled = (day) => {
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const minDateObj = minDate ? new Date(minDate) : new Date();
    minDateObj.setHours(0, 0, 0, 0);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < minDateObj;
  };

  const isDateSelected = (day) => {
    if (!value) return false;
    const selectedDate = new Date(value);
    return (
      selectedDate.getFullYear() === currentMonth.getFullYear() &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getFullYear() === currentMonth.getFullYear() &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getDate() === day
    );
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long' });
  const year = currentMonth.getFullYear();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const formattedValue = value ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div>
      {label && (
        <label className="block text-lg font-bold text-primary-600 mb-3">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 cursor-pointer text-left font-medium ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-accent focus:ring-primary-500'
          } ${formattedValue ? 'text-primary-600' : 'text-secondary-400'}`}
        >
          {formattedValue || 'Select a date'}
        </button>

        {showCalendar && (
          <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl p-6 z-50 w-80 border border-accent">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 hover:bg-secondary-100 rounded-lg transition text-primary-600 font-bold text-xl"
              >
                ←
              </button>
              <h3 className="text-xl font-bold text-primary-600">
                {monthName} {year}
              </h3>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 hover:bg-secondary-100 rounded-lg transition text-primary-600 font-bold text-xl"
              >
                →
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="text-center font-bold text-primary-600 py-2 text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {days.map((day, index) => (
                <div key={index}>
                  {day === null ? (
                    <div className="h-10 w-10"></div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDateClick(day)}
                      disabled={isDateDisabled(day)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 text-base flex items-center justify-center ${
                        isDateDisabled(day)
                          ? 'text-secondary-300 cursor-not-allowed'
                          : isDateSelected(day)
                          ? 'bg-gradient-to-br from-accent to-accentLight text-white font-bold shadow-lg'
                          : isToday(day)
                          ? 'border-2 border-accent text-primary-600 font-bold'
                          : 'text-primary-600 hover:bg-secondary-100'
                      }`}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-accent">
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setShowCalendar(false);
                }}
                className="flex-1 px-4 py-2 text-accent font-bold hover:bg-accent hover:bg-opacity-10 rounded-lg transition text-sm"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="flex-1 px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accentLight transition text-sm"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>}
    </div>
  );
};

export default DatePicker;
