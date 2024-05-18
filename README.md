# Auth API Created by GABRIEL ANTUNES ROCHA

## How to run it?

1. **Prerequisites**:
   - Ensure you have **Node.js** installed.

2. **Clone the Repository**:

3. **Navigate to the Project Directory**:

4. **Create a .ENV file**:
- Create a file named **.env** in the project root.
- Add the following content to the **.env** file:
  ```
  DATABASE=yourDatabaseConnectionString
  TOKEN_SECRET=theTokenYouWantToUse
  ```

5. **Install Dependencies and Run the Server**:
    ```
    npm install && node Server.js
    ```

### Authentication API Features:

1. **MongoDB Connection Setup**:
   - The application connects to a MongoDB database using Mongoose.

2. **Express Setup**:
   - Express is used to create the server and handle HTTP requests.

3. **Environment Variables**:
   - The application uses environment variables stored in a `.env` file for sensitive information like the database connection string and token secret.

4. **Middleware**:
   - Express middleware is used to parse JSON requests.

5. **Route Setup**:
   - Two routes are defined: one for authentication (`AuthRoute`) and another for test purposes (`AuthTestRoute`).

6. **Token Verification Middleware**:
   - A middleware function (`VerifyToken`) is used to verify JWT tokens sent in the header of protected routes.

7. **JWT Token Generation and Verification**:
   - JWT tokens are generated upon successful login and sent in the response header.
   - Tokens are verified using the provided secret key.

8. **Validation**:
   - User input for registration and login is validated using Joi.

9. **User Registration**:
   - Users can register by providing a name, email, and password.
   - Passwords are hashed using bcrypt before saving to the database.

10. **User Login**:
    - Users can log in with their email and password.
    - Passwords are compared using bcrypt to authenticate users.

11. **User Schema**:
    - The application defines a Mongoose schema for users, including fields for name, email, password, and registration date.
