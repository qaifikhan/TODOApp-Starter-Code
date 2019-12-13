var inputField = document.getElementById('todo-input-field');

var todoList = document.getElementById('todo-list');

function getTODOsFromLocalStorage() {
    var todoListStorage = localStorage.getItem('todo-list');
    if(todoListStorage === null) {
        todoListStorage = [];
    } else {
        todoListStorage = JSON.parse(todoListStorage);
    }
    console.log(todoListStorage);

    return todoListStorage;
}

function renderTODOFromStorage(message, id) {
    if(message) {
        var newCard = createTODOCard(message, id);
        var firstElem = todoList.firstElementChild;
        todoList.insertBefore(newCard, firstElem);
    } else {
        alert('TODO cannot be empty!!');
    }
}

function renderTODOsFromLocalStorage() {
    var todoListFromStorage = getTODOsFromLocalStorage();
    if(todoListFromStorage !== []) {
        for(var i=0; i<todoListFromStorage.length; i++) {
            console.log(todoListFromStorage[i]);
            renderTODOFromStorage(todoListFromStorage[i].message, todoListFromStorage[i].id);
        }
    }
}

renderTODOsFromLocalStorage();

function createTODOCard(msg, id) {
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
    mainCard.id = id;

    var messageContainer = document.createElement('div');
    messageContainer.className = 'horizontal-align todo-message-container';

    var message = document.createElement('h3');
    message.innerHTML = msg;
    message.className = 'todo-message'
    messageContainer.appendChild(message);

    var buttonWrapper = document.createElement('div');

    var editIcon = document.createElement('i');
    editIcon.className = 'fas fa-edit';
    editIcon.onclick = function() {
        var messageDiv = document.querySelector('#' + mainCard.id + ' .todo-message-container');
        messageDiv.style.display = 'none';
        var editDiv = document.querySelector('#' + mainCard.id + ' .todo-edit-container')
        editDiv.style.display = 'block';
    }
    buttonWrapper.appendChild(editIcon);

    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';
    deleteIcon.onclick = function() {
        // alert('Delete Icon was clicked for Element with ID => ' +  mainCard.id);

        var selectedElem = document.getElementById(mainCard.id);
        selectedElem.remove();
    }
    buttonWrapper.appendChild(deleteIcon);
    messageContainer.appendChild(buttonWrapper);

    mainCard.appendChild(messageContainer);

    var editTODOContainer = document.createElement('div');
    editTODOContainer.className = 'horizontal-align todo-edit-container';

    // <input class="edit-todo" type="text" placeholder="TODO Here" />
    var editTODOField = document.createElement('input');
    editTODOField.className = 'edit-todo';
    editTODOField.type = 'text';
    editTODOField.placeholder = 'TODO Here';
    editTODOField.value = msg;
    editTODOContainer.appendChild(editTODOField);

    // <button>Update</button>
    var updateTODOBtn = document.createElement('button');
    updateTODOBtn.innerHTML = 'Update';
    editTODOContainer.appendChild(updateTODOBtn);
    var closeTODOBtn = document.createElement('button');
    closeTODOBtn.innerHTML = 'Close';
    closeTODOBtn.onclick = function() {
        var messageDiv = document.querySelector('#' + mainCard.id + ' .todo-message-container');
        messageDiv.style.display = 'flex';
        var editDiv = document.querySelector('#' + mainCard.id + ' .todo-edit-container')
        editDiv.style.display = 'none';   
    }
    editTODOContainer.appendChild(closeTODOBtn);

    mainCard.appendChild(editTODOContainer);

    return mainCard;
}

function handleTODOCreation() {
    var message = inputField.value;
    if(message) {
        var todoListFromLocalStorage = getTODOsFromLocalStorage();
        var id = 'todo' + (todoListFromLocalStorage.length + 1);

        var newCard = createTODOCard(message, id);
        var firstElem = todoList.firstElementChild;
        todoList.insertBefore(newCard, firstElem);
        inputField.value = '';

        var todoObj = {
            id: newCard.id,
            message: message
        }

        var todoListStorage = getTODOsFromLocalStorage();
        todoListStorage.push(todoObj);
        localStorage.setItem('todo-list', JSON.stringify(todoListStorage));
    } else {
        alert('TODO cannot be empty!!');
    }
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