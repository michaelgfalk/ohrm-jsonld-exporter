import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class typeofformat extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    typeofformat: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'typeofformat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "typeofformat_pkey",
        unique: true,
        fields: [
          { name: "typeofformat" },
        ]
      },
    ]
  });
  }
}
