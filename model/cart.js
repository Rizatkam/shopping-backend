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
    user_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
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
    paranoid: false,
    sequelize: sequelizeConfig,
    modelName: "cart",
    tableName: "shopping",
  }
);

module.exports = model;
