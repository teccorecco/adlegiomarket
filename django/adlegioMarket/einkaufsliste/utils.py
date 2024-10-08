def categorize_item(item_name):
    category_keywords = {
        'Obst': ['apfel', 'äpfel', 'banane', 'bananen', 'birne', 'birnen', 'orange', 'orangen',
                 'kiwi', 'kiwis', 'traube', 'trauben', 'ananas', 'melone', 'melonen', 'zitrone',
                 'zitronen', 'mandarine', 'mandarinen', 'pfirsich', 'pfirsiche', 'pflaume', 'pflaumen',
                 'erdbeere', 'erdbeeren', 'himbeere', 'himbeeren', 'blaubeere', 'blaubeeren',
                 'mango', 'mangos', 'granatapfel', 'granatäpfel', 'früchte', 'frucht', 'aprikose', 'aprikosen'],
        'Gemüse': ['tomate', 'tomaten', 'kartoffel', 'kartoffeln', 'gurke', 'gurken', 'paprika',
                   'paprikas', 'zwiebel', 'zwiebeln', 'karotte', 'karotten', 'spinat', 'spinatblätter',
                   'brokkoli', 'brokkolis', 'salat', 'kopfsalat', 'rucola', 'kohl', 'kohlarten',
                   'radieschen', 'sellerie', 'blumenkohl', 'rosenkohl', 'lauch', 'porree', 'avocado',
                   'zucchini', 'aubergine', 'pilz', 'pilze', 'champignon', 'chili', 'kürbis', 'okraschoten'],
        'Getränke': ['wasser', 'cola', 'bier', 'biere', 'wein', 'saft', 'milch', 'tee', 'kaffee',
                     'limonade', 'limonaden', 'energydrink', 'energydrinks', 'smoothie', 'smoothies',
                     'fanta', 'sprite', 'red bull', 'capri-sonne', 'lipton', 'vöslauer', 'volvic', 'pepsi'],
        'Backwaren': ['brot', 'brötchen', 'kuchen', 'croissant', 'croissants', 'baguette', 'toast',
                      'muffin', 'muffins', 'scone', 'scones', 'gebäck', 'brezel', 'brezeln', 'zopf',
                      'torte', 'brownie', 'brownies', 'plätzchen', 'donut', 'berliner', 'ciabatta', 
                      'schwarzbrot', 'vollkornbrot'],
        'Haushaltswaren': ['klopapier', 'seife', 'reinigungsmittel', 'spülmittel', 'waschmittel',
                           'zahnpasta', 'bürste', 'bürsten', 'papierhandtücher', 'müllbeutel', 'schwamm',
                           'allzweckreiniger', 'geschirrspültabs', 'geschirrspülmittel', 'glasreiniger',
                           'badreiniger', 'desinfektionsmittel', 'tampons', 'binden', 'windeln', 'hygienetücher',
                           'ohrenstäbchen', 'zahnbürste'],
        'Fleisch & Fisch': ['huhn', 'hühnerfleisch', 'rindfleisch', 'schweinefleisch', 'fisch',
                            'thunfisch', 'lachs', 'salami', 'würstchen', 'hackfleisch', 'steak',
                            'frikadelle', 'schinken', 'speck', 'entenfleisch', 'hummer', 'krabben',
                            'miesmuscheln', 'garnelen', 'forelle', 'makrele', 'filet', 'putenfleisch',
                            'wiener', 'leberkäse', 'schaschlik'],
        'Snacks': ['chips', 'schokolade', 'gummibärchen', 'kekse', 'popcorn', 'nüsse', 'cracker',
                   'salzstangen', 'riegel', 'getrocknete früchte', 'pralinen', 'kaugummi', 'lakritz',
                   'haribo', 'milka', 'ferrero', 'kinder', 'oreo', 'hanuta', 'snickers', 'twix', 'mars', 'lays'],
        'Milchprodukte': ['butter', 'käse', 'joghurt', 'milch', 'quark', 'sahne', 'creme fraiche',
                          'frischkäse', 'ricotta', 'parmesan', 'mozzarella', 'feta', 'schlagsahne',
                          'mascarpone', 'buttermilch', 'griechischer joghurt', 'gouda', 'edamer', 'brie'],
        'Tiefkühlkost': ['pizza', 'fischstäbchen', 'gemüse', 'pommes', 'eis', 'tiefkühlgemüse',
                         'tiefkühlobst', 'frozen meal', 'frozen meals', 'frozen dessert', 'frozen desserts',
                         'lasagne', 'tiefkühlpizza', 'frozen yogurt', 'iglo', 'dr. oetker', 'frosta',
                         'rahmspinat', 'fischfilet'],
        'Süßwaren & Desserts': ['kuchen', 'torte', 'schokolade', 'bonbon', 'pudding', 'gummibärchen',
                                'plätzchen', 'eis', 'parfait', 'marzipan', 'dessert', 'milka', 'ritter sport',
                                'ferrero rocher', 'mousse', 'götterspeise', 'panna cotta'],
        'Konserven & Haltbare Lebensmittel': ['konserve', 'konserven', 'tomatenmark', 'erbsen',
                                              'bohnen', 'linsen', 'ananas aus der dose', 'pilze aus der dose',
                                              'haltbare milch', 'fertiggericht', 'haltbare lebensmittel',
                                              'gewürzgurke', 'gewürzgurken', 'sardinen', 'thunfisch in dose',
                                              'ravioli', 'chili con carne', 'dosensuppe'],
        'Sonstiges': ['nudel', 'nudeln', 'reis', 'öl', 'gewürz', 'gewürze', 'soße', 'saucen',
                      'backzutat', 'salz', 'zucker', 'essig', 'sojasoße', 'kokosmilch', 'grieß',
                      'backpulver', 'vanillezucker', 'olivenöl', 'balsamico', 'senf', 'honig', 'pesto'],
        'Molkereiprodukte': ['käse', 'butter', 'joghurt', 'quark', 'creme fraiche', 'milch',
                             'laktosefreie milch', 'rahm', 'sauerrahm', 'buttermilch', 'schmand', 'ziegenkäse'],
        'Gewürze & Würzmittel': ['salz', 'pfeffer', 'paprika', 'zucker', 'kreuzkümmel', 'zimt', 
                                 'currypulver', 'chiliflocken', 'kräuter', 'knoblauchpulver', 'salatdressing',
                                 'ketchup', 'mayo', 'senf', 'barbecue soße'],
        'Pasta & Reis': ['nudel', 'nudeln', 'spaghetti', 'penne', 'fusilli', 'reis', 'jasminreis',
                         'basmatireis', 'couscous', 'bulgur', 'quinoa', 'tortellini', 'gnocchi', 'lasagneblätter'],
        'Fertiggerichte': ['tiefkühlpizza', 'lasagne', 'fertigsuppe', 'eintopf', 'rahmsauce',
                           'carbonara', 'bolognese', 'instantnudeln', 'fertiggericht', 'mcdonalds', 'burger king'],
        'Babynahrung': ['babymilch', 'babybrei', 'kindernahrung', 'kinderkeks', 'babysaft', 'hipp', 'aptamil'],
        'Tiernahrung': ['hundefutter', 'katzenfutter', 'fischfutter', 'vogelfutter', 'nagerfutter',
                        'leckerlis', 'trockenfutter', 'nassfutter', 'whiskas', 'pedigree', 'royal canin'],
        'Drogerieartikel': ['shampoo', 'duschgel', 'zahnpasta', 'deo', 'rasierer', 'wattepads',
                            'feuchttücher', 'sonnencreme', 'lippenbalsam', 'nagellack', 'balea', 'nivea',
                            'colgate', 'schwarzkopf', 'gillette', 'always', 'listerine', 'tampons', 'binden'],
    }
    
    item_name = item_name.strip().lower()

    for category, keywords in category_keywords.items():
        for keyword in keywords:
            if keyword in item_name:
                return category
    
    return 'Sonstiges'