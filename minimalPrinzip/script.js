// Model: Handles the data
function Model() {
  this.list = JSON.parse(localStorage.getItem("shoppingList")) || [];

  this.getList = function() {
      return this.list;
  };

  this.add = function(item, quantity) {
      this.list.push({ text: item, quantity: quantity, completed: false });
      this.save();
  };

  this.toggleComplete = function(item) {
      const index = this.list.indexOf(item);
      if (index > -1) {
          this.list[index].completed = !this.list[index].completed;
          this.save();
      }
  };

  this.remove = function(item) {
      const index = this.list.findIndex(i => i.text === item.text && i.quantity === item.quantity);
      if (index > -1) {
          this.list.splice(index, 1);
          this.save();
      }
  };

  this.save = function() {
      localStorage.setItem('shoppingList', JSON.stringify(this.list));
  };
}

// View: Handles the UI
function View() {
  this.list = document.getElementById('list');

  this.render = function(items) {
      this.list.innerHTML = '';
      for (const item of items) {
          const li = document.createElement('li');
          li.classList.toggle('completed', item.completed);

          const itemText = document.createElement('div');
          itemText.classList.add('item-info'); // Klasse für Flexbox hinzufügen

          const name = document.createElement('span');
          name.classList.add('item-name');
          name.textContent = item.text;

          const quantity = document.createElement('span');
          quantity.classList.add('quantity');
          quantity.textContent = `(${item.quantity})`;

          itemText.appendChild(name);
          itemText.appendChild(quantity);
          li.appendChild(itemText);

          const btn = document.createElement('button');
          btn.innerHTML = '&#128465;'; // Löschen-Button
          btn.addEventListener('click', (event) => {
              event.stopPropagation();
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

  this.load = function() {
      this.view.render(this.model.getList());
  };

  this.input = document.getElementById('input');
  this.quantity = document.getElementById('quantity');
  this.addBtn = document.getElementById('add');

  this.addBtn.addEventListener('click', () => {
      const itemValue = this.input.value.trim();
      const quantityValue = this.quantity.value.trim();

      if (itemValue !== '' && quantityValue !== '' && parseInt(quantityValue) > 0) {
          this.model.add(itemValue, quantityValue);
          this.input.value = '';
          this.quantity.value = '1'; // Reset quantity to 1
          this.load();
      }
  });

  this.toggleComplete = function(item) {
      this.model.toggleComplete(item);
      this.load();
  };

  this.remove = function(item) {
      this.model.remove(item);
      this.load();
  };
}

var controller = new Controller();
controller.load();
