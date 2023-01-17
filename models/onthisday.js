import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class onthisday extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    otdid: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true
    },
    otdtype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    otddate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    otdhiddendate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    otddescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    otdlinktext: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    doid: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'onthisday',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "onthisday_pkey",
        unique: true,
        fields: [
          { name: "otdid" },
        ]
      },
    ]
  });
  }
}
