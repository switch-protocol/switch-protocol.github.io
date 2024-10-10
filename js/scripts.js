// Store the links in an object
const links = {
    artist_one_social: "https://soundcloud.com/keefemusic",
    artist_two_social: "https://soundcloud.com/nathaniel_pavel",
    artist_three_social: "https://soundcloud.com/mikext",
    artist_one_sound: "https://soundcloud.com/keefemusic",
    artist_two_sound: "https://soundcloud.com/nathaniel_pavel",
    artist_three_sound: "https://soundcloud.com/mikext",
    location_link: "https://www.google.com/maps/place/2011+W+North+Ave,+Chicago,+IL+60647,+USA/@41.9102697,-87.6786115,19z/data=!3m1!4b1!4m6!3m5!1s0x880fd2b8a7224829:0x6de43eb4ecc04f3c!8m2!3d41.9102687!4d-87.6779678!16s%2Fg%2F11b8z17mmr?entry=ttu&g_ep=EgoyMDI0MTAwNy4xIKXMDSoASAFQAw%3D%3D",
    calendar_link: "https://calendar.google.com/calendar/share?slt=1AUWfa3gsRAQSLAmE-NqxPo_2UZuHul4EJiTR0JdQI5N0AtkIiRuWVwoXuqMkSuxqcaWoadotfRzBZQ",
    ra_link: "https://ra.co/events/2009773",
    instagram_link: "https://www.instagram.com/switch_protocol_/"
};

// Find all links with the class 'link' and dynamically set href from links object
document.querySelectorAll('.link').forEach(function(anchor) {
    // Get the URL reference from the data-url attribute
    const urlKey = anchor.getAttribute('data-url');
  
    // Set the href of the link dynamically using the links object
    if (links[urlKey]) {
      anchor.href = links[urlKey];
    }
});

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

        // If all letters are revealed, clear the interval
        if (iteration >= targetText.length) {
            clearInterval(interval);
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
function restartAnimationOnHover(element) {
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
