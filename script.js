const gridContainer = document.querySelector("#grid");
const colorPicker = document.querySelector("#colorPicker");
const span = document.querySelector("#colorText");
const resizeBtn = document.querySelector("#resizeGridBtn");
const clearBtn = document.querySelector("#clearGridBtn");
const randomize = document.querySelector("#randomize");

const GRID_CONTAINER_WIDTH = 600;
const GRID_VALUE_DEFAULT = 4;

let gridValue = GRID_VALUE_DEFAULT;

/**------------------------------- FUNCTIONS ----------------------------------------------------------------------------------------------------------  */

/**
 * Creates a new grid of rows with squares based on given grid value
 * @param {any} gridValue user prompted value for grid resize
 * @returns {any}
 */
function createGrid(gridValue) {
  for (let i = 0; i < gridValue; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.style.height = `${GRID_CONTAINER_WIDTH / gridValue}px`;
    gridContainer.appendChild(row);
    for (let i = 0; i < gridValue; i++) {
      const newSquare = document.createElement("div");
      newSquare.className = "square";
      newSquare.style.width = `${GRID_CONTAINER_WIDTH / gridValue}px`;
      row.appendChild(newSquare);
      newSquare.addEventListener("mouseover", () => {
        if (randomize.checked) {
            //https://css-tricks.com/snippets/javascript/random-hex-color/
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            newSquare.style.background = `#${randomColor}`;
         } else {
            newSquare.style.background = `${colorPicker.value}`;
         }
      });
    }
  }
}

/**
 * Resets the current grid, removing all rows and squares
 * @returns {any}
 */
function resetGrid() {
  let rows = document.querySelectorAll(".row");
  let rowArr = Array.from(rows);
  for (const row of rowArr) {
    gridContainer.removeChild(row);
  }
}


/**
 * Checks if the prompted grid value is valid => between 3 and 100
 * @param {any} gridValue
 * @returns {any}
 */
function checkValidGridValue(userGridValue){
    if (userGridValue < 3 || userGridValue > 100) {
        newGridValue = prompt("Please enter a grid value between 3 and 100: ");
        checkValidGridValue(newGridValue);
    } else {
        gridValue = userGridValue;
        return true;
    }
}

/**------------------------------- EVENT LISTENERS ----------------------------------------------------------------------------------------------------------  */

/**
 * Creates a fresh 4x4 grid on page load, reset colorPicker values and contrast elements
 * @param {any} 'DOMContentLoaded'
 * @param {any} (
 * @returns {any}
 */
document.addEventListener("DOMContentLoaded", () => {
  createGrid(GRID_VALUE_DEFAULT);
  colorPicker.value = "#000000";
  span.style.color = "white";
  colorPicker.style.border = "2px solid white";
  randomize.checked = false;
});

/**
 * Add click listener to resize btn
 *      - Prompt user for valid grid size
 *      - resetGrid to clear grid
 *      - createGrid with new value
 * @param {any} "click"
 * @param {any} (
 * @returns {any}
 */
resizeBtn.addEventListener("click", () => {
  let newGridValue = prompt("Enter a new grid value (between 3 and 100): ");
  checkValidGridValue(newGridValue);
  resetGrid();
  createGrid(gridValue);
});

/**
 * Clears the current grid, reset and create new grid with same gridValue
 * @param {any} "click"
 * @param {any} (
 * @returns {any}
 */
clearBtn.addEventListener("click", () => {
    resetGrid();
    createGrid(gridValue);
});


/**
 * Changes the color of the input span text and input background to white or black, depending on the contrast of the background color to improve readability
 *      -Does not work 100% as intended, not sure how to chnage the value when clikcing on the color itself in the input colorpicker
 * @returns {any}
 */
colorPicker.onchange = () => {
  // https://martech.zone/how-can-you-programmatically-change-font-color-based-on-the-background-light-dark-mode/
  var threshold = 149;
  let r = 0,
    g = 0,
    b = 0;

  r = "0x" + colorPicker.value[1] + colorPicker.value[2];
  g = "0x" + colorPicker.value[3] + colorPicker.value[4];
  b = "0x" + colorPicker.value[5] + colorPicker.value[6];

  const colorValue =
    r * 0.299 + g * 0.587 + b * 0.114 > threshold ? "#000000" : "#ffffff";
  span.style.color = colorValue;
  colorPicker.style.border = `2px solid ${colorValue}`;
};

