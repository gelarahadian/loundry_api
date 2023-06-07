const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const Pengguna = require("../models").Pengguna;
const Role = require("../models").Role;
const Op = db.Sequelize.Op;
const config = require("../config/config");

module.exports = {
  signup(req, res) {
    return Pengguna.create({
      nama: req.body.nama,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      alamat: req.body.alamat,
      is_admin: req.body.is_admin,
    })
      .then(() => {
        res.status(200).send({
          auth: true,
          email: req.body.email,
          message: "User registered successfully!",
          errors: null,
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: err,
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: err,
        });
      });
  },

  signin(req, res) {
    return Pengguna.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((pengguna) => {
        if (!pengguna) {
          return res.status(404).send({
            auth: false,
            email: req.body.email,
            accessToken: null,
            message: "Error",
            errors: "User Not Found.",
          });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          pengguna.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            email: req.body.email,
            accessToken: null,
            message: "Error",
            errors: "Invalid Password!",
          });
        }

        var token =
          "Bearer " +
          jwt.sign(
            {
              id: pengguna.id,
            },
            config.secret,
            {
              expiresIn: 86400, //24h expired
            }
          );

        res.status(200).send({
          auth: true,
          id: req.body.id,
          accessToken: token,
          message: "Success",
          errors: null,
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          email: req.body.email,
          accessToken: null,
          message: "Error chek",
          errors: err,
        });
      });
  },
};
