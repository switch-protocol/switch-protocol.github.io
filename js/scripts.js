const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");

let interval = null;

// Function to animate the text
function animateText(target, duration = 1500, intervalTime = 35) {
  let iteration = 0;  // Start from the first letter
  let lastIndex = -1; // Track the last letter revealed with the red class

  clearInterval(interval);  // Clear any existing intervals
  const startTime = Date.now();

  interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;

    // Build the text by iterating through the letters
    target.innerHTML = target.dataset.value
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          // Apply red class to the newly revealed letter for one iteration
          if (index === lastIndex + 1) {
            lastIndex = index;  // Update the lastIndex to mark this letter
            return `<span class="match">${target.dataset.value[index]}</span>`;
          }
          // Normal class (no red) after the first reveal
          return `<span>${target.dataset.value[index]}</span>`;
        }
        // Show random letters for unrevealed positions
        return `<span>${letters[Math.floor(Math.random() * letters.length)]}</span>`;
      })
      .join("");

    // Stop the animation when all letters are revealed
    if (iteration >= target.dataset.value.length) {
      clearInterval(interval);
    }

    // Update iteration as time progresses
    if (elapsedTime >= duration) {
      iteration += 1 / 5;
    }
  }, intervalTime);
}

// Start animation on page load
window.onload = function () {
  animateText(h1,1500,35);  // Initial load animation
  animateText(h2,3000,35);  // Initial load animation
  animateText(h3,4500,35);  // Initial load animation
};

// Mouseover event to reset and restart animation
h1.addEventListener('mouseover', () => {
  clearInterval(interval);  // Stop any ongoing animation
  animateText(h1, 0, 35);   // Restart the animation with faster timing
});