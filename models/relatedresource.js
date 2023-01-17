import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class relatedresource extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    rrno: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    rtype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rid: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    rrid: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    rrdescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rrstartdate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    rrsdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    rrstart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    rrenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    rredatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    rrend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    rrdatequal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rrnote: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rrrating: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    rrappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    rrlastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'relatedresource',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "relatedresource_pkey",
        unique: true,
        fields: [
          { name: "rrno" },
        ]
      },
    ]
  });
  }
}
