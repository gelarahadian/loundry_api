"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaksi.belongsTo(models.Pengguna, {
        foreignKey: "pengguna_id",
        as: "pengguna",
      });

      Transaksi.belongsToMany(models.Paket, {
        through: "transaksi_paket",
        foreignKey: "transaksiId",
        otherKey: "paketId",
      });
    }
  }
  Transaksi.init(
    {
      tgl_masuk: DataTypes.DATE,
      tgl_keluar: DataTypes.DATE,
      pengguna_id: DataTypes.INTEGER,
    },
    {
      hooks: {
        afterCreate: async (transaksi, option) => {
          try {
            await sequelize.models.AuditLog.create({
              tablename: "Transaksi",
              task: "insert",
              description: `proses Insert dengan data ${JSON.stringify(
                transaksi.toJSON()
              )}`,
            });
          } catch (err) {
            console.log(">> error pengguna aftercreate", err);
          }
        },
      },
      sequelize,
      modelName: "Transaksi",
    }
  );
  return Transaksi;
};
