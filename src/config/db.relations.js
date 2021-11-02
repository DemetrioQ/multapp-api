const Person = require('../models').Person;
const Penalty = require('../models').Penalty;
const PenaltyType = require('../models').PenaltyType;
const DocumentType = require('../models').DocumentType;
const PersonType = require('../models').PersonType;

Person.hasMany(Penalty);
Penalty.belongsTo(Person);
PenaltyType.hasOne(Penalty, { foreign_key: 'PenaltyTypeId' });
Penalty.belongsTo(PenaltyType, { foreign_key: 'PenaltyTypeId' });
DocumentType.hasOne(Person)
Person.belongsTo(DocumentType);
PersonType.hasOne(Person)
Person.belongsTo(PersonType);
