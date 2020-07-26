"use strict";
var _a, _b;
const drawButton = document.getElementById("draw");
const paramHandlers = document.getElementsByClassName("param_handler");
const sumHandler = document.getElementById("sum");
const usedHandler = document.getElementById("used");
const differenceHandler = document.getElementById("difference");
const allButtons = document.getElementsByTagName("button");
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
drawButton === null || drawButton === void 0 ? void 0 : drawButton.addEventListener('click', drawAllParameters);
for (let i = 0; i < allButtons.length - 1; i++) {
    let id = allButtons[i].id;
    if (i % 2) {
        (_a = allButtons[i]) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => increaseParameterValue(id));
    }
    else {
        (_b = allButtons[i]) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => decreaseParameterValue(id));
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
