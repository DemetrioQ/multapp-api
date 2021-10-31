const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Seq: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    UserTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MUserType',
        key: 'Id'
      }
    },
    Locked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    LockedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Authorized: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    AuthorizedDate: {
      type: DataTypes.DATE,
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
    tableName: 'User',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_User",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
