import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class htmladditional extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    x_level: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    basehref: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    bodyattribute: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pagetype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pagetitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    navmenu: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contenttitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    addtitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    addcontent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nometadata: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    basehref_replace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    htmltemplate: {
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
    tableName: 'htmladditional',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "htmladditional_pkey",
        unique: true,
        fields: [
          { name: "filename" },
        ]
      },
    ]
  });
  }
}
