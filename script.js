window.addEventListener('DOMContentLoaded', (event) => {
    const body = document.getElementById('body');
    const loader = document.getElementById('loader');
  
    // Change the body's background to black when the page loads
    body.style.background = '#00010f';
  
    // Hide the loader and change the body's background back to the image after a timeout
    setTimeout(() => {
      loader.style.display = 'none';
      body.style.background = "url('images/background.jpg') no-repeat center center fixed";
      body.style.backgroundSize = 'cover';
    }, 5000); // Adjust the timeout as needed
  });

  window.addEventListener('DOMContentLoaded', (event) => {
    const body = document.getElementById('body');
    const loader = document.getElementById('loader');
  
    // Add the style to the body when the page loads
    body.style.height = '100vh';
  
    // Hide the loader and remove the style from the body after a timeout
    setTimeout(() => {
      loader.style.display = 'none';
      body.style.height = '';
    }, 5000); // Adjust the timeout as needed
  });

window.onload = function () {
  setTimeout(function () {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.stopwatch').style.display = 'block';
  }, 5000); // 5000ms = 5s

  let text = document.getElementById('animated-text');
  text.innerHTML = text.textContent.replace(/\S/g, function (letter, index) {
      return `<span class='letter' style='--i:${index}'>${letter}</span>`;
  });

  let [seconds, minutes, hours] = [0, 0, 0];
  let displayTime = document.getElementById('displayTime');
  let timer = null;

  function stopwatch() {
      // Check if the timer is active before updating the time and rotating the hands
      if (timer !== null) {
          seconds++;
          if (seconds / 60 === 1) {
              seconds = 0;
              minutes++;
              if (minutes / 60 === 1) {
                  minutes = 0;
                  hours++;
              }
          }
          displayTime.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

          // Calculate rotation angles for each hand
          let secondDegrees = seconds * 6; // Each second advances the second hand by 6 degrees
          let minuteDegrees = minutes * 6 + seconds * 0.1; // Each minute advances the minute hand by 6 degrees, and each second advances it by 0.1 degree
          let hourDegrees = hours * 30 + minutes * 0.5; // Each hour advances the hour hand by 30 degrees, and each minute advances it by 0.5 degree

          // Apply rotations to the hands using CSS transformations
          document.getElementById('second-hand').style.transform = `rotate(${secondDegrees}deg)`;
          document.getElementById('minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
          document.getElementById('hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
      }
  }

  function watchstart() {
      if (timer === null) {
          timer = setInterval(stopwatch, 1000);
      }
  }

  function watchstop() {
      clearInterval(timer);
      timer = null;
  }

  function watchreset() {
      clearInterval(timer);
      timer = null;
      [seconds, minutes, hours] = [0, 0, 0];
      displayTime.textContent = "00:00:00";

      // Reset hands position
      document.getElementById('second-hand').style.transform = `rotate(0deg)`;
      document.getElementById('minute-hand').style.transform = `rotate(0deg)`;
      document.getElementById('hour-hand').style.transform = `rotate(0deg)`;
  }

  function recordLap() {
      // Create a new <li> element to hold the lap time
      let lapItem = document.createElement('li');
      lapItem.textContent = displayTime.textContent;

      // Append the new lap time to the laps list
      document.getElementById('laps-list').appendChild(lapItem);
  }

  // Add event listeners to buttons
  document.querySelector('.start-btn').addEventListener('click', watchstart);
  document.querySelector('.stop-btn').addEventListener('click', watchstop);
  document.querySelector('.reset-btn').addEventListener('click', watchreset);
  document.querySelector('.lap-btn').addEventListener('click', recordLap);
}; 
