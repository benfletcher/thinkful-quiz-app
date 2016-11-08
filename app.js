$(document).ready(function () {
  var page = $('#js-main');

  var state = (function generateState() {
    var currentQuestion = -1;  // -1: start screen, 0: first question
    var numCorrect = 0;

    function generateStartScreen() {
      return (
        '<h2>Instructions</h2>\n' +
        '<p>Press start when you are ready to begin the quiz</p>\n' +
        '<button class="next-button">Let\'s Go!</button>\n'
      );
    }

    function generateQuestion() {
      var question = questions[currentQuestion].question;
      var answers = questions[currentQuestion].answers;

      var questionHtml =
        '<h2>Question ' + (currentQuestion + 1) + ' of ' +
          questions.length + ' :</h2>' +
        '<h3 id="#question">' + question + '</h3>';

      var answersHtml =
        '<ol type="a">' +
          answers.map(function (element, index) {
            return '<li class="answers js-selectable" id="js-opt-' + index + '">' +
              element + '</li>';
          }).join("\n") +
        '</ol>';

      var footerHtml =
        '<div id="js-footer">' +
          '<h3 id="js-click-prompt">Please click on your choice above.</h3>' +
          '<p id="js-footer">So far you have gotten ' + numCorrect +
            ' right and ' + (currentQuestion - numCorrect) + ' wrong.</p>' +
        '</div>' +
        '<div>' +
        '<button class="next-button" type="button">Next question</button>'
        '</div>';

      return questionHtml + answersHtml + footerHtml;
    }

    function checkAnswer(answer) {
      var correctAnswer = questions[currentQuestion].correctAnswer;

      if (answer === correctAnswer) {
        return _gotItRight();
      } else {
        return _gotItWrong();
      }
    }

    function _gotItRight() {
      numCorrect += 1;

      return (
        '<h3 id="correct">Correct!</h3>'
      );
    }

    function _gotItWrong() {
      var thisQ = questions[currentQuestion];
      var thisA = thisQ.correctAnswer;

      return (
        '<h3 id="incorrect">Sorry, you got it wrong. The correct answer is:</h3>' +
        '<p id="correct">"' + thisQ.answers[thisA] + '"</p>'
      );
    }

    function nextQuestion() {
      currentQuestion += 1;

      return currentQuestion < questions.length;
    }

    function restart() {
      currentQuestion = -1;
      numCorrect = 0;
    }

    function generateFinalResults() {
      // generate HTML for count of num right & wrong
      // Button to start over
      // include picture of something appropriate to results
      // balloons or fireworks for high / perfect score
      // crying face for low score
      // ...
      return (
        '<h2>Results</h2>' +
        '<p>' +
          'You answered ' + numCorrect + ' out of ' + questions.length +
            ' questions correctly.' +
        '</p>' +
        '<button id="js-restart" type="button">Try again?</button>'
      );
    }

    return {
      status,
      generateStartScreen,
      generateQuestion,
      checkAnswer,
      nextQuestion,
      restart,
      generateFinalResults
    };
  }());

  // var generate = (function generatePages() {
  //   function question(currQuestion) {
  //
  //   }
  //
  //   return {
  //
  //   };
  // }());

  function render(selector, content) {
    selector.html(content);
  }

  // initialize page
  render(page, state.generateStartScreen());

  $('#js-main')
    .on('click', '.js-selectable', function(event) {
      var selectedAnswer = Number(event.target.id.substr(-1));

      $(event.target).addClass('js-clicked');
      $('.answers').removeClass('js-selectable');
      $('#js-click-prompt').remove();

      render($('#js-footer'), state.checkAnswer(selectedAnswer));
    })

    .on('click', '.next-button', function(event) {
      var next = state.nextQuestion()
        ? state.generateQuestion()
        : state.generateFinalResults();

      render(page, next);
    })

    .on('click', '#js-restart', function() {
      state.restart();
      render(page, state.generateStartScreen());
    });
});
