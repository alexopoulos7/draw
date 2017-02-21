"use strict";

module.exports = function (sequelize, DataTypes) {
    var DrawWinners = sequelize.define("DrawWinners", {
        msisdn: DataTypes.STRING,
        drawDate: DataTypes.DATE,
        orderInDraw: DataTypes.INTEGER,
        isFinalizedResult: DataTypes.BOOLEAN,
        isSubstitute: DataTypes.BOOLEAN
    }, {
            classMethods: {
                associate: function (models) {
                    DrawWinners.belongsTo(models.DrawResults);
                }
            }
        });

    return DrawWinners;
};