import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class entityevent extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    eid: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    eedescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eelocation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eegis: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    eestartdate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    eesdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    eestart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eeenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    eeedatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    eeend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eedatequal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eenote: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eerating: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    eeappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eelastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eeprepared: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    eetype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    otdid: {
      type: DataTypes.STRING(7),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'entityevent',
    schema: 'public',
    timestamps: false
  });
  }
}
