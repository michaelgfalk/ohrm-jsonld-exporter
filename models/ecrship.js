import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ecrship extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    eid: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    ectype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ecnotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ecappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eclastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ecrship',
    schema: 'public',
    timestamps: false
  });
  }
}
