const Pengguna = require("../models").Pengguna;

module.exports = {
  checkDuplicateUserNameOrEmail(req, res, next) {
    Pengguna.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "Error",
          errors: "Email is already taken!",
        });
        return;
      }
      next();
    });
  },

  isAdmin(req, res, next) {
    Pengguna.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((pengguna) => {
        if (!pengguna.is_admin) {
          res.status(401).send({
            auth: true,
            email: req.body.email,
            message: "Error",
            errors: "Must be admin",
          });
          return;
        }
        next();
      })
      .catch((err) => {});
  },
};
