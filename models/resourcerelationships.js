import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class resourcerelationships extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    rtype: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    rrole: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rrtype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rrrole: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rnotes: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'resourcerelationships',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "resourcerelationships_pkey",
        unique: true,
        fields: [
          { name: "rtype" },
        ]
      },
    ]
  });
  }
}
