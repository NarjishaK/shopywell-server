var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user.ts");

//user registration
router.post("/", UserController.createUser);

module.exports = router;
