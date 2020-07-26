"use strict";
var _a, _b;
const drawButtonHandler = document.getElementById("draw");
const paramHandlers = document.getElementsByClassName("param_handler");
const sumHandler = document.getElementById("sum");
const usedHandler = document.getElementById("used");
const differenceHandler = document.getElementById("difference");
const allButtonsHandlers = document.getElementsByTagName("button");
var drawnParameters = [0, 0, 0, 0, 0, 0];
var sumOfDrawnParameters;
var usedParameterPoints;
var differenceBetweenDrawnAndUsed;
const drawAllParameters = (e) => {
    drawParam();
    let i = 0;
    for (let handler of paramHandlers) {
        handler.innerText = drawnParameters[i];
        i++;
    }
    usedParameterPoints = sumOfDrawnParameters;
    differenceBetweenDrawnAndUsed = 0;
    sumHandler.innerText = sumOfDrawnParameters;
    setUsedDifferenceHandlersValue();
};
drawButtonHandler === null || drawButtonHandler === void 0 ? void 0 : drawButtonHandler.addEventListener('click', drawAllParameters);
for (let i = 0; i < allButtonsHandlers.length - 1; i++) {
    let id = allButtonsHandlers[i].id;
    if (i % 2) {
        (_a = allButtonsHandlers[i]) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => increaseParameterValue(id));
    }
    else {
        (_b = allButtonsHandlers[i]) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => decreaseParameterValue(id));
    }
}
function drawParam() {
    sumOfDrawnParameters = 0;
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 10) + 9;
        sumOfDrawnParameters += drawnParameters[i];
    }
}
;
function setUsedDifferenceHandlersValue() {
    usedHandler.innerText = usedParameterPoints;
    differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}
function increaseParameterValue(id) {
    if (drawnParameters[id] < 18 && differenceBetweenDrawnAndUsed > 0 && sumOfDrawnParameters > 0) {
        drawnParameters[id]++;
        usedParameterPoints++;
        differenceBetweenDrawnAndUsed--;
        refreshHTMLdata(id);
    }
}
function decreaseParameterValue(id) {
    if (drawnParameters[id] > 6 && sumOfDrawnParameters > 0) {
        drawnParameters[id]--;
        usedParameterPoints--;
        differenceBetweenDrawnAndUsed++;
        refreshHTMLdata(id);
    }
}
function refreshHTMLdata(id) {
    paramHandlers[id].innerText = drawnParameters[id];
    setUsedDifferenceHandlersValue();
}
