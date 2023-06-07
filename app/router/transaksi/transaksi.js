const transaksiController = require("../../controller").transaksi;
const verifyJwtTokenController = require("../../controller").verifyJwtToken;

const express = require("express");
const router = express.Router();

router.get("/api/transaksi", transaksiController.list);
router.get(
  "/api/transaksipengguna",
  [verifyJwtTokenController.verifyToken],
  transaksiController.listTransaksiPengguna
);
router.get(
  "/api/transaksi/:id",
  [verifyJwtTokenController.verifyToken],
  transaksiController.getById
);

router.post(
  "/api/transaksi",
  [verifyJwtTokenController.verifyToken],
  transaksiController.add
);

router.put(
  "/api/transaksi/:id",
  [verifyJwtTokenController.verifyToken],
  transaksiController.update
);

router.delete(
  "/api/transaksi/:id",
  [verifyJwtTokenController.verifyToken],
  transaksiController.delete
);

module.exports = router;
