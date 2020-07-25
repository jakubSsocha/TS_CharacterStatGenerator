"use strict";
var drawButton = document.getElementById("draw");
var paramHandlers = document.getElementsByClassName("param_handler");
var sumHandler = document.getElementById("sum");
var usedHandler = document.getElementById("used");
var differenceHandler = document.getElementById("difference");
var allButtons = document.getElementsByTagName("button");
var drawnParameters = [0, 0, 0, 0, 0, 0];
var sumOfDrawnParameters;
var usedParameterPoints;
var differenceBetweenDrawnAndUsed;
var drawAllParameters = function (e) {
    var i = 0;
    drawParam();
    for (var _i = 0, paramHandlers_1 = paramHandlers; _i < paramHandlers_1.length; _i++) {
        var param = paramHandlers_1[_i];
        param.innerText = drawnParameters[i];
        i++;
    }
    usedParameterPoints = sumOfDrawnParameters;
    differenceBetweenDrawnAndUsed = 0;
    sumHandler.innerText = sumOfDrawnParameters;
    setUsedDifferenceHandlersValue(usedParameterPoints, differenceBetweenDrawnAndUsed);
};
drawButton === null || drawButton === void 0 ? void 0 : drawButton.addEventListener('click', drawAllParameters);
function drawParam() {
    sumOfDrawnParameters = 0;
    for (var i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 10) + 9;
        sumOfDrawnParameters += drawnParameters[i];
    }
}
;
function setUsedDifferenceHandlersValue(used, difference) {
    usedHandler.innerText = used;
    differenceHandler.innerText = difference;
}
