# Task Manager Project

## Steps to Set Up the Database

1. **Install PostgreSQL**: Make sure you have PostgreSQL installed on your machine.
2. **Create PostgreSQL Database**: Create a database named `task_management`.
3. **Set Up Database**:
    ```
    DB_USER=postgres
    DB_HOST=localhost
    DB_DATABASE=task_management
    DB_PASSWORD=postgres
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    ```
4. **Create Relations**:
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL
    );

    CREATE TABLE tasks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      userid UUID REFERENCES users(id),
      title VARCHAR(100) NOT NULL,
      description TEXT,
      iscomplete BOOLEAN NOT NULL DEFAULT FALSE
    );

## How to Run the Backend

1. **Navigate to the Backend Directory**:
    ```sh
    cd task-manager/backend
    ```
2. **Install Dependencies**:
    ```sh
    npm install
    ```
3. **Start the Backend Server**:
    ```sh
    npm start
    ```
    The backend server will be running at `http://localhost:3000`.

## How to Run the Frontend

1. **Navigate to the Frontend Directory**:
    ```sh
    cd task-manager/frontend
    ```
2. **Install Dependencies**:
    ```sh
    npm install
    ```
3. **Start the Frontend Server**:
    ```sh
    npm start
    ```
    The frontend server will be running at `http://localhost:3010`.

## Testing

- **Backend Testing**: backend endpoints can be interacted with directly through Swagger UI running at 
`http://localhost:3000/api/v0/docs`

## Salary Expectations

- **Salary Expectations per Month**: $1500-$2000