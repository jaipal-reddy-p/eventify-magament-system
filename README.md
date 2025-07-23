# eventify-magament-system
🎉 Eventify - Event Management System

A full-stack Event Management System where users can browse and book tickets for events, and organizers can create and manage their own events. Built with Spring Boot for the backend and React (Vite) for the frontend.


---

🌟 Features

👤 User Module

Register/Login with role selection (USER/ORGANIZER)

Forgot password via OTP

View upcoming events

Book tickets (Regular/VIP)

View booked tickets


🧑‍💼 Organizer Module

Organizer-specific dashboard

Create new events

Manage listed events

Secure role-based access


🔐 Authentication & Security

JWT-based authentication with HttpOnly cookie

Role-based route protection

OTP verification via email for password reset


📄 Tech Stack

Frontend: React (Vite), HTML, CSS, JavaScript

Backend: Spring Boot (Java), Spring Security, Hibernate

Database: MySQL



---

🚀 Getting Started

📁 Project Structure

<pre>

Eventify/
├── backend/ (Spring Boot)
│   ├── src/
│   │   └── main/java/com/example/demo/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── jwt/
│   │       ├── model/
│   │       ├── repository/
│   │       └── service/
│   ├── resources/
│   │   ├── application.properties
│   │   └── schema.sql
│   └── pom.xml
│
├── frontend/ (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/          ← CSS, images
│   │   ├── pages/           ← All page components
│   │   ├── AppRoutes.jsx
│   │   └── main.jsx
│   └── index.html

</pre>

Let me know if you want separate structures for backend and frontend with descriptions!

⚙️ Backend Setup (Spring Boot)

1. Import the backend in IntelliJ or VS Code.


2. Configure application.properties:



spring.datasource.url=jdbc:mysql://localhost:3306/event_management_system
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3. Run the application.



💻 Frontend Setup (React)

cd frontend
npm install
npm run dev

Make sure backend is running on port 9090, and frontend on 5173.

🧪 Sample Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/events

POST /api/tickets/book



---

🛡️ Security Notes

JWT stored in HttpOnly cookies

CORS configured with @CrossOrigin for development

Use .env or externalized properties in production



---

🎨 UI Pages

HomePage.jsx

LoginPage.jsx

RegisterPage.jsx

ForgotPasswordPage.jsx / EnterOtpPage.jsx / ResetPasswordPage.jsx

EventsListPage.jsx

BookTicketPage.jsx

UserDashboardPage.jsx

OrganizerDashboardPage.jsx

CreateEventPage.jsx

ManageEventsPage.jsx


All pages share a unified theme using style.css.


---

🧾 schema.sql (MySQL Setup)

CREATE DATABASE IF NOT EXISTS event_management_system;
USE event_management_system;

---

✅ Final Notes

Follow consistent naming conventions

Secure sensitive info using .env / environment configs

Always test routes via Postman before connecting frontend


📌 Project by Jaipal Reddy - Full Stack Developer

