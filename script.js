// script.js

let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = 0;
let lapArray = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.style.display = "inline-block";
        pauseButton.style.display = "none";
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    difference = 0;
    display.innerHTML = "00:00:00.00";
    lapsList.innerHTML = "";
    lapArray = [];
}

function lap() {
    if (running) {
        let lapTime = display.innerHTML;
        lapArray.push(lapTime);
        let li = document.createElement('li');
        li.innerHTML = `Lap ${lapArray.length}: ${lapTime}`;
        lapsList.appendChild(li);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
