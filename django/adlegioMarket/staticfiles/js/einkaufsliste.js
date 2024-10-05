function copyToClipboard() {
    // Kopiere den vollständigen Link mit dem short_link
    const copyText = document.getElementById('shoppingListLink').value;

    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = copyText;
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);  // Für mobile Geräte
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Modal anzeigen
    const linkCopiedModal = new bootstrap.Modal(document.getElementById('linkCopiedModal'));
    linkCopiedModal.show();

    // Nach 1 Sekunde Modal ausblenden
    setTimeout(() => {
        linkCopiedModal.hide();
    }, 750);
}

function toggleItem(itemId) {
    const checkbox = document.getElementById('checkbox_' + itemId);
    if (checkbox.checked) {
        // Perform any action needed when item is checked
        console.log('Item ' + itemId + ' checked');
    } else {
        // Perform any action needed when item is unchecked
        console.log('Item ' + itemId + ' unchecked');
    }
}

let itemIdToDelete = null;

function deleteItem(itemId) {
    itemIdToDelete = itemId;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

document.getElementById('confirmDeleteButton').addEventListener('click', function() {
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

document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', toggleDeleteSelectedButton);
});

function toggleDeleteSelectedButton() {
    const selectedItems = document.querySelectorAll('.item-checkbox:checked');
    const deleteButton = document.getElementById('deleteSelectedButton');
    if (selectedItems.length > 0) {
        deleteButton.style.display = 'inline-block';
    } else {
        deleteButton.style.display = 'none';
    }
}

document.getElementById('deleteSelectedButton').addEventListener('click', function() {
    const selectedItems = Array.from(document.querySelectorAll('.item-checkbox:checked')).map(cb => cb.value);
    
    selectedItems.forEach(itemId => {
        fetch(`/l/delete/${itemId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            }
        }).then(response => {
            if (response.ok) {
                location.reload();
            } else {
                alert("Fehler beim Löschen der ausgewählten Artikel.");
            }
        });
    });
});

document.querySelectorAll('.item-checkbox').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const itemId = this.getAttribute('data-id');
        const isChecked = this.checked;

        fetch(`/l/toggle_item/${itemId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'checked': isChecked
            })
        }).then(response => response.json()).then(data => {
            if (!data.success) {
                alert('Failed to update the item status.');
            }
        });
    });
});

