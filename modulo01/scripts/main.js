window.addEventListener("load", start);

let redInput = document.querySelector("#redInput");
let greenInput = document.querySelector("#greenInput");
let blueInput = document.querySelector("#blueInput");

function start() {
  initializeInputs();
  resetSliders();
  handleRedSliderMove();
  handleGreenSliderMove();
  handleBlueSliderMove();
  setBoxColor();
}

function initializeInputs() {
  redInput.value = 0;
  greenInput.value = 0;
  blueInput.value = 0;
}

function resetSliders() {
  const redSlider = document.querySelector("#red");
  const greenSlider = document.querySelector("#green");
  const blueSlider = document.querySelector("#blue");

  redSlider.value = 0;
  greenSlider.value = 0;
  blueSlider.value = 0;
}

function handleRedSliderMove() {
  const redSlider = document.querySelector("#red");
  redSlider.addEventListener("change", () => {
    redInput.value = redSlider.value;
    setBoxColor();
  });
}

function handleGreenSliderMove() {
  const greenSlider = document.querySelector("#green");
  greenSlider.addEventListener("change", () => {
    greenInput.value = greenSlider.value;
    setBoxColor();
  });
}

function handleBlueSliderMove() {
  const blueSlider = document.querySelector("#blue");
  blueSlider.addEventListener("change", () => {
    blueInput.value = blueSlider.value;
    setBoxColor();
  });
}

function setBoxColor() {
  const box = document.querySelector(".box");
  box.style.backgroundColor = `rgb(${redInput.value},
                                  ${greenInput.value},
                                  ${blueInput.value})`;
}
