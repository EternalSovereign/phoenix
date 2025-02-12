const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Gadget extends Model {}

Gadget.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                "Available",
                "Deployed",
                "Destroyed",
                "Decommissioned"
            ),
            allowNull: false,
            defaultValue: "Available",
        },
        decommissionedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Gadget",
        timestamps: true,
    }
);

module.exports = Gadget;
