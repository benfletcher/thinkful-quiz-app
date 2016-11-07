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
        "answer choice 'a'.",
        "answer choice 'b'.",
        "answer choice 'c'.",
        "answer choice 'd'.",
        "answer choice 'e'.",
      ],

      correctAnswer: 2 // hardcoded answer
    }
  ];

  var state = (function generateState() {
    var status = {

      currentQuestion: 1,  // starts at 1, incremented as questions answered

      numCorrect: 0, // calculate numIncorrect by subtracting
    };

    // state modifying functions

    function generateNextQuestion() {
      // User Joe has clicked start or next question, this fn is called to generate next/first question


    }

    function submitAnswer() {

    }

    function nextQuestion() {

    }

    function resetQuiz() {

    }

    function generateFinalResults() {

    }

    function generate... () {
      var itemsHTML = items.map(function(item) {
        var checkedClass = item.checked ? ' shopping-item__checked' : '';

        return (
          '<li>' +
            '<span class="shopping-item' + checkedClass + '">' +
              item.name + '</span>' +
            '<div class="shopping-item-controls">' +
              '<button class="shopping-item-toggle">' +
                '<span class="button-label">check</span>' +
              '</button>\n' +
              '<button class="shopping-item-delete">' +
                '<span class="button-label">delete</span>' +
                '</button>' +
            '</div>' +
          '</li>'
        );
      });

      return itemsHTML.join("\n");
    }

    return {
      items,  // items: items (ES6 destructuring??)
      addItem,
      toggleItem,
      deleteItem,
      generateList
    };
  }());

    // DOM manipulation

    // DOM traversal (listeners & events)

    // Process user input


  // Listeners
  $('#start').click(function(){
var next = generateNextQuestion();
  // Flush out 106
  renderQuestion(next);
  })

  // Attached to the parent preventing overwrite on render
  $('.shopping-list')

    .on('click', '.shopping-item-toggle', function(event) {
      state.toggleItem(getButtonItem(event));
      $('.shopping-list').html(state.generateList());
    })

    .on('click', '.shopping-item-delete', function(event) {
      state.deleteItem(getButtonItem(event));
      $('.shopping-list').html(state.generateList());
    });
});
