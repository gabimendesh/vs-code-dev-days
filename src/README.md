# Mergington High School Activities API

A super simple FastAPI application that allows students to view and sign up for extracurricular activities with admin authentication.

## Features

- View all available extracurricular activities
- Admin/Professor authentication system
- Sign up students for activities (admin/professor only)
- Unregister students from activities (admin/professor only)

## Authentication

The system includes basic HTTP authentication for admin and professor users:

- **Username**: `admin`, **Password**: `adminpass`
- **Username**: `professor1`, **Password**: `senha123`

Only authenticated users can register or unregister students for activities.

## Getting Started

1. Install the dependencies:

   ```
   pip install fastapi uvicorn
   ```

2. Run the application:

   ```
   python app.py
   ```

3. Open your browser and go to:
   - Main interface: http://localhost:8000/
   - API documentation: http://localhost:8000/docs
   - Alternative documentation: http://localhost:8000/redoc

## API Endpoints

| Method | Endpoint                                                          | Description                                                         | Auth Required |
| ------ | ----------------------------------------------------------------- | ------------------------------------------------------------------- | ------------- |
| GET    | `/activities`                                                     | Get all activities with their details and current participant count | No            |
| POST   | `/login`                                                          | Authenticate admin/professor user                                   | Yes           |
| POST   | `/activities/{activity_name}/signup?email=student@mergington.edu` | Sign up a student for an activity                                  | Yes           |
| DELETE | `/activities/{activity_name}/unregister?email=student@mergington.edu` | Unregister a student from an activity                            | Yes           |

## Data Model

The application uses a simple data model with meaningful identifiers:

1. **Activities** - Uses activity name as identifier:

   - Description
   - Schedule
   - Maximum number of participants allowed
   - List of student emails who are signed up

2. **Students** - Uses email as identifier:
   - Name
   - Grade level

All data is stored in memory, which means data will be reset when the server restarts.
