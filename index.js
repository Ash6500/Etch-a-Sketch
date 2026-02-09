const container = document.getElementById("container");
const resizeBtn = document.getElementById("resizeBtn");

const TOTAL_SIZE = 960;

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
  container.innerHTML = "";

  const squareSize = TOTAL_SIZE / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // track darkness level (0–10)
    square.dataset.darkness = 0;

    square.addEventListener("mouseenter", () => {
      let darkness = Number(square.dataset.darkness);

      if (darkness === 0) {
        // first interaction: assign random color
        square.style.backgroundColor = getRandomRGB();
      }

      if (darkness < 10) {
        darkness += 1;
        square.dataset.darkness = darkness;
        square.style.opacity = darkness / 10;
      }
    });

    container.appendChild(square);
  }
}

// initial grid
createGrid(16);

resizeBtn.addEventListener("click", () => {
  let userInput = Number(
    prompt("Enter number of squares per side (max 100):")
  );

  if (Number.isNaN(userInput) || userInput <= 0 || userInput > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  createGrid(userInput);
});
