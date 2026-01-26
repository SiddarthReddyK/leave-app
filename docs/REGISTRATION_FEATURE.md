# User Registration Feature

## Overview

A comprehensive user registration system has been added to EduLeave, allowing new users to create accounts for all three roles: Student, Teacher, and Admin.

## Changes Made

### 1. New Register Page (`frontend/src/pages/Register.js`)

- Full registration form with role-based fields
- Client-side validation with helpful error messages
- Form fields:
  - **All Roles**: Name, Email, Password, Confirm Password, College ID
  - **Students**: Class field
  - **Teachers**: Department and Assigned Class fields
  - **Admin**: Department field
- Success feedback with auto-redirect to login
- Accessible form with ARIA labels and error handling
- Link back to login page

### 2. Updated App.js

- Added `/register` route
- New Register page component imported

### 3. Updated Login.js

- Added "Register here" link for new users
- Improved form spacing and layout
- Better visual separation with border divider

## Registration Flow

### User Roles and Required Fields

**Student**

- Name ✓
- Email ✓
- College ID
- Class ✓
- Password ✓ (min 8 characters)

**Teacher**

- Name ✓
- Email ✓
- College ID
- Department ✓
- Assigned Class
- Password ✓ (min 8 characters)

**Admin**

- Name ✓
- Email ✓
- College ID
- Department ✓
- Password ✓ (min 8 characters)

## Features

### Validation

✓ Name required
✓ Valid email format
✓ Password minimum 8 characters
✓ Password confirmation matching
✓ Role-specific field validation
✓ Real-time error messages

### Security

- Passwords sent securely to backend
- Backend validation with express-validator
- Duplicate email prevention
- Password hashing with bcrypt

### User Experience

- Clear role-based form fields
- Success feedback message
- Auto-redirect to login after registration
- Accessible form (WCAG compliant)
- Mobile-responsive design
- Error messages with specific guidance

## API Endpoint

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "user@college.com",
  "password": "securepass123",
  "role": "student",
  "collegeId": "STU001",
  "classAssigned": "CS-A"
}
```

**Response (Success):**

```json
{
  "message": "User registered successfully"
}
```

**Response (Error):**

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Validation Rules (Backend)

```javascript
- Email: Must be valid email format
- Password: Minimum 8 characters
- Name: Required field
- Role: Must be 'student', 'teacher', or 'admin'
```

## How to Register

1. Go to `/register` or click "Register here" on login page
2. Select your role (Student, Teacher, or Admin)
3. Fill in required fields (marked with ✓)
4. For students: Enter your class
5. For teachers: Enter department and assigned class
6. For admin: Enter department
7. Create password (min 8 characters)
8. Confirm password
9. Click "Register" button
10. After success, you'll be redirected to login page
11. Login with your new credentials

## Features Demo

### Student Registration

```
Role: Student
Name: Jane Smith
Email: jane@college.com
College ID: STU002
Class: CS-B
Password: SecurePass123
```

### Teacher Registration

```
Role: Teacher
Name: Dr. Robert Johnson
Email: robert@college.com
College ID: TCH001
Department: Computer Science
Assigned Class: CS-A
Password: TeacherPass123
```

### Admin Registration

```
Role: Admin
Name: Alice Admin
Email: alice@college.com
College ID: ADM001
Department: Administration
Password: AdminPass123
```

## Testing the Feature

1. **Test valid registration**
   - Register with all required fields
   - Should get success message and redirect to login

2. **Test validation errors**
   - Missing required field → Error message
   - Password too short → Error message
   - Passwords don't match → Error message
   - Invalid email → Error message

3. **Test role-specific fields**
   - Student: Should see Class field
   - Teacher: Should see Department and Class fields
   - Admin: Should see Department field

4. **Test mobile responsiveness**
   - Form should be readable on mobile
   - All inputs should be touch-friendly
   - Buttons should be adequately sized

## Frontend Routes Updated

| Route          | Component      | Description                             |
| -------------- | -------------- | --------------------------------------- |
| `/`            | Login          | Login page with register link           |
| `/register`    | Register       | New user registration page              |
| `/dashboard`   | Dashboard      | Protected dashboard for logged-in users |
| `/apply-leave` | ApplyLeaveForm | Protected leave application page        |

## Next Steps (Optional Enhancements)

1. **Email Verification**
   - Send confirmation email
   - Verify before account activation

2. **Password Reset**
   - Implement forgot password flow
   - Email-based password recovery

3. **Admin Approval**
   - Require admin approval for new accounts
   - Especially for teacher accounts

4. **Profile Completion**
   - Additional user profile fields
   - Profile photo upload

5. **Two-Factor Authentication**
   - SMS or authenticator app
   - Enhanced security for admin accounts

## Backend Support

The backend already has the registration endpoint implemented:

- Location: `backend/src/routes/authRoutes.js`
- Controller: `backend/src/controllers/authController.js`
- Validation: `backend/src/middleware/validators.js`
- Model: `backend/src/models/User.js`

No additional backend changes are needed!
