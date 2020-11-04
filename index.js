var inputField = document.getElementById('todo-input-field');

var todoList = document.getElementById('todo-list');


function createTODOCard(msg) {
//     <div id="first-elem" class="todo-item">
//     <div class="horizontal-align todo-message-container">
//         <h3 class="todo-message">Buy Apples</h3>

//         <div>
//             <i class="far fa-edit"></i>
//             <i class="fas fa-trash-alt"></i>
//         </div>
//     </div>

//     <div class="horizontal-align todo-edit-container">
//         <input class="edit-todo" type="text" placeholder="TODO Here" /><button>Update</button>
//     </div>
// </div>

    var mainCard = document.createElement('div');
    mainCard.className = 'todo-item';

    var messageContainer = document.createElement('div');
    messageContainer.className = 'horizontal-align todo-message-container';

    var message = document.createElement('h3');
    message.innerHTML = msg;
    message.className = 'todo-message'
    messageContainer.appendChild(message);

    var buttonWrapper = document.createElement('div');

    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';
    buttonWrapper.appendChild(deleteIcon);
    messageContainer.appendChild(buttonWrapper);

    mainCard.appendChild(messageContainer);
    return mainCard;
}

function handleTODOCreation() {
    // TASKs:
    // 1.) Add card to the todo list on screen
    // 2.) On successful addition empty the input box
    // 3.) On delete click remove the TODO item
}

inputField.onkeyup = function(e) {
    if(e.key === 'Enter') {
        handleTODOCreation();
    }
}

var btnAddTODO = document.getElementById('btn-add-todo');
btnAddTODO.onclick = function(e) {
    handleTODOCreation();
}