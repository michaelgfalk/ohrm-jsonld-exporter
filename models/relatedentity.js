import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class relatedentity extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                eid: {
                    type: DataTypes.STRING(7),
                    allowNull: true,
                    primaryKey: true,
                },
                reid: {
                    type: DataTypes.STRING(7),
                    allowNull: true,
                },
                rerelationship: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                redescription: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                restartdate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                resdatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                restart: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                reenddate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                reedatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                reend: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                redatequal: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                renote: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                rerating: {
                    type: DataTypes.DOUBLE,
                    allowNull: true,
                },
                reappenddate: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                relastmodd: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                reprepared: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },
                reorder: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "relatedentity",
                schema: "public",
                timestamps: false,
            }
        );
    }
}
