Design Document for EduLeave – Leave Management Web App

1. Project Overview

EduLeave is a web-based application that allows engineering college students to apply for leaves online and teachers to authorize or reject them. It also provides dashboards for administrators such as HOD and Principal.

The interface inspiration is taken from a modern leave application UI design concept found on Dribbble, emphasizing clarity, usability, and consistent visual design.

2. Design Goals
   Goal Description
   Clarity Users must clearly understand features without confusion
   Efficiency Apply and process leaves with minimal clicks
   Responsiveness Works on both desktop and mobile screens
   Consistency Unified style across screens
   Accessibility Easy to use for all users
3. Visual Style Guide
   3.1 Color Palette

Based on the Dribbble design:

Primary Background: #F4F6F8

Primary Text: #121ACB

Secondary Text: #95A1B5

Accent Colors: #BAC6D3, #5A6C80

Highlight Color: #DAC5B7

This palette gives a clean, professional, and calming UI, suitable for academic platforms.

3.2 Typography

Primary Font: Sans Serif (e.g., Montserrat / Inter)

Text Hierarchy:

Header: 24–32px

Subheader: 18–22px

Body Text: 14–16px

Small Text/Labels: 12–14px

3.3 Icons & Visual Elements

Use flat icons for clarity

Status indicators:

🟡 Pending

🟢 Approved

🔴 Rejected

4. Screen Designs & Flow
   4.1 Landing / Login Screen

Purpose: Allow users to log in based on role (Student / Teacher / Admin).

Features:

Email / College ID input

Password input

Buttons for role selection

“Forgot Password” link

4.2 Student Dashboard

Core UI Elements:

“Apply Leave” button

Table of previous leaves (date, type, status, reason)

Filters (month, status)

Apply Leave Form:

Date picker (From – To)

Leave Type (Regular / Emergency)

Reason (Text area)

Submit button

4.3 Teacher Dashboard

Core UI Components:

List of pending leave requests

Each list item displays:

Student name + class

Leave dates

Reason preview

Action Buttons: Approve / Reject

Comment section

Dropdown to select class

4.4 Admin / HOD Dashboard

Dashboard Overview Includes:

Select department dropdown

Class filter

Summary cards:

Total leaves this month

Approved rate

Emergency leaves used

Table with leave list across classes

Visual Design Patterns:

Search bar

Status filters

Pagination

5. UI Components Description
   Component Description
   Navbar Brand logo, user profile, logout
   Sidebar Navigation links (Dashboard, Apply Leaves, Reports)
   Cards Summary statistics
   Tables List of leaves with sortable columns
   Form Inputs Date pickers, text fields
   Buttons Primary, Secondary, Disabled states
   Status Labels Color-coded leave statuses
6. Responsive Design Specifications

Breakpoints:

1200px: Desktop

768px–1199px: Tablet

<768px: Mobile

Mobile adjustments:

Collapse sidebar to hamburger menu

Tables convert to list view

Buttons and touch targets enlarged

7. UX Considerations
   7.1 Error Handling

Show inline validation errors

“Leave quota exceeded” warning

Required field warnings

7.2 Confirmation Dialog

Before submitting leave

Before approving/rejecting

7.3 Accessibility

Focus labels

Keyboard navigable

High contrast mode optional

8. Interaction Flow Overview

User logs in → sees relevant dashboard

Student clicks “Apply Leave”

Student fills form → submits → status becomes “Pending”

Teacher sees new request → reviews → approves/rejects

Status updated and reflected in student dashboard

9. UI Deliverables
   Deliverable Description
   Wireframes Low-fidelity UI sketches
   Mockups High-fidelity Figma/Adobe XD screens
   Style Guide Colors, typography, components
   Interaction Prototype Clickable prototype (Figma)
