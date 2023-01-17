import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class contact extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    familyname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    givenname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    organisation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    x_position: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mailingaddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mobile: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fax: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cappenddate: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    clastmodd: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'contact',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "contact_pkey",
        unique: true,
        fields: [
          { name: "cid" },
        ]
      },
    ]
  });
  }
}
