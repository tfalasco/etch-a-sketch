/******************************************************************************
 * Global Variables
******************************************************************************/
const canvas = document.querySelector("#canvas");
let numGridSquaresPerSide = 1;
/*****************************************************************************/

/******************************************************************************
 * Functions
******************************************************************************/
function getAlphaFromRgba(cssRgbaString) {
    let lastComma = String(cssRgbaString).lastIndexOf(",");
    let alpha = String(cssRgbaString).slice(lastComma + 1);
    alpha = Number.parseFloat(alpha);
    return alpha;
}

function increaseRgbaAlpha(cssRgbaString) {
    let oldAlpha = getAlphaFromRgba(cssRgbaString);
    let newAlpha;
    if (oldAlpha < 0.9) {
        newAlpha = oldAlpha + 0.1;
    }
    else {
        newAlpha = 1.0;
    }
    return String(cssRgbaString).replace(`${oldAlpha})`, `${newAlpha})`);
}

function addTileTo(targetElement) {
    const red = Math.random() * 255;
    const green = Math.random() * 255;
    const blue = Math.random() * 255;
    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    newTile.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0)`;
    newTile.addEventListener("mouseenter", function () {
        this.style.backgroundColor = increaseRgbaAlpha(this.style.backgroundColor);
    });
    targetElement.appendChild(newTile);
}

function populateCanvas(size) {
    // Clear the canvas
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }
    const tileSize = canvas.clientWidth / size;
    for (let row = 0; row < size; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.flexDirection = "row";
        rowDiv.style.flex = "1 1 100%";
        for (let col = 0; col < size; col++) {
            addTileTo(rowDiv);
        }
        canvas.appendChild(rowDiv);
    }
}
/*****************************************************************************/

/******************************************************************************
 * Main Script
******************************************************************************/
const gridSize = document.querySelector("#gridSize");
gridSize.addEventListener("change", function() {
    numGridSquaresPerSide = gridSize.value;
    populateCanvas(numGridSquaresPerSide);
})
populateCanvas(numGridSquaresPerSide);
/*****************************************************************************/

