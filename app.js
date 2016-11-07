$(document).ready(function () {

  var state = (function generateState() {
    var quiz = {
      questions: [  // these may belong outside `state` var since they're not really state
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
            "answer choice 'a'.",  // answer text, order is hardcoded
            "answer choice 'b'.",
            "answer choice 'c'.",
            "answer choice 'd'.",
            "answer choice 'e'.",
          ],

          correctAnswer: 2 // hardcoded answer
        }
          // remainder of questions and answers go here...
      ],

      currentQuestion: 1,  // starts at 1, incremented as questions answered

      numCorrect: 0, // dynamically updated with each anwer submission

      numIncorrect: 0, // dynamically updated with each anwer submission
    }

    // state modifying functions

    function generateNextQuestion() {
      // User Joe clicks
    }

    function submitAnswer() {

    }

    function nextQuestion() {

    }

    function resetQuiz() {

    }

    function generateFinalResults() {

    }

    // DOM manipulation

    // DOM traversal (listeners & events)

    // Process user input









    var _itemIndex = itemName => items.findIndex(
      item => item.name === itemName);

    function addItem(itemName) { 
      return items.push({name: itemName, checked: false});
    }

    function toggleItem (itemName) {
      var index = _itemIndex(itemName);

      items[index].checked = state.items[index].checked ? false : true;
    }

    function deleteItem(itemName) {
      items.splice(_itemIndex(itemName), 1);
    }

    function generateList() {
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

  // Listeners
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();

    var newItem = $('#shopping-list-entry').val();

    if (newItem.length) { // ignore if blank (do checks in addItem() instead?)
      state.addItem(newItem);
      $('.shopping-list').html(state.generateList());
      event.target.reset();
    }
  });

  var getButtonItem = (event) => 
    $(event.target).closest('li').find('.shopping-item').text();

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
