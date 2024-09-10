/******************************************************************************
 * Global Variables
******************************************************************************/
const canvas = document.querySelector("#canvas");
let startingSize = 32;
/*****************************************************************************/

/******************************************************************************
 * Functions
******************************************************************************/
function getAlphaFromRgba(cssRgbaString) {
    // The alpha value is the last item in the CSS RGBA string
    let lastComma = String(cssRgbaString).lastIndexOf(",");
    
    // Extract the alpha part of the string
    let alpha = String(cssRgbaString).slice(lastComma + 1);

    // Parse the string as a float and return it
    return Number.parseFloat(alpha);
}

function increaseRgbaAlpha(cssRgbaString) {
    let oldAlpha = getAlphaFromRgba(cssRgbaString);
    let newAlpha;

    // Increase alpha by 0.1 up to 1.0
    if (oldAlpha < 0.9) {
        newAlpha = oldAlpha + 0.1;
    }
    else {
        newAlpha = 1.0;
    }

    // Recreate the CSS RGBA string with the new alpha value
    return String(cssRgbaString).replace(`${oldAlpha})`, `${newAlpha})`);
}

function addTileTo(targetElement) {
    // Randomize the color
    const red = Math.random() * 255;
    const green = Math.random() * 255;
    const blue = Math.random() * 255;

    // Create the tile
    const newTile = document.createElement("div");
    newTile.classList.add("tile");
    newTile.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0)`;
    newTile.addEventListener("mouseenter", function () {
        this.style.backgroundColor = increaseRgbaAlpha(this.style.backgroundColor);
    });

    // Add the tile to the passed-in element
    targetElement.appendChild(newTile);
}

function populateCanvas(size) {
    // Clear the canvas
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild);
    }

    // Create a new grid on the canvas, row by row
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
// Set a callback for the resize button
const resizeBtn = document.querySelector("#resizeBtn");
resizeBtn.addEventListener("click", function() {
    let newSize = 0;
    // Prompt the user for a new grid size between 1 and 100
    while ((newSize < 1) || (newSize > 100) || (NaN === newSize)) {
        const userInput = prompt("Enter a new grid size (1 - 100)");
        newSize = Number.parseInt(userInput);
    }
    populateCanvas(newSize);
})

// Populate the canvas with a new grid
populateCanvas(startingSize);
/*****************************************************************************/

