document.addEventListener('DOMContentLoaded', function () {
  // Vordefinierte Kategorien und Stichwörter
  const categories = {
      'Obst und Gemüse': [
          'apfel', 'banane', 'tomate', 'kartoffel', 'salat', 'zwiebel',
          'orange', 'birne', 'pfirsich', 'kiwi', 'ananas', 'mango', 'melone',
          'erdbeere', 'himbeere', 'blaubeere', 'kirsche', 'pflaume', 'brokkoli',
          'blumenkohl', 'spinat', 'gurke', 'paprika', 'aubergine', 'zucchini',
          'möhre', 'karotte', 'radieschen', 'mais', 'bohnen', 'erbsen',
          'lauch', 'knoblauch', 'ingwer', 'kürbis', 'rucola', 'pilze',
          'sellerie', 'artischocke', 'spargel', 'avocado', 'aprikose', 'grapefruit',
          'granatapfel', 'nüsse', 'mandel', 'walnuss', 'limette', 'zitrone',
          'wassermelone', 'honigmelone', 'passionsfrucht', 'litschi', 'kokosnuss',
          'topinambur', 'rote bete', 'rosenkohl', 'fenchel', 'kohlrabi',
          'weißkohl', 'rotkohl', 'wirsing', 'chinakohl', 'endivie', 'chicorée',
          'süßkartoffel', 'rettich', 'pak choi', 'sprossen'
      ],
      'Milchprodukte': [
          'milch', 'käse', 'butter', 'joghurt', 'sahne',
          'quark', 'buttermilch', 'kefir', 'molke', 'crème fraîche',
          'mascarpone', 'mozzarella', 'feta', 'gouda', 'edamer',
          'camembert', 'brie', 'frischkäse', 'schmand', 'schlagsahne',
          'laktosefreie milch', 'sojamilch', 'mandelmilch', 'hafermilch', 'kokosmilch',
          'kondensmilch', 'topfen', 'ricotta', 'griechischer joghurt', 'skyr',
          'probiotischer joghurt', 'quarkkäse', 'ziegenkäse', 'blauschimmelkäse', 'parmesan'
      ],
      'Fleisch und Fisch': [
          'hähnchen', 'rindfleisch', 'lachs', 'wurst', 'schinken',
          'schweinefleisch', 'putenfleisch', 'lammfleisch', 'hackfleisch', 'ente',
          'gans', 'forelle', 'kabeljau', 'thunfisch', 'shrimps',
          'krabben', 'muscheln', 'salami', 'mortadella', 'speck',
          'leberwurst', 'bratwurst', 'mett', 'bockwurst', 'frikadellen',
          'fischstäbchen', 'fischfilet', 'geräucherter fisch', 'aufschnitt',
          'sardellen', 'makrele', 'hummer', 'kaviar', 'oktopus',
          'calamari', 'wildfleisch', 'rehfleisch', 'hirschfleisch', 'kaninchenfleisch'
      ],
      'Getränke': [
          'wasser', 'saft', 'bier', 'wein', 'cola',
          'tee', 'kaffee', 'limonade', 'apfelsaft', 'orangensaft',
          'mineralwasser', 'sprudelwasser', 'energydrink', 'eistee', 'kakao',
          'milchshake', 'smoothies', 'schnaps', 'whisky', 'vodka',
          'rum', 'sekt', 'likör', 'biermixgetränke', 'isotonische getränke',
          'sportsdrink', 'prosecco', 'aperitif', 'cider', 'multivitaminsaft',
          'traubensaft', 'tomatensaft', 'gemüsesaft', 'matcha', 'grüner tee',
          'latte macchiato', 'espresso', 'cappuccino', 'frappé', 'kokoswasser'
      ],
      'Haushaltswaren': [
          'spülmittel', 'toilettenpapier', 'seife', 'waschmittel',
          'küchenrolle', 'müllbeutel', 'alufolie', 'frischhaltefolie', 'gefrierbeutel',
          'geschirrspültabs', 'reinigungsmittel', 'glasreiniger', 'bodenreiniger', 'schwämme',
          'putztücher', 'gummihandschuhe', 'backpapier', 'wäscheklammern', 'zahnpasta',
          'zahnbürste', 'duschgel', 'shampoo', 'rasierer', 'rasiergel',
          'wattestäbchen', 'wattepads', 'taschentücher', 'deodorant', 'mundspülung',
          'handcreme', 'gesichtscreme', 'haarspülung', 'badezusatz', 'lippenbalsam',
          'batterien', 'glühbirnen', 'pflaster', 'verbandszeug', 'allzweckreiniger',
          'lufterfrischer', 'desinfektionsmittel', 'nähzeug', 'nadeln', 'faden',
          'klebstoff', 'klebeband', 'lineal', 'schere', 'stifte',
          'papier', 'briefumschläge', 'spülbürste', 'abflussreiniger', 'antikal',
          'backofenspray', 'spülmaschinenpfleger', 'eimer', 'besen', 'mopp',
          'staubsaugerbeutel', 'fensterabzieher', 'waage', 'waschschüssel', 'wäscheständer'
      ],
      'Backwaren': [
          'brot', 'brötchen', 'toast', 'baguette', 'vollkornbrot',
          'knäckebrot', 'croissants', 'kuchen', 'kekse', 'torten',
          'muffins', 'donuts', 'waffeln', 'zopf', 'brezel',
          'panini', 'ciabatta', 'pita', 'fladenbrot', 'bagel',
          'toastbrot', 'sandwichbrot', 'zwieback', 'cracker', 'zwiebelbrot'
      ],
      'Teigwaren': [
          'nudeln', 'spaghetti', 'tortellini', 'lasagneplatten', 'gnocchi',
          'reis', 'couscous', 'bulgur', 'quinoa', 'glasnudeln',
          'reisnudeln', 'soba-nudeln', 'udon-nudeln', 'maultaschen', 'schupfnudeln',
          'ravioli', 'macaroni', 'penne', 'fusilli', 'farfalle',
          'tortiglioni', 'rigatoni', 'tagliatelle', 'linguine', 'cannelloni',
          'reisflocken', 'polenta', 'grieß', 'hafergrütze', 'hirse'
      ],
      'Konserven': [
          'dosentomaten', 'mais aus der dose', 'kidneybohnen', 'erbsen und möhren',
          'sauerkraut', 'oliven', 'ananas in dose', 'thunfisch in dose',
          'sardinen', 'pilze in dose', 'kichererbsen', 'rote bete', 'aprikosen in dose',
          'birnen in dose', 'pfirsiche in dose', 'baked beans', 'corned beef',
          'artischockenherzen', 'kokosmilch', 'kokoscreme', 'passierte tomaten', 'tomatenmark',
          'eingelegte gurken', 'eingelegte paprika', 'rote bohnen', 'linsen', 'fischkonserven',
          'fleischkonserven', 'suppen in dose', 'eintöpfe', 'früchtecocktail'
      ],
      'Tiefkühlkost': [
          'tiefkühlpizza', 'pommes frites', 'gemüsemischung', 'eiscreme', 'tiefkühlbeeren',
          'fischstäbchen', 'spinat tiefgekühlt', 'chicken nuggets', 'baguettes tiefgekühlt',
          'lasagne', 'gemüsepatties', 'tiefkühlkräuter', 'tiefkühlbrot', 'eis am stiel',
          'tiefkühlgemüse', 'tiefkühlobst', 'tiefkühlkartoffelprodukte', 'tiefkühlkuchen',
          'tiefkühlgebäck', 'tiefkühlfisch', 'tiefkühlfleisch', 'tiefkühlfertiggerichte', 'tiefkühlsuppeneinlagen',
          'tiefkühlspätzle', 'tiefkühlteig', 'tiefkühlburger', 'tiefkühlwraps', 'tiefkühlreis'
      ],
      'Grundnahrungsmittel': [
          'zucker', 'mehl', 'salz', 'pfeffer', 'öl',
          'essig', 'honig', 'marmelade', 'nutella', 'müsli',
          'cornflakes', 'haferflocken', 'backpulver', 'hefe', 'kakao',
          'senf', 'ketchup', 'mayonnaise', 'sojasauce', 'nudelsauce',
          'pesto', 'gewürze', 'brühe', 'bouillon', 'suppenpulver',
          'tomatenmark', 'kokosmilch', 'sahnesteif', 'vanillezucker', 'gelatine',
          'soßenbinder', 'brotaufstrich', 'erdnussbutter', 'agavendicksaft', 'ahornsirup',
          'olivenöl', 'sonnenblumenöl', 'rapsöl', 'kürbiskernöl', 'balsamico',
          'weinessig', 'krauteressig', 'rosmarin', 'basilikum', 'oregano',
          'curry', 'paprikapulver', 'zimt', 'muskat', 'kardamom',
          'anissamen', 'koriander', 'kreuzkümmel', 'safran', 'chilipulver',
          'chilisauce', 'barbecuesauce', 'sambal oelek', 'tabasco', 'wasabi'
      ],
      'Süßigkeiten': [
          'schokolade', 'bonbons', 'chips', 'gummibärchen', 'kekse',
          'popcorn', 'nüsse', 'riegel', 'pralinen', 'eis am stiel',
          'lutscher', 'lakritz', 'schokoriegel', 'fruchtgummi', 'gebäck',
          'marzipan', 'mandeln', 'tortillas', 'knabbergebäck', 'cracker',
          'schokokekse', 'schokocreme', 'kuchen', 'muffins', 'donuts',
          'cookies', 'brownies', 'waffelriegel', 'gelee', 'marshmallows',
          'kaugummi', 'götterspeise', 'puddingpulver', 'dessertsoßen', 'kandierte früchte'
      ],
      'Haustierbedarf': [
          'katzenfutter', 'hundefutter', 'vogelfutter', 'katzenstreu', 'leckerlis',
          'hundespielzeug', 'katzenspielzeug', 'vogelsand', 'halsband', 'leinen',
          'futternapf', 'wassernapf', 'kratzbaum', 'katzengras', 'transportbox',
          'vogelkäfig', 'aquariumzubehör', 'fischfutter', 'nagernahrung', 'kleintierstreu',
          'katzenbürste', 'hundeshampoo', 'krallenschere', 'pflegeprodukte', 'vogelfutterstation'
      ],
      'Babybedarf': [
          'windeln', 'babynahrung', 'babyfeuchttücher', 'fläschchen', 'schnuller',
          'babycreme', 'puder', 'babyshampoo', 'babykleidung', 'lätzchen',
          'babyöl', 'wickelunterlagen', 'gläschen', 'brei', 'milchpulver',
          'kinderwagen', 'autositz', 'tragegurt', 'babydecke', 'spielzeug',
          'kuscheltier', 'babybadewanne', 'wickeltisch', 'stillkissen', 'stilleinlagen'
      ],
      'Sonstiges': []
  };

  // Speichert den Zustand der Gruppenauswahl (ob alle Items in der Gruppe ausgewählt sind)
  const groupSelectionState = {};

  // Funktion zum Hinzufügen eines Items
  function addItem(e) {
      e.preventDefault();
      const input = document.getElementById('item-name-input');
      const name = input.value.trim();

      // Überprüfen, ob der Eingabewert leer ist
      if (name === "") {
          alert("Bitte geben Sie einen Artikelnamen ein.");
          return;
      }

      // Kategorie ermitteln
      const category = getCategory(name);

      // Listenelement erstellen
      createListItem(name, category);

      // Eingabefeld leeren
      input.value = '';

      // Liste speichern
      saveList();
  }

  // Funktion zum Ermitteln der Kategorie
  function getCategory(itemName) {
      const itemNameLower = itemName.toLowerCase();
      for (const [category, keywords] of Object.entries(categories)) {
          for (const keyword of keywords) {
              if (itemNameLower.includes(keyword)) {
                  return category;
              }
          }
      }
      return 'Sonstiges';
  }

  // Funktion zum Erstellen eines Listenelements
  function createListItem(name, category) {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex align-items-center';

      // Checkbox erstellen
      const itemCheck = document.createElement('input');
      itemCheck.setAttribute('type', 'checkbox');
      itemCheck.className = 'form-check-input me-3';

      // Span für den Artikelnamen
      const itemName = document.createElement('span');
      itemName.innerText = name;
      itemName.className = 'flex-grow-1';

      // Button zum Löschen des einzelnen Items
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-sm btn-outline-danger';
      deleteBtn.innerText = 'Löschen';
      deleteBtn.addEventListener('click', function () {
          const categoryDiv = listItem.closest('.category-div');
          listItem.remove();
          saveList();
          updateGroupSelectionStates();
          updateGroupButtons();
          updateSelectAllButton();

          // Prüfen, ob die Kategorie jetzt leer ist und entfernen
          removeCategoryIfEmpty(categoryDiv);
      });

      // Event-Listener für die Checkbox, um Gruppenzustände zu aktualisieren
      itemCheck.addEventListener('change', function () {
          updateGroupSelectionStates();
          updateGroupButtons();
          updateSelectAllButton();
      });

      // Zusammenfügen der Elemente
      listItem.appendChild(itemCheck);
      listItem.appendChild(itemName);
      listItem.appendChild(deleteBtn);

      // Item zur entsprechenden Kategorie hinzufügen
      const categoryList = getCategoryListElement(category);
      categoryList.appendChild(listItem);
  }

  // Funktion zum Abrufen oder Erstellen des Kategorie-Listen-Elements
  function getCategoryListElement(category) {
      let categoryDiv = document.getElementById(`category-${category}`);
      if (!categoryDiv) {
          // Kategorie-Container erstellen
          categoryDiv = document.createElement('div');
          categoryDiv.id = `category-${category}`;
          categoryDiv.className = 'mb-4 category-div'; // 'category-div' hinzugefügt für einfacheres Selektieren

          // Zeile für Überschrift und Button
          const categoryHeaderRow = document.createElement('div');
          categoryHeaderRow.className = 'd-flex justify-content-between align-items-center mb-2';

          // Kategorie-Überschrift
          const categoryHeader = document.createElement('h4');
          categoryHeader.innerText = category;

          // Button zum Auswählen der Gruppe
          const selectGroupButton = document.createElement('button');
          selectGroupButton.className = 'btn btn-sm btn-outline-secondary';
          selectGroupButton.style.marginBottom = '5px'; // Margin-Bottom hinzugefügt
          selectGroupButton.innerText = 'Gruppe auswählen';
          selectGroupButton.addEventListener('click', function () {
              toggleSelectGroup(category);
          });

          // Header und Button zur Zeile hinzufügen
          categoryHeaderRow.appendChild(categoryHeader);
          categoryHeaderRow.appendChild(selectGroupButton);

          categoryDiv.appendChild(categoryHeaderRow);

          // Liste für die Kategorie
          const categoryList = document.createElement('ul');
          categoryList.className = 'list-group';
          categoryList.dataset.category = category;
          categoryDiv.appendChild(categoryList);

          // Kategorie-Div zum Container hinzufügen
          const categoryContainer = document.getElementById('category-lists');
          categoryContainer.appendChild(categoryDiv);

          // Initialen Zustand der Gruppenauswahl setzen
          groupSelectionState[category] = false; // Standardmäßig nicht alle ausgewählt
      }
      return categoryDiv.querySelector('ul');
  }

  // Funktion zum Auswählen/Abwählen aller Items in einer Gruppe
  function toggleSelectGroup(category) {
      const categoryDiv = document.getElementById(`category-${category}`);
      const checkboxes = categoryDiv.querySelectorAll('input[type="checkbox"]');

      // Überprüfen, ob alle Checkboxen in der Gruppe bereits ausgewählt sind
      const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

      checkboxes.forEach(function (checkbox) {
          checkbox.checked = !allChecked; // Checkboxen umschalten
      });

      // Den Zustand der Gruppe aktualisieren
      groupSelectionState[category] = !allChecked;

      // Den Button-Text aktualisieren
      const selectGroupButton = categoryDiv.querySelector('button');
      selectGroupButton.innerText = groupSelectionState[category] ? 'Gruppe abwählen' : 'Gruppe auswählen';

      // Den Hauptbutton "Alle auswählen" aktualisieren, falls nötig
      updateSelectAllButton();
  }

  // Funktion zum Aktualisieren des Textes des "Alle auswählen"-Buttons
  function updateSelectAllButton() {
      const selectAllButton = document.getElementById('select-all-button');
      const checkboxes = document.querySelectorAll('#category-lists input[type="checkbox"]');
      const allChecked = Array.from(checkboxes).length > 0 && Array.from(checkboxes).every(checkbox => checkbox.checked);
      selectAllButton.innerText = allChecked ? "Alle abwählen" : "Alle auswählen";
  }

  // Funktion zum Löschen ausgewählter Items
  function deleteSelectedItems() {
      const checkboxes = document.querySelectorAll('#category-lists input[type="checkbox"]');

      checkboxes.forEach(function (checkbox) {
          if (checkbox.checked) {
              const listItem = checkbox.closest('li');
              const categoryDiv = listItem.closest('.category-div');
              listItem.remove();

              // Prüfen, ob die Kategorie jetzt leer ist und entfernen
              removeCategoryIfEmpty(categoryDiv);
          }
      });

      // Liste speichern
      saveList();

      // Gruppenzustände aktualisieren
      updateGroupSelectionStates();
      updateGroupButtons();
      updateSelectAllButton();
  }

  // Funktion zum Entfernen einer Kategorie, wenn sie leer ist
  function removeCategoryIfEmpty(categoryDiv) {
      const categoryList = categoryDiv.querySelector('ul');
      if (categoryList.children.length === 0) {
          categoryDiv.remove();
      }
  }

  // Funktion zum Auswählen oder Abwählen aller Items
  function toggleSelectAll() {
      const checkboxes = document.querySelectorAll('#category-lists input[type="checkbox"]');

      // Überprüfen, ob alle Checkboxen bereits ausgewählt sind
      const allChecked = Array.from(checkboxes).length > 0 && Array.from(checkboxes).every(checkbox => checkbox.checked);

      checkboxes.forEach(function (checkbox) {
          checkbox.checked = !allChecked; // Checkboxen umschalten
      });

      // Den Button-Text ändern
      const selectAllButton = document.getElementById('select-all-button');
      selectAllButton.innerText = allChecked ? "Alle auswählen" : "Alle abwählen";

      // Gruppenzustände aktualisieren
      updateGroupSelectionStates();
      updateGroupButtons();
  }

  // Funktion zum Aktualisieren der Gruppenauswahlzustände
  function updateGroupSelectionStates() {
      for (const category in groupSelectionState) {
          const categoryDiv = document.getElementById(`category-${category}`);
          if (categoryDiv) {
              const checkboxes = categoryDiv.querySelectorAll('input[type="checkbox"]');
              const allChecked = Array.from(checkboxes).length > 0 && Array.from(checkboxes).every(checkbox => checkbox.checked);
              groupSelectionState[category] = allChecked;
          } else {
              // Kategorie wurde entfernt, Zustand löschen
              delete groupSelectionState[category];
          }
      }
  }

  // Funktion zum Aktualisieren der Texte der Gruppenbuttons
  function updateGroupButtons() {
      for (const category in groupSelectionState) {
          const categoryDiv = document.getElementById(`category-${category}`);
          if (categoryDiv) {
              const selectGroupButton = categoryDiv.querySelector('button');
              selectGroupButton.innerText = groupSelectionState[category] ? 'Gruppe abwählen' : 'Gruppe auswählen';
          }
      }
  }

  // Funktion zum Speichern der Liste im localStorage
  function saveList() {
      const items = [];

      const categoryLists = document.querySelectorAll('#category-lists ul');
      categoryLists.forEach(function (categoryList) {
          const category = categoryList.dataset.category;
          const listItems = categoryList.querySelectorAll('li');

          listItems.forEach(function (listItem) {
              const itemName = listItem.querySelector('span').innerText;
              items.push({ name: itemName, category: category });
          });
      });

      localStorage.setItem('shoppingList', JSON.stringify(items));
  }

  // Funktion zum Laden der Liste aus dem localStorage
  function loadList() {
      const items = JSON.parse(localStorage.getItem('shoppingList'));
      if (items) {
          items.forEach(function (item) {
              createListItem(item.name, item.category);
          });
          // Gruppenzustände aktualisieren
          updateGroupSelectionStates();
          updateGroupButtons();
          updateSelectAllButton();
      }
  }

  // Event-Listener für das Formular
  const itemForm = document.getElementById('item-form');
  itemForm.addEventListener('submit', addItem);

  // Event-Listener für den Löschen-Button
  const deleteButton = document.getElementById('delete-selected-button');
  deleteButton.addEventListener('click', deleteSelectedItems);

  // Event-Listener für den "Alle auswählen"-Button
  const selectAllButton = document.getElementById('select-all-button');
  selectAllButton.addEventListener('click', toggleSelectAll);

  // Beim Laden der Seite die Liste wiederherstellen
  loadList();
});

// - - - - - - - - - - - - - - - - - - - - - - - - Cookie Consent - - - - - - - - - - - - - - - - - - - - - - - - - //

document.getElementById('cookie-settings').addEventListener('click', function(event) {
  event.preventDefault();  
  CookieConsent.showPreferences(); 
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
