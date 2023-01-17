import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class spons_type extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    spons_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'spons_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "spons_type_pkey",
        unique: true,
        fields: [
          { name: "spons_type" },
        ]
      },
    ]
  });
  }
}
