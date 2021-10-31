var DataTypes = require("sequelize").DataTypes;
var _AppUser = require("./AppUser");
var _MDocumentType = require("./MDocumentType");
var _MInsurance = require("./MInsurance");
var _MPenaltyType = require("./MPenaltyType");
var _MPersonType = require("./MPersonType");
var _MProvince = require("./MProvince");
var _MUserType = require("./MUserType");
var _MVehicleType = require("./MVehicleType");
var _Penalty = require("./Penalty");
var _Person = require("./Person");
var _PersonVehicle = require("./PersonVehicle");
var _User = require("./User");

function initModels(sequelize) {
  var AppUser = _AppUser(sequelize, DataTypes);
  var MDocumentType = _MDocumentType(sequelize, DataTypes);
  var MInsurance = _MInsurance(sequelize, DataTypes);
  var MPenaltyType = _MPenaltyType(sequelize, DataTypes);
  var MPersonType = _MPersonType(sequelize, DataTypes);
  var MProvince = _MProvince(sequelize, DataTypes);
  var MUserType = _MUserType(sequelize, DataTypes);
  var MVehicleType = _MVehicleType(sequelize, DataTypes);
  var Penalty = _Penalty(sequelize, DataTypes);
  var Person = _Person(sequelize, DataTypes);
  var PersonVehicle = _PersonVehicle(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  Person.belongsTo(AppUser, { as: "User", foreignKey: "UserId"});
  AppUser.hasMany(Person, { as: "People", foreignKey: "UserId"});
  Person.belongsTo(MDocumentType, { as: "DocumentType", foreignKey: "DocumentTypeId"});
  MDocumentType.hasMany(Person, { as: "People", foreignKey: "DocumentTypeId"});
  PersonVehicle.belongsTo(MInsurance, { as: "InsuranceCarrier", foreignKey: "InsuranceCarrierId"});
  MInsurance.hasMany(PersonVehicle, { as: "PersonVehicles", foreignKey: "InsuranceCarrierId"});
  Penalty.belongsTo(MPenaltyType, { as: "PenaltyType", foreignKey: "PenaltyTypeId"});
  MPenaltyType.hasMany(Penalty, { as: "Penalties", foreignKey: "PenaltyTypeId"});
  Person.belongsTo(MPersonType, { as: "PersonType", foreignKey: "PersonTypeId"});
  MPersonType.hasMany(Person, { as: "People", foreignKey: "PersonTypeId"});
  Penalty.belongsTo(MProvince, { as: "Province", foreignKey: "ProvinceId"});
  MProvince.hasMany(Penalty, { as: "Penalties", foreignKey: "ProvinceId"});
  AppUser.belongsTo(MUserType, { as: "Id_MUserType", foreignKey: "Id"});
  MUserType.hasOne(AppUser, { as: "AppUser", foreignKey: "Id"});
  User.belongsTo(MUserType, { as: "UserType", foreignKey: "UserTypeId"});
  MUserType.hasMany(User, { as: "Users", foreignKey: "UserTypeId"});
  PersonVehicle.belongsTo(MVehicleType, { as: "VehicleType", foreignKey: "VehicleTypeId"});
  MVehicleType.hasMany(PersonVehicle, { as: "PersonVehicles", foreignKey: "VehicleTypeId"});
  Penalty.belongsTo(Person, { as: "Person", foreignKey: "PersonId"});
  Person.hasMany(Penalty, { as: "Penalties", foreignKey: "PersonId"});
  PersonVehicle.belongsTo(Person, { as: "Person", foreignKey: "PersonId"});
  Person.hasMany(PersonVehicle, { as: "PersonVehicles", foreignKey: "PersonId"});

  return {
    AppUser,
    MDocumentType,
    MInsurance,
    MPenaltyType,
    MPersonType,
    MProvince,
    MUserType,
    MVehicleType,
    Penalty,
    Person,
    PersonVehicle,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
