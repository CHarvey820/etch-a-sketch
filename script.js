const gridContainer = document.querySelector("#grid");
const colorPicker = document.querySelector("#colorPicker");
const span = document.querySelector("#clrText");

const width = 600;

function addSquares(gridValue) {
  for (let i = 0; i < gridValue; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.style.height = `${width / gridValue}px`;
    gridContainer.appendChild(row);
    for (let i = 0; i < gridValue; i++) {
      const newSquare = document.createElement("div");
      newSquare.className = "square";
      newSquare.style.width = `${width / gridValue}px`;
      row.appendChild(newSquare);
    }
  }
}

function resetGrid() {
  //   let rows = document.querySelectorAll(".row");
  //   let rowArr = Array.from(rows);
  //   for (const row of rowArr) {
  //     gridContainer.removeChild(row);
  //   }
}

colorPicker.onchange = () => {
    console.log(colorPicker.value);
    // https://martech.zone/how-can-you-programmatically-change-font-color-based-on-the-background-light-dark-mode/
    var threshold = 149;
    let r = 0,
      g = 0,
      b = 0;
  
      r = "0x" + colorPicker.value[1] + colorPicker.value[2];
      g = "0x" + colorPicker.value[3] + colorPicker.value[4];
      b = "0x" + colorPicker.value[5] + colorPicker.value[6];
    
    span.style.color =  r * 0.299 + g * 0.587 + b * 0.114 > threshold ? "#000000" : "#ffffff";
};

addSquares(10);
