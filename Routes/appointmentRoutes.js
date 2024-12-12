const express = require("express");
const {
  createAppointment,
  cancelAppointment,
  getMyAppointment,
} = require("../Controllers/appointment_controller");

const router = express.Router();

router.post("/create", createAppointment);
router.patch("/cancel/:appointmentId", cancelAppointment);
router.get("/getMy", getMyAppointment);

module.exports = router;
