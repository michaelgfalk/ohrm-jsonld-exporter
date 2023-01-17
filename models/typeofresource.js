import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class typeofresource extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    typeofresource: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      primaryKey: true
    },
    htmfile: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    citationtype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    endnotereferencetype: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'typeofresource',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "typeofresource_pkey",
        unique: true,
        fields: [
          { name: "typeofresource" },
          { name: "online" },
        ]
      },
    ]
  });
  }
}
