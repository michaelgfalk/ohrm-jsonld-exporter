import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class htmlicon extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dovformat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dovtype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dotype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    offline: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    objectviewer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    objectviewerattributes: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'htmlicon',
    schema: 'public',
    timestamps: false
  });
  }
}
