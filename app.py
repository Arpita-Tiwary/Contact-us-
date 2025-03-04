from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# MySQL Database Configuration
db_config = {
    'user': 'root',  # Change this to your MySQL username
    'password': 'Viekhyat',  # Change this to your MySQL password
    'host': 'localhost',  # Use 'localhost' without port here
    'port': 3306,  # Specify the port separately
    'database': 'contacts'
}

@app.route('/submit', methods=['POST'])
def submit_contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({"error": "All fields are required!"}), 400

    connection = None
    cursor = None

    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute("INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
        connection.commit()
        return jsonify({"message": "Contact form submitted successfully!"}), 201
    except Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database error occurred: " + str(err)}), 500
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

if __name__ == '__main__':
    app.run(port=8080)