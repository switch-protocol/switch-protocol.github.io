



const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";

// Store intervals for each element
let intervals = {};

// Helper function to animate text
function animateText(target, duration = 1500, intervalTime = 35, charTurns = 5) {
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

        // If all letters are revealed, clear the interval and make text a hyperlink
        if (iteration >= targetText.length) {
            clearInterval(interval);

            // Wrap text in a link if a URL is provided in the data-url attribute
            if (target.dataset.url) {
                target.innerHTML = `<a href="${target.dataset.url}" target="_blank">${targetText}</a>`;
            }
        }

        // Increase iteration as time progresses
        if (elapsedTime >= duration) {
            iteration += 1 / charTurns; // Adjust the rate of animation
        }
    }, intervalTime);

    return interval;  // Return the interval ID
}

// Start animations for all h1, h2, and h3 elements on page load
window.onload = function () {
    const h1Elements = document.querySelectorAll("h1");
    h1Elements.forEach((h1) => {
        intervals[h1.dataset.value] = animateText(h1, 1000, 35, 4);
    });

    const h2Elements = document.querySelectorAll("h2");
    h2Elements.forEach((h2) => {
        intervals[h2.dataset.value] = animateText(h2, 2500, 35, 3);
    });

    const h3Elements = document.querySelectorAll("h3");
    h3Elements.forEach((h3) => {
        intervals[h3.dataset.value] = animateText(h3, 4000, 35, 2);
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
        intervals[element.dataset.value] = animateText(element, 0, 35, 5);
    });
}

// Add the mouseover event listeners for all h1, h2, and h3 elements
document.querySelectorAll("h1").forEach(restartAnimationOnHover);


