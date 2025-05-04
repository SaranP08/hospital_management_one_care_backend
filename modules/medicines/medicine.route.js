const isAuthenticated = require("../../middleware/auth");
const addMedicine = require("./controllers/addMedicine");
const getMedicineName = require("./controllers/getMedicine");
const searchMedicine = require("./controllers/searchMedicine");

const medicineRoute = require("express").Router();
// medicineRoute.use(isAuthenticated);
medicineRoute.post("/", addMedicine);
medicineRoute.get("/search", searchMedicine);
medicineRoute.get("/:id", getMedicineName);

medicineRoute.get("/search/:letter", searchMedicine);

module.exports = medicineRoute;
