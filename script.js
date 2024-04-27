window.onload = function() {
    setTimeout(function() {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.stopwatch').style.display = 'block';
    }, 5000); // 10000ms = 10s
  };

  let text = document.getElementById('animated-text');
text.innerHTML = text.textContent.replace(/\S/g, function(letter, index) {
  return `<span class='letter' style='--i:${index}'>${letter}</span>`;
});

let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById('displayTime');
let timer= null;
function stopwatch() {
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
}
  function watchstart(){
    if(timer!=null){
        clearInterval(timer);
        }
    timer = setInterval(stopwatch, 1000);
  }
  function watchstop(){ 
    clearInterval(timer);
    timer = null;
  }
  function watchreset(){
    clearInterval(timer);
    timer = null;
    [seconds, minutes, hours] = [0, 0, 0];
    displayTime.textContent = "00:00:00";
  }