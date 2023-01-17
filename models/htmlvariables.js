import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class htmlvariables extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    varname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    varvalue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    varcalc: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    varsql: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    varlevel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    varid: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    varstyle: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    varwrapstart: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    varwrapend: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    vartype: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    vargroup: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    vargrouptag: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    varprefix: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    varsuffix: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'htmlvariables',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "htmlvariables_pkey",
        unique: true,
        fields: [
          { name: "varname" },
        ]
      },
    ]
  });
  }
}
