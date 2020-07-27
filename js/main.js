"use strict";
var _a, _b;
const drawButtonHandler = document.getElementById("draw");
const saveButtonHandler = document.getElementById("save");
const loadButtonHandler = document.getElementById("load");
const paramHandlers = document.getElementsByClassName("param_handler");
const sumHandler = document.getElementById("sum");
const usedHandler = document.getElementById("used");
const differenceHandler = document.getElementById("difference");
const allButtonsHandlers = document.getElementsByTagName("button");
var drawnParameters = [0, 0, 0, 0, 0, 0];
var savedParameters;
var sumOfDrawnParameters;
var usedParameterPoints;
var differenceBetweenDrawnAndUsed;
const drawAllParameters = (e) => {
    drawParam();
    writeParametersInHtml();
};
drawButtonHandler === null || drawButtonHandler === void 0 ? void 0 : drawButtonHandler.addEventListener('click', drawAllParameters);
saveButtonHandler === null || saveButtonHandler === void 0 ? void 0 : saveButtonHandler.addEventListener('click', () => savedParameters = Object.assign([], drawnParameters));
loadButtonHandler === null || loadButtonHandler === void 0 ? void 0 : loadButtonHandler.addEventListener('click', () => {
    drawnParameters = Object.assign([], savedParameters);
    writeParametersInHtml();
});
for (let i = 0; i < allButtonsHandlers.length - 3; i++) {
    let id = allButtonsHandlers[i].id;
    if (i % 2) {
        (_a = allButtonsHandlers[i]) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => increaseParameterValue(id));
    }
    else {
        (_b = allButtonsHandlers[i]) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => decreaseParameterValue(id));
    }
}
function drawParam() {
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 14) + 5;
    }
}
;
function setUsedDifferenceHandlersValue() {
    differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}
function increaseParameterValue(id) {
    if (checkIncreaseParameterConditions(id)) {
        drawnParameters[id]++;
        usedParameterPoints++;
        differenceBetweenDrawnAndUsed--;
        refreshHTMLdata(id);
    }
}
function checkIncreaseParameterConditions(id) {
    return drawnParameters[id] < 18 && differenceBetweenDrawnAndUsed > 0 && sumOfDrawnParameters > 0;
}
function decreaseParameterValue(id) {
    if (checkDecreaseParameterConditions(id)) {
        drawnParameters[id]--;
        usedParameterPoints--;
        differenceBetweenDrawnAndUsed++;
        refreshHTMLdata(id);
    }
}
function checkDecreaseParameterConditions(id) {
    return drawnParameters[id] > 6 && sumOfDrawnParameters > 0;
}
function refreshHTMLdata(id) {
    paramHandlers[id].innerText = drawnParameters[id];
    setUsedDifferenceHandlersValue();
}
function writeParametersInHtml() {
    let i = 0;
    sumOfDrawnParameters = 0;
    for (let handler of paramHandlers) {
        handler.innerText = drawnParameters[i];
        sumOfDrawnParameters += drawnParameters[i];
        i++;
    }
    usedParameterPoints = sumOfDrawnParameters;
    differenceBetweenDrawnAndUsed = 0;
    sumHandler.innerText = sumOfDrawnParameters;
    setUsedDifferenceHandlersValue();
}
