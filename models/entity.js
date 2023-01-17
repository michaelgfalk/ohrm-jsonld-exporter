import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class entity extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    eid: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true
    },
    ecountrycode: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    eorgcode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    etype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ename: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    esubname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    elegalno: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estartdate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    esdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    estart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    eedatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    eend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    edatequal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ebthplace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ebthstate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ebthcountry: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    edthplace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    edthstate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    edthcountry: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    elocation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    elegalstatus: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    enationality: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    efunction: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    esumnote: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    efullnote: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    egender: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ereference: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enote: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eprepared: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    elastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    elogo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    earchives: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    epub: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    eonline: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    egallery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    eowner: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    erating: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    estatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    x_efunction: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'entity',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "entity_pkey",
        unique: true,
        fields: [
          { name: "eid" },
        ]
      },
    ]
  });
  }
}
