"use strict";
/** -------------------- Html Handlers declarations -------------------- */
var _a, _b;
/** buttons */
const drawButtonHandler = document.getElementById("draw");
const saveButtonHandler = document.getElementById("save");
const loadButtonHandler = document.getElementById("load");
const allButtonsHandlers = document.getElementsByTagName("button");
/** items selected by class name */
const mainPageParamHandlers = document.getElementsByClassName("param_handler");
const saveModalParamHandlers = document.getElementsByClassName("param_handler_save");
const loadModalParamOldValues = document.getElementsByClassName("param_handler_oldValues");
const loadModalParamNewValues = document.getElementsByClassName("param_handler_newValues");
/** items selected by id */
const sumHandler = document.getElementById("sum");
const saveModalSumHandler = document.getElementById("sum_save");
const loadModalOldSumHandler = document.getElementById("sum_oldValues");
const loadModalNewSumHandler = document.getElementById("sum_newValues");
const usedHandler = document.getElementById("used");
const differenceHandler = document.getElementById("difference");
/** -------------------- static parameters declarations -------------------- */
var drawnParameters = [0, 0, 0, 0, 0, 0];
var savedParameters;
var sumOfDrawnParameters;
var usedParameterPoints;
var differenceBetweenDrawnAndUsed;
/** -------------------- events bindings with proper html handlers -------------------- */
const drawAllParameters = (e) => {
    drawParam();
    writeParametersInHtml();
};
drawButtonHandler === null || drawButtonHandler === void 0 ? void 0 : drawButtonHandler.addEventListener("click", drawAllParameters);
saveButtonHandler === null || saveButtonHandler === void 0 ? void 0 : saveButtonHandler.addEventListener("click", () => {
    savedParameters = Object.assign([], drawnParameters);
    addParametersValuesToHtmlHandlers(savedParameters, loadModalParamOldValues);
    loadModalOldSumHandler.innerText = getSum(savedParameters);
});
loadButtonHandler === null || loadButtonHandler === void 0 ? void 0 : loadButtonHandler.addEventListener("click", () => {
    drawnParameters = Object.assign([], savedParameters);
    writeParametersInHtml();
});
for (let i = 0; i < allButtonsHandlers.length - 3; i++) {
    let id = allButtonsHandlers[i].id;
    if (i % 2) {
        (_a = allButtonsHandlers[i]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => increaseParameterValue(id));
    }
    else {
        (_b = allButtonsHandlers[i]) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => decreaseParameterValue(id));
    }
}
/** -------------------- functions -------------------- */
function drawParam() {
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 14) + 5;
    }
}
function setUsedDifferenceHandlersValue() {
    differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}
function increaseParameterValue(id) {
    if (checkIncreaseParameterConditions(id)) {
        drawnParameters[id]++;
        usedParameterPoints++;
        differenceBetweenDrawnAndUsed--;
        refreshHTMLdata(id);
        addParametersValuesToHtmlHandlers(drawnParameters, loadModalNewSumHandler);
    }
}
function checkIncreaseParameterConditions(id) {
    return (drawnParameters[id] < 18 &&
        differenceBetweenDrawnAndUsed > 0 &&
        sumOfDrawnParameters > 0);
}
function decreaseParameterValue(id) {
    if (checkDecreaseParameterConditions(id)) {
        drawnParameters[id]--;
        usedParameterPoints--;
        differenceBetweenDrawnAndUsed++;
        refreshHTMLdata(id);
        addParametersValuesToHtmlHandlers(drawnParameters, loadModalNewSumHandler);
    }
}
function checkDecreaseParameterConditions(id) {
    return drawnParameters[id] > 6 && sumOfDrawnParameters > 0;
}
function refreshHTMLdata(id) {
    mainPageParamHandlers[id].innerText = drawnParameters[id];
    setUsedDifferenceHandlersValue();
}
function writeParametersInHtml() {
    addParametersValuesToHtmlHandlers(drawnParameters, mainPageParamHandlers);
    addParametersValuesToHtmlHandlers(drawnParameters, saveModalParamHandlers);
    addParametersValuesToHtmlHandlers(drawnParameters, loadModalParamNewValues);
    sumOfDrawnParameters = getSum(drawnParameters);
    usedParameterPoints = sumOfDrawnParameters;
    differenceBetweenDrawnAndUsed = 0;
    sumHandler.innerText = sumOfDrawnParameters;
    saveModalSumHandler.innerText = sumOfDrawnParameters;
    loadModalNewSumHandler.innerText = sumOfDrawnParameters;
    setUsedDifferenceHandlersValue();
}
function addParametersValuesToHtmlHandlers(values, htmlHandlers) {
    for (let i = 0; i < htmlHandlers.length; i++) {
        htmlHandlers[i].innerText = values[i];
    }
}
function getSum(parameters) {
    return parameters.reduce((a, b) => a + b, 0);
}
