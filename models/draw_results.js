"use strict";

module.exports = function (sequelize, DataTypes) {
    var DrawResults = sequelize.define("DrawResults", {
        msisdn: DataTypes.STRING,
        drawDate: DataTypes.DATE,
        orderInDraw: DataTypes.INTEGER,
        isFinalizedResult: DataTypes.BOOLEAN,
        isSubstitute: DataTypes.BOOLEAN
    }, {
            classMethods: {
                associate: function (models) {
                    DrawResults.belongsTo(models.DrawTypes);
                }
            }
        });

    return DrawResults;
};