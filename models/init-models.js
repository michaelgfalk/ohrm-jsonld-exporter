import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _arcresource from  "./arcresource.js";
import _category from  "./category.js";
import _catership from  "./catership.js";
import _contact from  "./contact.js";
import _dataentryprotocol from  "./dataentryprotocol.js";
import _decades from  "./decades.js";
import _dobject from  "./dobject.js";
import _dobjectversion from  "./dobjectversion.js";
import _earrship from  "./earrship.js";
import _ecrship from  "./ecrship.js";
import _edorship from  "./edorship.js";
import _efrship from  "./efrship.js";
import _entity from  "./entity.js";
import _entityevent from  "./entityevent.js";
import _entityname from  "./entityname.js";
import _eprrship from  "./eprrship.js";
import _function_ from  "./function.js";
import _html from  "./html.js";
import _htmladditional from  "./htmladditional.js";
import _htmlicon from  "./htmlicon.js";
import _htmlmetadata from  "./htmlmetadata.js";
import _htmlvariables from  "./htmlvariables.js";
import _ohrmsystem from  "./ohrmsystem.js";
import _onthisday from  "./onthisday.js";
import _prreprship from  "./prreprship.js";
import _pubresource from  "./pubresource.js";
import _relatedentity from  "./relatedentity.js";
import _relatedresource from  "./relatedresource.js";
import _relationships from  "./relationships.js";
import _repository from  "./repository.js";
import _resourcerelationships from  "./resourcerelationships.js";
import _spons_entity from  "./spons_entity.js";
import _spons_entity_updates from  "./spons_entity_updates.js";
import _spons_type from  "./spons_type.js";
import _sponsors from  "./sponsors.js";
import _subject from  "./subject.js";
import _typeofarformats from  "./typeofarformats.js";
import _typeofcontent from  "./typeofcontent.js";
import _typeofentity from  "./typeofentity.js";
import _typeofformat from  "./typeofformat.js";
import _typeofresource from  "./typeofresource.js";
import _typeofwork from  "./typeofwork.js";

export default function initModels(sequelize) {
  const arcresource = _arcresource.init(sequelize, DataTypes);
  const category = _category.init(sequelize, DataTypes);
  const catership = _catership.init(sequelize, DataTypes);
  const contact = _contact.init(sequelize, DataTypes);
  const dataentryprotocol = _dataentryprotocol.init(sequelize, DataTypes);
  const decades = _decades.init(sequelize, DataTypes);
  const dobject = _dobject.init(sequelize, DataTypes);
  const dobjectversion = _dobjectversion.init(sequelize, DataTypes);
  const earrship = _earrship.init(sequelize, DataTypes);
  const ecrship = _ecrship.init(sequelize, DataTypes);
  const edorship = _edorship.init(sequelize, DataTypes);
  const efrship = _efrship.init(sequelize, DataTypes);
  const entity = _entity.init(sequelize, DataTypes);
  const entityevent = _entityevent.init(sequelize, DataTypes);
  const entityname = _entityname.init(sequelize, DataTypes);
  const eprrship = _eprrship.init(sequelize, DataTypes);
  const function_ = _function_.init(sequelize, DataTypes);
  const html = _html.init(sequelize, DataTypes);
  const htmladditional = _htmladditional.init(sequelize, DataTypes);
  const htmlicon = _htmlicon.init(sequelize, DataTypes);
  const htmlmetadata = _htmlmetadata.init(sequelize, DataTypes);
  const htmlvariables = _htmlvariables.init(sequelize, DataTypes);
  const ohrmsystem = _ohrmsystem.init(sequelize, DataTypes);
  const onthisday = _onthisday.init(sequelize, DataTypes);
  const prreprship = _prreprship.init(sequelize, DataTypes);
  const pubresource = _pubresource.init(sequelize, DataTypes);
  const relatedentity = _relatedentity.init(sequelize, DataTypes);
  const relatedresource = _relatedresource.init(sequelize, DataTypes);
  const relationships = _relationships.init(sequelize, DataTypes);
  const repository = _repository.init(sequelize, DataTypes);
  const resourcerelationships = _resourcerelationships.init(sequelize, DataTypes);
  const spons_entity = _spons_entity.init(sequelize, DataTypes);
  const spons_entity_updates = _spons_entity_updates.init(sequelize, DataTypes);
  const spons_type = _spons_type.init(sequelize, DataTypes);
  const sponsors = _sponsors.init(sequelize, DataTypes);
  const subject = _subject.init(sequelize, DataTypes);
  const typeofarformats = _typeofarformats.init(sequelize, DataTypes);
  const typeofcontent = _typeofcontent.init(sequelize, DataTypes);
  const typeofentity = _typeofentity.init(sequelize, DataTypes);
  const typeofformat = _typeofformat.init(sequelize, DataTypes);
  const typeofresource = _typeofresource.init(sequelize, DataTypes);
  const typeofwork = _typeofwork.init(sequelize, DataTypes);


  return {
    arcresource,
    category,
    catership,
    contact,
    dataentryprotocol,
    decades,
    dobject,
    dobjectversion,
    earrship,
    ecrship,
    edorship,
    efrship,
    entity,
    entityevent,
    entityname,
    eprrship,
    function_,
    html,
    htmladditional,
    htmlicon,
    htmlmetadata,
    htmlvariables,
    ohrmsystem,
    onthisday,
    prreprship,
    pubresource,
    relatedentity,
    relatedresource,
    relationships,
    repository,
    resourcerelationships,
    spons_entity,
    spons_entity_updates,
    spons_type,
    sponsors,
    subject,
    typeofarformats,
    typeofcontent,
    typeofentity,
    typeofformat,
    typeofresource,
    typeofwork,
  };
}
