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

	], link = 'assets/tracks/track', answers = [], trackId = 0, track, testStarted = false;
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
    let rate = $('.controller__result-rate');
    let svgRate = $('.circle');
    let svgPercentage = $('.percentage');
    // alert(`Ваш результат: ${percent}%`);
    
    //Код отображения результата
    rate.text(`${percent}`);
    svgRate.attr('stroke-dasharray', `${percent}, 100`);
    svgPercentage.text(`${percent}`);



  
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
        "speed": 1,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGhhbWJ1cmdlclxuXG4vLyBMb29rIGZvciAuaGFtYnVyZ2VyXG52YXIgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oYW1idXJnZXJcIik7XG4vLyBPbiBjbGlja1xuaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgLy8gVG9nZ2xlIGNsYXNzIFwiaXMtYWN0aXZlXCJcbiAgaGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1hY3RpdmVcIik7XG4gIC8vIERvIHNvbWV0aGluZyBlbHNlLCBsaWtlIG9wZW4vY2xvc2UgbWVudVxufSk7XG5cblxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuc291bmQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzb3VuZC0tb2ZmJyk7XG4gICAgfSk7XG4gICAgLy/QlNC+0LHQsNCy0LvRj9C10Lwg0LrQvtC70L7QvdC60LhcbiAgICBnZW5lcmF0ZUNvbHVtbnMoKTtcblxuXG59KTtcblxuXG5cbi8vIHRlc3RcblxuaWYoICFBcnJheS5wcm90b3R5cGUuZXF1YWxzICkge1xuXG5cdEFycmF5LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAvLyBpZiB0aGUgb3RoZXIgYXJyYXkgaXMgYSBmYWxzeSB2YWx1ZSwgcmV0dXJuXG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gY29tcGFyZSBsZW5ndGhzIC0gY2FuIHNhdmUgYSBsb3Qgb2YgdGltZSBcbiAgICBpZiAodGhpcy5sZW5ndGggIT0gYXJyYXkubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIFxuICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbD10aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgdGhpc1tpXSA9PSBhcnJheVtpXSA/ICgrK2NvdW50KSA6IDA7XG4gICAgICAgIFxuICAgIH0gICAgICAgXG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbn1cblxuXG5cblxuXHRsZXQgcXVlc3Rpb25zID0gW1xuXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDEsXG4gICAgMFxuXG5cdF0sIGxpbmsgPSAnYXNzZXRzL3RyYWNrcy90cmFjaycsIGFuc3dlcnMgPSBbXSwgdHJhY2tJZCA9IDAsIHRyYWNrLCB0ZXN0U3RhcnRlZCA9IGZhbHNlO1xuICAvLyDQuNC90YLQtdGA0LLQsNC7INC80LjQs9Cw0L3QuNGPXG4gIGZ1bmN0aW9uIGNvbG91ckludGVydmFsKCl7XG5cbiAgICBsZXQgY29sdW1uVHJhY2sgPSAkKCdbZGF0YS10cmFjaz1cIicrdHJhY2tJZCsnXCJdJyk7XG4gICAgc3RhcnRJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cbiAgICAgIGNvbHVtblRyYWNrLnRvZ2dsZUNsYXNzKCd0cmFjaycpO1xuXG4gICAgfSwgNTAwKVxuXG4gICAgXG4gIH1cblxuICAvL9Ci0YDRjdC6INC30LDQs9GA0YPQt9C40LvRgdGPXG4gIGZ1bmN0aW9uIHRyYWNrTG9hZGVkKCkge1xuICBcbiAgXHRcbiAgXG4gIH1cbiAgXG4gIC8v0KLRgNC10Log0L/RgNC+0LjQs9GA0LDQu1xuICBmdW5jdGlvbiB0cmFja0VuZGVkKHRyYWNrSWQpIHtcbiAgXG4gICAgY29uc29sZS5pbmZvKGBmbiB0cmFja0VuZGVkOiDRgtGA0LXQuiDQt9Cw0LrQvtC90YfQuNC70YHRjyAke2xpbmt9LSR7dHJhY2tJZCsxfS5tcDNgKTtcbiAgICBjb25zb2xlLmluZm8oYGZuIHRyYWNrRW5kZWQ6INC20LTQtdC8INC+0YLQstC10YLQsCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9gKTtcbiAgXG4gIH1cbiAgXG4gIC8v0JPRgNGD0LfQuNC8INGC0YDRjdC6XG4gIGZ1bmN0aW9uIGxvYWRUcmFjayh0cmFja0lkKSB7XG4gICAgXG4gICAgbGV0IGN1cnJlbnRDb2x1bW4gPSAkKHRoaXMpLmRhdGEoXCJjb2x1bW5cIik7XG4gIFx0dHJhY2sgPSBuZXcgQXVkaW8oYCR7bGlua30tJHt0cmFja0lkKzF9Lm1wM2ApO1xuICAgIFxuICAgIHRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICBjb25zb2xlLmluZm8oYGZuIGxvYWRUcmFjazog0LLQvtGB0L/RgNC+0LjQt9Cy0L7QtNC40Lwg0YLRgNC10LogJHtsaW5rfS0ke3RyYWNrSWQrMX0ubXAzYCk7XG5cbiAgICAgIHRyYWNrTG9hZGVkKCk7XG4gICAgICB0cmFjay5wbGF5KCk7XG5cbiAgICB9KTtcblxuICAgIHRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgdHJhY2tFbmRlZCh0cmFja0lkKTtcbiAgICAgIFxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiB0cmFjaztcbiAgXG4gIH1cbiAgXG4gIGZ1bmN0aW9uIHJlc3VsdCgpIHtcbiAgXG4gICAgbGV0IHBlcmNlbnQgPSBxdWVzdGlvbnMuZXF1YWxzKGFuc3dlcnMpICogMTA7XG4gICAgbGV0IHJhdGUgPSAkKCcuY29udHJvbGxlcl9fcmVzdWx0LXJhdGUnKTtcbiAgICBsZXQgc3ZnUmF0ZSA9ICQoJy5jaXJjbGUnKTtcbiAgICBsZXQgc3ZnUGVyY2VudGFnZSA9ICQoJy5wZXJjZW50YWdlJyk7XG4gICAgLy8gYWxlcnQoYNCS0LDRiCDRgNC10LfRg9C70YzRgtCw0YI6ICR7cGVyY2VudH0lYCk7XG4gICAgXG4gICAgLy/QmtC+0LQg0L7RgtC+0LHRgNCw0LbQtdC90LjRjyDRgNC10LfRg9C70YzRgtCw0YLQsFxuICAgIHJhdGUudGV4dChgJHtwZXJjZW50fWApO1xuICAgIHN2Z1JhdGUuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsIGAke3BlcmNlbnR9LCAxMDBgKTtcbiAgICBzdmdQZXJjZW50YWdlLnRleHQoYCR7cGVyY2VudH1gKTtcblxuXG5cbiAgXG4gIH1cblxuICAvL0NhbGxCYWNrINGC0LXRgdGCINC30LDQutC+0L3Rh9C40LvRgdGPXG4gIGZ1bmN0aW9uIHRlc3RFbmRlZCgpIHtcblxuICAgIGNvbnNvbGUuaW5mbyhgZm4gdGVzdEVuZGVkOiDRgtC10YHRgiDQt9Cw0LrQvtC90YfQuNC70YHRj2ApO1xuXG4gICAgLy/QktGL0LLQvtC00LjQvCDRgNC10LfRg9C70YzRgtCw0YJcbiAgICByZXN1bHQoKTtcblxuICB9XG4gIFxuICAvL9CS0L7RgdC/0YDQvtC40LfQstC+0LTQuNC8INGC0YDRjdC6XG4gIGZ1bmN0aW9uIHBsYXkodHJhY2tJZCkge1xuICAgIGNvbG91ckludGVydmFsKCk7XG4gICAgLy/QotC10YHRgiDQt9Cw0LrQvtC90YfQuNC70YHRj1xuICAgIGlmKCB0cmFja0lkID49IHF1ZXN0aW9ucy5sZW5ndGggKSB7XG5cbiAgICAgIHRlc3RFbmRlZCgpO1xuICAgICAgdGVzdFN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIC8v0J/RgNC+0LTQvtC70LbQsNC10Lwg0YLQtdGB0YJcbiAgICB9IGVsc2Uge1xuXG4gICAgICBsZXQgdHJhY2sgPSBsb2FkVHJhY2sodHJhY2tJZCk7XG5cbiAgICB9XG5cbiAgICBcbiAgXG4gIH1cblxuICAvL9CU0L7QsdCw0LLQu9GP0LXQvCDQutC+0LvQvtC90LrQuFxuICBmdW5jdGlvbiBnZW5lcmF0ZUNvbHVtbnMoKSB7XG5cbiAgICBsZXQgY29sdW1ucz0nJztcblxuICAgIGZvcihsZXQgaSA9MDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xuXG4gICAgICBjb2x1bW5zICs9YDxkaXYgY2xhc3M9XCJjb250cm9sbGVyX19jb2x1bW5cIiBkYXRhLWNvbHVtbj1cIiR7aX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyX19jb2x1bW4tdHJhY2tcIiBkYXRhLXRyYWNrPVwiJHtpfVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xsZXJfX2NvbHVtbi1jaG9pc2UgY29udHJvbGxlcl9fY29sdW1uLWNob2lzZS0tdHJ1ZVwiIGRhdGEtYW5zd2VyPVwidHJ1ZVwiIGRhdGEtdHJ1ZT1cIiR7aX1cIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyX19jb2x1bW4tY2hvaXNlIGNvbnRyb2xsZXJfX2NvbHVtbi1jaG9pc2UtLWZhbHNlXCIgZGF0YS1hbnN3ZXI9XCJmYWxzZVwiIGRhdGEtZmFsc2U9XCIke2l9XCI+PC9kaXY+XG4gICAgPC9kaXY+YDtcblxuICAgIH1cblxuICAgICQoXCIuY29udHJvbGxlcl9fcGFuZWxcIikuYXBwZW5kKGNvbHVtbnMpO1xuXG4gICAgY29uc29sZS5pbmZvKGBmbiBnZW5lcmF0ZUNvbHVtbnM6INCz0LXQvdC10YDQuNGA0YPQtdC8INC60L7Qu9C+0L3QutC4YCk7XG5cbiAgfVxuXG4vL9Cd0LDRh9C40L3QsNC10Lwg0YLQtdGB0YJcbmZ1bmN0aW9uIGJlZ2luVGVzdCgpIHtcblxuICBpZih0ZXN0U3RhcnRlZCl7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHRlc3RTdGFydGVkID0gdHJ1ZTtcblxuICAgIHBsYXkodHJhY2tJZCk7XG4gIFxuICAgIGNvbnNvbGUuaW5mbyhgZm4gYmVnaW5UZXN0OiDQvdCw0YfQuNC90LDQtdC8INGC0LXRgdGCYCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QW5zd2VyIChhbnN3ZXIpIHtcblxuICAgIGFuc3dlcnMucHVzaChhbnN3ZXIpO1xuICAgIGNvbnNvbGUuaW5mbyhgZm4gZ2V0QW5zd2VyOiDQtNC+0LHQsNCy0LvRj9C10Lwg0L7RgtCy0LXRgiAke2Fuc3dlcn1gKTtcbiAgICBjb25zb2xlLmluZm8oYGZuIGdldEFuc3dlcjog0LzQsNGB0YHQuNCyINC+0YLQstC10YLQvtCyINC40LfQvNC10L3QtdC9INC90LAgJHthbnN3ZXJzfWApO1xuICAgIGNvbnNvbGUuaW5mbyhgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1gKTtcbiAgICBwbGF5KCArK3RyYWNrSWQgKTtcbiAgICBcbn07XG5cblxuXG4kKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNvbnRyb2xsZXJfX2NvbHVtbicsIGZ1bmN0aW9uKGUpe1xuXG4gIFxuICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICBsZXQgdGhpc0lkID0gJHRoaXMuZGF0YShcImNvbHVtblwiKTtcblxuICBpZiggdGhpc0lkICE9PSB0cmFja0lkIHx8ICF0ZXN0U3RhcnRlZCApIHJldHVybiBmYWxzZTtcbiAgaWYoIHRyYWNrICkgdHJhY2sucGF1c2UoKTtcblxuICBsZXQgJGFuc3dlciA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5jb250cm9sbGVyX19jb2x1bW4tY2hvaXNlJyk7XG4gIGxldCBjb2x1bW5UcmFjayA9ICQoJ1tkYXRhLXRyYWNrPVwiJyt0cmFja0lkKydcIl0nKTtcbiAgbGV0IGNvbHVtblRydWUgPSAkKCdbZGF0YS10cnVlPVwiJyt0cmFja0lkKydcIl0nKTtcbiAgbGV0IGNvbHVtbkZhbHNlID0gJCgnW2RhdGEtZmFsc2U9XCInK3RyYWNrSWQrJ1wiXScpO1xuXG4gIGNsZWFySW50ZXJ2YWwoc3RhcnRJbnRlcnZhbCk7XG4gIGNvbHVtblRyYWNrLmFkZENsYXNzKCd0cmFjaycpO1xuICBcbiAgLy/QntGC0LLQtdGH0LDQtdC8XG4gIGlmKCAkYW5zd2VyLmRhdGEoXCJhbnN3ZXJcIikgPT09IHRydWUgKSB7XG4gICAgY29sdW1uVHJ1ZS5hZGRDbGFzcygndHJ1ZScpO1xuICAgIGdldEFuc3dlcigxKTtcbiAgfSBlbHNlIHtcbiAgICBjb2x1bW5GYWxzZS5hZGRDbGFzcygnZmFsc2UnKTtcbiAgICBnZXRBbnN3ZXIoMCk7XG5cbiAgfVxuXG5cblxuXG4gIFxuXG4gIC8v0KPQtNCw0LvRj9C10Lwg0YLRgNC10Log0Lgg0LLRgdC1INC+0LHRgNCw0LHQvtGC0YfQuNC60LhcbiAgJCh0cmFjaykucmVtb3ZlKCk7XG5cbn0pO1xuXG4vL211dGUgc291bmRzIFxuXG5mdW5jdGlvbiBtdXRlVHJhY2soKXtcbiAgXG59XG4vL29uZSBzY3JvbGwgXG5cbiQoJy50aXRsZV9fYXJyb3cuYm91bmNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgJC5mbi5mdWxscGFnZS5tb3ZlU2VjdGlvbkRvd24oKTtcbn0pO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0JCgnI2Z1bGxwYWdlJykuZnVsbHBhZ2Uoe1xuXG5cdFx0Ly9TY3JvbGxpbmdcblx0XHRjc3MzOiB0cnVlLFxuXHRcdHNjcm9sbGluZ1NwZWVkOiA3MDAsXG5cblx0XHQvL0FjY2Vzc2liaWxpdHlcblx0XHRrZXlib2FyZFNjcm9sbGluZzogdHJ1ZSxcblxuXHRcdC8vQ3VzdG9tIHNlbGVjdG9yc1xuXHRcdHNlY3Rpb25TZWxlY3RvcjogJy5zZWN0aW9uJyxcblxuXHRcdGxhenlMb2FkaW5nOiB0cnVlLFxuXG5cdH0pO1xufSk7XG5cbi8vIHBhcnRpY2lwbGVzXG5cbnBhcnRpY2xlc0pTKFwicGFydGljbGVzLWpzXCIsIHtcbiAgICBcInBhcnRpY2xlc1wiOiB7XG4gICAgICBcIm51bWJlclwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogNTcsXG4gICAgICAgIFwiZGVuc2l0eVwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICBcInZhbHVlX2FyZWFcIjogODAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImNvbG9yXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIiNmZmZmZmZcIlxuICAgICAgfSxcbiAgICAgIFwic2hhcGVcIjoge1xuICAgICAgICBcInR5cGVcIjogXCJjaXJjbGVcIixcbiAgICAgICAgXCJzdHJva2VcIjoge1xuICAgICAgICAgIFwid2lkdGhcIjogMCxcbiAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicG9seWdvblwiOiB7XG4gICAgICAgICAgXCJuYl9zaWRlc1wiOiA1XG4gICAgICAgIH0sXG4gICAgICAgIFwiaW1hZ2VcIjoge1xuICAgICAgICAgIFwic3JjXCI6IFwiaW1nL2dpdGh1Yi5zdmdcIixcbiAgICAgICAgICBcIndpZHRoXCI6IDEwMCxcbiAgICAgICAgICBcImhlaWdodFwiOiAxMDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwib3BhY2l0eVwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogMC4xLFxuICAgICAgICBcInJhbmRvbVwiOiBmYWxzZSxcbiAgICAgICAgXCJhbmltXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcInNwZWVkXCI6IDEsXG4gICAgICAgICAgXCJvcGFjaXR5X21pblwiOiAwLjEsXG4gICAgICAgICAgXCJzeW5jXCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInNpemVcIjoge1xuICAgICAgICBcInZhbHVlXCI6IDMsXG4gICAgICAgIFwicmFuZG9tXCI6IHRydWUsXG4gICAgICAgIFwiYW5pbVwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJzcGVlZFwiOiA0MCxcbiAgICAgICAgICBcInNpemVfbWluXCI6IDAuMSxcbiAgICAgICAgICBcInN5bmNcIjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibGluZV9saW5rZWRcIjoge1xuICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICBcImRpc3RhbmNlXCI6IDE1MCxcbiAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgXCJvcGFjaXR5XCI6IDAuNCxcbiAgICAgICAgXCJ3aWR0aFwiOiAxXG4gICAgICB9LFxuICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJzcGVlZFwiOiAxLFxuICAgICAgICBcImRpcmVjdGlvblwiOiBcIm5vbmVcIixcbiAgICAgICAgXCJyYW5kb21cIjogZmFsc2UsXG4gICAgICAgIFwic3RyYWlnaHRcIjogZmFsc2UsXG4gICAgICAgIFwib3V0X21vZGVcIjogXCJvdXRcIixcbiAgICAgICAgXCJib3VuY2VcIjogZmFsc2UsXG4gICAgICAgIFwiYXR0cmFjdFwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJyb3RhdGVYXCI6IDYwMCxcbiAgICAgICAgICBcInJvdGF0ZVlcIjogMTIwMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcImludGVyYWN0aXZpdHlcIjoge1xuICAgICAgXCJkZXRlY3Rfb25cIjogXCJjYW52YXNcIixcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJvbmhvdmVyXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcIm1vZGVcIjogXCJyZXB1bHNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJvbmNsaWNrXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcIm1vZGVcIjogXCJwdXNoXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXNpemVcIjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIFwibW9kZXNcIjoge1xuICAgICAgICBcImdyYWJcIjoge1xuICAgICAgICAgIFwiZGlzdGFuY2VcIjogNDAwLFxuICAgICAgICAgIFwibGluZV9saW5rZWRcIjoge1xuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnViYmxlXCI6IHtcbiAgICAgICAgICBcImRpc3RhbmNlXCI6IDQwMCxcbiAgICAgICAgICBcInNpemVcIjogNDAsXG4gICAgICAgICAgXCJkdXJhdGlvblwiOiAyLFxuICAgICAgICAgIFwib3BhY2l0eVwiOiA4LFxuICAgICAgICAgIFwic3BlZWRcIjogM1xuICAgICAgICB9LFxuICAgICAgICBcInJlcHVsc2VcIjoge1xuICAgICAgICAgIFwiZGlzdGFuY2VcIjogMjAwLFxuICAgICAgICAgIFwiZHVyYXRpb25cIjogMC40XG4gICAgICAgIH0sXG4gICAgICAgIFwicHVzaFwiOiB7XG4gICAgICAgICAgXCJwYXJ0aWNsZXNfbmJcIjogNFxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJwYXJ0aWNsZXNfbmJcIjogMlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcInJldGluYV9kZXRlY3RcIjogdHJ1ZVxuICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
