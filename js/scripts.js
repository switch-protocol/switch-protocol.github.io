const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";
const h1 = document.querySelector("h1");

let interval = null;
let redToggle = false;  // To track if the letter should be red or not

// Function to animate the text
function animateText(target, duration = 2000, intervalTime = 40) {
  let iteration = 0;
  redToggle = false; // Reset the redToggle for each animation
  const startTime = Date.now();
  
  // Clear any existing interval
  clearInterval(interval);

  interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;

    target.innerHTML = target.dataset.value
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          // Toggle red color on matched letters
          return redToggle
            ? `<span class="match">${target.dataset.value[index]}</span>`
            : `<span>${target.dataset.value[index]}</span>`;
        }
        // Display random letters for unmatched positions
        return `<span>${letters[Math.floor(Math.random() * letters.length)]}</span>`;
      })
      .join("");

    // Increase iteration after duration has passed
    if (iteration >= target.dataset.value.length) {
      clearInterval(interval);
    }

    if (elapsedTime >= duration) {
      iteration += 1 / 3;
      redToggle = !redToggle; // Toggle red color after each full iteration
    }
  }, intervalTime);
}

// Initial load animation
window.onload = function () {
  animateText(h1); // Start animation for page load
};

// Hover effect
h1.onmouseover = event => {
  animateText(event.target, 0, 30); // Reset and reanimate text on hover with faster intervals
};
