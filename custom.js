var todo = {
	todos: [],
	displayTodos: function() {
		var items = document.getElementById('todoList');

		if (todo.todos.length == 0) {
			items.innerHTML = '<span class="warning">Sorry but there is nothing to do.</span>';
		} else {

			// remove all items before inserting new set
			while (items.firstChild) {
				items.removeChild(items.firstChild);
			}

			// loop through and array and insert each item into li tag
			for (var i = 0; i < this.todos.length; i++ ) {
				var item = document.createElement("li");
				item.setAttribute('data-index', 'index-'+i); 
				item.innerHTML = '<input type="checkbox" class="toggle-completed" data-complIndex="' + i +
									'" onclick="handlers.toggleCompleted()"></input>' + 
									this.todos[i].todoText + 
									'<span class="change-task" title="change task"></span><span class="delete-task" data-delIndex="' + i + 
									'" onclick="handlers.deleteTodos()" title="delete task"></span>'; 
				items.appendChild(item);
			}
		}
	},
	addTodos: function() {
		var addTaskInput = document.getElementById('addTaskInput')
		todo.todos.push({
			todoText: addTaskInput.value,
			toggleCompleted: false
		});
		addTaskInput.value = '';
		todo.displayTodos();
	},
	changeTodos: function() {
		var changePromptA = (prompt('Which task you want to modify? Locate the task by its order in the list, write a number without a dot.', 'e.g. 1, 2, 3...')) - 1;
		var changePromptB = prompt('Modify the task', '');
		todo.todos[changePromptA].todoText = changePromptB;
		todo.displayTodos();		
	},
	deleteTodos: function(dataDelIndex) {
		todo.todos.splice(dataDelIndex, 1);
		todo.displayTodos();	
	},
	deleteAll: function() {
		todo.todos = [];
		todo.displayTodos();		
	}
};

var handlers = {
	addTodos: function() {
		todo.addTodos()
	},
	changeTodos: function() {
		todo.changeTodos()
	},
	deleteTodos: function() {
		var deleteIcon = event.target;
		var dataDelIndex = deleteIcon.getAttribute('data-delIndex');
		todo.deleteTodos(dataDelIndex);
	},
	deleteAll: function() {
		todo.deleteAll()
	},
	toggleCompleted: function() {
		var completedIcon = event.target;
		var complIndex = completedIcon.getAttribute('data-complIndex');

		if (todo.todos[complIndex].toggleCompleted === true) {
			todo.todos[complIndex].toggleCompleted = false;
			completedIcon.removeAttribute('checked');
		} else {
			todo.todos[complIndex].toggleCompleted = true;
			completedIcon.setAttribute('checked', 'checked');
		};
	}
};

var addTaskInput = document.getElementById('addTaskInput');
addTaskInput.addEventListener("keyup", function(event) {
    event.preventDefault(); // if there is a form or something else that would be triggered by keypress enter?
    if (event.keyCode == 13) {
        todo.addTodos()
    }
}); 