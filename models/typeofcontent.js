import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class typeofcontent extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    typeofcontent: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'typeofcontent',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "typeofcontent_pkey",
        unique: true,
        fields: [
          { name: "typeofcontent" },
        ]
      },
    ]
  });
  }
}
