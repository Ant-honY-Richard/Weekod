# Weekod Workspace

This document provides an overview of the Weekod Workspace feature, which includes a login system and dashboards for both administrators and employees.

## Features

### Authentication
- Secure login system with JWT authentication
- Role-based access control (Admin and Employee roles)
- Protected routes that require authentication

### Admin Dashboard
- Task management (view, add, edit, delete)
- Call schedule management (view, add, edit, delete)
- Employee management and performance tracking
- Payout calculation based on project completion

### Employee Dashboard
- View and update assigned tasks
- View and update call schedules
- View personal profile with project details and payout information

## Login Credentials

### Admin Users
- Email: anthony@weekod.com / Password: anthony@123
- Email: surya@weekod.com / Password: surya@123

### Employee Users
- Email: margreat@weekod.com / Password: margreat@123
- Email: sanjana@weekod.com / Password: sanjana@123

## Database

The application uses MongoDB for data storage with the following models:
- User: Stores user information and credentials
- Task: Stores task details and assignments
- CallSchedule: Stores call schedule information

## Payout Structure

Employee payouts are calculated based on the number of completed projects:
- First project: 20% of project budget
- Second project: 25% of project budget
- Third to sixth project: 30% of project budget
- Seventh to ninth project: 35% of project budget
- Tenth project and above: 40% of project budget

## How to Access

The workspace is accessible at `/weekod-workspace`, which redirects to the login page. After logging in, users are directed to their respective dashboards based on their role.

## Technical Implementation

- Frontend: React with TypeScript, Tailwind CSS, and Shadcn UI components
- Backend: Express.js with MongoDB
- Authentication: JWT-based authentication
- State Management: React Query and React Context