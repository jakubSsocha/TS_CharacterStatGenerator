/** -------------------- Html Handlers declarations -------------------- */

/** buttons */
const drawButtonHandler: any = document.getElementById("draw");
const saveButtonHandler: any = document.getElementById("save");
const loadButtonHandler: any = document.getElementById("load");
const allButtonsHandlers: any = document.getElementsByTagName("button");

/** items selected by class name */
const mainPageParamHandlers: any = document.getElementsByClassName("param_handler");
const saveModalParamHandlers: any = document.getElementsByClassName(
  "param_handler_save"
);
const loadModalParamOldValues: any = document.getElementsByClassName("param_handler_oldValues");
const loadModalParamNewValues: any = document.getElementsByClassName("param_handler_newValues");

/** items selected by id */
const sumHandler: any = document.getElementById("sum");
const saveModalSumHandler: any = document.getElementById("sum_save");
const loadModalOldSumHandler: any = document.getElementById("sum_oldValues");
const loadModalNewSumHandler: any = document.getElementById("sum_newValues");
const usedHandler: any = document.getElementById("used");
const differenceHandler: any = document.getElementById("difference");

/** -------------------- static parameters declarations -------------------- */

var drawnParameters: number[] = [0, 0, 0, 0, 0, 0];
var savedParameters: number[];
var sumOfDrawnParameters: number;
var usedParameterPoints: number;
var differenceBetweenDrawnAndUsed: number;

/** -------------------- events bindings with proper html handlers -------------------- */

const drawAllParameters = (e: MouseEvent) => {
  drawParam();
  writeParametersInHtml();
};

drawButtonHandler?.addEventListener("click", drawAllParameters);

saveButtonHandler?.addEventListener(
  "click", () => {
      savedParameters = Object.assign([], drawnParameters);
      addParametersValuesToHtmlHandlers(savedParameters, loadModalParamOldValues);
      loadModalOldSumHandler.innerText = getSum(savedParameters);
    }
);

loadButtonHandler?.addEventListener("click", () => {
  drawnParameters = Object.assign([], savedParameters);
  writeParametersInHtml();
});

for (let i = 0; i < allButtonsHandlers.length - 3; i++) {
  let id: number = allButtonsHandlers[i].id;
  if (i % 2) {
    allButtonsHandlers[i]?.addEventListener("click", () =>
      increaseParameterValue(id)
    );
  } else {
    allButtonsHandlers[i]?.addEventListener("click", () =>
      decreaseParameterValue(id)
    );
  }
}

/** -------------------- functions -------------------- */

function drawParam() {
  for (let i = 0; i < 6; i++) {
    drawnParameters[i] = Math.floor(Math.random() * 14) + 5;
  }
}

function setUsedDifferenceHandlersValue(): void {
  differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}

function increaseParameterValue(id: number): void {
  if (checkIncreaseParameterConditions(id)) {
    drawnParameters[id]++;
    usedParameterPoints++;
    differenceBetweenDrawnAndUsed--;
    refreshHTMLdata(id);
    addParametersValuesToHtmlHandlers(drawnParameters, loadModalNewSumHandler);
  }
}

function checkIncreaseParameterConditions(id: number): boolean {
  return (
    drawnParameters[id] < 18 &&
    differenceBetweenDrawnAndUsed > 0 &&
    sumOfDrawnParameters > 0
  );
}

function decreaseParameterValue(id: number): void {
  if (checkDecreaseParameterConditions(id)) {
    drawnParameters[id]--;
    usedParameterPoints--;
    differenceBetweenDrawnAndUsed++;
    refreshHTMLdata(id);
    addParametersValuesToHtmlHandlers(drawnParameters, loadModalNewSumHandler);
  }
}

function checkDecreaseParameterConditions(id: number): boolean {
  return drawnParameters[id] > 6 && sumOfDrawnParameters > 0;
}

function refreshHTMLdata(id: number): void {
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

function addParametersValuesToHtmlHandlers(
  values: number[],
  htmlHandlers: any[]
): void {
  for (let i = 0; i < htmlHandlers.length; i++) {
    htmlHandlers[i].innerText = values[i];
  }
}

function getSum(parameters: number[]): number {
  return parameters.reduce((a, b) => a + b, 0);
}
