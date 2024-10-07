document.addEventListener('DOMContentLoaded', function () {
    // Füge Event Listener für das Hinzufügen von Items hinzu
    const form = document.querySelector('form');
    form.addEventListener('submit', function () {
        setTimeout(function () {
            // Fokus wieder auf das Namensfeld setzen
            document.querySelector('input[name="item_name"]').focus();
        }, 100);  // Kurze Verzögerung für den Redirect
    });

    // Event Listener für den "Alle löschen" Button
    document.getElementById('deleteAllButton').addEventListener('click', function (event) {
        event.preventDefault();

        // Zeige das Modal zur Bestätigung an
        var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();

        // Wenn der Benutzer das Löschen bestätigt
        document.getElementById('confirmDeleteAllButton').addEventListener('click', function () {
            deleteAllItems();
        });
    });

    // Event listener für Checkboxes und Sichtbarkeit des Löschbuttons
    document.querySelectorAll('.select-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', toggleDeleteSelectedButton);
    });

    // Event listener für den Button, der ausgewählte Items löscht
    document.getElementById('deleteSelectedButton').addEventListener('click', function () {
        deleteSelectedItems();
    });
});

// Funktion zum Kopieren des Links in die Zwischenablage
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

// Funktion, um Artikelstatus (checked/unchecked) zu togglen
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

// Funktion zum Löschen eines Artikels
let itemIdToDelete = null;

function deleteItem(itemId) {
    itemIdToDelete = itemId;
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

// Funktion, um CSRF-Token zu holen
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

// Funktion zum Umschalten der Sichtbarkeit des "Ausgewählte löschen" Buttons
function toggleDeleteSelectedButton() {
    const selectedItems = Array.from(document.querySelectorAll('.select-checkbox:checked')).map(cb => cb.getAttribute('data-id'));
    const deleteButton = document.getElementById('deleteSelectedButton');
    const selectedItemsInput = document.getElementById('selectedItemsInput');

    if (selectedItems.length > 0) {
        deleteButton.style.display = 'inline-block';
        selectedItemsInput.value = selectedItems.join(',');
    } else {
        deleteButton.style.display = 'none';
        selectedItemsInput.value = '';  
    }
}

function deleteAllItems() {
    if (!confirm("Möchtest du wirklich alle Artikel löschen?")) {
        return;
    }

    fetch(`/l/delete_all/`, {  // Überprüfe diese URL
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'short_link': short_link })  // Übergib den short_link
    }).then(response => response.json())  // Erwartet JSON, könnte HTML zurückbekommen
    .then(data => {
        if (data.success) {
            location.reload();  // Aktualisiere die Seite nach dem Löschen
        } else {
            alert(data.error || "Fehler beim Löschen aller Artikel.");
        }
    }).catch(error => {
        console.error("Fehler:", error);
    });
}

// Massenlöschung von ausgewählten Artikeln
function deleteSelectedItems() {
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
    }).then(response => response.json()).then(data => {
        if (data.success) {
            location.reload();  // Nach dem Löschen die Seite neu laden
        } else {
            alert(data.error || "Fehler beim Löschen der ausgewählten Artikel.");
        }
    });
}

// Funktion zum Umschalten der Kategorieauswahl
function toggleCategorySelection(category) {
    const checkboxes = document.querySelectorAll(`.select-checkbox[data-category="${category}"]`);
    const isChecked = document.querySelector(`#cbtest-${category}`).checked;

    checkboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });

    toggleDeleteSelectedButton();
}
