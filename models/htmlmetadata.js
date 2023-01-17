import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class htmlmetadata extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    scheme: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lang: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    x_ref: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'htmlmetadata',
    schema: 'public',
    timestamps: false
  });
  }
}
