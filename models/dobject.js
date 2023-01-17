import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class dobject extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    doid: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    dotype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dotitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dodescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dostartdate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    dosdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    dostart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    doenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    doedatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    doend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    doplace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dophysdesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    docreator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    docontrol: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arcid: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    pubid: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    doreference: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dorights: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    donotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dostatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    doprepared: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    doappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    dolastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    dointerpretation: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dobject',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "dobject_pkey",
        unique: true,
        fields: [
          { name: "doid" },
        ]
      },
    ]
  });
  }
}
