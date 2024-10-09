const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]/:_-";
const h1 = document.querySelector("h1");

let interval = null;

window.onload = function() {
  let iteration = 0;
  
  // Clear any existing interval
  clearInterval(interval);
  
  let duration = 2000; // 2 seconds for the initial random letters
  let startTime = Date.now();

    // Start the interval for the animation
    interval = setInterval(() => {

      const elapsedTime = Date.now() - startTime;

      h1.innerHTML = h1.dataset.value
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            // On each interval, for each iteration, if the current letter is not the target letter, change.
            return `<span class="match">${h1.dataset.value[index]}</span>`;
          }
          // Otherwise, get a number between 0.0 - 1.0 and multiply 
          return `<span>${letters[Math.floor(Math.random() * letters.length)]}</span>`
        })
        .join("");
      
      if(iteration >= h1.dataset.value.length){ 
        clearInterval(interval);
      }
      if (elapsedTime >= duration) {
        iteration += 1 / 3;
      } else {
        return;
      }
    }, 40);
  };



h1.onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerHTML = event.target.dataset.value
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * letters.length)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
};