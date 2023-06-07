"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paket.belongsToMany(models.Transaksi, {
        through: "transaksi_paket",
        foreignKey: "paketId",
        otherKey: "transaksiId",
      });
    }
  }
  Paket.init(
    {
      berat_kg: DataTypes.INTEGER,
      harga: DataTypes.INTEGER,
    },
    {
      hooks: {
        afterCreate: async (paket, option) => {
          try {
            await sequelize.models.AuditLog.create({
              tablename: "Paket",
              task: "insert",
              description: `proses Insert dengan data ${JSON.stringify(
                paket.toJSON()
              )}`,
            });
          } catch (err) {
            console.log(">> error pengguna aftercreate", err);
          }
        },
      },
      sequelize,
      modelName: "Paket",
    }
  );
  return Paket;
};
