import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class eprrship extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    eid: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    pubid: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    relationship: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    eprstartdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    eprsdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    eprstart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eprenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    epredatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    eprend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eprplace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eprcitation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    eprprepared: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    eprappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eprlastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eprereference: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'eprrship',
    schema: 'public',
    timestamps: false
  });
  }
}
