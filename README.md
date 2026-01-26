# EduLeave - Leave Management System

## Project Structure

```
leave-app/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── LeaveRequest.js
│   │   │   └── Teacher.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── leaveRoutes.js
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── validators.js
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── TeacherDashboard.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── ApplyLeaveForm.js
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   ├── Button.js
│   │   │   ├── StatusBadge.js
│   │   │   └── Card.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
├── design doc.md
├── prd.md
├── tech stack.md
└── todo-list.md
```

## Features Implemented

### Authentication & Authorization

- JWT-based stateless authentication
- Role-based access control (Student, Teacher, Admin)
- Secure password hashing with bcrypt
- Protected routes in frontend

### Student Features

- Apply for regular and emergency leaves
- View leave history with filters (month, status)
- Leave quota enforcement (3-4 regular, 1-2 emergency per month)
- Real-time status tracking (Pending, Approved, Rejected)

### Teacher Features

- View pending leave requests for assigned classes
- Approve or reject leave requests
- Add comments/remarks
- Prevent editing of already processed requests

### Admin Features

- Dashboard with summary cards
- View all leave requests across departments
- Search and filter functionality
- Pagination support
- Statistics (total leaves, approval rate, emergency leaves)

## Business Logic

### Leave Quotas

- **Regular Leave**: 3-4 per month per student
- **Emergency Leave**: 1-2 per month per student
- Exceeded quota triggers error: "Leave quota exceeded"

### Validation Rules

- Reason required with minimum 10 characters
- Start date cannot be in the past
- End date must be after start date
- Leave can only be submitted once

### Leave Status Workflow

1. **Pending**: Student submits application
2. **Approved**: Teacher reviews and approves
3. **Rejected**: Teacher reviews and rejects

Leave requests cannot be edited after submission.

## Design System

### Color Palette

- Primary Background: #F4F6F8
- Primary Text: #121ACB
- Secondary Text: #95A1B5
- Accent Color: #BAC6D3
- Highlight Color: #DAC5B7

### Typography

- Font Family: Montserrat, Inter
- H1: 24-32px
- H2: 18-22px
- Body: 14-16px
- Small: 12-14px

### Responsive Breakpoints

- Mobile: <768px (sidebar collapses to hamburger)
- Tablet: 768px-1199px (adjusted layouts)
- Desktop: 1200px+ (full layout)

## Status Indicators

- 🟡 Pending
- 🟢 Approved
- 🔴 Rejected

## Installation & Setup

### Backend

```bash
cd backend
npm install
# Configure .env with MongoDB URI and JWT_SECRET
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Leaves

- `POST /api/leaves/apply` - Submit leave application
- `GET /api/leaves/my-leaves` - Student's leaves
- `GET /api/leaves/pending` - Teacher's pending requests
- `PUT /api/leaves/:leaveId/approve` - Approve/reject leave
- `GET /api/leaves/all` - Admin's all leaves
- `GET /api/leaves/stats` - Leave statistics

## Accessibility Features

- Keyboard navigation support
- Focus labels on form inputs
- Semantic HTML structure
- High contrast design
- Mobile-responsive touch targets

## Testing Recommendations

1. **Authentication**: Test login flows for all roles
2. **Leave Application**: Verify quota enforcement
3. **Leave Approval**: Test approve/reject workflow
4. **Error Handling**: Test validation messages
5. **Responsive**: Test on mobile, tablet, desktop

## Future Enhancements

- Email/SMS notifications
- Integration with attendance systems
- Mobile app support
- Advanced analytics and reports
- High contrast mode toggle
