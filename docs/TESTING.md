# EduLeave - Testing Guide

## Automated Testing Setup

### Install Testing Dependencies

```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom

cd ../backend
npm install --save-dev jest supertest
```

## Manual Testing Checklist

### Task 19: Test Authentication & Authorization

#### Test Login Functionality

- [ ] Navigate to login page
- [ ] Test with student role
  - Email: student@example.com
  - Password: password123
  - Verify redirects to Student Dashboard
- [ ] Test with teacher role
  - Email: teacher@example.com
  - Password: password123
  - Verify redirects to Teacher Dashboard
- [ ] Test with admin role
  - Email: admin@example.com
  - Password: password123
  - Verify redirects to Admin Dashboard
- [ ] Test with invalid credentials
  - Verify error message appears
  - Verify user is not logged in

#### Test JWT Token Validation

- [ ] Login successfully
- [ ] Check localStorage for token
- [ ] Token should have format: `eyJhbGc...`
- [ ] Manually delete token from localStorage
- [ ] Try accessing dashboard - should redirect to login
- [ ] Token should expire after 24 hours (test with backend)

#### Test Role-Based Access Control

- [ ] Login as student
  - Access /dashboard → ✓ Student Dashboard
  - Access /admin → ✗ Redirect to login
- [ ] Login as teacher
  - Access /dashboard → ✓ Teacher Dashboard
  - Access /admin → ✗ Redirect to login
- [ ] Login as admin
  - Access /dashboard → ✓ Admin Dashboard
  - Access /apply-leave → ✗ Redirect to login

### Task 20: Test Leave Application Workflow

#### Test Student Leave Application

- [ ] Login as student
- [ ] Click "Apply Leave" button
- [ ] Fill form with:
  - Leave Type: Regular
  - Start Date: Tomorrow
  - End Date: 3 days from today
  - Reason: "Personal appointment" (min 10 chars)
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Verify leave appears in "Leave History" with "Pending" status

#### Test Leave Quota Enforcement

- [ ] Submit 3 regular leave applications in same month
- [ ] Try to submit 4th regular leave
  - Verify error: "Leave quota exceeded. Monthly regular leave limit: 3"
- [ ] Submit 1 emergency leave
- [ ] Try to submit 2nd emergency leave
  - Verify error: "Leave quota exceeded. Monthly emergency leave limit: 1"

#### Test Form Validation

- [ ] Try to submit with empty start date
  - Verify error: "Start date is required"
- [ ] Try to submit with end date before start date
  - Verify error: "End date must be after start date"
- [ ] Try to submit with reason < 10 characters
  - Verify error: "Reason must be at least 10 characters"
- [ ] Try to submit with past date
  - Verify error: "Start date cannot be in the past"

#### Test Teacher Approval Workflow

- [ ] Login as student → Apply for leave
- [ ] Login as teacher → Go to Dashboard
- [ ] Verify pending request appears
- [ ] Click "Approve" button
  - Verify confirmation dialog appears
  - Click OK to confirm
  - Verify status changes to "Approved" (🟢)
- [ ] Login as student → Check status updated

#### Test Teacher Rejection Workflow

- [ ] Login as student → Apply for leave
- [ ] Login as teacher → Go to Dashboard
- [ ] Click "Reject" button
  - Verify confirmation dialog appears
  - Click OK to confirm
  - Verify status changes to "Rejected" (🔴)

#### Test Admin Dashboard

- [ ] Login as admin
- [ ] Verify summary cards display:
  - Total Leaves count
  - Approved count
  - Approval Rate %
  - Emergency Leaves count
- [ ] Test search functionality
  - Search by student name
  - Verify filtered results
- [ ] Test status filter
  - Filter by "Approved"
  - Filter by "Pending"
  - Filter by "Rejected"
- [ ] Test pagination
  - Create 15+ leaves
  - Verify pagination appears
  - Test Previous/Next buttons

### Task 21: Test Mobile Responsiveness

#### Mobile (<768px)

- [ ] Login page layout
  - [ ] Form centered and readable
  - [ ] Text is large enough (minimum 16px)
  - [ ] Buttons have touch-friendly size (44x44px minimum)
- [ ] Sidebar appears as hamburger menu
  - [ ] Click hamburger to toggle
  - [ ] Menu opens from left side
  - [ ] Click overlay closes menu
- [ ] Dashboard layout
  - [ ] Tables convert to stacked list view
  - [ ] Filters stack vertically
  - [ ] All content readable without horizontal scroll
- [ ] Forms responsive
  - [ ] Inputs full width
  - [ ] Labels stack above inputs
  - [ ] Button text doesn't wrap

#### Tablet (768px-1199px)

- [ ] Dashboard layout adjusts
  - [ ] Two-column layouts work
  - [ ] Tables remain readable
  - [ ] Sidebar visible on larger tablets
- [ ] Touch interactions work
  - [ ] Dropdown menus accessible via touch
  - [ ] Buttons clickable with fat finger
  - [ ] No hover-only states

#### Desktop (1200px+)

- [ ] Full layout works
- [ ] Sidebar always visible
- [ ] Tables display with all columns
- [ ] Multi-column grids display properly

## API Testing (with cURL or Postman)

### Test Authentication Endpoints

#### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "student"
  }'
```

#### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123"
  }'
```

#### Get Current User (requires token)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/auth/me
```

### Test Leave Endpoints

#### Apply Leave

```bash
curl -X POST http://localhost:5000/api/leaves/apply \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "leaveType": "regular",
    "startDate": "2026-02-01",
    "endDate": "2026-02-03",
    "reason": "Medical appointment needed"
  }'
```

#### Get My Leaves

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/leaves/my-leaves
```

## Browser DevTools Testing

### Accessibility Testing

- [ ] Run Lighthouse audit
  - Target accessibility score > 90
- [ ] Check color contrast using browser tools
  - Ensure WCAG AA compliance (4.5:1 for text)
- [ ] Test keyboard navigation
  - Tab through all interactive elements
  - Shift+Tab to go backwards
  - Enter to activate buttons
  - Space on checkboxes
- [ ] Disable CSS and verify content readability
- [ ] Test screen reader (NVDA/JAWS)
  - Headings announced correctly
  - Form labels associated with inputs
  - Status messages announced

### Performance Testing

- [ ] Lighthouse performance score > 80
- [ ] Network tab
  - Monitor bundle size
  - Check API response times < 1s
- [ ] Console
  - No JavaScript errors
  - No console warnings

## Test Data for Development

### Demo Student Account

- Email: student@college.com
- Password: studentpass123
- College ID: STU001
- Class: CS-A

### Demo Teacher Account

- Email: teacher@college.com
- Password: teacherpass123
- College ID: TCH001
- Assigned Class: CS-A

### Demo Admin Account

- Email: admin@college.com
- Password: adminpass123
- College ID: ADM001
- Department: Administration

## Known Issues & Workarounds

### Issue: MongoDB connection fails

**Workaround**: Ensure MongoDB is running locally or update .env with cloud MongoDB URI

### Issue: CORS errors

**Workaround**: Verify CORS is enabled in backend server.js

### Issue: Token expiration

**Workaround**: Users need to login again after 24 hours

## Test Results Template

```
Test Date: ___________
Tester: ___________
Browser: Chrome/Firefox/Safari/Edge
OS: Windows/Mac/Linux

PASSED: _____ tests
FAILED: _____ tests
SKIPPED: _____ tests

Critical Issues:
-

Minor Issues:
-

Notes:
```
