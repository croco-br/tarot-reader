
from flask import Flask, jsonify, render_template, request

from engine import get_random_tarot_cards

app = Flask(__name__)

@app.route('/')
def training():
    return render_template('index.html')

@app.route('/get_cards', methods=['POST'])
def get_cards():
    data = request.json
    num_cards = 10
    card_list = get_random_tarot_cards(num_cards)
    return jsonify(card_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)