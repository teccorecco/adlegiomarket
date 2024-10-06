document.addEventListener('DOMContentLoaded', function() {
    // Füge Event Listener für das Hinzufügen von Items hinzu
    const form = document.querySelector('form');
    form.addEventListener('submit', function() {
        setTimeout(function() {
            // Fokus wieder auf das Namensfeld setzen
            document.querySelector('input[name="item_name"]').focus();
        }, 100);  // Kurze Verzögerung für den Redirect
    });
});

function copyToClipboard() {
    const copyText = document.getElementById('shoppingListLink').value;

    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = copyText;
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);  // Für mobile Geräte
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    const linkCopiedModal = new bootstrap.Modal(document.getElementById('linkCopiedModal'));
    linkCopiedModal.show();

    setTimeout(() => {
        linkCopiedModal.hide();
    }, 750);
}

function toggleItem(itemId) {
    const checkbox = document.getElementById('checkbox_' + itemId);
    const isChecked = checkbox.checked;

    fetch(`/l/toggle_item/${itemId}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'checked': isChecked })
    }).then(response => response.json()).then(data => {
        if (!data.success) {
            alert('Fehler beim Aktualisieren des Artikelstatus.');
        }
    });
}

let itemIdToDelete = null;

function deleteItem(itemId) {
    itemIdToDelete = itemId;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

function showDeleteModal() {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

document.getElementById('confirmDeleteButton').addEventListener('click', function () {
    if (itemIdToDelete) {
        fetch(`/l/delete/${itemIdToDelete}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            }
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert("Fehler beim Löschen des Artikels.");
            }
        });
    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function toggleDeleteSelectedButton() {
    const selectedItems = Array.from(document.querySelectorAll('.select-checkbox:checked')).map(cb => cb.getAttribute('data-id'));
    const deleteButton = document.getElementById('deleteSelectedButton');
    const selectedItemsInput = document.getElementById('selectedItemsInput');

    if (selectedItems.length > 0) {
        deleteButton.style.display = 'inline-block';
        selectedItemsInput.value = selectedItems.join(',');
    } else {
        deleteButton.style.display = 'none';
        selectedItemsInput.value = '';  // Leere das Input-Feld
    }
}

// Massenlöschung von ausgewählten Artikeln
document.getElementById('deleteSelectedButton').addEventListener('click', function () {
    const selectedItems = Array.from(document.querySelectorAll('.select-checkbox:checked')).map(cb => cb.getAttribute('data-id'));

    if (selectedItems.length === 0) {
        alert("Es wurden keine Artikel ausgewählt.");
        return;
    }

    fetch(`/l/delete_selected/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'item_ids': selectedItems })
    }).then(response => {
        if (response.ok) {
            location.reload();
        } else {
            alert("Fehler beim Löschen der ausgewählten Artikel.");
        }
    });
});

// Funktion, um Artikel durch Klick auf den Namen durchzustreichen
document.querySelectorAll('.item-name').forEach(function(nameElement) {
    nameElement.addEventListener('click', function() {
        this.classList.toggle('strikethrough');
        const itemId = this.getAttribute('data-id');
        const isStrikethrough = this.classList.contains('strikethrough');
        
        fetch(`/l/strike_item/${itemId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'strikethrough': isStrikethrough })
        }).then(response => response.json()).then(data => {
            if (!data.success) {
                alert('Fehler beim Aktualisieren des Artikelstatus.');
            }
        });
    });
});

function toggleCategorySelection(category) {
    const checkboxes = document.querySelectorAll(`.select-checkbox[data-category="${category}"]`);
    const isChecked = document.querySelector(`#cbtest-${category}`).checked;

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });

    toggleDeleteSelectedButton();
}

// Event listener für den Button, der ausgewählte Items löscht
document.getElementById('deleteSelectedButton').addEventListener('click', function () {
    const selectedItems = Array.from(document.querySelectorAll('.select-checkbox:checked')).map(cb => cb.getAttribute('data-id'));

    if (selectedItems.length === 0) {
        alert("Es wurden keine Artikel ausgewählt.");
        return;
    }

    // Fetch-API für das Löschen der ausgewählten Artikel
    fetch(`/l/delete_selected/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'item_ids': selectedItems })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            location.reload();  // Nach dem Löschen die Seite neu laden
        } else {
            alert("Fehler beim Löschen der ausgewählten Artikel.");
        }
    });
});

function toggleItemSelection(itemId) {
    const checkbox = document.getElementById('cbitem-' + itemId);
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    if (checkbox.checked) {
        selectedItems.push(itemId);
    } else {
        const index = selectedItems.indexOf(itemId);
        if (index !== -1) {
            selectedItems.splice(index, 1);
        }
    }
    
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    toggleDeleteSelectedButton();  // Update den Button "Ausgewählte löschen"
}

function deleteAllItems() {
    if (!confirm("Möchtest du wirklich alle Artikel löschen?")) {
        return;
    }

    fetch(`/l/delete_all/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'short_link': short_link })  // Übergib den short_link
    }).then(response => response.json()).then(data => {
        if (data.success) {
            location.reload();  // Aktualisiere die Seite nach dem Löschen
        } else {
            alert(data.error || "Fehler beim Löschen aller Artikel.");
        }
    });
}

function deleteSelectedItems() {
    const selectedItems = Array.from(document.querySelectorAll('.select-checkbox:checked')).map(cb => cb.getAttribute('data-id'));

    if (selectedItems.length === 0) {
        alert("Es wurden keine Artikel ausgewählt.");
        return;
    }

    const queryString = selectedItems.map(id => `item_ids=${id}`).join('&');
    const url = `/l/delete_selected_items/?${queryString}`;

    fetch(url, {
        method: 'GET',
    }).then(response => response.json()).then(data => {
        if (data.success) {
            location.reload();
        } else {
            alert(data.error || "Fehler beim Löschen der ausgewählten Artikel.");
        }
    });
}


// Event listener für Checkboxes und Sichtbarkeit des Löschbuttons
document.querySelectorAll('.select-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', toggleDeleteSelectedButton);
});
