import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sponsors extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    spons_id: {
      type: DataTypes.STRING(7),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logodate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    initial_date: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    mlref: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
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
    tableName: 'sponsors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sponsors_pkey",
        unique: true,
        fields: [
          { name: "spons_id" },
        ]
      },
    ]
  });
  }
}
