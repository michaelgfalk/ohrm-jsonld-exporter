import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class earrship extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                arcid: {
                    type: DataTypes.STRING(9),
                    allowNull: true,
                    primaryKey: true,
                },
                eid: {
                    type: DataTypes.STRING(7),
                    allowNull: true,
                    primaryKey: true,
                },
                relationship: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                },
                rating: {
                    type: DataTypes.DOUBLE,
                    allowNull: true,
                },
                earstartdate: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },
                earsdatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                earstart: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                earenddate: {
                    type: DataTypes.STRING(20),
                    allowNull: true,
                },
                earedatemod: {
                    type: DataTypes.STRING(1),
                    allowNull: true,
                },
                earend: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                earplace: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                earcitation: {
                    type: DataTypes.STRING(255),
                    allowNull: true,
                },
                earprepared: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
                },
                earappenddate: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                earlastmodd: {
                    type: DataTypes.STRING(64),
                    allowNull: true,
                },
                earereference: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                },
            },
            {
                sequelize,
                tableName: "earrship",
                schema: "public",
                timestamps: false,
            }
        );
    }
}
