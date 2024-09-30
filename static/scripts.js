
function addItem(e) {
  e.preventDefault();
  const input = document.getElementById('item-name-input');
  const name = input.value;

  const listItem = document.createElement('li');
  listItem.innerText = name;


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

//  funktion selectAll(e) {

// }
