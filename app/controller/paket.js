const Paket = require("../models").Paket;

module.exports = {
  getById(req, res) {
    return Paket.findByPk(req.params.id, {
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
    return Paket.findAll({
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
    return Paket.findAll({
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
    return Paket.create({
      berat_kg: req.body.berat_kg,
      harga: req.body.harga,
    })
      .then((doc) => {
        const status = {
          status_response: "Created",
          status: doc,
          errors: null,
        };
        return res.status(201).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  update(req, res) {
    return Paket.findByPk(req.params.id, {})
      .then((paket) => {
        if (!paket) {
          return res.status(404).send({
            status_response: "Bad Request",
            errors: "Paket Not Found",
          });
        }

        return paket
          .update({
            berat_kg: req.body.berat_kg || paket.berat_kg,
            harga: req.body.harga || paket.harga,
          })
          .then((doc) => {
            const paket = {
              status_response: "OK",
              status: doc,
              errors: null,
            };
            return res.status(200).send(paket);
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
    return Paket.findByPk(req.params.id)
      .then((paket) => {
        if (!paket) {
          return res.status(400).send({
            transaksi_response: "Bad Request",
            errors: "Transaksi Not Found",
          });
        }

        return paket
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
