# utils.py
def categorize_item(item_name):
    category_keywords = {
        'Obst': ['apfel', 'äpfel', 'banane', 'bananen', 'birne', 'birnen', 'orange', 'orangen',
                 'kiwi', 'kiwis', 'traube', 'trauben', 'ananas', 'melone', 'zitrone', 'mandarine',
                 'mandarinen', 'pfirsich', 'pfirsiche', 'pflaume', 'pflaumen', 'früchte'],
        'Gemüse': ['tomate', 'tomaten', 'kartoffel', 'kartoffeln', 'gurke', 'gurken', 'paprika',
                   'paprikas', 'zwiebel', 'zwiebeln', 'karotte', 'karotten', 'spinat', 'spinatblätter',
                   'brokkoli', 'brokkolis', 'salat', 'kohl', 'kohlarten', 'radieschen', 'sellerie',
                   'blumenkohl'],
        'Getränke': ['wasser', 'cola', 'bier', 'biere', 'wein', 'saft', 'milch', 'tee', 'kaffee'],
        'Backwaren': ['brot', 'brötchen', 'kuchen', 'croissant', 'croissants', 'baguette', 'toast',
                      'muffin', 'muffins', 'scone', 'scones', 'gebäck', 'brezel', 'brezeln', 'zopf'],
        'Haushaltswaren': ['klopapier', 'seife', 'reinigungsmittel', 'spülmittel', 'waschmittel',
                           'zahnpasta', 'bürste', 'bürsten', 'papierhandtücher', 'müllbeutel', 'schwamm',
                           'allzweckreiniger'],
        'Fleisch & Fisch': ['huhn', 'hühnerfleisch', 'rindfleisch', 'schweinefleisch', 'fisch',
                            'thunfisch', 'lachs', 'salami', 'würstchen', 'hackfleisch', 'steak',
                            'frikadelle'],
        'Snacks': ['chips', 'schokolade', 'gummibärchen', 'kekse', 'popcorn', 'nüsse', 'cracker',
                   'salzstangen', 'riegel', 'getrocknete früchte'],
        'Milchprodukte': ['butter', 'käse', 'joghurt', 'milch', 'quark', 'sahne', 'creme fraiche',
                          'frischkäse', 'ricotta', 'parmesan'],
        'Tiefkühlkost': ['pizza', 'fischstäbchen', 'gemüse', 'pommes', 'eis', 'tiefkühlgemüse',
                         'tiefkühlobst', 'frozen meal', 'frozen meals', 'frozen dessert', 'frozen desserts'],
        'Sonstiges': ['nudel', 'nudeln', 'reis', 'öl', 'gewürz', 'gewürze', 'soße', 'saucen',
                     'süßigkeit', 'süßigkeiten', 'konserve', 'haltbare lebensmittel', 'backzutat', 'getränk'],
    }
    
    item_name = item_name.strip().lower()

    for category, keywords in category_keywords.items():
        for keyword in keywords:
            if keyword in item_name:
                return category
    
    return 'Sonstiges'
