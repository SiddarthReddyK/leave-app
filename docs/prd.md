Product Requirements Document (PRD)
EduLeave – Engineering College Leave Management System

1. Executive Summary
   EduLeave is a web-based Leave Management System designed for engineering colleges. It digitizes the entire leave application and approval workflow, allowing students to apply for leaves online, class teachers to approve or reject requests, and higher authorities such as HODs and Principals to monitor leave activities across departments and classes through a centralized dashboard.
2. Problem Statement
   Most engineering colleges rely on manual or semi-digital processes such as paper forms, emails, or messaging platforms for leave management. These methods lead to data loss, lack of transparency, policy violations, and administrative overhead.
   EduLeave aims to eliminate these inefficiencies by introducing a secure, centralized, and policy-driven system.
3. Goals and Objectives
   • Digitize leave application and approval processes
   • Enforce institutional leave policies automatically
   • Provide real-time visibility to faculty and management
   • Reduce administrative workload
   • Improve record accuracy and accessibility
4. User Roles and Permissions
   Student:

- Apply for regular and emergency leaves
- View leave status and history
- View remaining leave balance
  Class Teacher:
- View leave requests from assigned classes
- Approve or reject leave applications
- Add remarks/comments
  HOD / Principal / Admin:
- View leave data across classes and departments
- Access analytics dashboards
- Read-only access (no approvals)

5. Functional Requirements
   Authentication & Authorization:

- Role-based login (Student, Teacher, Admin)
- Secure authentication and session management
  Student Module:
- Leave application form (date range, reason, leave type)
- Monthly leave limits (3–4 regular, 1–2 emergency)
- Status tracking (Pending, Approved, Rejected)
  Teacher Module:
- Dashboard for pending requests
- Approve/Reject functionality
- Student leave history view
  Admin Dashboard:
- Department and class-wise views
- Filters by date, class, and student
- Statistical summaries

6. Business Rules
   • Regular leaves limited to 3–4 per month
   • Emergency leaves limited to 1–2 per month
   • Reason is mandatory for all leave requests
   • Only assigned class teachers can approve leaves
   • Leave requests cannot be edited after submission
7. Data Entities
   Student:

- Student ID, Name, Department, Class, Leave Balance
  Teacher:
- Teacher ID, Name, Assigned Classes
  Leave Request:
- Leave ID, Student ID, Leave Type, Date Range, Reason, Status, Remarks, Timestamp

8. Non-Functional Requirements
   Performance:

- Support concurrent users
- Fast dashboard loading
  Security:
- Role-based access control
- Secure password storage
- Input validation
  Usability:
- Clean and intuitive UI
- Mobile-responsive design

9. Assumptions and Constraints
   • All users have valid college credentials
   • Internet connectivity is available
   • System is deployed within college infrastructure or cloud
10. Future Enhancements
    • Mobile application support
    • Email/SMS notifications
    • Integration with attendance systems
    • Analytics with predictive insights
