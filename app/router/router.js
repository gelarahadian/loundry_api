const auth = require("./auth/auth.js");
const transaksi = require("./transaksi/transaksi.js");
const paket = require("./paket/paket.js");

module.exports = (app) => {
  // auth
  app.use(auth);
  // transaksi
  app.use(transaksi);
  //paket
  app.use(paket);
};
