$(document).ready(function () {
  var state = (function generateState() {
    var currentQuestion = 0;  // 0 indexed to align wtih question array
    var numCorrect = 0;

    // state modifying functions
    function generateStartScreen() {
      // called if user clicks on restart / start over
      // or can we / should we trigger a refresh instead?
      // this is the HTML hardcoded in index.html
    }

    function generateNextQuestion() {
      var question = questions[currentQuestion].question;
      var answers = questions[currentQuestion].answers;

      var questionHtml =
        '<h2>Question ' + (currentQuestion + 1) + ' of ' + questions.length + ' :</h2>' +
        '<h3 id="#question">' + question + '</h3>';

      var answersHtml =
        '<ol type="a">' +
          answers.map(function (element, index) {
            return '<li class="answers" id="js-opt' + index + '">' + element + '</li>';
          }).join("") +
        '</ol>' +
        '<h3>Please click on your choice above.</h3>';

      var footerHtml =
        '<div>' +
          '<p id="question-footer">So far you have gotten ' + numCorrect + ' right and ' +
            (currentQuestion - numCorrect) + ' wrong.</p>' +
        '</div>';

      return questionHtml + answersHtml + footerHtml;
    }

    function compareAnswer(answer) {
      var correctAnswer = questions[currentQuestion].correctAnswer;

      if (answer === correctAnswer) {
        // got it right

      } else {
        // got it wrong
        // output correct answer text and choice number:
        // "Sorry, the correct answer was 'c. blah blah blah'"
      }
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
      generateNextQuestion,
      compareAnswer,
      nextQuestion,
      resetQuiz,
      generateFinalResults
    };
  }());

  function renderQuestion(question) {
    $('#js-main').html(question);
  }

  // Listeners
  $('#start').click(function () {
    state.resetQuiz();  // do we need?

    var next = state.generateNextQuestion();

    renderQuestion(next);
  });

  $('.container').on('click', '.answers', function(event) {
    var selectedAnswer = Number(event.target.id.substr(-1));

    state.compareAnswer(selectedAnswer);

  })
});
