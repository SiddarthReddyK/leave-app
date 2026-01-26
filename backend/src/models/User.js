const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
  collegeId: {
    type: String,
  },
  department: {
    type: String,
  },
  classAssigned: {
    type: String,
  },
  leaveBalance: {
    regular: {
      type: Number,
      default: 3,
    },
    emergency: {
      type: Number,
      default: 1,
    },
  },
  lastBalanceResetMonth: {
    type: Date,
    default: () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
