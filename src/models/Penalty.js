const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Penalty', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    Code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Person',
        key: 'Id'
      }
    },
    PenaltyTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MPenaltyType',
        key: 'Id'
      }
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    AddressLine1: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ProvinceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MProvince',
        key: 'Id'
      }
    },
    PenaltyDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Paid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    CreatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Penalty',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Penalty_1",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
