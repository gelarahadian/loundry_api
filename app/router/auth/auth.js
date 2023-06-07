const verifySignUpController = require("../../controller").verifySignUp;
const verifySignController = require("../../controller").verifySign;

const express = require("express");
const router = express.Router();

router.post(
  "/api/auth/signup",
  [verifySignUpController.checkDuplicateUserNameOrEmail],
  verifySignController.signup
);

router.post("/api/auth/signin", verifySignController.signin);

module.exports = router;
