"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengguna extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pengguna.hasMany(models.Transaksi, {
        foreignKey: "pengguna_id",
        as: "transaksis",
      });
    }
  }
  Pengguna.init(
    {
      nama: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      alamat: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        afterCreate: async (pengguna, option) => {
          try {
            await sequelize.models.AuditLog.create({
              tablename: "Pengguna",
              task: "insert",
              description: `proses Insert dengan data ${JSON.stringify(
                pengguna.toJSON()
              )}`,
            });
          } catch (err) {
            console.log(">> error pengguna aftercreate", err);
          }
        },
      },
      sequelize,
      modelName: "Pengguna",
    }
  );
  return Pengguna;
};
