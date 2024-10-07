function addItem(e) {
  e.preventDefault();
  const input = document.getElementById('item-name-input');
  const name = input.value;

  const listItem = document.createElement('li');
  listItem.innerText = name;

  var all = document.getElementById('selectAll');
  all.addEventListener("click", select());

  var itemCheck = document.createElement("INPUT");
  itemCheck.setAttribute("type", "checkbox");
  listItem.appendChild(itemCheck);


  const deletButton = document.createElement('button');
  deletButton.innerHTML = "löschen";


  deletButton.addEventListener("click", deleteItem);
  listItem.appendChild(deletButton);
  
  const list = document.getElementById('item-list');
  list.appendChild(listItem);

}

function deleteItem(e) {
  const listItem = e.target.parentElement;
  listItem.remove();
}

function select(e) {
  var list = document.getElementById('item-list');
  var checkboxes = list.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function(checkbox) {
      checkbox.checked = e.checked;
  });
}
