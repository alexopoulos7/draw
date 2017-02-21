"use strict";

module.exports = function(sequelize, DataTypes) {
    var DrawResults = sequelize.define("DrawResults", {
        label: DataTypes.STRING, //prize & date
        drawDate: DataTypes.DATE,
        winners: DataTypes.INTEGER,
        substitutes: DataTypes.INTEGER,
        isFinalizedResult: DataTypes.BOOLEAN
    }, {
            classMethods: {
                associate: function(models) {
                    DrawResults.belongsTo(models.DrawTypes);
                    DrawResults.belongsTo(models.Draw);
                }
            }
        });

    return DrawResults;
};