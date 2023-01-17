import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class edorship extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    doid: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    eid: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    relationship: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    edostartdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    edosdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    edostart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    edoenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    edoedatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    edoend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    edoplace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    edocitation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    edoprepared: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    edoappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    edolastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    edoereference: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    edogallery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'edorship',
    schema: 'public',
    timestamps: false
  });
  }
}
