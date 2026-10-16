# Practical 5 — User registration and login using MongoDB
1. Run `npm install`.
2. Copy `.env.example` to `.env`.
3. Start MongoDB.
4. Run `npm start`.

Test with Postman:
- `POST http://localhost:5000/register` JSON: `{"username":"student1","password":"pass123"}`
- `POST http://localhost:5000/login` JSON: `{"username":"student1","password":"pass123"}`

Refinement: passwords are hashed with `bcryptjs`; the original journal's plain-text password storage/comparison is unsafe.
