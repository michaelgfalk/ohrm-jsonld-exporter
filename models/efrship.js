import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class efrship extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    eid: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    fid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    efstartdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    efsdatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    efstart: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    efenddate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    efedatemod: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    efend: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    efplace: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    efplacestate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    efplacecountry: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    efcitation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    efprepared: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    efnote: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    efappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    eflastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    ordering: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'efrship',
    schema: 'public',
    timestamps: false
  });
  }
}
