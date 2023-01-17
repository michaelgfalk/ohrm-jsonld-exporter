import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class dobjectversion extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                doid: {
                    type: DataTypes.STRING(9),
                    allowNull: true,
                    primaryKey: true,
                },
                dovtype: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },
                dovformat: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },
                dovdefault: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                dov: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                dovattributes: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                dovtitle: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                dovdescription: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                dovstartdate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                dovsdatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                dovstart: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                dovenddate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                dovedatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                dovend: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                dovplace: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                dovphysdesc: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                dovcreator: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                dovcontrol: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                arcid: {
                    type: DataTypes.STRING(9),
                    allowNull: true,
                },
                pubid: {
                    type: DataTypes.STRING(9),
                    allowNull: true,
                },
                dovreference: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                dovrights: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                dovnotes: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                dovstatus: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },
                dovappenddate: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                dovlastmodd: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                dovimagedisplay: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
                dovorder: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
                dovportrait: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "dobjectversion",
                schema: "public",
                timestamps: false,
            }
        );
    }
}
