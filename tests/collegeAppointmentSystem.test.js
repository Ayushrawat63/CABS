const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const connectDB = require("../Config/database");
const User = require("../Models/user");
const Availability = require("../Models/availability");
const Appointment = require("../Models/appointment");

beforeAll(async () => {
  await connectDB();

  await User.deleteMany({});
  await Appointment.deleteMany({});
  await Availability.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Complete appointment booking and cancellation flow", () => {
  let studentA1Token, studentA2Token, professorP1Token;
  let professorP1Id, availabilityId;
  let appointmentA1Id;

  test("Register a professor", async () => {
    const res = await request(app).post("/addUser").send({
      name: "Professor one",
      email: "professor1@college.edu",
      password: "password123",
      role: "professor",
    });
    professorP1Id = res.body._id;

    expect(res.statusCode).toBe(201);
  });

  test("Register a student1", async () => {
    const res = await request(app).post("/addUser").send({
      name: "Student A1",
      email: "student1@college.edu",
      password: "password123",
      role: "student",
    });
    expect(res.statusCode).toBe(201);
  });

  test("Register a student2", async () => {
    const res = await request(app).post("/addUser").send({
      name: "Student A2",
      email: "student2@college.edu",
      password: "password123",
      role: "student",
    });
    expect(res.statusCode).toBe(201);
  });

  test("Student A1 authenticates", async () => {
    const studentA1Login = await request(app).post("/login").send({
      email: "student1@college.edu",
      password: "password123",
    });
    expect(studentA1Login.status).toBe(200);
    studentA1Token = studentA1Login.body.token;
  });

  test("Professor P1 authenticates", async () => {
    const professorP1Login = await request(app).post("/login").send({
      email: "professor1@college.edu",
      password: "password123",
    });
    expect(professorP1Login.status).toBe(200);
    professorP1Token = professorP1Login.body.token;
  });

  test("Professor P1 creates availability", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowEnd = new Date(tomorrow);
    tomorrowEnd.setHours(tomorrow.getHours() + 1);

    const availability = await request(app)
      .post("/slot/create")
      .set("Authorization", `Bearer ${professorP1Token}`)
      .send({
        startTime: tomorrow,
        endTime: tomorrowEnd,
      });
    expect(availability.status).toBe(201);
    availabilityId = availability.body._id;
  });

  test("Student A1 views available slots", async () => {
    const availableSlots = await request(app)
      .get(`/slot/${professorP1Id}`)
      .set("Authorization", `Bearer ${studentA1Token}`);
    expect(availableSlots.status).toBe(200);
    expect(availableSlots.body.length).toBe(1);
  });

  test("Student A1 books an appointment", async () => {
    const bookingA1 = await request(app)
      .post("/appointment/create")
      .set("Authorization", `Bearer ${studentA1Token}`)
      .send({
        availabilityId: availabilityId,
      });
    expect(bookingA1.status).toBe(201);
    appointmentA1Id = bookingA1.body._id;
  });

  test("Student A2 authenticates", async () => {
    const studentA2Login = await request(app).post("/login").send({
      email: "student2@college.edu",
      password: "password123",
    });
    expect(studentA2Login.status).toBe(200);
    studentA2Token = studentA2Login.body.token;
  });

  test("Student A2 tries to book the same slot (should fail)", async () => {
    const bookingA2 = await request(app)
      .post("/appointment/create")
      .set("Authorization", `Bearer ${studentA2Token}`)
      .send({
        availabilityId: availabilityId,
      });
    expect(bookingA2.status).toBe(400);
  });

  test("Professor P1 cancels appointment with Student A1", async () => {
    const cancelAppointment = await request(app)
      .patch(`/appointment/cancel/${appointmentA1Id}`)
      .set("Authorization", `Bearer ${professorP1Token}`);
    expect(cancelAppointment.status).toBe(200);
  });

  test("Student A1 checks appointments", async () => {
    const studentA1Appointments = await request(app)
      .get("/appointment/getMy")
      .set("Authorization", `Bearer ${studentA1Token}`);
    expect(studentA1Appointments.status).toBe(200);
    expect(studentA1Appointments.body.length).toBe(undefined);
  });
});

