"use strict";

module.exports = function (sequelize, DataTypes) {
    var DrawTypes = sequelize.define("DrawTypes", {
        label: DataTypes.STRING,
        description: DataTypes.STRING,
        prize: DataTypes.STRING,
        winners: DataTypes.INTEGER,
        substitutes: DataTypes.INTEGER,
        daysFrequency: DataTypes.INTEGER,
        serviceId: DataTypes.INTEGER
    }, {
            classMethods: {
                associate: function (models) {
                    DrawTypes.belongsTo(models.Draw);
                }
            }
        });

    return DrawTypes;
};