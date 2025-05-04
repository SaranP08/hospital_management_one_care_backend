const express = require("express");
const register = require("./controllers/register");
const doctorLogin = require("./controllers/login");
const slotDetails = require("./controllers/slotDetails");
const patientUpdate = require("./controllers/patientUpdate");
const isAuthenticated = require("../../middleware/auth");
const getDoctorDetails = require("./controllers/getDoctorDetails");
const getSpecializations = require("./controllers/getSpecializations");
const getSpecificDetail = require("./controllers/getSpecificDoctorDetail");
const doctorRoute = express.Router();

doctorRoute.post("/register", register);
doctorRoute.post("/login", doctorLogin);
// doctorRoute.use(isAuthenticated);

doctorRoute.get("/specializations", getSpecializations);
doctorRoute.get("/:specializedIn", getDoctorDetails);
doctorRoute.get("/slotDetails/:id", slotDetails);
doctorRoute.get("/info/:id", getSpecificDetail);
doctorRoute.post("/patientUpdate/:id", patientUpdate);
module.exports = doctorRoute;
