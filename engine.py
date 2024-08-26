import json
import random

# Open the JSON file
with open('db.json', 'r') as f:
    db = json.load(f)
    
def get_random_tarot_cards(num_cards=1):
   
    tarot_cards = db.get('tarot_cards', [])
    
    if not tarot_cards:
        raise ValueError("No tarot cards found in the JSON file.")
    
    return random.sample(tarot_cards, min(num_cards, len(tarot_cards)))
