import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class typeofentity extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    types: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    elabel: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    entrylabel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    detaillabel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gentype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventlabel: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'typeofentity',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "typeofentity_pkey",
        unique: true,
        fields: [
          { name: "types" },
        ]
      },
    ]
  });
  }
}
