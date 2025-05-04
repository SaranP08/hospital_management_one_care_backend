const addToCart = require("./controllers/addCart");
const deleteCart = require("./controllers/deleteCart");
const deleteProduct = require("./controllers/deleteProductFromCart");
const getCart = require("./controllers/getCart");
const updateQty = require("./controllers/updateCartQty");

const cartRoute = require("express").Router();

cartRoute.post("/add", addToCart);
cartRoute.get("/:id", getCart);
cartRoute.patch("/:id", updateQty);

cartRoute.delete("/:id/:medicineId", deleteProduct);
module.exports = cartRoute;
