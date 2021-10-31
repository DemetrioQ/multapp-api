const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MInsurance', {
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
    LogoUrl: {
      type: DataTypes.STRING(2083),
      allowNull: true
    },
    AddressLine1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AddressLine2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PrimaryPhone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    SecondaryPhone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'MInsurance',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_MInsurance",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
