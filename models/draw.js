"use strict";

module.exports = function (sequelize, DataTypes) {
    var Draw = sequelize.define("Draw", {
        label: DataTypes.STRING,
    }, {
            classMethods: {
                associate: function (models) {
                    Draw.belongsTo(models.User);
                }
            }
        });
    return Draw;
};