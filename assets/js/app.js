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
// callbacks on scroll
function blinkingController (){

  

}
//one scroll 

$('.title__arrow.bounce').on('click', function(){
  $.fn.fullpage.moveSectionDown();
});

$(document).ready(function() {
	$('#fullpage').fullpage({

    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
    afterLoad: function(anchorLink, index){
      var loadedSection = $(this);
  
      //использование индекса
      if(index == 3){
        
      }

    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaGFtYnVyZ2VyXG5cbi8vIExvb2sgZm9yIC5oYW1idXJnZXJcbnZhciBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhhbWJ1cmdlclwiKTtcbi8vIE9uIGNsaWNrXG5oYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAvLyBUb2dnbGUgY2xhc3MgXCJpcy1hY3RpdmVcIlxuICBoYW1idXJnZXIuY2xhc3NMaXN0LnRvZ2dsZShcImlzLWFjdGl2ZVwiKTtcbiAgLy8gRG8gc29tZXRoaW5nIGVsc2UsIGxpa2Ugb3Blbi9jbG9zZSBtZW51XG59KTtcblxuXG4kKCBkb2N1bWVudCApLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICQoJy5zb3VuZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ3NvdW5kLS1vZmYnKTtcbiAgICB9KTtcbiAgICAvL9CU0L7QsdCw0LLQu9GP0LXQvCDQutC+0LvQvtC90LrQuFxuICAgIGdlbmVyYXRlQ29sdW1ucygpO1xuXG5cbn0pO1xuXG5cblxuLy8gdGVzdFxuXG5pZiggIUFycmF5LnByb3RvdHlwZS5lcXVhbHMgKSB7XG5cblx0QXJyYXkucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIChhcnJheSkge1xuICAgIC8vIGlmIHRoZSBvdGhlciBhcnJheSBpcyBhIGZhbHN5IHZhbHVlLCByZXR1cm5cbiAgICBpZiAoIWFycmF5KVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBjb21wYXJlIGxlbmd0aHMgLSBjYW4gc2F2ZSBhIGxvdCBvZiB0aW1lIFxuICAgIGlmICh0aGlzLmxlbmd0aCAhPSBhcnJheS5sZW5ndGgpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgXG4gICAgdmFyIGNvdW50ID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsPXRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzW2ldID09IGFycmF5W2ldID8gKCsrY291bnQpIDogMDtcbiAgICAgICAgXG4gICAgfSAgICAgICBcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxufVxuXG5cblxuXG5cdGxldCBxdWVzdGlvbnMgPSBbXG5cbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMSxcbiAgICAwXG5cblx0XSwgbGluayA9ICdhc3NldHMvdHJhY2tzL3RyYWNrJywgYW5zd2VycyA9IFtdLCB0cmFja0lkID0gMCwgdHJhY2ssIHRlc3RTdGFydGVkID1zdGFydEludGVydmFsPSBmYWxzZTtcbiAgLy8g0LjQvdGC0LXRgNCy0LDQuyDQvNC40LPQsNC90LjRj1xuICBmdW5jdGlvbiBjb2xvdXJJbnRlcnZhbCgpe1xuICAgIFxuICAgIGxldCBjb2x1bW5UcmFjayA9ICQoJ1tkYXRhLXRyYWNrPVwiJyt0cmFja0lkKydcIl0nKTtcbiAgICBzdGFydEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcblxuICAgICAgY29sdW1uVHJhY2sudG9nZ2xlQ2xhc3MoJ3RyYWNrJyk7XG5cbiAgICB9LCA1MDApXG5cbiAgICBcbiAgfVxuXG4gIC8v0KLRgNGN0Log0LfQsNCz0YDRg9C30LjQu9GB0Y9cbiAgZnVuY3Rpb24gdHJhY2tMb2FkZWQoKSB7XG4gIFxuICBcdFxuICBcbiAgfVxuICBcbiAgLy/QotGA0LXQuiDQv9GA0L7QuNCz0YDQsNC7XG4gIGZ1bmN0aW9uIHRyYWNrRW5kZWQodHJhY2tJZCkge1xuICBcbiAgICBjb25zb2xlLmluZm8oYGZuIHRyYWNrRW5kZWQ6INGC0YDQtdC6INC30LDQutC+0L3Rh9C40LvRgdGPICR7bGlua30tJHt0cmFja0lkKzF9Lm1wM2ApO1xuICAgIGNvbnNvbGUuaW5mbyhgZm4gdHJhY2tFbmRlZDog0LbQtNC10Lwg0L7RgtCy0LXRgtCwINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj2ApO1xuICBcbiAgfVxuICBcbiAgLy/Qk9GA0YPQt9C40Lwg0YLRgNGN0LpcbiAgZnVuY3Rpb24gbG9hZFRyYWNrKHRyYWNrSWQpIHtcbiAgICBcbiAgICBsZXQgY3VycmVudENvbHVtbiA9ICQodGhpcykuZGF0YShcImNvbHVtblwiKTtcbiAgXHR0cmFjayA9IG5ldyBBdWRpbyhgJHtsaW5rfS0ke3RyYWNrSWQrMX0ubXAzYCk7XG4gICAgXG4gICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIGNvbnNvbGUuaW5mbyhgZm4gbG9hZFRyYWNrOiDQstC+0YHQv9GA0L7QuNC30LLQvtC00LjQvCDRgtGA0LXQuiAke2xpbmt9LSR7dHJhY2tJZCsxfS5tcDNgKTtcblxuICAgICAgdHJhY2tMb2FkZWQoKTtcbiAgICAgIHRyYWNrLnBsYXkoKTtcblxuICAgIH0pO1xuXG4gICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICB0cmFja0VuZGVkKHRyYWNrSWQpO1xuICAgICAgXG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIHRyYWNrO1xuICBcbiAgfVxuICBcbiAgZnVuY3Rpb24gcmVzdWx0KCkge1xuICBcbiAgICBsZXQgcGVyY2VudCA9IHF1ZXN0aW9ucy5lcXVhbHMoYW5zd2VycykgKiAxMDtcbiAgICBcbiAgICByZXN1bHRBbmltYXRlKCk7XG4gICAgc3ZnQW5pbWF0ZShwZXJjZW50KTtcblxuXG4gIFxuICB9XG5cbiAgLy8g0LDQvdC40LzQsNGG0LjRjyBTVkdcbiAgZnVuY3Rpb24gc3ZnQW5pbWF0ZShwZXJjZW50KXtcbiAgICBsZXQgcmF0ZSA9ICQoJy5jb250cm9sbGVyX19yZXN1bHQtcmF0ZScpO1xuICAgIGxldCBzdmdSYXRlID0gJCgnLmNpcmNsZScpO1xuICAgIGxldCBzdmdQZXJjZW50YWdlID0gJCgnLnBlcmNlbnRhZ2UnKTtcbiAgICBsZXQgc3ZnQmxvY2sgPSAkKCcuc2luZ2xlLWNoYXJ0Jyk7XG4gICAgbGV0IHJlc3VsdEJsb2NrID0gJCgnLmNvbnRyb2xsZXJfX3Jlc3VsdCcpO1xuICAgIFxuICAgIHN2Z0Jsb2NrLmNzcygndHJhbnNmb3JtJywgJ3NjYWxlKDEsIDEpJyk7XG4gICAgcmF0ZS50ZXh0KGAke3BlcmNlbnR9YCk7XG4gICAgc3ZnUmF0ZS5jc3Moe1wic3Ryb2tlLWRhc2hhcnJheVwiOmAke3BlcmNlbnR9IDEwMGAsIFwiYW5pbWF0aW9uLW5hbWVcIjpcInByb2dyZXNzXCIsIFwiYW5pbWF0aW9uLWR1cmF0aW9uXCI6IFwiNnNcIiwgXCJhbmltYXRpb24tZGlyZWN0aW9uXCI6IFwiZm9yd2FyZHNcIn0pO1xuICAgIHN2Z1BlcmNlbnRhZ2UudGV4dChgJHtwZXJjZW50fWApO1xuXG4gIH1cblxuICAvLyDQsNC90LjQvNCw0YbQuNGPINGC0LXQutGB0YLQsCDRgNC10LfRg9C70YzRgtCw0YLQsFxuXG4gIGZ1bmN0aW9uIHJlc3VsdEFuaW1hdGUoKXtcblxuICAgIGxldCBjb250YWluZXJSZXN1bHQgPSAkKCcuY29udHJvbGxlcl9fcmVzdWx0Jyk7XG4gICAgbGV0IHRleHRSZXN1bHQgPSAgJCgnLmNvbnRyb2xsZXJfX3Jlc3VsdC1sZXZlbCcpO1xuXG4gICAgY29udGFpbmVyUmVzdWx0LmNzcygnbWFyZ2luLXRvcCcsICcxMTVweCcpO1xuICAgIHRleHRSZXN1bHQuY3NzKCd0cmFuc2Zvcm0nLCAnc2NhbGUoMSwgMSknKTtcbiAgfVxuXG4gIC8vQ2FsbEJhY2sg0YLQtdGB0YIg0LfQsNC60L7QvdGH0LjQu9GB0Y9cbiAgZnVuY3Rpb24gdGVzdEVuZGVkKCkge1xuXG4gICAgY29uc29sZS5pbmZvKGBmbiB0ZXN0RW5kZWQ6INGC0LXRgdGCINC30LDQutC+0L3Rh9C40LvRgdGPYCk7XG5cbiAgICAvL9CS0YvQstC+0LTQuNC8INGA0LXQt9GD0LvRjNGC0LDRglxuICAgIHJlc3VsdCgpO1xuXG4gIH1cbiAgXG4gIC8v0JLQvtGB0L/RgNC+0LjQt9Cy0L7QtNC40Lwg0YLRgNGN0LpcbiAgZnVuY3Rpb24gcGxheSh0cmFja0lkKSB7XG4gICAgY29sb3VySW50ZXJ2YWwoKTtcbiAgICAvL9Ci0LXRgdGCINC30LDQutC+0L3Rh9C40LvRgdGPXG4gICAgaWYoIHRyYWNrSWQgPj0gcXVlc3Rpb25zLmxlbmd0aCApIHtcblxuICAgICAgdGVzdEVuZGVkKCk7XG4gICAgICB0ZXN0U3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgLy/Qn9GA0L7QtNC+0LvQttCw0LXQvCDRgtC10YHRglxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGxldCB0cmFjayA9IGxvYWRUcmFjayh0cmFja0lkKTtcblxuICAgIH1cblxuICAgIFxuICBcbiAgfVxuXG4gIC8v0JTQvtCx0LDQstC70Y/QtdC8INC60L7Qu9C+0L3QutC4XG4gIGZ1bmN0aW9uIGdlbmVyYXRlQ29sdW1ucygpIHtcblxuICAgIGxldCBjb2x1bW5zPScnO1xuXG4gICAgZm9yKGxldCBpID0wOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGNvbHVtbnMgKz1gPGRpdiBjbGFzcz1cImNvbnRyb2xsZXJfX2NvbHVtblwiIGRhdGEtY29sdW1uPVwiJHtpfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xsZXJfX2NvbHVtbi10cmFja1wiIGRhdGEtdHJhY2s9XCIke2l9XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbGxlcl9fY29sdW1uLWNob2lzZSBjb250cm9sbGVyX19jb2x1bW4tY2hvaXNlLS10cnVlXCIgZGF0YS1hbnN3ZXI9XCJ0cnVlXCIgZGF0YS10cnVlPVwiJHtpfVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xsZXJfX2NvbHVtbi1jaG9pc2UgY29udHJvbGxlcl9fY29sdW1uLWNob2lzZS0tZmFsc2VcIiBkYXRhLWFuc3dlcj1cImZhbHNlXCIgZGF0YS1mYWxzZT1cIiR7aX1cIj48L2Rpdj5cbiAgICA8L2Rpdj5gO1xuXG4gICAgfVxuXG4gICAgJChcIi5jb250cm9sbGVyX19wYW5lbFwiKS5hcHBlbmQoY29sdW1ucyk7XG5cbiAgICBjb25zb2xlLmluZm8oYGZuIGdlbmVyYXRlQ29sdW1uczog0LPQtdC90LXRgNC40YDRg9C10Lwg0LrQvtC70L7QvdC60LhgKTtcblxuICB9XG5cbi8v0J3QsNGH0LjQvdCw0LXQvCDRgtC10YHRglxuZnVuY3Rpb24gYmVnaW5UZXN0KCkge1xuXG4gIGlmKHRlc3RTdGFydGVkKXtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdGVzdFN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgcGxheSh0cmFja0lkKTtcbiAgXG4gICAgY29uc29sZS5pbmZvKGBmbiBiZWdpblRlc3Q6INC90LDRh9C40L3QsNC10Lwg0YLQtdGB0YJgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBuZXh0VHJhY2soKXtcbiAgcGxheSggKyt0cmFja0lkICk7XG59XG5cbmZ1bmN0aW9uIGdldEFuc3dlciAoYW5zd2VyKSB7XG5cbiAgICBhbnN3ZXJzLnB1c2goYW5zd2VyKTtcbiAgICBjb25zb2xlLmluZm8oYGZuIGdldEFuc3dlcjog0LTQvtCx0LDQstC70Y/QtdC8INC+0YLQstC10YIgJHthbnN3ZXJ9YCk7XG4gICAgY29uc29sZS5pbmZvKGBmbiBnZXRBbnN3ZXI6INC80LDRgdGB0LjQsiDQvtGC0LLQtdGC0L7QsiDQuNC30LzQtdC90LXQvSDQvdCwICR7YW5zd2Vyc31gKTtcbiAgICBjb25zb2xlLmluZm8oYC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tYCk7XG4gICAgcGxheSggKyt0cmFja0lkICk7XG4gICAgXG59O1xuXG5cblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jb250cm9sbGVyX19jb2x1bW4nLCBmdW5jdGlvbihlKXtcblxuICBcbiAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgbGV0IHRoaXNJZCA9ICR0aGlzLmRhdGEoXCJjb2x1bW5cIik7XG5cbiAgaWYoIHRoaXNJZCAhPT0gdHJhY2tJZCB8fCAhdGVzdFN0YXJ0ZWQgKSByZXR1cm4gZmFsc2U7XG4gIGlmKCB0cmFjayApIHRyYWNrLnBhdXNlKCk7XG5cbiAgbGV0ICRhbnN3ZXIgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuY29udHJvbGxlcl9fY29sdW1uLWNob2lzZScpO1xuICBpZiggISRhbnN3ZXIubGVuZ3RoICkgcmV0dXJuO1xuICBsZXQgY29sdW1uVHJhY2sgPSAkKCdbZGF0YS10cmFjaz1cIicrdHJhY2tJZCsnXCJdJyk7XG4gIGxldCBjb2x1bW5UcnVlID0gJCgnW2RhdGEtdHJ1ZT1cIicrdHJhY2tJZCsnXCJdJyk7XG4gIGxldCBjb2x1bW5GYWxzZSA9ICQoJ1tkYXRhLWZhbHNlPVwiJyt0cmFja0lkKydcIl0nKTtcblxuICBjbGVhckludGVydmFsKHN0YXJ0SW50ZXJ2YWwpO1xuICBjb2x1bW5UcmFjay5hZGRDbGFzcygndHJhY2snKTtcbiAgXG4gIC8v0J7RgtCy0LXRh9Cw0LXQvFxuICBpZiggJGFuc3dlci5kYXRhKFwiYW5zd2VyXCIpID09PSB0cnVlICkge1xuICAgIGNvbHVtblRydWUuYWRkQ2xhc3MoJ3RydWUnKTtcbiAgICBnZXRBbnN3ZXIoMSk7XG4gIH0gZWxzZSB7XG4gICAgY29sdW1uRmFsc2UuYWRkQ2xhc3MoJ2ZhbHNlJyk7XG4gICAgZ2V0QW5zd2VyKDApO1xuXG4gIH1cblxuXG5cblxuICBcblxuICAvL9Cj0LTQsNC70Y/QtdC8INGC0YDQtdC6INC4INCy0YHQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XG4gICQodHJhY2spLnJlbW92ZSgpO1xuXG59KTtcblxuLy9tdXRlIHNvdW5kcyBcblxuZnVuY3Rpb24gbXV0ZVRyYWNrKCl7XG4gIFxufVxuLy8gY2FsbGJhY2tzIG9uIHNjcm9sbFxuZnVuY3Rpb24gYmxpbmtpbmdDb250cm9sbGVyICgpe1xuXG4gIFxuXG59XG4vL29uZSBzY3JvbGwgXG5cbiQoJy50aXRsZV9fYXJyb3cuYm91bmNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgJC5mbi5mdWxscGFnZS5tb3ZlU2VjdGlvbkRvd24oKTtcbn0pO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0JCgnI2Z1bGxwYWdlJykuZnVsbHBhZ2Uoe1xuXG4gICAgYW5jaG9yczogWydmaXJzdFBhZ2UnLCAnc2Vjb25kUGFnZScsICd0aGlyZFBhZ2UnLCAnZm91cnRoUGFnZScsICdsYXN0UGFnZSddLFxuICAgIGFmdGVyTG9hZDogZnVuY3Rpb24oYW5jaG9yTGluaywgaW5kZXgpe1xuICAgICAgdmFyIGxvYWRlZFNlY3Rpb24gPSAkKHRoaXMpO1xuICBcbiAgICAgIC8v0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40LUg0LjQvdC00LXQutGB0LBcbiAgICAgIGlmKGluZGV4ID09IDMpe1xuICAgICAgICBcbiAgICAgIH1cblxuICAgIH0sXG5cdFx0Ly9TY3JvbGxpbmdcblx0XHRjc3MzOiB0cnVlLFxuXHRcdHNjcm9sbGluZ1NwZWVkOiA3MDAsXG5cblx0XHQvL0FjY2Vzc2liaWxpdHlcblx0XHRrZXlib2FyZFNjcm9sbGluZzogdHJ1ZSxcblxuXHRcdC8vQ3VzdG9tIHNlbGVjdG9yc1xuXHRcdHNlY3Rpb25TZWxlY3RvcjogJy5zZWN0aW9uJyxcblxuXHRcdGxhenlMb2FkaW5nOiB0cnVlLFxuXG5cdH0pO1xufSk7XG5cbi8vIHBhcnRpY2lwbGVzXG5cbnBhcnRpY2xlc0pTKFwicGFydGljbGVzLWpzXCIsIHtcbiAgICBcInBhcnRpY2xlc1wiOiB7XG4gICAgICBcIm51bWJlclwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogNTcsXG4gICAgICAgIFwiZGVuc2l0eVwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICBcInZhbHVlX2FyZWFcIjogODAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImNvbG9yXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIiNmZmZmZmZcIlxuICAgICAgfSxcbiAgICAgIFwic2hhcGVcIjoge1xuICAgICAgICBcInR5cGVcIjogXCJjaXJjbGVcIixcbiAgICAgICAgXCJzdHJva2VcIjoge1xuICAgICAgICAgIFwid2lkdGhcIjogMCxcbiAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicG9seWdvblwiOiB7XG4gICAgICAgICAgXCJuYl9zaWRlc1wiOiA1XG4gICAgICAgIH0sXG4gICAgICAgIFwiaW1hZ2VcIjoge1xuICAgICAgICAgIFwic3JjXCI6IFwiaW1nL2dpdGh1Yi5zdmdcIixcbiAgICAgICAgICBcIndpZHRoXCI6IDEwMCxcbiAgICAgICAgICBcImhlaWdodFwiOiAxMDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwib3BhY2l0eVwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogMC4xLFxuICAgICAgICBcInJhbmRvbVwiOiBmYWxzZSxcbiAgICAgICAgXCJhbmltXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcInNwZWVkXCI6IDEsXG4gICAgICAgICAgXCJvcGFjaXR5X21pblwiOiAwLjEsXG4gICAgICAgICAgXCJzeW5jXCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInNpemVcIjoge1xuICAgICAgICBcInZhbHVlXCI6IDMsXG4gICAgICAgIFwicmFuZG9tXCI6IHRydWUsXG4gICAgICAgIFwiYW5pbVwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJzcGVlZFwiOiA0MCxcbiAgICAgICAgICBcInNpemVfbWluXCI6IDAuMSxcbiAgICAgICAgICBcInN5bmNcIjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibGluZV9saW5rZWRcIjoge1xuICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICBcImRpc3RhbmNlXCI6IDE1MCxcbiAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgXCJvcGFjaXR5XCI6IDAuNCxcbiAgICAgICAgXCJ3aWR0aFwiOiAxXG4gICAgICB9LFxuICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJzcGVlZFwiOiAwLjQsXG4gICAgICAgIFwiZGlyZWN0aW9uXCI6IFwibm9uZVwiLFxuICAgICAgICBcInJhbmRvbVwiOiBmYWxzZSxcbiAgICAgICAgXCJzdHJhaWdodFwiOiBmYWxzZSxcbiAgICAgICAgXCJvdXRfbW9kZVwiOiBcIm91dFwiLFxuICAgICAgICBcImJvdW5jZVwiOiBmYWxzZSxcbiAgICAgICAgXCJhdHRyYWN0XCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcInJvdGF0ZVhcIjogNjAwLFxuICAgICAgICAgIFwicm90YXRlWVwiOiAxMjAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiaW50ZXJhY3Rpdml0eVwiOiB7XG4gICAgICBcImRldGVjdF9vblwiOiBcImNhbnZhc1wiLFxuICAgICAgXCJldmVudHNcIjoge1xuICAgICAgICBcIm9uaG92ZXJcIjoge1xuICAgICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlLFxuICAgICAgICAgIFwibW9kZVwiOiBcInJlcHVsc2VcIlxuICAgICAgICB9LFxuICAgICAgICBcIm9uY2xpY2tcIjoge1xuICAgICAgICAgIFwiZW5hYmxlXCI6IGZhbHNlLFxuICAgICAgICAgIFwibW9kZVwiOiBcInB1c2hcIlxuICAgICAgICB9LFxuICAgICAgICBcInJlc2l6ZVwiOiB0cnVlXG4gICAgICB9LFxuICAgICAgXCJtb2Rlc1wiOiB7XG4gICAgICAgIFwiZ3JhYlwiOiB7XG4gICAgICAgICAgXCJkaXN0YW5jZVwiOiA0MDAsXG4gICAgICAgICAgXCJsaW5lX2xpbmtlZFwiOiB7XG4gICAgICAgICAgICBcIm9wYWNpdHlcIjogMVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJidWJibGVcIjoge1xuICAgICAgICAgIFwiZGlzdGFuY2VcIjogNDAwLFxuICAgICAgICAgIFwic2l6ZVwiOiA0MCxcbiAgICAgICAgICBcImR1cmF0aW9uXCI6IDIsXG4gICAgICAgICAgXCJvcGFjaXR5XCI6IDgsXG4gICAgICAgICAgXCJzcGVlZFwiOiAzXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVwdWxzZVwiOiB7XG4gICAgICAgICAgXCJkaXN0YW5jZVwiOiAyMDAsXG4gICAgICAgICAgXCJkdXJhdGlvblwiOiAwLjRcbiAgICAgICAgfSxcbiAgICAgICAgXCJwdXNoXCI6IHtcbiAgICAgICAgICBcInBhcnRpY2xlc19uYlwiOiA0XG4gICAgICAgIH0sXG4gICAgICAgIFwicmVtb3ZlXCI6IHtcbiAgICAgICAgICBcInBhcnRpY2xlc19uYlwiOiAyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwicmV0aW5hX2RldGVjdFwiOiB0cnVlXG4gIH0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
