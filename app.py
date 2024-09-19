
from flask import Flask, jsonify, render_template, request

from engine import generate_reading

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/reading', methods=['POST'])
def reading():
    data = request.json
    reading_data = generate_reading(data.get('reading_type'))
    return jsonify(reading_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)