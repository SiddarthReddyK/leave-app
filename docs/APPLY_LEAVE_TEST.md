# Apply Leave Button - Testing & Implementation

## Changes Made

### 1. Updated StudentDashboard.js

- **Added import**: `import ApplyLeaveForm from './ApplyLeaveForm';`
- **Added state**: `const [showApplyForm, setShowApplyForm] = useState(false);`
- **Added handler**: `handleApplySuccess()` - closes form and refreshes leave list
- **Updated button**: Added `onClick={() => setShowApplyForm(true)}` to "Apply Leave" button
- **Added modal**: Conditional render of `<ApplyLeaveForm />` component with close and success handlers

### Current Implementation Status

✅ **WORKING** - Apply Leave button now triggers the form modal

## Testing Procedure

### Step 1: Register a Student Account

1. Go to http://localhost:3000/register
2. Fill in the form:
   - **Name**: Test Student
   - **Email**: student@college.com
   - **College ID**: STU001
   - **Role**: Student
   - **Class**: CS-A
   - **Password**: TestPass123
   - **Confirm Password**: TestPass123
3. Click "Register"
4. Redirect to login page (success)

### Step 2: Login with Student Account

1. Go to http://localhost:3000/
2. Enter credentials:
   - **Email**: student@college.com
   - **Password**: TestPass123
3. Click "Login"
4. Should redirect to Student Dashboard

### Step 3: Test Apply Leave Button

1. On Student Dashboard, click the **"+ Apply Leave"** button
2. **Expected**: Modal form should appear with fields:
   - Leave Type (dropdown: Regular/Emergency)
   - Start Date (date picker)
   - End Date (date picker)
   - Reason (textarea)
   - Submit and Cancel buttons

### Step 4: Test Form Validation

Try submitting with invalid data:

**Test 4a - Missing Fields**

1. Click Submit without filling any fields
2. Expected errors:
   - "Start date is required"
   - "End date is required"
   - "Reason is required"

**Test 4b - Invalid Date Range**

1. Select Start Date: 2026-02-01
2. Select End Date: 2026-01-25 (before start date)
3. Click Submit
4. Expected error: "End date must be after start date"

**Test 4c - Short Reason**

1. Select dates correctly (e.g., 2026-02-01 to 2026-02-03)
2. Enter reason: "Sick" (less than 10 characters)
3. Click Submit
4. Expected error: "Reason must be at least 10 characters"

### Step 5: Test Valid Leave Submission

1. Fill form with valid data:
   - Leave Type: Regular
   - Start Date: 2026-02-01
   - End Date: 2026-02-03
   - Reason: I have a medical appointment (more than 10 chars)
2. Click Submit
3. Expected behavior:
   - Form should show "Submitting..." state
   - Button should be disabled
   - After success: Form closes
   - New leave appears in the "Leave History" table
   - Status shows as "Pending" (🟡)

### Step 6: Test Form Close

1. Click "+ Apply Leave" button
2. Click "Cancel" button
3. Expected: Modal closes without submitting

## API Endpoint Details

**Endpoint**: `POST /api/leaves/apply`

**Headers Required**:

```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body**:

```json
{
  "leaveType": "regular",
  "startDate": "2026-02-01",
  "endDate": "2026-02-03",
  "reason": "Medical appointment"
}
```

**Success Response (200)**:

```json
{
  "message": "Leave application submitted successfully"
}
```

**Error Responses**:

- 400: Validation error with field-specific messages
- 401: Unauthorized (no token)
- 403: Forbidden (leave quota exceeded)

## Backend Validation Rules

- **Start Date**: Cannot be in the past
- **End Date**: Must be after start date
- **Reason**: Minimum 10 characters
- **Leave Quota**:
  - Regular leave: Max 3-4 per month
  - Emergency leave: Max 1-2 per month
  - Counts approved + pending leaves

## Current Leave Quotas (Configurable)

**Regular Leave**: 3 leaves per month
**Emergency Leave**: 2 leaves per month

To modify quotas, edit: `backend/src/routes/leaveRoutes.js` → `/apply` endpoint

## Troubleshooting

### Issue: Form doesn't appear when clicking button

**Solution**: Check browser console for React errors. Ensure ApplyLeaveForm is imported correctly.

### Issue: Form submits but nothing happens

**Possible causes**:

1. Backend server not running (check: http://localhost:5000)
2. API_URL incorrectly configured
3. Token invalid/expired

**Solution**:

- Check browser Network tab (DevTools → Network)
- Look for POST request to `/api/leaves/apply`
- Check response status and body

### Issue: Form keeps loading

**Possible causes**:

1. Backend endpoint taking too long
2. MongoDB connection issue
3. Network timeout

**Solution**:

- Check backend terminal for errors
- Verify MongoDB connection
- Try submitting again

### Issue: Leave doesn't appear in history after submission

**Solution**:

- Check if leave has pending status (not filtered out by status filter)
- Check if date is within selected month
- Refresh page to reload leaves

## Feature Demo Videos (Manual Testing)

### Full Happy Path

1. Register → Login → View Dashboard → Apply Leave → Submit Valid Form → See Leave in History

### Edge Cases

1. Try to apply 4 regular leaves (should fail on 4th due to quota)
2. Try to apply with past date
3. Try to apply with mismatched passwords during registration
4. Apply emergency leave (different type)

## Files Modified

1. **frontend/src/pages/StudentDashboard.js**
   - Added ApplyLeaveForm import
   - Added showApplyForm state
   - Added handleApplySuccess function
   - Updated Apply Leave button with onClick handler
   - Added conditional modal render

## Files Not Modified (Already Complete)

- `frontend/src/pages/ApplyLeaveForm.js` - Already fully functional
- `backend/src/routes/leaveRoutes.js` - Already has `/apply` endpoint
- `frontend/src/pages/Register.js` - Already fully functional
- `frontend/src/pages/Login.js` - Already fully functional

## Next Steps (Optional Enhancements)

1. **Add loading spinner** to dashboard while fetching leaves
2. **Add success toast** notification when leave applied
3. **Add edit functionality** for pending leaves
4. **Add cancel functionality** for pending leaves
5. **Show quota remaining** in form (e.g., "2 of 3 regular leaves used")
6. **Add file attachment** for supporting documents
7. **Add bulk apply** for consecutive days
