const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";
const h1 = document.querySelector("h1");

let interval = null;
let lastIteration = -1; // To track when a new letter is revealed

// Function to animate the text
function animateText(target, duration = 2000, intervalTime = 40) {
  let iteration = 0; // Reset iteration

  clearInterval(interval);  // Clear any existing intervals
  const startTime = Date.now();

  interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;

    target.innerHTML = target.dataset.value
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          // Apply red class only to the newly revealed letter
          if (index === Math.floor(iteration - 1) && index > lastIteration) {
            return `<span class="match">${target.dataset.value[index]}</span>`;
          }
          // Apply default (no class or normal) after the first reveal
          return `<span>${target.dataset.value[index]}</span>`;
        }
        // Display random letters for unrevealed positions
        return `<span>${letters[Math.floor(Math.random() * letters.length)]}</span>`;
      })
      .join("");

    if (iteration >= target.dataset.value.length) {
      clearInterval(interval);  // Stop animation when all letters are revealed
    }

    // Update iteration when the duration has passed
    if (elapsedTime >= duration) {
      iteration += 1 / 3;
      lastIteration = Math.floor(iteration - 1); // Track the last full letter revealed
    }
  }, intervalTime);
}

// Initial load animation
window.onload = function () {
  animateText(h1); // Start animation on page load
};

// Hover effect
h1.onmouseover = event => {
  clearInterval(interval); // Stop the current interval when hover starts
  lastIteration = -1; // Reset lastIteration to -1
  animateText(event.target, 0, 30); // Restart animation from the beginning
};
