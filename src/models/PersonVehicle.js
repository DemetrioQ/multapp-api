const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PersonVehicle', {
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
    PersonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Person',
        key: 'Id'
      }
    },
    VehicleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MVehicleType',
        key: 'Id'
      }
    },
    InsuranceCarrierId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MInsurance',
        key: 'Id'
      }
    },
    InsuranceNumber: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PlateNumber: {
      type: DataTypes.STRING(50),
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
    tableName: 'PersonVehicle',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_PersonVehicle_1",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
