import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class dataentryprotocol extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    protocol: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ptype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    appenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    lastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dataentryprotocol',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "dataentryprotocol_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
