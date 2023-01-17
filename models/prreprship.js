import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class prreprship extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    pubid: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    repid: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    prrepref: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prrepdescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prrepappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    prreplastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'prreprship',
    schema: 'public',
    timestamps: false
  });
  }
}
