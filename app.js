$(document).ready(function () {
  var state = (function generateState() {
    var currentQuestion = -1;  // -1: start screen, 0: first question
    var numCorrect = 0;

    // state modifying functions
    function generateStartScreen() {
      // called if user clicks on restart / start over
      // this is the HTML hardcoded in index.html
      return (
        '<h2>Instructions</h2>\n' +
        '<p>Press start when you are ready to begin the quiz</p>\n' +
        '<button id="start">Start Quiz</button>\n'
      );
    }

    function generateNextQuestion() {
      var question = questions[currentQuestion].question;
      var answers = questions[currentQuestion].answers;

      var questionHtml =
        '<h2>Question ' + (currentQuestion + 1) + ' of ' +
          questions.length + ' :</h2>' +
        '<h3 id="#question">' + question + '</h3>';

      var answersHtml =
        '<ol type="a">' +
          answers.map(function (element, index) {
            return '<li class="answers" id="js-opt-' + index + '">' +
              element + '</li>';
          }).join("\n") +
        '</ol>';

      var footerHtml =
        '<div id="js-footer">' +
          '<h3>Please click on your choice above.</h3>' +
          '<p id="js-footer">So far you have gotten ' + numCorrect +
            ' right and ' + (currentQuestion - numCorrect) + ' wrong.</p>' +
        '</div>' +
        '<div>';

      return questionHtml + answersHtml + footerHtml;
    }

    function checkAnswer(answer) {
      var correctAnswer = questions[currentQuestion].correctAnswer;

      if (answer === correctAnswer) {
        return gotItRight();
      } else {
        return gotItWrong();
      }
    }

    function gotItRight() {
      numCorrect += 1;

      return (
        '<h3 id="correct">Correct!</h3>'
      );
    }

    function gotItWrong() {
      // got it wrong
      // output correct answer text and choice number:
      // "Sorry, the correct answer was 'c. blah blah blah'"
      var question = questions[currentQuestion];

      return (
        '<h3 id="incorrect">Sorry, you got it wrong. The correct answer is:</h3>' +
        '<p id="correct">"' + question.answers[question.correctAnswer] + '"</p>'
      );
    }

    function nextQuestion() {
      currentQuestion += 1;

      if (currentQuestion >= questions.length) { // finished questions
        return false; // ??? or call summarize?
      }

      return true; // indicates end not reached... better way to signal this?
    }

    function resetQuiz() {
      currentQuestion = 0;
      numCorrect = 0;
    }

    function generateFinalResults() {
      // generate HTML for count of num right & wrong
      // Button to start over
      // include picture of something appropriate to results
      // balloons or fireworks for high / perfect score
      // crying face for low score
      // ...
    }

    return {
      status,
      generateStartScreen,
      generateNextQuestion,
      checkAnswer,
      nextQuestion,
      resetQuiz,
      generateFinalResults
    };
  }());

  var page = $('#js-main');

  function render(selector, content) {
    selector.html(content);
  }

  // initialize page
  render(page, state.generateStartScreen());

  function highlightClicked(selector) {
    selector.addClass('js-clicked');
  }

  // Listeners
  $('#start').click(function () {
    state.resetQuiz();  // do we need?

    var next = state.generateNextQuestion();

    render(page, next);
  });

  $('.container').on('click', '.answers', function(event) {
    var selectedAnswer = Number(event.target.id.substr(-1));

    highlightClicked($(event.target));

    render($('#js-footer'), state.checkAnswer(selectedAnswer));

    state.nextQuestion();
  })
});
