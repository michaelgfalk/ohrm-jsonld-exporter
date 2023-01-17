import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class typeofwork extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    typeofwork: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'typeofwork',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "typeofwork_pkey",
        unique: true,
        fields: [
          { name: "typeofwork" },
        ]
      },
    ]
  });
  }
}
