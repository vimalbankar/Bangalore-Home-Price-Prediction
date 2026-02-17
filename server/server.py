from server import util


app = Flask(__name__)
CORS(app)

# Load model once when server starts
util.load_saved_artifacts()

@app.route('/')
def home():
    return "Server is running"

@app.route('/get_location_names/', methods=['GET'])
def get_location_names():
    return jsonify({
        'locations': util.get_location_names()
    })

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json(force=True)

    print("RAW DATA RECEIVED:", data)

    sqft = float(data['total_sqft'])
    location = data['location_name'].lower()
    bhk = int(data['bhk'])
    bath = int(data['bath'])

    price = util.get_estimated_price(sqft, location, bhk, bath)

    return jsonify({
        "estimated_price": price
    })

if __name__ == "__main__":
    app.run(debug=True)
