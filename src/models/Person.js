const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Person',
    {
      Id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      FirstName: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
      DocumentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'MDocumentType',
          key: 'Id',
        },
      },
      DocumentNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      PictureUrl: {
        type: DataTypes.STRING(2083),
        allowNull: true,
      },
      PersonTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MPersonType',
          key: 'Id',
        },
      },
      CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('getdate'),
      },
    },
    {
      sequelize,
      tableName: 'Person',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: 'PK_Person_1',
          unique: true,
          fields: [{ name: 'Id' }],
        },
      ],
    }
  );
};
