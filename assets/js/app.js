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

	], link = '/assets/tracks/track', answers = [], trackId = 0, track, testStarted = false;
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
    // alert(`Ваш результат: ${percent}%`);
    
    //Код отображения результата
    rate.text(`${percent}`);

  
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGhhbWJ1cmdlclxuXG4vLyBMb29rIGZvciAuaGFtYnVyZ2VyXG52YXIgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oYW1idXJnZXJcIik7XG4vLyBPbiBjbGlja1xuaGFtYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgLy8gVG9nZ2xlIGNsYXNzIFwiaXMtYWN0aXZlXCJcbiAgaGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1hY3RpdmVcIik7XG4gIC8vIERvIHNvbWV0aGluZyBlbHNlLCBsaWtlIG9wZW4vY2xvc2UgbWVudVxufSk7XG5cblxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuc291bmQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzb3VuZC0tb2ZmJyk7XG4gICAgfSk7XG5cbiAgICAvL9CU0L7QsdCw0LLQu9GP0LXQvCDQutC+0LvQvtC90LrQuFxuICAgIGdlbmVyYXRlQ29sdW1ucygpO1xuXG5cbn0pO1xuXG5cbi8vIHRlc3RcblxuaWYoICFBcnJheS5wcm90b3R5cGUuZXF1YWxzICkge1xuXG5cdEFycmF5LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAoYXJyYXkpIHtcbiAgICAvLyBpZiB0aGUgb3RoZXIgYXJyYXkgaXMgYSBmYWxzeSB2YWx1ZSwgcmV0dXJuXG4gICAgaWYgKCFhcnJheSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gY29tcGFyZSBsZW5ndGhzIC0gY2FuIHNhdmUgYSBsb3Qgb2YgdGltZSBcbiAgICBpZiAodGhpcy5sZW5ndGggIT0gYXJyYXkubGVuZ3RoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIFxuICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbD10aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgdGhpc1tpXSA9PSBhcnJheVtpXSA/ICgrK2NvdW50KSA6IDA7XG4gICAgICAgIFxuICAgIH0gICAgICAgXG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbn1cblxuXG5cblxuXHRsZXQgcXVlc3Rpb25zID0gW1xuXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDEsXG4gICAgMFxuXG5cdF0sIGxpbmsgPSAnL2Fzc2V0cy90cmFja3MvdHJhY2snLCBhbnN3ZXJzID0gW10sIHRyYWNrSWQgPSAwLCB0cmFjaywgdGVzdFN0YXJ0ZWQgPSBmYWxzZTtcbiAgLy8g0LjQvdGC0LXRgNCy0LDQuyDQvNC40LPQsNC90LjRj1xuICBmdW5jdGlvbiBjb2xvdXJJbnRlcnZhbCgpe1xuXG4gICAgbGV0IGNvbHVtblRyYWNrID0gJCgnW2RhdGEtdHJhY2s9XCInK3RyYWNrSWQrJ1wiXScpO1xuICAgIHN0YXJ0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuXG4gICAgICBjb2x1bW5UcmFjay50b2dnbGVDbGFzcygndHJhY2snKTtcblxuICAgIH0sIDUwMClcblxuICAgIFxuICB9XG5cbiAgLy/QotGA0Y3QuiDQt9Cw0LPRgNGD0LfQuNC70YHRj1xuICBmdW5jdGlvbiB0cmFja0xvYWRlZCgpIHtcbiAgXG4gIFx0XG4gIFxuICB9XG4gIFxuICAvL9Ci0YDQtdC6INC/0YDQvtC40LPRgNCw0LtcbiAgZnVuY3Rpb24gdHJhY2tFbmRlZCh0cmFja0lkKSB7XG4gIFxuICAgIGNvbnNvbGUuaW5mbyhgZm4gdHJhY2tFbmRlZDog0YLRgNC10Log0LfQsNC60L7QvdGH0LjQu9GB0Y8gJHtsaW5rfS0ke3RyYWNrSWQrMX0ubXAzYCk7XG4gICAgY29uc29sZS5pbmZvKGBmbiB0cmFja0VuZGVkOiDQttC00LXQvCDQvtGC0LLQtdGC0LAg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPYCk7XG4gIFxuICB9XG4gIFxuICAvL9CT0YDRg9C30LjQvCDRgtGA0Y3QulxuICBmdW5jdGlvbiBsb2FkVHJhY2sodHJhY2tJZCkge1xuICAgIFxuICAgIGxldCBjdXJyZW50Q29sdW1uID0gJCh0aGlzKS5kYXRhKFwiY29sdW1uXCIpO1xuICBcdHRyYWNrID0gbmV3IEF1ZGlvKGAke2xpbmt9LSR7dHJhY2tJZCsxfS5tcDNgKTtcbiAgICBcbiAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgY29uc29sZS5pbmZvKGBmbiBsb2FkVHJhY2s6INCy0L7RgdC/0YDQvtC40LfQstC+0LTQuNC8INGC0YDQtdC6ICR7bGlua30tJHt0cmFja0lkKzF9Lm1wM2ApO1xuXG4gICAgICB0cmFja0xvYWRlZCgpO1xuICAgICAgdHJhY2sucGxheSgpO1xuXG4gICAgfSk7XG5cbiAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgIHRyYWNrRW5kZWQodHJhY2tJZCk7XG4gICAgICBcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gdHJhY2s7XG4gIFxuICB9XG4gIFxuICBmdW5jdGlvbiByZXN1bHQoKSB7XG4gIFxuICAgIGxldCBwZXJjZW50ID0gcXVlc3Rpb25zLmVxdWFscyhhbnN3ZXJzKSAqIDEwO1xuICAgIGxldCByYXRlID0gJCgnLmNvbnRyb2xsZXJfX3Jlc3VsdC1yYXRlJyk7XG4gICAgLy8gYWxlcnQoYNCS0LDRiCDRgNC10LfRg9C70YzRgtCw0YI6ICR7cGVyY2VudH0lYCk7XG4gICAgXG4gICAgLy/QmtC+0LQg0L7RgtC+0LHRgNCw0LbQtdC90LjRjyDRgNC10LfRg9C70YzRgtCw0YLQsFxuICAgIHJhdGUudGV4dChgJHtwZXJjZW50fWApO1xuXG4gIFxuICB9XG5cbiAgLy9DYWxsQmFjayDRgtC10YHRgiDQt9Cw0LrQvtC90YfQuNC70YHRj1xuICBmdW5jdGlvbiB0ZXN0RW5kZWQoKSB7XG5cbiAgICBjb25zb2xlLmluZm8oYGZuIHRlc3RFbmRlZDog0YLQtdGB0YIg0LfQsNC60L7QvdGH0LjQu9GB0Y9gKTtcblxuICAgIC8v0JLRi9Cy0L7QtNC40Lwg0YDQtdC30YPQu9GM0YLQsNGCXG4gICAgcmVzdWx0KCk7XG5cbiAgfVxuICBcbiAgLy/QktC+0YHQv9GA0L7QuNC30LLQvtC00LjQvCDRgtGA0Y3QulxuICBmdW5jdGlvbiBwbGF5KHRyYWNrSWQpIHtcbiAgICBjb2xvdXJJbnRlcnZhbCgpO1xuICAgIC8v0KLQtdGB0YIg0LfQsNC60L7QvdGH0LjQu9GB0Y9cbiAgICBpZiggdHJhY2tJZCA+PSBxdWVzdGlvbnMubGVuZ3RoICkge1xuXG4gICAgICB0ZXN0RW5kZWQoKTtcbiAgICAgIHRlc3RTdGFydGVkID0gZmFsc2U7XG5cbiAgICAvL9Cf0YDQvtC00L7Qu9C20LDQtdC8INGC0LXRgdGCXG4gICAgfSBlbHNlIHtcblxuICAgICAgbGV0IHRyYWNrID0gbG9hZFRyYWNrKHRyYWNrSWQpO1xuXG4gICAgfVxuXG4gICAgXG4gIFxuICB9XG5cbiAgLy/QlNC+0LHQsNCy0LvRj9C10Lwg0LrQvtC70L7QvdC60LhcbiAgZnVuY3Rpb24gZ2VuZXJhdGVDb2x1bW5zKCkge1xuXG4gICAgbGV0IGNvbHVtbnM9Jyc7XG5cbiAgICBmb3IobGV0IGkgPTA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgY29sdW1ucyArPWA8ZGl2IGNsYXNzPVwiY29udHJvbGxlcl9fY29sdW1uXCIgZGF0YS1jb2x1bW49XCIke2l9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbGxlcl9fY29sdW1uLXRyYWNrXCIgZGF0YS10cmFjaz1cIiR7aX1cIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyX19jb2x1bW4tY2hvaXNlIGNvbnRyb2xsZXJfX2NvbHVtbi1jaG9pc2UtLXRydWVcIiBkYXRhLWFuc3dlcj1cInRydWVcIiBkYXRhLXRydWU9XCIke2l9XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbGxlcl9fY29sdW1uLWNob2lzZSBjb250cm9sbGVyX19jb2x1bW4tY2hvaXNlLS1mYWxzZVwiIGRhdGEtYW5zd2VyPVwiZmFsc2VcIiBkYXRhLWZhbHNlPVwiJHtpfVwiPjwvZGl2PlxuICAgIDwvZGl2PmA7XG5cbiAgICB9XG5cbiAgICAkKFwiLmNvbnRyb2xsZXJfX3BhbmVsXCIpLmFwcGVuZChjb2x1bW5zKTtcblxuICAgIGNvbnNvbGUuaW5mbyhgZm4gZ2VuZXJhdGVDb2x1bW5zOiDQs9C10L3QtdGA0LjRgNGD0LXQvCDQutC+0LvQvtC90LrQuGApO1xuXG4gIH1cblxuLy/QndCw0YfQuNC90LDQtdC8INGC0LXRgdGCXG5mdW5jdGlvbiBiZWdpblRlc3QoKSB7XG5cbiAgaWYodGVzdFN0YXJ0ZWQpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0ZXN0U3RhcnRlZCA9IHRydWU7XG5cbiAgICBwbGF5KHRyYWNrSWQpO1xuICBcbiAgICBjb25zb2xlLmluZm8oYGZuIGJlZ2luVGVzdDog0L3QsNGH0LjQvdCw0LXQvCDRgtC10YHRgmApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFuc3dlciAoYW5zd2VyKSB7XG5cbiAgICBhbnN3ZXJzLnB1c2goYW5zd2VyKTtcbiAgICBjb25zb2xlLmluZm8oYGZuIGdldEFuc3dlcjog0LTQvtCx0LDQstC70Y/QtdC8INC+0YLQstC10YIgJHthbnN3ZXJ9YCk7XG4gICAgY29uc29sZS5pbmZvKGBmbiBnZXRBbnN3ZXI6INC80LDRgdGB0LjQsiDQvtGC0LLQtdGC0L7QsiDQuNC30LzQtdC90LXQvSDQvdCwICR7YW5zd2Vyc31gKTtcbiAgICBjb25zb2xlLmluZm8oYC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tYCk7XG4gICAgcGxheSggKyt0cmFja0lkICk7XG4gICAgXG59O1xuXG5cblxuJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5jb250cm9sbGVyX19jb2x1bW4nLCBmdW5jdGlvbihlKXtcblxuICBcbiAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgbGV0IHRoaXNJZCA9ICR0aGlzLmRhdGEoXCJjb2x1bW5cIik7XG5cbiAgaWYoIHRoaXNJZCAhPT0gdHJhY2tJZCB8fCAhdGVzdFN0YXJ0ZWQgKSByZXR1cm4gZmFsc2U7XG4gIGlmKCB0cmFjayApIHRyYWNrLnBhdXNlKCk7XG5cbiAgbGV0ICRhbnN3ZXIgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuY29udHJvbGxlcl9fY29sdW1uLWNob2lzZScpO1xuICBsZXQgY29sdW1uVHJhY2sgPSAkKCdbZGF0YS10cmFjaz1cIicrdHJhY2tJZCsnXCJdJyk7XG4gIGxldCBjb2x1bW5UcnVlID0gJCgnW2RhdGEtdHJ1ZT1cIicrdHJhY2tJZCsnXCJdJyk7XG4gIGxldCBjb2x1bW5GYWxzZSA9ICQoJ1tkYXRhLWZhbHNlPVwiJyt0cmFja0lkKydcIl0nKTtcblxuICBjbGVhckludGVydmFsKHN0YXJ0SW50ZXJ2YWwpO1xuICBjb2x1bW5UcmFjay5hZGRDbGFzcygndHJhY2snKTtcbiAgXG4gIC8v0J7RgtCy0LXRh9Cw0LXQvFxuICBpZiggJGFuc3dlci5kYXRhKFwiYW5zd2VyXCIpID09PSB0cnVlICkge1xuICAgIGNvbHVtblRydWUuYWRkQ2xhc3MoJ3RydWUnKTtcbiAgICBnZXRBbnN3ZXIoMSk7XG4gIH0gZWxzZSB7XG4gICAgY29sdW1uRmFsc2UuYWRkQ2xhc3MoJ2ZhbHNlJyk7XG4gICAgZ2V0QW5zd2VyKDApO1xuXG4gIH1cblxuXG5cblxuICBcblxuICAvL9Cj0LTQsNC70Y/QtdC8INGC0YDQtdC6INC4INCy0YHQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutC4XG4gICQodHJhY2spLnJlbW92ZSgpO1xuXG59KTtcblxuXG5cbi8vIHBhcnRpY2lwbGVzXG5cbnBhcnRpY2xlc0pTKFwicGFydGljbGVzLWpzXCIsIHtcbiAgICBcInBhcnRpY2xlc1wiOiB7XG4gICAgICBcIm51bWJlclwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogNTcsXG4gICAgICAgIFwiZGVuc2l0eVwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgICBcInZhbHVlX2FyZWFcIjogODAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcImNvbG9yXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIiNmZmZmZmZcIlxuICAgICAgfSxcbiAgICAgIFwic2hhcGVcIjoge1xuICAgICAgICBcInR5cGVcIjogXCJjaXJjbGVcIixcbiAgICAgICAgXCJzdHJva2VcIjoge1xuICAgICAgICAgIFwid2lkdGhcIjogMCxcbiAgICAgICAgICBcImNvbG9yXCI6IFwiIzAwMDAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicG9seWdvblwiOiB7XG4gICAgICAgICAgXCJuYl9zaWRlc1wiOiA1XG4gICAgICAgIH0sXG4gICAgICAgIFwiaW1hZ2VcIjoge1xuICAgICAgICAgIFwic3JjXCI6IFwiaW1nL2dpdGh1Yi5zdmdcIixcbiAgICAgICAgICBcIndpZHRoXCI6IDEwMCxcbiAgICAgICAgICBcImhlaWdodFwiOiAxMDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwib3BhY2l0eVwiOiB7XG4gICAgICAgIFwidmFsdWVcIjogMC4xLFxuICAgICAgICBcInJhbmRvbVwiOiBmYWxzZSxcbiAgICAgICAgXCJhbmltXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcInNwZWVkXCI6IDEsXG4gICAgICAgICAgXCJvcGFjaXR5X21pblwiOiAwLjEsXG4gICAgICAgICAgXCJzeW5jXCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInNpemVcIjoge1xuICAgICAgICBcInZhbHVlXCI6IDMsXG4gICAgICAgIFwicmFuZG9tXCI6IHRydWUsXG4gICAgICAgIFwiYW5pbVwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJzcGVlZFwiOiA0MCxcbiAgICAgICAgICBcInNpemVfbWluXCI6IDAuMSxcbiAgICAgICAgICBcInN5bmNcIjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibGluZV9saW5rZWRcIjoge1xuICAgICAgICBcImVuYWJsZVwiOiB0cnVlLFxuICAgICAgICBcImRpc3RhbmNlXCI6IDE1MCxcbiAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIixcbiAgICAgICAgXCJvcGFjaXR5XCI6IDAuNCxcbiAgICAgICAgXCJ3aWR0aFwiOiAxXG4gICAgICB9LFxuICAgICAgXCJtb3ZlXCI6IHtcbiAgICAgICAgXCJlbmFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJzcGVlZFwiOiAxLFxuICAgICAgICBcImRpcmVjdGlvblwiOiBcIm5vbmVcIixcbiAgICAgICAgXCJyYW5kb21cIjogZmFsc2UsXG4gICAgICAgIFwic3RyYWlnaHRcIjogZmFsc2UsXG4gICAgICAgIFwib3V0X21vZGVcIjogXCJvdXRcIixcbiAgICAgICAgXCJib3VuY2VcIjogZmFsc2UsXG4gICAgICAgIFwiYXR0cmFjdFwiOiB7XG4gICAgICAgICAgXCJlbmFibGVcIjogZmFsc2UsXG4gICAgICAgICAgXCJyb3RhdGVYXCI6IDYwMCxcbiAgICAgICAgICBcInJvdGF0ZVlcIjogMTIwMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcImludGVyYWN0aXZpdHlcIjoge1xuICAgICAgXCJkZXRlY3Rfb25cIjogXCJjYW52YXNcIixcbiAgICAgIFwiZXZlbnRzXCI6IHtcbiAgICAgICAgXCJvbmhvdmVyXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcIm1vZGVcIjogXCJyZXB1bHNlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJvbmNsaWNrXCI6IHtcbiAgICAgICAgICBcImVuYWJsZVwiOiBmYWxzZSxcbiAgICAgICAgICBcIm1vZGVcIjogXCJwdXNoXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXNpemVcIjogdHJ1ZVxuICAgICAgfSxcbiAgICAgIFwibW9kZXNcIjoge1xuICAgICAgICBcImdyYWJcIjoge1xuICAgICAgICAgIFwiZGlzdGFuY2VcIjogNDAwLFxuICAgICAgICAgIFwibGluZV9saW5rZWRcIjoge1xuICAgICAgICAgICAgXCJvcGFjaXR5XCI6IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYnViYmxlXCI6IHtcbiAgICAgICAgICBcImRpc3RhbmNlXCI6IDQwMCxcbiAgICAgICAgICBcInNpemVcIjogNDAsXG4gICAgICAgICAgXCJkdXJhdGlvblwiOiAyLFxuICAgICAgICAgIFwib3BhY2l0eVwiOiA4LFxuICAgICAgICAgIFwic3BlZWRcIjogM1xuICAgICAgICB9LFxuICAgICAgICBcInJlcHVsc2VcIjoge1xuICAgICAgICAgIFwiZGlzdGFuY2VcIjogMjAwLFxuICAgICAgICAgIFwiZHVyYXRpb25cIjogMC40XG4gICAgICAgIH0sXG4gICAgICAgIFwicHVzaFwiOiB7XG4gICAgICAgICAgXCJwYXJ0aWNsZXNfbmJcIjogNFxuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZVwiOiB7XG4gICAgICAgICAgXCJwYXJ0aWNsZXNfbmJcIjogMlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBcInJldGluYV9kZXRlY3RcIjogdHJ1ZVxuICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
