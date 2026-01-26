const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const { validateLeaveApplication, handleValidationErrors } = require('../middleware/validators');
const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');

// Student: Apply for leave
router.post('/apply', authenticateToken, authorizeRole('student'), validateLeaveApplication, handleValidationErrors, async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check leave quota
    const monthStart = new Date(startDate);
    monthStart.setDate(1);
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth(monthEnd.getMonth() + 1);

    const existingLeaves = await LeaveRequest.countDocuments({
      studentId: req.user.id,
      leaveType,
      status: { $in: ['pending', 'approved'] },
      startDate: { $gte: monthStart, $lt: monthEnd },
    });

    const limit = leaveType === 'regular' ? 3 : 1;
    if (existingLeaves >= limit) {
      return res.status(400).json({ 
        message: `Leave quota exceeded. Monthly ${leaveType} leave limit: ${limit}` 
      });
    }

    const leave = new LeaveRequest({
      studentId: req.user.id,
      studentName: student.name,
      studentClass: student.classAssigned,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
    });

    await leave.save();
    res.status(201).json({ message: 'Leave application submitted', leave });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting leave', error: error.message });
  }
});

// Student: Get their own leave requests
router.get('/my-leaves', authenticateToken, authorizeRole('student'), async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaves', error: error.message });
  }
});

// Student: Get their leave balance
router.get('/balance', authenticateToken, authorizeRole('student'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if we need to reset the balance (new month)
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const lastResetMonth = new Date(user.lastBalanceResetMonth);
    lastResetMonth.setHours(0, 0, 0, 0);

    if (currentMonth > lastResetMonth) {
      // Reset balance for new month
      user.leaveBalance = {
        regular: 3,
        emergency: 1,
      };
      user.lastBalanceResetMonth = new Date();
      await user.save();
    }

    res.json(user.leaveBalance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave balance', error: error.message });
  }
});

// Teacher: Get pending leaves for assigned classes
router.get('/pending', authenticateToken, authorizeRole('teacher'), async (req, res) => {
  try {
    const teacher = await User.findById(req.user.id);
    const leaves = await LeaveRequest.find({
      status: 'pending',
      studentClass: { $in: [teacher.classAssigned] }
    }).populate('studentId', 'name email');
    
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending leaves', error: error.message });
  }
});

// Teacher: Approve or Reject leave
router.put('/:leaveId/approve', authenticateToken, authorizeRole('teacher'), async (req, res) => {
  try {
    const { status, comments } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leave = await LeaveRequest.findById(req.params.leaveId);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.status !== 'pending') {
      return res.status(400).json({ message: 'Leave has already been processed' });
    }

    leave.status = status;
    leave.teacherApprovedBy = req.user.id;
    leave.teacherComments = comments;
    leave.updatedAt = new Date();

    await leave.save();
    res.json({ message: `Leave ${status}`, leave });
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave', error: error.message });
  }
});

// Admin: Get all leave requests
router.get('/all', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const { status, department, classFilter } = req.query;
    let query = {};

    if (status) query.status = status;
    if (classFilter) query.studentClass = classFilter;

    const leaves = await LeaveRequest.find(query)
      .populate('studentId', 'name email department')
      .populate('teacherApprovedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaves', error: error.message });
  }
});

// Admin: Get leave statistics
router.get('/stats', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const totalLeaves = await LeaveRequest.countDocuments();
    const approvedLeaves = await LeaveRequest.countDocuments({ status: 'approved' });
    const emergencyLeaves = await LeaveRequest.countDocuments({ leaveType: 'emergency' });

    const approvedRate = totalLeaves > 0 ? (approvedLeaves / totalLeaves * 100).toFixed(2) : 0;

    res.json({
      totalLeaves,
      approvedLeaves,
      emergencyLeaves,
      approvedRate: `${approvedRate}%`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

module.exports = router;
