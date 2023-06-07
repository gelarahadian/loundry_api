const db = require("../models");
const Op = db.Sequelize.Op;

const Transaksi = require("../models").Transaksi;
const Paket = require("../models").Paket;

module.exports = {
  getById(req, res) {
    return Transaksi.findByPk(req.params.id, {
      include: [],
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: "Not Found",
            errors: "Status Not Found",
          });
        }
        const status = {
          status_response: "OK",
          status: doc,
          errors: null,
        };
        return res.status(200).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  list(req, res) {
    return Transaksi.findAll({
      limit: 10,
      include: [],
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const transaksi = {
          status_response: "OK",
          count: docs.length,
          statuses: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(transaksi);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  listTransaksiPengguna(req, res) {
    return Transaksi.findAll({
      limit: 10,
      include: [],
      where: {
        pengguna_id: req.penggunaId,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const statuses = {
          status_response: "OK",
          count: docs.length,
          statuses: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(statuses);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  add(req, res) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let dd2day = today.getDate() + 2;
    console.log(typeof dd, dd + 2);

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (dd2day < 10) dd2day = "0" + dd2day;
    return Transaksi.create({
      tgl_masuk: yyyy + "-" + mm + "-" + dd,
      tgl_keluar: yyyy + "-" + mm + "-" + dd2day,
      pengguna_id: req.penggunaId,
    })
      .then((transaksi) => {
        Paket.findAll({
          where: {
            berat_kg: {
              [Op.or]: req.body.pakets,
            },
          },
        }).then((pakets) => {
          transaksi.setPakets(pakets).then(() => {
            res.status(201).send({
              transaksi_response: "Created",
              transaksi,
              errors: null,
            });
          });
        });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  update(req, res) {
    return Transaksi.findByPk(req.params.id, {})
      .then((transaksi) => {
        if (!transaksi) {
          return res.status(404).send({
            status_response: "Bad Request",
            errors: "Transaksi Not Found",
          });
        }

        if (parseInt(transaksi.pengguna_id) !== parseInt(req.penggunaId)) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different Pengguna Id",
          });
        }

        console.log(req.body.tgl_keluar);

        return transaksi
          .update({
            tgl_keluar: req.body.tgl_keluar || transaksi.tgl_keluar,
          })
          .then((doc) => {
            const status = {
              status_response: "OK",
              status: doc,
              errors: null,
            };
            return res.status(200).send(status);
          })
          .catch((error) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  delete(req, res) {
    return Transaksi.findByPk(req.params.id)
      .then((transaksi) => {
        if (!transaksi) {
          return res.status(400).send({
            transaksi_response: "Bad Request",
            errors: "Transaksi Not Found",
          });
        }

        if (parseInt(transaksi.pengguna_id) !== parseInt(req.penggunaId)) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different Pengguna Id",
          });
        }

        return transaksi
          .destroy()
          .then(() =>
            res.status(204).send({
              status_response: "No Content",
              errors: null,
            })
          )
          .catch((error) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },
};
