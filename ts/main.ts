let drawButton: any = document.getElementById("draw");
let paramHandlers: any = document.getElementsByClassName("param_handler");
let sumHandler: any = document.getElementById("sum");
let usedHandler: any = document.getElementById("used");
let differenceHandler: any = document.getElementById("difference");
let allButtons: any = document.getElementsByTagName("button");

var drawnParameters: number[] = [0, 0, 0, 0, 0, 0];
var sumOfDrawnParameters: number;
var usedParameterPoints: number;
var differenceBetweenDrawnAndUsed: number;

const drawAllParameters = (e: MouseEvent) => {
    let i = 0;

    drawParam();

    for (let param of paramHandlers) {
        param.innerText = drawnParameters[i];
        i++;

    }

    usedParameterPoints = sumOfDrawnParameters;
    differenceBetweenDrawnAndUsed = 0;

    sumHandler.innerText = sumOfDrawnParameters;

    setUsedDifferenceHandlersValue(usedParameterPoints,
        differenceBetweenDrawnAndUsed);

};

drawButton?.addEventListener('click', drawAllParameters);

function drawParam() {
    sumOfDrawnParameters = 0;
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 10) + 9;
        sumOfDrawnParameters += drawnParameters[i];
    }
};

function setUsedDifferenceHandlersValue(used: number, difference: number): void {
    usedHandler.innerText = used;
    differenceHandler.innerText = difference;
}