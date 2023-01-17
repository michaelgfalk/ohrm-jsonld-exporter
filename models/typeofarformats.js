import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class typeofarformats extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    typeofarformats: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'typeofarformats',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "typeofarformats_pkey",
        unique: true,
        fields: [
          { name: "typeofarformats" },
        ]
      },
    ]
  });
  }
}
