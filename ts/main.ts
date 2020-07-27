const drawButtonHandler: any = document.getElementById("draw");
const saveButtonHandler: any = document.getElementById("save");
const loadButtonHandler: any = document.getElementById("load");
const paramHandlers: any = document.getElementsByClassName("param_handler");
const sumHandler: any = document.getElementById("sum");
const usedHandler: any = document.getElementById("used");
const differenceHandler: any = document.getElementById("difference");
const allButtonsHandlers: any = document.getElementsByTagName("button");

var drawnParameters: number[] = [0, 0, 0, 0, 0, 0];
var savedParameters: number[];
var sumOfDrawnParameters: number;
var usedParameterPoints: number;
var differenceBetweenDrawnAndUsed: number;

const drawAllParameters = (e: MouseEvent) => {

    drawParam();
    
    writeParametersInHtml();
};

drawButtonHandler?.addEventListener('click', drawAllParameters);

saveButtonHandler?.addEventListener('click', () => savedParameters = Object.assign([], drawnParameters));

loadButtonHandler?.addEventListener('click', () => {
    drawnParameters = Object.assign([], savedParameters);
    writeParametersInHtml();
})

for (let i = 0; i < allButtonsHandlers.length - 3; i++) {
    let id: number = allButtonsHandlers[i].id;
    if (i % 2) {
        allButtonsHandlers[i]?.addEventListener('click', () => increaseParameterValue(id));
    } else {
        allButtonsHandlers[i]?.addEventListener('click', () => decreaseParameterValue(id));
    }
}

function drawParam() {
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 14) + 5;
    }
};

function setUsedDifferenceHandlersValue(): void {
    differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}

function increaseParameterValue(id: number): void {
    if (checkIncreaseParameterConditions(id)) {
        drawnParameters[id]++;
        usedParameterPoints++;
        differenceBetweenDrawnAndUsed--;
        refreshHTMLdata(id);
    }
}

function checkIncreaseParameterConditions(id: number) : boolean {
    return drawnParameters[id] < 18 && differenceBetweenDrawnAndUsed > 0 && sumOfDrawnParameters > 0;
}

function decreaseParameterValue(id: number): void {
    if (checkDecreaseParameterConditions(id)) {
        drawnParameters[id]--;
        usedParameterPoints--;
        differenceBetweenDrawnAndUsed++;
        refreshHTMLdata(id);
    }
}

function checkDecreaseParameterConditions(id: number) : boolean {
    return drawnParameters[id] > 6 && sumOfDrawnParameters > 0;
}

function refreshHTMLdata(id: number): void {
    paramHandlers[id].innerText = drawnParameters[id];
    setUsedDifferenceHandlersValue();
}

function writeParametersInHtml(){
    let i:number = 0;
    sumOfDrawnParameters = 0;
    for (let handler of paramHandlers){
        handler.innerText = drawnParameters[i];
        sumOfDrawnParameters += drawnParameters[i];
        i++;
    }
    usedParameterPoints = sumOfDrawnParameters;
    differenceBetweenDrawnAndUsed = 0;
    sumHandler.innerText = sumOfDrawnParameters;

    setUsedDifferenceHandlersValue();
}