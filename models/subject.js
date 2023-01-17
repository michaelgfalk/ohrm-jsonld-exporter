import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class subject extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    keyterm: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    graphxpos: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subject',
    schema: 'public',
    timestamps: false
  });
  }
}
