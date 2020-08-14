let hours;
let hoursLEDs = [...document.querySelectorAll('.hours')];
let quarters;
let quartersLEDs = [...document.querySelectorAll('.quarters')];
let minutes;
let minutesLEDs = [...document.querySelectorAll('.minutes')];
let seconds;
let secondsLEDs = [...document.querySelectorAll('.seconds')];

function draw(timestamp) {
    let [hour, minute, second] = (new Date()).toLocaleTimeString().slice(0, 8).split(":")

    if (seconds !== second) {
        seconds = second;
        for (i = 0; i < 3; i++) {
            secondsLEDs[i].classList.remove('on');
        }
        secondsLEDs[seconds % 3].classList.add('on');
    }

    if (minutes !== minute % 15) {
        minutes = minute % 15;
        quarters = (minute - minutes) / 15;
        for (i = 0; i < 3; i++) {
            if (i < quarters) {
                if (!quartersLEDs[i].classList.contains('on')) {
                    quartersLEDs[i].classList.add('on');
                }
            } else {
                quartersLEDs[i].classList.remove('on');
            }
        }
        for (i = 0; i < 14; i++) {
            if (i < minutes) {
                if (!minutesLEDs[i].classList.contains('on')) {
                    minutesLEDs[i].classList.add('on');
                }
            } else {
                minutesLEDs[i].classList.remove('on');
            }
        }
        if (hours !== hour) {
            hours = hour;
            for (i = 0; i < 12; i++) {
                if (i < hours) {
                    if (!hoursLEDs[i].classList.contains('on')) {
                        hoursLEDs[i].classList.add('on');
                    }
                } else {
                    hoursLEDs[i].classList.remove('on');
                }
            }
        }
    }
    
    clockTicking = requestAnimationFrame(draw);
}

let clockTicking = requestAnimationFrame(draw);

let watch = document.querySelector('.watch');
watch.style.display = "block"; // Avoid FOUC
let isRandomFlashing = false;

watch.addEventListener('click', () => {
    // Prevent creating extra setIntervals
    if (isRandomFlashing) return;
    isRandomFlashing = true;

    // Pause normal clock function
    cancelAnimationFrame(clockTicking);

    // Remove all '.on' classes, turn lights off
    let LEDs = [...document.querySelectorAll('.led')];
    for (i = 0; i < LEDs.length; i++) {
        LEDs[i].classList.remove('on');
    }

    let randomFlash = setInterval(() => {
        // Light up random lights by looping through all
        // of them and having a 33% chance of lighting up
        for (i = 0; i < LEDs.length; i++) {
            if (Math.random() < .33) {
                if (!LEDs[i].classList.contains('on')) {
                    LEDs[i].classList.add('on');
                }
            } else {
                LEDs[i].classList.remove('on');
            }
        }
    }, 50);

    // In order to update the hours and minutes
    minutes = null;
    hours   = null;

    setTimeout(()=> {
        clearInterval(randomFlash);
        clockTicking = requestAnimationFrame(draw);
        isRandomFlashing = false;
    }, 1000);
});
