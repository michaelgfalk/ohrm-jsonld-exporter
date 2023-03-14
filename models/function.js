import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class function_ extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                fid: {
                    type: DataTypes.STRING(8),
                    allowNull: false,
                    primaryKey: true,
                },
                fname: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                ffield: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                fdescription: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                freference: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                fstartdate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                fsdatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                fstart: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                fenddate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                fedatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                fend: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                fdatequal: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                fapplies: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                fappenddate: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                flastmodd: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                fnote: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                fparent: {
                    type: DataTypes.STRING(8),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "function",
                schema: "public",
                timestamps: false,
                indexes: [
                    {
                        name: "function_pkey",
                        unique: true,
                        fields: [{ name: "fid" }],
                    },
                ],
            }
        );
    }
}
