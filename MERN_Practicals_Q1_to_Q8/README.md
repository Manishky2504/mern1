# MERN Stack Web Development — Practicals 1 to 8

This project is organized according to the eight practical questions in the supplied journal. Each `Q...` folder contains only the files needed for that practical, with filenames and folder structure matching the code.

## Practical folders
1. `Q1_MERN_Environment` — React/Vite starter and Express server setup.
2. `Q2_REST_API_Fetch_Display` — simple REST API and React/Axios display.
3. `Q3_CRUD_Create_Read` — MongoDB/Mongoose create and read students.
4. `Q4_CRUD_Update_Delete` — full CRUD using the same student collection.
5. `Q5_User_Registration_Login` — registration/login using MongoDB.
6. `Q6_JWT_Authentication` — password hashing and JWT-protected route.
7. `Q7_Form_Validation` — React form validation and Express-side validation.
8. `Q8_Dynamic_Student_Manager` — add, display, search, update, and delete records.

## Before running
- Install Node.js and MongoDB Community Server.
- Open a terminal in the relevant practical folder.
- Run `npm install` using that folder's `package.json`, if provided.
- For practicals with a React frontend, install dependencies in the frontend folder and run `npm run dev`.
- For MongoDB practicals, ensure MongoDB is running before starting the server.
- For `.env` examples, copy `.env.example` to `.env` and use local development values.

## Important code refinements
- Added `try/catch` handling to asynchronous routes.
- Added checks for missing records and invalid input where appropriate.
- Used MongoDB `_id` rather than `id` for Mongoose records.
- In Q6, passwords are hashed and JWT tokens are issued and verified.
- The journal's Q5/Q6 examples stored or compared plain-text passwords; these have been corrected to use `bcryptjs`.
- These are educational practicals, not production-ready authentication systems.
