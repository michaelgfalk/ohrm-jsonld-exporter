import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class spons_entity_updates extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    spons_id: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    eid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    change: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    x_start: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    x_end: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    updated: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'spons_entity_updates',
    schema: 'public',
    timestamps: false
  });
  }
}
