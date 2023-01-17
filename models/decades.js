import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class decades extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    decadestart: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    decadefinish: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'decades',
    schema: 'public',
    timestamps: false
  });
  }
}
