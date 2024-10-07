/**
 * 
 */
// Model: Handles the data
function Model() {
  // Restore list from localStorage if it exists, otherwise start with an empty one
  this.list = JSON.parse(localStorage.getItem("shoppingList")) || [];

  // Getter for the list
  this.getList = function() {
    return this.list;
  };

  // Adds an item to the list
  this.add = function(item) {
    this.list.push({ text: item, completed: false });
    this.save();
  };

  // Toggles completion status of an item
  this.toggleComplete = function(item) {
    const index = this.list.indexOf(item);
    if (index > -1) {
      this.list[index].completed = !this.list[index].completed;
      this.save();
    }
  };

  // Removes an item from the list
  this.remove = function(item) {
    const index = this.list.findIndex(i => i.text === item.text);
    if (index > -1) {
      this.list.splice(index, 1);
      this.save();
    }
  };

  // Saves the list to localStorage
  this.save = function() {
    localStorage.setItem('shoppingList', JSON.stringify(this.list));
  };
}

// View: Handles the UI
function View() {
  this.list = document.getElementById('list');

  // Renders the list
  this.render = function(items) {
    this.list.innerHTML = '';
    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = item.text;
      li.classList.toggle('completed', item.completed);

      // Add a toggle complete action on click
      li.addEventListener('click', () => {
        controller.toggleComplete(item);
      });

      // Create a delete button
      const btn = document.createElement('button');
      btn.innerHTML = '&#128465;';
      btn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the toggleComplete action
        controller.remove(item);
      });

      li.appendChild(btn);
      this.list.appendChild(li);
    }
  };
}

// Controller: Connects Model and View
function Controller() {
  this.model = new Model();
  this.view = new View();

  // Load initial list
  this.load = function() {
    this.view.render(this.model.getList());
  };

  // Add button logic
  this.input = document.getElementById('input');
  this.addBtn = document.getElementById('add');

  // Add an item to the list when the "add" button is clicked
  this.addBtn.addEventListener('click', () => {
    const inputValue = this.input.value.trim();
    if (inputValue !== '') {
      this.model.add(inputValue);
      this.input.value = ''; // Clear the input field
      this.load();
    }
  });

  // Toggle complete status of an item
  this.toggleComplete = function(item) {
    this.model.toggleComplete(item);
    this.load();
  };

  // Remove an item from the list
  this.remove = function(item) {
    this.model.remove(item);
    this.load();
  };
}

// Create a global controller and load the list
var controller = new Controller();
controller.load();
