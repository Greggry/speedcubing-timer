/*
  display: none is a css prop to temporarily remove the whole tag
*/

const app = () => {

  const container = document.querySelector('.container');

  const timerWindow = document.querySelector('.timer-window');

  // timer div objects
  const scrambleText = document.querySelector('.scramble-text');
  const scrambleButton = document.querySelector('.scramble-btn');
  const timeDisplay = document.querySelector('.time-display');
  const timerInfo = document.querySelector('.timer-info');

  // sidebar
  const sidebarWindow = document.querySelector('.sidebar-window');

  const interval = 27; // amount of time between incrementing the timer in miliseconds (ms), 1000ms = 1s
  let running = false; // false = paused, true = running
  let duration = 0; // time in miliseconds
  let storeSetInterval; // to store setInterval function, in order to ber able to reset it

  timeDisplay.textContent = '00:00:00'; // initial value

  const toggleStartStop = () => {
    if (running) {
      // stop the timer, don't reset
      clearInterval(storeSetInterval);
      running = false;

      // save current time to the sidebar
      let newTime = document.createElement("div");
      newTime.setAttribute("class", "saved-time");
      newTime.textContent = timeFormat(duration);
      sidebarWindow.insertBefore(newTime, sidebarWindow.childNodes[5]);

      // check if a div .no-times exists
      let noTimesDiv = document.querySelector('.no-times');
      if (typeof(noTimesDiv) != undefined && noTimesDiv != null) {
        // exists, so we delete it
        noTimesDiv.parentNode.removeChild(noTimesDiv);
      }

      generateScramble();
    } else {
      // start the timer, reset
      running = true;
      duration = 0;
      storeSetInterval = setInterval(() => {
        duration += interval;
        displayTime();
      }, interval);
    }
  };

  const resetTimer = () => {
    // resetting timer
    running = false;
    duration = 0;
  };

  const displayTime = () => {
    timeDisplay.textContent = timeFormat(duration);
  }

  const toggleSidebar = () => {
    if (sidebarWindow.style.display == 'none') {
      sidebarWindow.style.display = 'block'; // initial value

      // remove Q
      let q = document.querySelector('.closed-sidebar-q'); // created in the else case below
      q.parentNode.removeChild(q); // removes Q

    } else {
      sidebarWindow.style.display = 'none';

      // leave a Q notifying of how to go reopen the sidebar
      let q = document.createElement('div');
      q.setAttribute('class', 'closed-sidebar-q'); // properties from css file
      q.textContent = 'Q'; // it's empty without that.
      timerWindow.appendChild(q); // integrate
    }
  };

  const generateScramble = () => {
    let randomNumbers = new Array(20);
    let outputText = '';

    for (let i = 0; i < 20; i++) {
      randomNumbers[i] = Math.floor((Math.random() * 10)) % 6; // 0, 1, 2, 3, 4, 5

      let temp; // placeholder

      // generate side to move
      switch (randomNumbers[i]) {
        case 0:
          temp = 'R';
          break;
        case 1:
          temp = 'L';
          break;
        case 2:
          temp = 'U';
          break;
        case 3:
          temp = 'D';
          break;
        case 4:
          temp = 'F';
          break;
        case 5:
          temp = 'B';
          break;
      }

      // generate move type (clockwise, counterclockwise or twice)
      let moveType = Math.floor(Math.random() * 10) % 3; // 0, 1, 2
      switch (moveType) {
        case 0:
          // default situation - clockwise
          break;
        case 1:
          // counterclockwise
          temp += "'";
          break;
        case 2:
          // 2 moves
          temp += "2";
          break;
      }

      outputText += ' ' + temp;
    }

    scrambleText.textContent = outputText;
  };

  generateScramble();

  const timeFormat = (totalTime) => {
    let minutes = Math.floor(totalTime / 60000) % 60;
    let seconds = Math.floor(totalTime / 1000) % 60;
    let hundreths = Math.floor(totalTime / 10) % 100; // hundreths of a second

    // 00:09 instead of 0:9
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (hundreths < 10) {
      hundreths = '0' + hundreths;
    }

    return `${minutes}:${seconds}:${hundreths}`;
  }

  scrambleButton.addEventListener('click', () => {
    if (!running) {
      generateScramble();
    }
  });

  timeDisplay.addEventListener('click', () => {
    toggleStartStop();
  });

  timerInfo.addEventListener('click', () => {
    toggleStartStop();
  });
  document.addEventListener('keypress', (ev) => {
    if (ev.code == 'Space') {
      toggleStartStop();
    }
    if (ev.code == 'KeyQ') {
      toggleSidebar();
    }
    console.log(ev.code);
  });

};

app();