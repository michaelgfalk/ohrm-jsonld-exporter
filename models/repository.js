import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class repository extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    repid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rep: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    private: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    repositorytable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    alpha: {
      type: DataTypes.STRING(1),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'repository',
    schema: 'public',
    timestamps: false
  });
  }
}
