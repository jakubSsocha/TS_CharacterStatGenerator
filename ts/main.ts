/** -------------------- Html Handlers -------------------- */

/** buttons */
const drawButtonHandler: any = document.getElementById("draw");
const saveButtonHandler: any = document.getElementById("save");
const loadButtonHandler: any = document.getElementById("load");
const paramButtonsHandlers: any = document.getElementsByClassName(
  "param_button"
);

/** items selected by class name */
const mainPageParamHandlers: any = document.getElementsByClassName(
  "param_handler"
);
const saveModalParamHandlers: any = document.getElementsByClassName(
  "param_handler_save"
);
const loadModalParamOldValues: any = document.getElementsByClassName(
  "param_handler_oldValues"
);
const loadModalParamNewValues: any = document.getElementsByClassName(
  "param_handler_newValues"
);

/** items selected by id */
const sumHandler: any = document.getElementById("sum");
const saveModalSumHandler: any = document.getElementById("sum_save");
const loadModalOldSumHandler: any = document.getElementById("sum_oldValues");
const loadModalNewSumHandler: any = document.getElementById("sum_newValues");
const differenceHandler: any = document.getElementById("difference");
const alertBox: any = document.getElementById("alert_box");

/** -------------------- static parameters declarations -------------------- */

var drawnParameters: number[] = [0, 0, 0, 0, 0, 0];
var savedParameters: number[] = [0, 0, 0, 0, 0, 0];
var sumOfDrawnParameters: number = 0;
var differenceBetweenDrawnAndUsed: number = 0;

/** -------------------- events binding with html handlers -------------------- */

drawButtonHandler?.addEventListener("click", () => drawButtonService());

saveButtonHandler?.addEventListener("click", () => saveButtonService());

loadButtonHandler?.addEventListener("click", () => loadButtonService());

/** binding increasing and decresing functions to proper parameter buttons */
for (let i = 0; i < paramButtonsHandlers.length; i++) {
  let id: number = paramButtonsHandlers[i].id;
  if (i % 2) {
    paramButtonsHandlers[i]?.addEventListener("click", () =>
      increaseParamButtonService(id)
    );
  } else {
    paramButtonsHandlers[i]?.addEventListener("click", () =>
      decreaseParamButtonService(id)
    );
  }
}

/** -------------------- services -------------------- */

function drawButtonService(): void {
  drawAllRandomParams();
  hideAlertBox();
  refreshAllParamsHandlersInMainPageAndModals();
  setSumAndDifferenceHandlersValuesInMainPageAndModals();
}

function saveButtonService(): void {
  if (checkActionConditions()) {
    saveDrawnParamsInMemory();
    refreshLoadModalOldSumAndParamHandlers();
    hideAlertBox();
  } else {
    showAlertBox();
  }
}

function loadButtonService(): void {
  loadParamsFromMemory();
  refreshLoadModalOldSumAndParamHandlers();
  hideAlertBox();
  refreshAllParamsHandlersInMainPageAndModals();
  setSumAndDifferenceHandlersValuesInMainPageAndModals();
}

function increaseParamButtonService(id: number): void {
  increaseParamValue(id);
  refreshAllParamsHandlersInMainPageAndModals();
  hideAlertBox();
}

function decreaseParamButtonService(id: number): void {
  decreaseParamValue(id);
  refreshAllParamsHandlersInMainPageAndModals();
  hideAlertBox();
}

/** -------------------- condition checkers -------------------- */

function checkIncreaseParamConditions(id: number): boolean {
  return (
    drawnParameters[id] < 18 &&
    differenceBetweenDrawnAndUsed > 0 &&
    sumOfDrawnParameters > 0
  );
}

function checkDecreaseParamConditions(id: number): boolean {
  return drawnParameters[id] > 6 && sumOfDrawnParameters > 0;
}

function checkActionConditions(): boolean {
  return differenceBetweenDrawnAndUsed === 0;
}


/** -------------------- functions -------------------- */

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

function showAlertBox(): void {
  alertBox.style.visibility = "visible";
}

function hideAlertBox(): void {
  alertBox.style.visibility = "hidden";
}

function setSumAndDifferenceHandlersValuesInMainPageAndModals() {
  sumOfDrawnParameters = getSum(drawnParameters);
  differenceBetweenDrawnAndUsed = 0;

  sumHandler.innerText = sumOfDrawnParameters;
  saveModalSumHandler.innerText = sumOfDrawnParameters;
  loadModalNewSumHandler.innerText = sumOfDrawnParameters;
}

function setInnerTextInHtmlHandlers(
  values: number[],
  htmlHandlers: any[]
): void {
  for (let i = 0; i < htmlHandlers.length; i++) {
    htmlHandlers[i].innerText = values[i];
  }
}

/** others */

function saveDrawnParamsInMemory(): void {
  savedParameters = setTo(drawnParameters);
}

function loadParamsFromMemory(): void {
  drawnParameters = setTo(savedParameters);
}

function increaseParamValue(id: number): void {
  if (checkIncreaseParamConditions(id)) {
    drawnParameters[id]++;
    differenceBetweenDrawnAndUsed--;
  }
}

function decreaseParamValue(id: number): void {
  if (checkDecreaseParamConditions(id)) {
    drawnParameters[id]--;
    differenceBetweenDrawnAndUsed++;
  }
}

function drawAllRandomParams() {
  for (let i = 0; i < 6; i++) {
    drawnParameters[i] = Math.floor(Math.random() * 13) + 6;
  }
}

function getSum(parameters: number[]): number {
  return parameters.reduce((a, b) => a + b, 0);
}

function setTo(values: any[]): any[] {
  return Object.assign([], values);
}
