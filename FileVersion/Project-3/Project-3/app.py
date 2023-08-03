# Import the dependencies.
from pymongo import MongoClient
import os
from flask import Flask, jsonify, request, render_template

#################################################
# Flask Setup
#################################################
#Dictionary of routes
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template('index.html')

@app.route("/api/v1.0/stations")
def send_stations():
    # Create an instance of MongoClient
    mongo = MongoClient(port=27017)

    # Grab the records 
    data = list(mongo['alt_fuel']['geo_stations'].find({},{'_id':0}))
    
    # Return the data
    return (jsonify(data))


@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response    

if __name__ == "__main__":
    app.run(debug=True)
