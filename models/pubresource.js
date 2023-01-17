import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class pubresource extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    pubid: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    x_year: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    secondaryauthor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    secondarytitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    placepublished: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    volume: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    numberofvolumes: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pagenos: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    edition: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    x_date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    typeofwork: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    isbn_issn: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    classification: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    urltype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    urldate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    format: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    x_language: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    contains: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pubappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    publastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    descriptionofwork: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prepared: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    catid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    processing: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pubresource',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pubresource_pkey",
        unique: true,
        fields: [
          { name: "pubid" },
        ]
      },
    ]
  });
  }
}
