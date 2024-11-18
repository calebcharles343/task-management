# Task Management System API Routes

## Authentication Routes

```
POST /api/auth/register
- Register new user
- Fields:
  * email (required)
  * password (required)
- Returns:
  * user_id
  * token
  * message

POST /api/auth/login
- Login user
- Fields:
  * email (required)
  * password (required)
- Returns:
  * token
  * user_details
```

## Project Routes

```
GET /api/projects
- Get all projects
- Query Parameters:
  * sort (name_asc, name_desc, date_asc, date_desc)
  * search (project name or description)
  * status (active, completed, archived)
- Returns:
  * projects[]
    - id
    - name
    - description
    - created_at
    - updated_at
    - task_count
    - status

POST /api/projects
- Create new project
- Fields:
  * name (required)
  * description (required)
  * status (optional, default: active)
- Returns:
  * project_id
  * name
  * description
  * created_at
  * status

GET /api/projects/{id}
- Get single project details
- Returns:
  * project_details
  * associated_tasks[]

PUT /api/projects/{id}
- Update project
- Fields:
  * name (optional)
  * description (optional)
  * status (optional)
- Returns:
  * updated_project_details

DELETE /api/projects/{id}
- Delete project
- Returns:
  * success_message
```

## Task Routes

```
GET /api/projects/{project_id}/tasks
- Get all tasks for a project
- Query Parameters:
  * status (todo, in_progress, completed)
  * priority (low, medium, high)
  * sort (due_date_asc, due_date_desc, priority_asc, priority_desc)
- Returns:
  * tasks[]
    - id
    - title
    - description
    - due_date
    - priority
    - status
    - created_at
    - updated_at

POST /api/projects/{project_id}/tasks
- Create new task
- Fields:
  * title (required)
  * description (required)
  * due_date (required)
  * priority (required: low, medium, high)
  * status (required: todo, in_progress, completed)
- Returns:
  * task_id
  * project_id
  * task_details

PUT /api/projects/{project_id}/tasks/{task_id}
- Update task
- Fields:
  * title (optional)
  * description (optional)
  * due_date (optional)
  * priority (optional)
  * status (optional)
- Returns:
  * updated_task_details

DELETE /api/projects/{project_id}/tasks/{task_id}
- Delete task
- Returns:
  * success_message
```

## Response Formats

### Success Response
```json
{
  "status": "success",
  "data": {
    // Relevant data object
  },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## Database Models

### Project Model
```
- id: PRIMARY KEY
- name: STRING (required)
- description: TEXT (required)
- status: ENUM ('active', 'completed', 'archived')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Task Model
```
- id: PRIMARY KEY
- project_id: FOREIGN KEY (references Projects)
- title: STRING (required)
- description: TEXT (required)
- due_date: DATE (required)
- priority: ENUM ('low', 'medium', 'high')
- status: ENUM ('todo', 'in_progress', 'completed')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### User Model
```
- id: PRIMARY KEY
- username: STRING (required)
- email: STRING (required, unique)
- password: STRING (required, hashed)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Storage Implementation

### Advanced Mode (Database)
- MongoDB database
- Tables:
  - users
  - projects
  - tasks