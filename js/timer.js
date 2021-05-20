function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 90);
    
    return {
      'total': t,
      'seconds': seconds
    };
  }
   
  function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let secondsSpan = clock.querySelector('.seconds');
    
    function updateClock() {
      let t = getTimeRemaining(endtime);
      
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
   
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    function event_click_startpause( event ){

    if( timeinterval === null ){
      start();
      event.target.innerText = 'Пауза';
    } else {
      pause();
      event.target.innerText = 'Старт';
    }
  }

  function start(){
    updateClock();
    timeinterval = setInterval(updateClock, 1000);
  }
  function pause() {
    clearInterval( timeinterval );
    timeinterval = null;
    }
    
  let toggleElement = document.getElementById('timerpause');
  let timeinterval = null;
  
  toggleElement.addEventListener( 'click', event_click_startpause );
  toggleElement.click();
  }
   
  let deadline = new Date(Date.parse(new Date()) + 1.5 * 60 * 1000); // for endless timer
  initializeClock('timer', deadline);