import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ohrmsystem extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    systemcode: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    systemname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    systemorg: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    systemcontact: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    systemproject: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    systemabout: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eidcode: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    pubidcode: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    arcidcode: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    doidcode: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    tablessetup: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    registered: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    functionrollover: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ohrmsystem',
    schema: 'public',
    timestamps: false
  });
  }
}
