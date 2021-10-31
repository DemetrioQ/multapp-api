const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MVehicleType', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'MVehicleType',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_MVehicleType",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
