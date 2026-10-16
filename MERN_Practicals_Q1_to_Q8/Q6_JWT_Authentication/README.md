# Practical 6 — JWT authentication and authorization
1. Run `npm install`.
2. Copy `.env.example` to `.env` and set a private `JWT_SECRET`.
3. Start MongoDB and run `npm start`.

Postman:
- Register: `POST http://localhost:3000/auth/register` with `{"username":"student1","password":"pass123"}`
- Login: `POST http://localhost:3000/auth/login` with the same JSON; copy the returned token.
- Protected endpoint: `GET http://localhost:3000/protected` with header `Authorization: Bearer YOUR_TOKEN`.

The journal's example did not actually issue/verify a JWT and had inconsistent model/route paths. These are corrected here.
