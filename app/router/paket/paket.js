const verifyJwtTokenController = require("../../controller").verifyJwtToken;
const paketController = require("../../controller").paket;
const verifySignUpController = require("../../controller").verifySignUp;

const express = require("express");
const router = express.Router();

router.get("/api/paket", paketController.list);
router.get(
  "/api/paket/:id",
  [verifyJwtTokenController.verifyToken, verifySignUpController.isAdmin],
  paketController.getById
);

router.post(
  "/api/paket",
  [verifyJwtTokenController.verifyToken, verifySignUpController.isAdmin],
  paketController.add
);

router.put(
  "/api/paket/:id",
  [verifyJwtTokenController.verifyToken, verifySignUpController.isAdmin],
  paketController.update
);

router.delete(
  "/api/paket/:id",
  [verifyJwtTokenController.verifyToken, verifySignUpController.isAdmin],
  paketController.delete
);

module.exports = router;
