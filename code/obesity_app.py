# Import the dependencies
import sqlalchemy
import pandas as pd
import numpy as np
import logging
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify

# Python SQL toolkit and Object Relational Mapper
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from pathlib import Path

#######################################################
#Database Setup
#######################################################

engine = create_engine("sqlite:///Resources/Obesity_db.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

#test view all classes found by automap
Base.classes.keys()

conn = engine.connect()

#populate obesity table
Obesity = pd.read_sql("SELECT * FROM Obesity", conn)

#populate fastfood table
Fastfood = pd.read_sql("SELECT * FROM Fastfood", conn)
Fastfood.head()

#verify tables in engine
inspector = inspect(engine)
inspector.get_table_names()

#create session from Python to the DB
session = Session(engine)

#inner join for data cleanup
joined_table = pd.read_sql('Select fastfood.State, fastfood."All fast food restaurants", fastfood.Subway, fastfood.Starbucks, fastfood.McDonalds, fastfood."Dunkin Donut", fastfood."Burger King", fastfood."Taco Bell", fastfood.Dominos, fastfood.Wendys, fastfood."Dairy Queen", obesity.Prevalence, obesity."95% CI" from Fastfood INNER JOIN Obesity ON (Fastfood.State = Obesity.State)', conn)
fixed_joined_table = joined_table.drop_duplicates()
fixed_joined_table = fixed_joined_table.drop([100])

no_florida = fixed_joined_table.drop([16])

#convert to json
json_table = fixed_joined_table.to_json()
no_florida_json = no_florida.to_json()
#######################################################
# Flask Setup
#######################################################

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = "Content-Type"
logging.getLogger('flask_cors').level = logging.DEBUG
#######################################################
# General Purpose Functions
#######################################################

#Home Route
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/v1.0/full_table<br/>"
        f"/v1.0/no_florida<br/>"
        f"/v1.0/prev_array<br/>"
        f"/v1.0/ff_pc_array"
    )


@app.route("/v1.0/full_table")
def full_table():
    print("Server received request for 'full_table' page...")
    return jsonify(json_table)

@app.route("/v1.0/no_florida")
def no_fl():
    print("Server received request for 'no_florida' page...")
    return jsonify(no_florida_json)

@app.route("/v1.0/prev_array")
def prevalence_array():
    print("Server received request for 'prev_array' page...")
    prev_array = no_florida["Prevalence"].to_numpy()
    prev_array = np.array(prev_array, dtype=np.float64)
    prev_array = prev_array.tolist()
    return jsonify({'prevalence': prev_array})

@app.route("/v1.0/ff_pc_array")
def fastfood_percapita_array():
    print("Server received request for 'ff_pc_array' page...")
    ff_pc_array = no_florida["All fast food restaurants"].to_numpy()
    ff_pc_array = np.array(ff_pc_array, dtype=np.float64)
    ff_pc_array = ff_pc_array.tolist()
    return jsonify({'fastfood_percapita': ff_pc_array})

if __name__ == "__main__":
    app.run(debug=True)
