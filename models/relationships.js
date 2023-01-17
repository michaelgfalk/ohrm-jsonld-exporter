import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class relationships extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    relationship: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    reverse: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reltype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    relationshiplabel: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    relorder: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    relstatus: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'relationships',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "relationships_pkey",
        unique: true,
        fields: [
          { name: "relationship" },
        ]
      },
    ]
  });
  }
}
