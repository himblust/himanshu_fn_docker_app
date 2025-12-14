from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "status": "error",
            "message": "No JSON data received"
        }), 400

    name = data.get('name')
    email = data.get('email')

    return jsonify({
        "status": "success",
        "message": f"Received data for {name}",
        "email": email
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
