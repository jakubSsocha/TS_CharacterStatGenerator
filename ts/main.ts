const drawButtonHandler: any = document.getElementById("draw");
const paramHandlers: any = document.getElementsByClassName("param_handler");
const sumHandler: any = document.getElementById("sum");
const usedHandler: any = document.getElementById("used");
const differenceHandler: any = document.getElementById("difference");
const allButtonsHandlers: any = document.getElementsByTagName("button");

var drawnParameters: number[] = [0, 0, 0, 0, 0, 0];
var sumOfDrawnParameters: number;
var usedParameterPoints: number;
var differenceBetweenDrawnAndUsed: number;

const drawAllParameters = (e: MouseEvent) => {

    drawParam();
    
    let i:number = 0;
    
    for (let handler of paramHandlers){
        handler.innerText = drawnParameters[i];
        i++;
    }

    usedParameterPoints = sumOfDrawnParameters;
    differenceBetweenDrawnAndUsed = 0;

    sumHandler.innerText = sumOfDrawnParameters;

    setUsedDifferenceHandlersValue();

};

drawButtonHandler?.addEventListener('click', drawAllParameters);

for (let i = 0; i < allButtonsHandlers.length - 1; i++) {
    let id: number = allButtonsHandlers[i].id;
    if (i % 2) {
        allButtonsHandlers[i]?.addEventListener('click', () => increaseParameterValue(id));
    } else {
        allButtonsHandlers[i]?.addEventListener('click', () => decreaseParameterValue(id));
    }
}

function drawParam() {
    sumOfDrawnParameters = 0;
    for (let i = 0; i < 6; i++) {
        drawnParameters[i] = Math.floor(Math.random() * 10) + 9;
        sumOfDrawnParameters += drawnParameters[i];
    }
};

function setUsedDifferenceHandlersValue(): void {
    usedHandler.innerText = usedParameterPoints;
    differenceHandler.innerText = differenceBetweenDrawnAndUsed;
}

function increaseParameterValue(id: number): void {
    if (drawnParameters[id] < 18 && differenceBetweenDrawnAndUsed > 0 && sumOfDrawnParameters > 0) {
        drawnParameters[id]++;
        usedParameterPoints++;
        differenceBetweenDrawnAndUsed--;
        refreshHTMLdata(id);
    }
}

function decreaseParameterValue(id: number): void {
    if (drawnParameters[id] > 6 && sumOfDrawnParameters > 0) {
        drawnParameters[id]--;
        usedParameterPoints--;
        differenceBetweenDrawnAndUsed++;
        refreshHTMLdata(id);
    }
}

function refreshHTMLdata(id: number): void {
    paramHandlers[id].innerText = drawnParameters[id];
    setUsedDifferenceHandlersValue();
}