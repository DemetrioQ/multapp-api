const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const AppUser = sequelize.define(
    'AppUser',
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      PersonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Person',
          key: 'Id',
        },
      },
      UserTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MUserType',
          key: 'Id',
        },
      },
      Username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Locked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      LockedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Authorized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      AuthorizedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('getdate'),
      },
    },
    {
      sequelize,
      tableName: 'AppUser',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: 'PK_AppUser',
          unique: true,
          fields: [{ name: 'Id' }],
        },
      ],
      hooks: {
        beforeCreate: async (user, options) => {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.Password = bcrypt.hashSync(user.Password, salt);
        },
      },
    }
  );
  AppUser.verifyPassword = (password, hashpassword) => {
    return bcrypt.compareSync(password, hashpassword);
  };
  return AppUser;
};
