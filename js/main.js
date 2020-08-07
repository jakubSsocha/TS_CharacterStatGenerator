"use strict";
/** -------------------- Html Handlers -------------------- */
var _a, _b;
/** buttons */
const drawButtonHandler = document.getElementById("draw");
const saveButtonHandler = document.getElementById("save");
const loadButtonHandler = document.getElementById("load");
const paramButtonsHandlers = document.getElementsByClassName("param_button");
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
/** -------------------- events binding with html handlers -------------------- */
drawButtonHandler === null || drawButtonHandler === void 0 ? void 0 : drawButtonHandler.addEventListener("click", () => drawButtonService());
saveButtonHandler === null || saveButtonHandler === void 0 ? void 0 : saveButtonHandler.addEventListener("click", () => saveButtonService());
loadButtonHandler === null || loadButtonHandler === void 0 ? void 0 : loadButtonHandler.addEventListener("click", () => loadButtonService());
/** binding increasing and decresing functions to proper parameter buttons */
for (let i = 0; i < paramButtonsHandlers.length; i++) {
    let id = paramButtonsHandlers[i].id;
    if (i % 2) {
        (_a = paramButtonsHandlers[i]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => increaseParamButtonService(id));
    }
    else {
        (_b = paramButtonsHandlers[i]) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => decreaseParamButtonService(id));
    }
}
/** -------------------- services -------------------- */
function drawButtonService() {
    drawAllRandomParams();
    hideAlertBox();
    refreshAllParamsHandlersInMainPageAndModals();
    setSumAndDifferenceHandlersValuesInMainPageAndModals();
}
function saveButtonService() {
    if (checkActionConditions()) {
        saveDrawnParamsInMemory();
        refreshLoadModalOldSumAndParamHandlers();
        hideAlertBox();
    }
    else {
        showAlertBox();
    }
}
function loadButtonService() {
    loadParamsFromMemory();
    refreshLoadModalOldSumAndParamHandlers();
    hideAlertBox();
    refreshAllParamsHandlersInMainPageAndModals();
    setSumAndDifferenceHandlersValuesInMainPageAndModals();
}
function increaseParamButtonService(id) {
    increaseParamValue(id);
    refreshAllParamsHandlersInMainPageAndModals();
    hideAlertBox();
}
function decreaseParamButtonService(id) {
    decreaseParamValue(id);
    refreshAllParamsHandlersInMainPageAndModals();
    hideAlertBox();
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
function saveDrawnParamsInMemory() {
    savedParameters = setTo(drawnParameters);
}
function loadParamsFromMemory() {
    drawnParameters = setTo(savedParameters);
}
function increaseParamValue(id) {
    if (checkIncreaseParamConditions(id)) {
        drawnParameters[id]++;
        differenceBetweenDrawnAndUsed--;
    }
}
function decreaseParamValue(id) {
    if (checkDecreaseParamConditions(id)) {
        drawnParameters[id]--;
        differenceBetweenDrawnAndUsed++;
    }
}
/** -------------------- specific functions -------------------- */
/** html functionalities */
function refreshAllParamsHandlersInMainPageAndModals() {
    setInnerTextInHtmlHandlers(drawnParameters, mainPageParamHandlers);
    setInnerTextInHtmlHandlers(drawnParameters, saveModalParamHandlers);
    setInnerTextInHtmlHandlers(drawnParameters, loadModalParamNewValues);
    differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}
function refreshLoadModalOldSumAndParamHandlers() {
    setInnerTextInHtmlHandlers(savedParameters, loadModalParamOldValues);
    loadModalOldSumHandler.innerText = getSum(savedParameters);
}
function showAlertBox() {
    alertBox.style.visibility = "visible";
}
function hideAlertBox() {
    alertBox.style.visibility = "hidden";
}
function setSumAndDifferenceHandlersValuesInMainPageAndModals() {
    sumOfDrawnParameters = getSum(drawnParameters);
    differenceBetweenDrawnAndUsed = 0;
    sumHandler.innerText = sumOfDrawnParameters;
    saveModalSumHandler.innerText = sumOfDrawnParameters;
    loadModalNewSumHandler.innerText = sumOfDrawnParameters;
}
function setInnerTextInHtmlHandlers(values, htmlHandlers) {
    for (let i = 0; i < htmlHandlers.length; i++) {
        htmlHandlers[i].innerText = values[i];
    }
}
/** others */
function drawAllRandomParams() {
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 13) + 6;
    }
}
function getSum(parameters) {
    return parameters.reduce((a, b) => a + b, 0);
}
function setTo(values) {
    return Object.assign([], values);
}
