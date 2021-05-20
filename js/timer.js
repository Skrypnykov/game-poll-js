function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 90);
    
    return {
      'total': t,
      'seconds': seconds
    };
  }
   
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var secondsSpan = clock.querySelector('.seconds');
   
    function updateClock() {
      var t = getTimeRemaining(endtime);
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
    
  var toggleElement = document.getElementById('timerpause');
  var timeinterval = null;

  toggleElement.addEventListener( 'click', event_click_startpause );
  toggleElement.click();
  }
   
  var deadline = new Date(Date.parse(new Date()) + 1.5 * 60 * 1000); // for endless timer
  initializeClock('timer', deadline);