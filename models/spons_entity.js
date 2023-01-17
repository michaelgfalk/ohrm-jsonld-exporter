import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class spons_entity extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    spons_id: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    resource: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    eid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    x_start: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    period: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    x_end: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    spons_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    spappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    splastmod: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'spons_entity',
    schema: 'public',
    timestamps: false
  });
  }
}
