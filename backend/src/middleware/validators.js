const { body, validationResult } = require('express-validator');

const validateLeaveApplication = [
  body('leaveType')
    .isIn(['regular', 'emergency'])
    .withMessage('Invalid leave type'),
  body('startDate')
    .isISO8601()
    .withMessage('Invalid start date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date()) {
        throw new Error('Start date cannot be in the past');
      }
      return true;
    }),
  body('endDate')
    .isISO8601()
    .withMessage('Invalid end date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('reason')
    .notEmpty()
    .withMessage('Reason is required')
    .isLength({ min: 10 })
    .withMessage('Reason must be at least 10 characters'),
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('name')
    .notEmpty()
    .withMessage('Name is required'),
  body('role')
    .isIn(['student', 'teacher', 'admin'])
    .withMessage('Invalid role'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }
  next();
};

module.exports = {
  validateLeaveApplication,
  validateLogin,
  validateRegister,
  handleValidationErrors,
};
