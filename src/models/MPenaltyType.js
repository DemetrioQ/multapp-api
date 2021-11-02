const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MPenaltyType', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Law: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Price: {
      type: DataTypes.DECIMAL(19,4),
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
    tableName: 'MPenaltyType',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_MPenaltyType",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
