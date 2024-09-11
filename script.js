/******************************************************************************
 * Global Variables
******************************************************************************/
let startingSize = 32;
/*****************************************************************************/

/******************************************************************************
 * Functions
******************************************************************************/
function increaseRgbaAlpha(cssRgbaString) {
    // Parse the RGBA string values into an array.
    // Sometimes there will be four values if the alpha channel
    // is less than 1.0.  Other times there can be only three values
    // if the alpha channel is equal to 1.0.
    const ALPHA_IDX = 3;
    let openingParens = String(cssRgbaString).indexOf("(");
    let closingParens = String(cssRgbaString).indexOf(")");
    let valuesSubString = String(cssRgbaString).slice(openingParens + 1, closingParens);
    let rgbaValues = valuesSubString.split(",");

    if (rgbaValues.length === 4) {
        // Convert the alpha channel value to a float
        let alpha = parseFloat(rgbaValues[ALPHA_IDX]);

        // The alpha channel is included in the cssRgbaString.
        // Increase the alpha channel value by 0.1, up to 1.0.
        if (alpha < 0.9) {
            alpha += 0.1;
        }
        else {
            alpha = 1.0;
        }

        // Replace the alpha channel value with the newly calculated value
        rgbaValues[ALPHA_IDX] = ` ${alpha}`;
    }
    else {
        rgbaValues.push(" 1.0");
    }

    // Recreate the cssRgbaString
    // rgba(71, 18, 74, 0)
    return `rgba(${rgbaValues[0]},${rgbaValues[1]},${rgbaValues[2]},${rgbaValues[3]})`;
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
        this.style.backgroundColor = 
        increaseRgbaAlpha(this.style.backgroundColor);
    });

    // Add the tile to the passed-in element
    targetElement.appendChild(newTile);
}

function populateCanvas(size) {
    const canvas = document.querySelector("#canvas");

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
    while ((newSize < 1) || (newSize > 100) || (isNaN(newSize))) {
        const userInput = prompt("Enter a new grid size (1 - 100)");
        newSize = Number.parseInt(userInput);
    }
    populateCanvas(newSize);
})

// Populate the canvas with a new grid
populateCanvas(startingSize);
/*****************************************************************************/

