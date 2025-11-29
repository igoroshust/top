const progress = document.getElementsByTagName('progress');
const meter = document.getElementById('timer');

/* progress */
progress[0].value = 1;
const intervalId = setInterval(() => {
    progress[0].value += 1

    if (progress[0].value == 100) { 
        clearInterval(intervalId);
        console.log('progress остановлен');
    }
}, 200);


/* meter */
let time = 1;
const meterInterval = setInterval(() => {
    timer.value = time;
    time -= 0.1;

    if (time <= 0) { 
        clearInterval(meterInterval);
        console.log('meter остановлен');
    }
}, 1000);