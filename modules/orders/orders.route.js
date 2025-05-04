const isAuthenticated = require("../../middleware/auth");
const addOrders = require("./controllers/addOrders");
const getOrders = require("./controllers/getOrders");

const ordersRoute = require("express").Router();

// ordersRoute.use(isAuthenticated);
ordersRoute.post("/:id", addOrders);
ordersRoute.get("/:id", getOrders);

module.exports = ordersRoute;
