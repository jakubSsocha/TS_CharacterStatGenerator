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
const differenceHandler = document.getElementById("difference");
const alertBox = document.getElementById("alert_box");
/** -------------------- static parameters declarations -------------------- */
var drawnParameters = [0, 0, 0, 0, 0, 0];
var savedParameters = [0, 0, 0, 0, 0, 0];
var sumOfDrawnParameters = 0;
var differenceBetweenDrawnAndUsed = 0;
/** -------------------- events binding with proper html handlers -------------------- */
drawButtonHandler === null || drawButtonHandler === void 0 ? void 0 : drawButtonHandler.addEventListener("click", () => {
    generateParamsRandomValues();
    alertBox.style.visibility = "hidden";
});
saveButtonHandler === null || saveButtonHandler === void 0 ? void 0 : saveButtonHandler.addEventListener("click", () => {
    if (checkActionConditions()) {
        saveDrawnParamsInMemory();
        alertBox.style.visibility = "hidden";
    }
    else {
        alertBox.style.visibility = "visible";
    }
});
loadButtonHandler === null || loadButtonHandler === void 0 ? void 0 : loadButtonHandler.addEventListener("click", () => {
    loadParamsFromMemory();
    alertBox.style.visibility = "hidden";
});
/** binding increasing and decresing functions to proper parameter buttons */
for (let i = 0; i < allButtonsHandlers.length - 3; i++) {
    let id = allButtonsHandlers[i].id;
    if (i % 2) {
        (_a = allButtonsHandlers[i]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => increaseParamValue(id));
    }
    else {
        (_b = allButtonsHandlers[i]) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => decreaseParamValue(id));
    }
}
/** -------------------- condition checkers -------------------- */
function checkIncreaseParamConditions(id) {
    return (drawnParameters[id] < 18 &&
        differenceBetweenDrawnAndUsed > 0 &&
        sumOfDrawnParameters > 0);
}
function checkDecreaseParamConditions(id) {
    return drawnParameters[id] > 6 && sumOfDrawnParameters > 0;
}
function checkActionConditions() {
    return differenceBetweenDrawnAndUsed === 0;
}
/** -------------------- main functions -------------------- */
function generateParamsRandomValues() {
    drawAllRandomParams();
    writeDrawnParamsInHtml();
}
function saveDrawnParamsInMemory() {
    savedParameters = setTo(drawnParameters);
    setInnerTextInHtmlHandlers(savedParameters, loadModalParamOldValues);
    loadModalOldSumHandler.innerText = getSum(savedParameters);
}
function loadParamsFromMemory() {
    drawnParameters = setTo(savedParameters);
    writeDrawnParamsInHtml();
}
function increaseParamValue(id) {
    if (checkIncreaseParamConditions(id)) {
        drawnParameters[id]++;
        differenceBetweenDrawnAndUsed--;
        refreshAllParamsHandlersInMainPageAndModals();
        alertBox.style.visibility = "hidden";
    }
}
function decreaseParamValue(id) {
    if (checkDecreaseParamConditions(id)) {
        drawnParameters[id]--;
        differenceBetweenDrawnAndUsed++;
        refreshAllParamsHandlersInMainPageAndModals();
        alertBox.style.visibility = "hidden";
    }
}
/** -------------------- specific functions -------------------- */
function refreshAllParamsHandlersInMainPageAndModals() {
    setInnerTextInHtmlHandlers(drawnParameters, mainPageParamHandlers);
    setInnerTextInHtmlHandlers(drawnParameters, saveModalParamHandlers);
    setInnerTextInHtmlHandlers(drawnParameters, loadModalParamNewValues);
    differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}
function drawAllRandomParams() {
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 13) + 6;
    }
}
function writeDrawnParamsInHtml() {
    sumOfDrawnParameters = getSum(drawnParameters);
    differenceBetweenDrawnAndUsed = 0;
    sumHandler.innerText = sumOfDrawnParameters;
    saveModalSumHandler.innerText = sumOfDrawnParameters;
    loadModalNewSumHandler.innerText = sumOfDrawnParameters;
    refreshAllParamsHandlersInMainPageAndModals();
}
function setInnerTextInHtmlHandlers(values, htmlHandlers) {
    for (let i = 0; i < htmlHandlers.length; i++) {
        htmlHandlers[i].innerText = values[i];
    }
}
function getSum(parameters) {
    return parameters.reduce((a, b) => a + b, 0);
}
function setTo(values) {
    return Object.assign([], values);
}
