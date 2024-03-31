# To-Do-App
The To-Do App API allows you to manage your to-do lists and tasks efficiently with features like creating new tasks, updating existing tasks, viewing tasks, and deleting tasks. This API supports color coding for tasks, making task management both visually appealing and organized.

# Getting Started
Before you start using the API, ensure you have Node.js and npm installed. Clone the project repository and run npm install to install all dependencies.

Start the application by running:

`npm start`

The server will start, and you can access the API at http://localhost:3000.

# API Endpoints

# Create a New Task
  - URL: /todo/api/v1/:toDoList/task
  - Method: POST
  - URL Params: toDoList=[string]
  - Body Params:
    - task: The task description.
    - color: The color name (supports "red", "green", "blue").

# Update an Existing Task

  - URL: /todo/api/v1/list/:toDoList/task/:taskID
  - Method: PATCH
  - URL Params:
    - toDoList=[string]
    - taskID=[string]
  - Body Params: Any of task, color.

# Update Task Properties

  - URL: /todo/api/v1/list/:toDoList/task/:taskID/properties
  - Method: PATCH
  - URL Params:
    - toDoList=[string]
      - taskID=[string]
  - Body Params: Specific properties to update.
    
# Delete a Task

  - URL: /todo/api/v1/list/:toDoList/task/:taskID
  - Method: DELETE
  - URL Params:
    - toDoList=[string]
    - taskID=[string]

# View a Task

  - URL: /todo/api/v1/list/:toDoList/task/:taskID
  - Method: GET
  - URL Params:
    - toDoList=[string]
    - taskID=[string]

# View All Tasks in a List

  - URL: /todo/api/v1/list/:toDoList
  - Method: GET
  - URL Params: toDoList=[string]

# Middleware

This API uses a colorChecker middleware that automatically converts color names ("red", "green", "blue") to their corresponding hex codes when creating or updating tasks.

# Error Handling
The API uses custom error handling middleware that catches and responds with appropriate error messages and status codes.