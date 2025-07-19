let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapList = document.getElementById("lapList");

function formatTime(ms) {
  let date = new Date(ms);
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  const currentTime = Date.now();
  const time = elapsedTime + (currentTime - startTime);
  display.textContent = formatTime(time);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    isRunning = true;
  }
});

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(interval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  lapList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const currentLapTime = Date.now() - startTime + elapsedTime;
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(currentLapTime);
    lapList.appendChild(lapItem);
  }
});
