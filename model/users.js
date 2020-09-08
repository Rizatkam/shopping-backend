const Sequelize = require("sequelize");
const sequelizeConfig = require("../config/sequelize");

class model extends Sequelize.Model {}
model.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    encrypted_password: Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    country: Sequelize.STRING,
    name: Sequelize.STRING,
    postcode: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    freezeTableName: true,
    timestamps: true,
    sequelize: sequelizeConfig,
    modelName: "users",
    tableName: "users",
  }
);

module.exports = model;
