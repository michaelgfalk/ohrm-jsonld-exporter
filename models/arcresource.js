import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class arcresource extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    arcid: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    repid: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    arrepref: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arrepreflink: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    artitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ardescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    arlanguage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    arstartdate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    arsdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    arstart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    arenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    aredatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    arend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    arquantityl: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    arquantityn: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    arquantityt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    arformats: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    araccess: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arotherfa: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arref: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    arlastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    arprepared: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    arcreator: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arlevel: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    arsubtitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    arprocessing: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    arstatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'arcresource',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "arcresource_pkey",
        unique: true,
        fields: [
          { name: "arcid" },
        ]
      },
    ]
  });
  }
}
