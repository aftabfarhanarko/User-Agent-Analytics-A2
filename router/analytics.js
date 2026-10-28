const express = require("express");
const route = express.Router();
const { getAllAnalytics } = require("../controllers/analyticsController");

route.get("/", getAllAnalytics);

module.exports = route;
