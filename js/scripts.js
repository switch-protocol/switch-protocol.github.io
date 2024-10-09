const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";

// Store intervals for each element
let intervals = {};

// Helper function to animate text
function animateText(target, duration = 1500, intervalTime = 35) {
    let iteration = 0;
    let lastIndex = -1;

    const startTime = Date.now();
    const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const targetText = target.dataset.value;

        // Update target content based on iteration
        target.innerHTML = targetText.split("").map((letter, index) => {
            if (index < iteration) {
                // If the letter was just revealed, apply the "match" class
                if (index === lastIndex + 1) {
                    lastIndex = index;
                    return `<span class="match">${letter}</span>`;
                }
                return `<span>${letter}</span>`;
            }
            return `<span>${letters[Math.floor(Math.random() * letters.length)]}</span>`;
        }).join("");

        // If all letters are revealed, clear the interval
        if (iteration >= targetText.length) {
            clearInterval(interval);
        }

        // Increase iteration as time progresses
        if (elapsedTime >= duration) {
            iteration += 1 / 5; // Adjust the rate of animation
        }
    }, intervalTime);

    return interval;  // Return the interval ID
}

// Start animations for all h1 elements on page load
window.onload = function () {
    const h1Elements = document.querySelectorAll("h1");
    h1Elements.forEach((h1) => {
        intervals[h1.dataset.value] = animateText(h1, 1000, 35);
    });

    const h2Elements = document.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
        intervals[h2.dataset.value] = animateText(h2, 2000, 35);
    });

    const h3Elements = document.querySelectorAll("h3");
    h3Elements.forEach((h3) => {
        intervals[h3.dataset.value] = animateText(h3, 3500, 35);
    });
};

// Mouseover event to reset and restart animation on each element
function restartAnimationOnHover(element, tag) {
    element.addEventListener('mouseover', () => {
        // Clear the specific interval for the element
        if (intervals[element.dataset.value]) {
            clearInterval(intervals[element.dataset.value]);
        }
        // Restart animation for the element
        intervals[element.dataset.value] = animateText(element, 0, 35);
    });
}

// Add the mouseover event listeners for all h1, h2, and h3 elements
document.querySelectorAll("h1").forEach(restartAnimationOnHover);
document.querySelectorAll("h2").forEach(restartAnimationOnHover);
document.querySelectorAll("h3").forEach(restartAnimationOnHover);
