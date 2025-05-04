const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();
const bodyParser = require("body-parser");

const errorHandler = require("./handlers/errorHandlers");
const cors = require("cors");

const doctorRoute = require("./modules/doctor/doctor.route");
const patientRoute = require("./modules/patients/patient.route");
const medicineRoute = require("./modules/medicines/medicine.route");
const ordersRoute = require("./modules/orders/orders.route");
const cartRoute = require("./modules/carts/carts.route");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/doctor", doctorRoute);
app.use("/patient", patientRoute);

app.use("/medicines", medicineRoute);
app.use("/orders", ordersRoute);
app.use("/cart", cartRoute);
// app.use("/doctor-appointment", user);
// app.use("/doctor-appointment", doctorUser);
// app.use("/doctor-appointment", medicines);
// app.use("/doctor-appointment", orders);

const uri = "mongodb+srv://71762233041:VlbrB2H0l0PU1kJl@hospital.sxxh4.mongodb.net/?retryWrites=true&w=majority&appName=Hospital"

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

const PORT = 5000;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("Listening");
});
