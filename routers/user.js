const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();
api.post("/user/singUp", UserController.singUp);

module.exports = api;