import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class catership extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    catid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    eid: {
      type: DataTypes.STRING(8),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'catership',
    schema: 'public',
    timestamps: false
  });
  }
}
