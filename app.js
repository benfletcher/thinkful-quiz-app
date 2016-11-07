$(document).ready(function () {
  var questions = [
    {
      question: "xxxxxxx ?",

      answers: [
        "answer choice 'a'.",
        "answer choice 'b'.",
        "answer choice 'c'.",
        "answer choice 'd'.",
        "answer choice 'e'.",
      ],

      correctAnswer: 3
    },
    {
      question: "xxxxxxx ?",

      answers: [
        "answer choice 'a'.",  // 0 
        "answer choice 'b'.",  // 1
        "answer choice 'c'.",  // 2
        "answer choice 'd'.",
        "answer choice 'e'.",
      ],

      correctAnswer: 2 // hardcoded answer (0 to 4)
    }
  ];

  var state = (function generateState() {
    var currentQuestion = 0;  // starts at 0, incremented as questions answered
      // questions[currentQuestion] => points at current question details

    var numCorrect = 0; // calculate numIncorrect by subtracting

    // state modifying functions
    function generateNextQuestion() {
      console.log(currentQuestion, numCorrect);

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

      // debugger;
      return questionHtml + answersHtml + footerHtml;
    }

    function compareAnswer(answer) {
      var correctAnswer = questions[currentQuestion].correctAnswer;

      if (answer === correctAnswer) {
        // got it right

      } else {
        // got it wrong
        
      }
    }

    function nextQuestion() {
      currentQuestion += 1;
    }

    function resetQuiz() {
      currentQuestion = 0;
      numCorrect = 0;
    }

    function generateFinalResults() {

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
    // need extract '0' out of 'js-opt0'  // 'hello, world 1'
    var selectedAnswer = Number(event.target.id.substr(-1));

    console.log(selectedAnswer);

    state.compareAnswer(selectedAnswer);

  })
});



