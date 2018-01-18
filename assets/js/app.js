// hamburger

// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function() {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  // Do something else, like open/close menu
});


$( document ).ready(function() {
    $('.sound').on('click', function(){
        $(this).toggleClass('sound--off');
    });
    //Добавляем колонки
    generateColumns();


});



// test

if( !Array.prototype.equals ) {

	Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;
        
    var count = 0;

    for (var i = 0, l=this.length; i < l; i++) {
        
        this[i] == array[i] ? (++count) : 0;
        
    }       
    return count;
  }

}




	let questions = [

    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0

	], link = 'assets/tracks/track', answers = [], trackId = 0, track, testStarted =startInterval= false;
  // интервал мигания
  function colourInterval(){
    
    let columnTrack = $('[data-track="'+trackId+'"]');
    startInterval = setInterval(function(){

      columnTrack.toggleClass('track');

    }, 500)

    
  }

  //Трэк загрузился
  function trackLoaded() {
  
  	
  
  }
  
  //Трек проиграл
  function trackEnded(trackId) {
  
    console.info(`fn trackEnded: трек закончился ${link}-${trackId+1}.mp3`);
    console.info(`fn trackEnded: ждем ответа пользователя`);
  
  }
  
  //Грузим трэк
  function loadTrack(trackId) {
    
    let currentColumn = $(this).data("column");
  	track = new Audio(`${link}-${trackId+1}.mp3`);
    
    track.addEventListener("loadeddata", function() {

      console.info(`fn loadTrack: воспроизводим трек ${link}-${trackId+1}.mp3`);

      trackLoaded();
      track.play();

    });

    track.addEventListener("ended", function() {

      trackEnded(trackId);
      
    });
    
    return track;
  
  }
  
  function result() {
  
    let percent = questions.equals(answers) * 10;
    
    resultAnimate();
    svgAnimate(percent);


  
  }

  // анимация SVG
  function svgAnimate(percent){
    let rate = $('.controller__result-rate');
    let svgRate = $('.circle');
    let svgPercentage = $('.percentage');
    let svgBlock = $('.single-chart');
    let resultBlock = $('.controller__result');
    
    svgBlock.css('transform', 'scale(1, 1)');
    rate.text(`${percent}`);
    svgRate.css({"stroke-dasharray":`${percent} 100`, "animation-name":"progress", "animation-duration": "6s", "animation-direction": "forwards"});
    svgPercentage.text(`${percent}`);

  }

  // анимация текста результата

  function resultAnimate(){

    let containerResult = $('.controller__result');
    let textResult =  $('.controller__result-level');

    containerResult.css('margin-top', '115px');
    textResult.css('transform', 'scale(1, 1)');
  }

  //CallBack тест закончился
  function testEnded() {

    console.info(`fn testEnded: тест закончился`);

    //Выводим результат
    result();

  }
  
  //Воспроизводим трэк
  function play(trackId) {
    colourInterval();
    //Тест закончился
    if( trackId >= questions.length ) {

      testEnded();
      testStarted = false;

    //Продолжаем тест
    } else {

      let track = loadTrack(trackId);

    }

    
  
  }

  //Добавляем колонки
  function generateColumns() {

    let columns='';

    for(let i =0; i < questions.length; i++) {

      columns +=`<div class="controller__column" data-column="${i}">
      <div class="controller__column-track" data-track="${i}"></div>
      <div class="controller__column-choise controller__column-choise--true" data-answer="true" data-true="${i}"></div>
      <div class="controller__column-choise controller__column-choise--false" data-answer="false" data-false="${i}"></div>
    </div>`;

    }

    $(".controller__panel").append(columns);

    console.info(`fn generateColumns: генерируем колонки`);

  }

//Начинаем тест
function beginTest() {

  if(testStarted){
    return false;
  } else {
    testStarted = true;

    play(trackId);
  
    console.info(`fn beginTest: начинаем тест`);
  }
}

function nextTrack(){
  play( ++trackId );
}

function getAnswer (answer) {

    answers.push(answer);
    console.info(`fn getAnswer: добавляем ответ ${answer}`);
    console.info(`fn getAnswer: массив ответов изменен на ${answers}`);
    console.info(`--------------------------------------------------`);
    play( ++trackId );
    
};



$(document).on('click', '.controller__column', function(e){

  
  let $this = $(this);
  let thisId = $this.data("column");

  if( thisId !== trackId || !testStarted ) return false;
  if( track ) track.pause();

  let $answer = $(e.target).closest('.controller__column-choise');
  if( !$answer.length ) return;
  let columnTrack = $('[data-track="'+trackId+'"]');
  let columnTrue = $('[data-true="'+trackId+'"]');
  let columnFalse = $('[data-false="'+trackId+'"]');

  clearInterval(startInterval);
  columnTrack.addClass('track');
  
  //Отвечаем
  if( $answer.data("answer") === true ) {
    columnTrue.addClass('true');
    getAnswer(1);
  } else {
    columnFalse.addClass('false');
    getAnswer(0);

  }




  

  //Удаляем трек и все обработчики
  $(track).remove();

});

//mute sounds 

function muteTrack(){
  
}
//one scroll 

$('.title__arrow.bounce').on('click', function(){
  $.fn.fullpage.moveSectionDown();
});

$(document).ready(function() {
	$('#fullpage').fullpage({

		//Scrolling
		css3: true,
		scrollingSpeed: 700,

		//Accessibility
		keyboardScrolling: true,

		//Custom selectors
		sectionSelector: '.section',

		lazyLoading: true,

	});
});

// participles

particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 57,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 0.4,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGhhbWJ1cmdlclxuXG4vLyBMb29rIGZvciAuaGFtYnVyZ2VyXG52YXIgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oYW1idXJnZXJcIik7XG4vLyBPbiBjbGlja1xuaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgLy8gVG9nZ2xlIGNsYXNzIFwiaXMtYWN0aXZlXCJcbiAgaGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1hY3RpdmVcIik7XG4gIC8vIERvIHNvbWV0aGluZyBlbHNlLCBsaWtlIG9wZW4vY2xvc2UgbWVudVxufSk7XG5cblxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuc291bmQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzb3VuZC0tb2ZmJyk7XG4gICAgfSk7XG4gICAgLy/QlNC+0LHQsNCy0LvRj9C10Lwg0LrQvtC70L7QvdC60LhcbiAgICBnZW5lcmF0ZUNvbHVtbnMoKTtcblxuXG59KTtcblxuXG5cbi8vIHRlc3RcblxuaWYoICFBcnJheS5wcm90b3R5cGUuZXF1YWxzICkge1xuXG5cdEFycmF5LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAvLyBpZiB0aGUgb3RoZXIgYXJyYXkgaXMgYSBmYWxzeSB2YWx1ZSwgcmV0dXJuXG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gY29tcGFyZSBsZW5ndGhzIC0gY2FuIHNhdmUgYSBsb3Qgb2YgdGltZSBcbiAgICBpZiAodGhpcy5sZW5ndGggIT0gYXJyYXkubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIFxuICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbD10aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgdGhpc1tpXSA9PSBhcnJheVtpXSA/ICgrK2NvdW50KSA6IDA7XG4gICAgICAgIFxuICAgIH0gICAgICAgXG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbn1cblxuXG5cblxuXHRsZXQgcXVlc3Rpb25zID0gW1xuXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDEsXG4gICAgMFxuXG5cdF0sIGxpbmsgPSAnYXNzZXRzL3RyYWNrcy90cmFjaycsIGFuc3dlcnMgPSBbXSwgdHJhY2tJZCA9IDAsIHRyYWNrLCB0ZXN0U3RhcnRlZCA9c3RhcnRJbnRlcnZhbD0gZmFsc2U7XG4gIC8vINC40L3RgtC10YDQstCw0Lsg0LzQuNCz0LDQvdC40Y9cbiAgZnVuY3Rpb24gY29sb3VySW50ZXJ2YWwoKXtcbiAgICBcbiAgICBsZXQgY29sdW1uVHJhY2sgPSAkKCdbZGF0YS10cmFjaz1cIicrdHJhY2tJZCsnXCJdJyk7XG4gICAgc3RhcnRJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cbiAgICAgIGNvbHVtblRyYWNrLnRvZ2dsZUNsYXNzKCd0cmFjaycpO1xuXG4gICAgfSwgNTAwKVxuXG4gICAgXG4gIH1cblxuICAvL9Ci0YDRjdC6INC30LDQs9GA0YPQt9C40LvRgdGPXG4gIGZ1bmN0aW9uIHRyYWNrTG9hZGVkKCkge1xuICBcbiAgXHRcbiAgXG4gIH1cbiAgXG4gIC8v0KLRgNC10Log0L/RgNC+0LjQs9GA0LDQu1xuICBmdW5jdGlvbiB0cmFja0VuZGVkKHRyYWNrSWQpIHtcbiAgXG4gICAgY29uc29sZS5pbmZvKGBmbiB0cmFja0VuZGVkOiDRgtGA0LXQuiDQt9Cw0LrQvtC90YfQuNC70YHRjyAke2xpbmt9LSR7dHJhY2tJZCsxfS5tcDNgKTtcbiAgICBjb25zb2xlLmluZm8oYGZuIHRyYWNrRW5kZWQ6INC20LTQtdC8INC+0YLQstC10YLQsCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9gKTtcbiAgXG4gIH1cbiAgXG4gIC8v0JPRgNGD0LfQuNC8INGC0YDRjdC6XG4gIGZ1bmN0aW9uIGxvYWRUcmFjayh0cmFja0lkKSB7XG4gICAgXG4gICAgbGV0IGN1cnJlbnRDb2x1bW4gPSAkKHRoaXMpLmRhdGEoXCJjb2x1bW5cIik7XG4gIFx0dHJhY2sgPSBuZXcgQXVkaW8oYCR7bGlua30tJHt0cmFja0lkKzF9Lm1wM2ApO1xuICAgIFxuICAgIHRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBjb25zb2xlLmluZm8oYGZuIGxvYWRUcmFjazog0LLQvtGB0L/RgNC+0LjQt9Cy0L7QtNC40Lwg0YLRgNC10LogJHtsaW5rfS0ke3RyYWNrSWQrMX0ubXAzYCk7XG5cbiAgICAgIHRyYWNrTG9hZGVkKCk7XG4gICAgICB0cmFjay5wbGF5KCk7XG5cbiAgICB9KTtcblxuICAgIHRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgdHJhY2tFbmRlZCh0cmFja0lkKTtcbiAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiB0cmFjaztcbiAgXG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHJlc3VsdCgpIHtcbiAgXG4gICAgbGV0IHBlcmNlbnQgPSBxdWVzdGlvbnMuZXF1YWxzKGFuc3dlcnMpICogMTA7XG4gICAgXG4gICAgcmVzdWx0QW5pbWF0ZSgpO1xuICAgIHN2Z0FuaW1hdGUocGVyY2VudCk7XG5cblxuICBcbiAgfVxuXG4gIC8vINCw0L3QuNC80LDRhtC40Y8gU1ZHXG4gIGZ1bmN0aW9uIHN2Z0FuaW1hdGUocGVyY2VudCl7XG4gICAgbGV0IHJhdGUgPSAkKCcuY29udHJvbGxlcl9fcmVzdWx0LXJhdGUnKTtcbiAgICBsZXQgc3ZnUmF0ZSA9ICQoJy5jaXJjbGUnKTtcbiAgICBsZXQgc3ZnUGVyY2VudGFnZSA9ICQoJy5wZXJjZW50YWdlJyk7XG4gICAgbGV0IHN2Z0Jsb2NrID0gJCgnLnNpbmdsZS1jaGFydCcpO1xuICAgIGxldCByZXN1bHRCbG9jayA9ICQoJy5jb250cm9sbGVyX19yZXN1bHQnKTtcbiAgICBcbiAgICBzdmdCbG9jay5jc3MoJ3RyYW5zZm9ybScsICdzY2FsZSgxLCAxKScpO1xuICAgIHJhdGUudGV4dChgJHtwZXJjZW50fWApO1xuICAgIHN2Z1JhdGUuY3NzKHtcInN0cm9rZS1kYXNoYXJyYXlcIjpgJHtwZXJjZW50fSAxMDBgLCBcImFuaW1hdGlvbi1uYW1lXCI6XCJwcm9ncmVzc1wiLCBcImFuaW1hdGlvbi1kdXJhdGlvblwiOiBcIjZzXCIsIFwiYW5pbWF0aW9uLWRpcmVjdGlvblwiOiBcImZvcndhcmRzXCJ9KTtcbiAgICBzdmdQZXJjZW50YWdlLnRleHQoYCR7cGVyY2VudH1gKTtcblxuICB9XG5cbiAgLy8g0LDQvdC40LzQsNGG0LjRjyDRgtC10LrRgdGC0LAg0YDQtdC30YPQu9GM0YLQsNGC0LBcblxuICBmdW5jdGlvbiByZXN1bHRBbmltYXRlKCl7XG5cbiAgICBsZXQgY29udGFpbmVyUmVzdWx0ID0gJCgnLmNvbnRyb2xsZXJfX3Jlc3VsdCcpO1xuICAgIGxldCB0ZXh0UmVzdWx0ID0gICQoJy5jb250cm9sbGVyX19yZXN1bHQtbGV2ZWwnKTtcblxuICAgIGNvbnRhaW5lclJlc3VsdC5jc3MoJ21hcmdpbi10b3AnLCAnMTE1cHgnKTtcbiAgICB0ZXh0UmVzdWx0LmNzcygndHJhbnNmb3JtJywgJ3NjYWxlKDEsIDEpJyk7XG4gIH1cblxuICAvL0NhbGxCYWNrINGC0LXRgdGCINC30LDQutC+0L3Rh9C40LvRgdGPXG4gIGZ1bmN0aW9uIHRlc3RFbmRlZCgpIHtcblxuICAgIGNvbnNvbGUuaW5mbyhgZm4gdGVzdEVuZGVkOiDRgtC10YHRgiDQt9Cw0LrQvtC90YfQuNC70YHRj2ApO1xuXG4gICAgLy/QktGL0LLQvtC00LjQvCDRgNC10LfRg9C70YzRgtCw0YJcbiAgICByZXN1bHQoKTtcblxuICB9XG4gIFxuICAvL9CS0L7RgdC/0YDQvtC40LfQstC+0LTQuNC8INGC0YDRjdC6XG4gIGZ1bmN0aW9uIHBsYXkodHJhY2tJZCkge1xuICAgIGNvbG91ckludGVydmFsKCk7XG4gICAgLy/QotC10YHRgiDQt9Cw0LrQvtC90YfQuNC70YHRj1xuICAgIGlmKCB0cmFja0lkID49IHF1ZXN0aW9ucy5sZW5ndGggKSB7XG5cbiAgICAgIHRlc3RFbmRlZCgpO1xuICAgICAgdGVzdFN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIC8v0J/RgNC+0LTQvtC70LbQsNC10Lwg0YLQtdGB0YJcbiAgICB9IGVsc2Uge1xuXG4gICAgICBsZXQgdHJhY2sgPSBsb2FkVHJhY2sodHJhY2tJZCk7XG5cbiAgICB9XG5cbiAgICBcbiAgXG4gIH1cblxuICAvL9CU0L7QsdCw0LLQu9GP0LXQvCDQutC+0LvQvtC90LrQuFxuICBmdW5jdGlvbiBnZW5lcmF0ZUNvbHVtbnMoKSB7XG5cbiAgICBsZXQgY29sdW1ucz0nJztcblxuICAgIGZvcihsZXQgaSA9MDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBjb2x1bW5zICs9YDxkaXYgY2xhc3M9XCJjb250cm9sbGVyX19jb2x1bW5cIiBkYXRhLWNvbHVtbj1cIiR7aX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyX19jb2x1bW4tdHJhY2tcIiBkYXRhLXRyYWNrPVwiJHtpfVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xsZXJfX2NvbHVtbi1jaG9pc2UgY29udHJvbGxlcl9fY29sdW1uLWNob2lzZS0tdHJ1ZVwiIGRhdGEtYW5zd2VyPVwidHJ1ZVwiIGRhdGEtdHJ1ZT1cIiR7aX1cIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyX19jb2x1bW4tY2hvaXNlIGNvbnRyb2xsZXJfX2NvbHVtbi1jaG9pc2UtLWZhbHNlXCIgZGF0YS1hbnN3ZXI9XCJmYWxzZVwiIGRhdGEtZmFsc2U9XCIke2l9XCI+PC9kaXY+XG4gICAgPC9kaXY+YDtcblxuICAgIH1cblxuICAgICQoXCIuY29udHJvbGxlcl9fcGFuZWxcIikuYXBwZW5kKGNvbHVtbnMpO1xuXG4gICAgY29uc29sZS5pbmZvKGBmbiBnZW5lcmF0ZUNvbHVtbnM6INCz0LXQvdC10YDQuNGA0YPQtdC8INC60L7Qu9C+0L3QutC4YCk7XG5cbiAgfVxuXG4vL9Cd0LDRh9C40L3QsNC10Lwg0YLQtdGB0YJcbmZ1bmN0aW9uIGJlZ2luVGVzdCgpIHtcblxuICBpZih0ZXN0U3RhcnRlZCl7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRlc3RTdGFydGVkID0gdHJ1ZTtcblxuICAgIHBsYXkodHJhY2tJZCk7XG4gIFxuICAgIGNvbnNvbGUuaW5mbyhgZm4gYmVnaW5UZXN0OiDQvdCw0YfQuNC90LDQtdC8INGC0LXRgdGCYCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV4dFRyYWNrKCl7XG4gIHBsYXkoICsrdHJhY2tJZCApO1xufVxuXG5mdW5jdGlvbiBnZXRBbnN3ZXIgKGFuc3dlcikge1xuXG4gICAgYW5zd2Vycy5wdXNoKGFuc3dlcik7XG4gICAgY29uc29sZS5pbmZvKGBmbiBnZXRBbnN3ZXI6INC00L7QsdCw0LLQu9GP0LXQvCDQvtGC0LLQtdGCICR7YW5zd2VyfWApO1xuICAgIGNvbnNvbGUuaW5mbyhgZm4gZ2V0QW5zd2VyOiDQvNCw0YHRgdC40LIg0L7RgtCy0LXRgtC+0LIg0LjQt9C80LXQvdC10L0g0L3QsCAke2Fuc3dlcnN9YCk7XG4gICAgY29uc29sZS5pbmZvKGAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWApO1xuICAgIHBsYXkoICsrdHJhY2tJZCApO1xuICAgIFxufTtcblxuXG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuY29udHJvbGxlcl9fY29sdW1uJywgZnVuY3Rpb24oZSl7XG5cbiAgXG4gIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gIGxldCB0aGlzSWQgPSAkdGhpcy5kYXRhKFwiY29sdW1uXCIpO1xuXG4gIGlmKCB0aGlzSWQgIT09IHRyYWNrSWQgfHwgIXRlc3RTdGFydGVkICkgcmV0dXJuIGZhbHNlO1xuICBpZiggdHJhY2sgKSB0cmFjay5wYXVzZSgpO1xuXG4gIGxldCAkYW5zd2VyID0gJChlLnRhcmdldCkuY2xvc2VzdCgnLmNvbnRyb2xsZXJfX2NvbHVtbi1jaG9pc2UnKTtcbiAgaWYoICEkYW5zd2VyLmxlbmd0aCApIHJldHVybjtcbiAgbGV0IGNvbHVtblRyYWNrID0gJCgnW2RhdGEtdHJhY2s9XCInK3RyYWNrSWQrJ1wiXScpO1xuICBsZXQgY29sdW1uVHJ1ZSA9ICQoJ1tkYXRhLXRydWU9XCInK3RyYWNrSWQrJ1wiXScpO1xuICBsZXQgY29sdW1uRmFsc2UgPSAkKCdbZGF0YS1mYWxzZT1cIicrdHJhY2tJZCsnXCJdJyk7XG5cbiAgY2xlYXJJbnRlcnZhbChzdGFydEludGVydmFsKTtcbiAgY29sdW1uVHJhY2suYWRkQ2xhc3MoJ3RyYWNrJyk7XG4gIFxuICAvL9Ce0YLQstC10YfQsNC10LxcbiAgaWYoICRhbnN3ZXIuZGF0YShcImFuc3dlclwiKSA9PT0gdHJ1ZSApIHtcbiAgICBjb2x1bW5UcnVlLmFkZENsYXNzKCd0cnVlJyk7XG4gICAgZ2V0QW5zd2VyKDEpO1xuICB9IGVsc2Uge1xuICAgIGNvbHVtbkZhbHNlLmFkZENsYXNzKCdmYWxzZScpO1xuICAgIGdldEFuc3dlcigwKTtcblxuICB9XG5cblxuXG5cbiAgXG5cbiAgLy/Qo9C00LDQu9GP0LXQvCDRgtGA0LXQuiDQuCDQstGB0LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQuFxuICAkKHRyYWNrKS5yZW1vdmUoKTtcblxufSk7XG5cbi8vbXV0ZSBzb3VuZHMgXG5cbmZ1bmN0aW9uIG11dGVUcmFjaygpe1xuICBcbn1cbi8vb25lIHNjcm9sbCBcblxuJCgnLnRpdGxlX19hcnJvdy5ib3VuY2UnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAkLmZuLmZ1bGxwYWdlLm1vdmVTZWN0aW9uRG93bigpO1xufSk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHQkKCcjZnVsbHBhZ2UnKS5mdWxscGFnZSh7XG5cblx0XHQvL1Njcm9sbGluZ1xuXHRcdGNzczM6IHRydWUsXG5cdFx0c2Nyb2xsaW5nU3BlZWQ6IDcwMCxcblxuXHRcdC8vQWNjZXNzaWJpbGl0eVxuXHRcdGtleWJvYXJkU2Nyb2xsaW5nOiB0cnVlLFxuXG5cdFx0Ly9DdXN0b20gc2VsZWN0b3JzXG5cdFx0c2VjdGlvblNlbGVjdG9yOiAnLnNlY3Rpb24nLFxuXG5cdFx0bGF6eUxvYWRpbmc6IHRydWUsXG5cblx0fSk7XG59KTtcblxuLy8gcGFydGljaXBsZXNcblxucGFydGljbGVzSlMoXCJwYXJ0aWNsZXMtanNcIiwge1xuICAgIFwicGFydGljbGVzXCI6IHtcbiAgICAgIFwibnVtYmVyXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiA1NyxcbiAgICAgICAgXCJkZW5zaXR5XCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICAgIFwidmFsdWVfYXJlYVwiOiA4MDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiY29sb3JcIjoge1xuICAgICAgICBcInZhbHVlXCI6IFwiI2ZmZmZmZlwiXG4gICAgICB9LFxuICAgICAgXCJzaGFwZVwiOiB7XG4gICAgICAgIFwidHlwZVwiOiBcImNpcmNsZVwiLFxuICAgICAgICBcInN0cm9rZVwiOiB7XG4gICAgICAgICAgXCJ3aWR0aFwiOiAwLFxuICAgICAgICAgIFwiY29sb3JcIjogXCIjMDAwMDAwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJwb2x5Z29uXCI6IHtcbiAgICAgICAgICBcIm5iX3NpZGVzXCI6IDVcbiAgICAgICAgfSxcbiAgICAgICAgXCJpbWFnZVwiOiB7XG4gICAgICAgICAgXCJzcmNcIjogXCJpbWcvZ2l0aHViLnN2Z1wiLFxuICAgICAgICAgIFwid2lkdGhcIjogMTAwLFxuICAgICAgICAgIFwiaGVpZ2h0XCI6IDEwMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJvcGFjaXR5XCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiAwLjEsXG4gICAgICAgIFwicmFuZG9tXCI6IGZhbHNlLFxuICAgICAgICBcImFuaW1cIjoge1xuICAgICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlLFxuICAgICAgICAgIFwic3BlZWRcIjogMSxcbiAgICAgICAgICBcIm9wYWNpdHlfbWluXCI6IDAuMSxcbiAgICAgICAgICBcInN5bmNcIjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwic2l6ZVwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogMyxcbiAgICAgICAgXCJyYW5kb21cIjogdHJ1ZSxcbiAgICAgICAgXCJhbmltXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcInNwZWVkXCI6IDQwLFxuICAgICAgICAgIFwic2l6ZV9taW5cIjogMC4xLFxuICAgICAgICAgIFwic3luY1wiOiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJsaW5lX2xpbmtlZFwiOiB7XG4gICAgICAgIFwiZW5hYmxlXCI6IHRydWUsXG4gICAgICAgIFwiZGlzdGFuY2VcIjogMTUwLFxuICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiLFxuICAgICAgICBcIm9wYWNpdHlcIjogMC40LFxuICAgICAgICBcIndpZHRoXCI6IDFcbiAgICAgIH0sXG4gICAgICBcIm1vdmVcIjoge1xuICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICBcInNwZWVkXCI6IDAuNCxcbiAgICAgICAgXCJkaXJlY3Rpb25cIjogXCJub25lXCIsXG4gICAgICAgIFwicmFuZG9tXCI6IGZhbHNlLFxuICAgICAgICBcInN0cmFpZ2h0XCI6IGZhbHNlLFxuICAgICAgICBcIm91dF9tb2RlXCI6IFwib3V0XCIsXG4gICAgICAgIFwiYm91bmNlXCI6IGZhbHNlLFxuICAgICAgICBcImF0dHJhY3RcIjoge1xuICAgICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlLFxuICAgICAgICAgIFwicm90YXRlWFwiOiA2MDAsXG4gICAgICAgICAgXCJyb3RhdGVZXCI6IDEyMDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJpbnRlcmFjdGl2aXR5XCI6IHtcbiAgICAgIFwiZGV0ZWN0X29uXCI6IFwiY2FudmFzXCIsXG4gICAgICBcImV2ZW50c1wiOiB7XG4gICAgICAgIFwib25ob3ZlclwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJtb2RlXCI6IFwicmVwdWxzZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwib25jbGlja1wiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJtb2RlXCI6IFwicHVzaFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVzaXplXCI6IHRydWVcbiAgICAgIH0sXG4gICAgICBcIm1vZGVzXCI6IHtcbiAgICAgICAgXCJncmFiXCI6IHtcbiAgICAgICAgICBcImRpc3RhbmNlXCI6IDQwMCxcbiAgICAgICAgICBcImxpbmVfbGlua2VkXCI6IHtcbiAgICAgICAgICAgIFwib3BhY2l0eVwiOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJ1YmJsZVwiOiB7XG4gICAgICAgICAgXCJkaXN0YW5jZVwiOiA0MDAsXG4gICAgICAgICAgXCJzaXplXCI6IDQwLFxuICAgICAgICAgIFwiZHVyYXRpb25cIjogMixcbiAgICAgICAgICBcIm9wYWNpdHlcIjogOCxcbiAgICAgICAgICBcInNwZWVkXCI6IDNcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXB1bHNlXCI6IHtcbiAgICAgICAgICBcImRpc3RhbmNlXCI6IDIwMCxcbiAgICAgICAgICBcImR1cmF0aW9uXCI6IDAuNFxuICAgICAgICB9LFxuICAgICAgICBcInB1c2hcIjoge1xuICAgICAgICAgIFwicGFydGljbGVzX25iXCI6IDRcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVcIjoge1xuICAgICAgICAgIFwicGFydGljbGVzX25iXCI6IDJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJyZXRpbmFfZGV0ZWN0XCI6IHRydWVcbiAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
