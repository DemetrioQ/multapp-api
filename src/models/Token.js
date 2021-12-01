const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Token = sequelize.define(
    'Token',
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      AppUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'AppUser',
          key: 'Id',
        },
      },
      Token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Token',
      schema: 'dbo',
      timestamps: false,
    }
  );
  return Token;
};
