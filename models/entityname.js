import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class entityname extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                eid: {
                    type: DataTypes.STRING(7),
                    allowNull: true,
                    primaryKey: true,
                },
                enalternate: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                enalternatetype: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                enstartdate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                ensdatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                enstart: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                enenddate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                enedatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                enend: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                endatequal: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                enplace: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                ennote: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "entityname",
                schema: "public",
                timestamps: false,
            }
        );
    }
}
