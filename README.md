```markdown
# College Appointment System Backend

This repository contains the backend implementation for a **College Appointment System**, allowing students to book appointments with professors. It is built using the **MERN stack**, focusing on modular design, scalability, and ease of testing.

---

## Features

- **User Authentication**
  - Students and professors can register and log in.
  - JWT-based authentication ensures secure access.

- **Availability Management**
  - Professors can specify their availability slots for appointments.

- **Appointment Booking**
  - Students can view available slots and book appointments with professors.
  - Professors can cancel appointments.

- **Database Management**
  - Uses MongoDB to store user data, availability slots, and appointment details.

- **E2E Testing**
  - Automated end-to-end tests ensure robust functionality.

---

## Technologies Used

- **Backend Framework:** Node.js with Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Testing:** Jest with Supertest

---

## Folder Structure

```plaintext
college-appointment-system/
    ├── config/
    │   └── db.js                   # MongoDB connection setup
    │
    ├── controllers/
    │   ├── authController.js       # Authentication logic
    │   ├── availabilityController.js # Availability management logic
    │   └── appointmentController.js # Appointment handling logic
    │
    ├── middleware/
    │   └── authMiddleware.js       # JWT authentication middleware
    │
    ├── models/
    │   ├── User.js                 # User schema/model
    │   ├── Availability.js         # Availability schema/model
    │   └── Appointment.js          # Appointment schema/model
    │
    ├── routes/
    │   ├── authRoutes.js           # Authentication routes
    │   ├── availabilityRoutes.js   # Availability routes
    │   └── appointmentRoutes.js    # Appointment routes
    │
    ├── app.js                      # Express app setup
    └── server.js                   # Server entry point
    │
    ├── tests/
    │     └── collegeAppointmentSystem.test.js # E2E tests for the app (DB connections, global config)     
    │
    ├── package.json                    # Project dependencies and scripts
    ├── jest.config.js                  # Jest configuration
    └── README.md                       # Documentation
```

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/college-appointment-system.git
   cd college-appointment-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost/college_appointment_system
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

5. **Run Tests**
   ```bash
   npm test
   ```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| POST   | `/addUser`         | Register a new user        |
| POST   | `/login`           | Log in and get a JWT token |
| GET    | `/allProfessor`    | Log in and get a JWT token |

### Availability Management

| Method | Endpoint                   | Description                  |
|--------|----------------------------|------------------------------|
| POST   | `/slot/create`             | Set professor availability   |
| GET    | `/slot/:professorId`       | Get professor availability   |

### Appointment Management

| Method | Endpoint                              | Description                      |
|--------|---------------------------------------|----------------------------------|
| POST   | `/appointments/create`                | Book an appointment              |
| DELETE | `/appointments/cancel/:appointmentId` | Cancel an appointment            |
| GET    | `/appointments/getMy`                 | Get a student's appointments     |

---

## Testing

Automated tests ensure the reliability of critical workflows.

- **Run All Tests**
  ```bash
  npm test
  ```

- **End-to-End Tests**
  Located in `tests/collegeAppointmentSystem.test.js`, these tests simulate real-world user interactions.

---

## Contribution

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your branch.
4. Submit a pull request.

---

## Contact

For questions or support, please reach out to [ayushrawat9259@gmail.com](mailto:your-email@example.com).
```

