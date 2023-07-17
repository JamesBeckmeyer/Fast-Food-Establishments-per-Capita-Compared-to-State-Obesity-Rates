# Import the dependencies
import sqlalchemy
from flask import Flask, jsonify, send_file
from flask_cors import CORS

# Python SQL toolkit and Object Relational Mapper
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
import pandas as pd

#######################################################
# Database Setup
#######################################################

engine = create_engine("sqlite:///../data/fastfood_obesity.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
obesity = Base.classes.obesity
fastfood = Base.classes.fastfood

# Get column names for metadata
inspector = inspect(engine)

#######################################################
# Flask Setup
#######################################################

app = Flask(__name__)
CORS(app)

#######################################################
# Flask Routes
#######################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/metadata<br/>"
        f"/api/v1.0/aff_ob<br/>"
        f"/api/v1.0/geojson"
    )

@app.route("/api/v1.0/metadata")
def get_metadata():
# Create our session (link) from Python to the DB
    session = Session(engine)
    conn = engine.connect()
    #query 
    Fastfood = pd.read_sql("SELECT * FROM Fastfood", conn)
    Obesity = pd.read_sql("SELECT * FROM Obesity", conn)
    joined_table = pd.read_sql('Select fastfood.State, fastfood."All fast food restaurants",fastfood."Full-service restaurants", fastfood.Subway, fastfood.Starbucks, fastfood.McDonalds, fastfood."Dunkin Donut", fastfood."Burger King", fastfood."Taco Bell", fastfood.Dominos, fastfood.Wendys, fastfood."Dairy Queen", obesity.Prevalence, obesity."95% CI" from Fastfood INNER JOIN Obesity ON (Fastfood.State = Obesity.State)', conn)
    js = joined_table.to_json(orient='records')
    session.close()

    return js

@app.route("/api/v1.0/aff_ob")
def get_data():
    session = Session(engine)
    data = session.query(
        fastfood.State, 
        obesity.Prevalence, 
        getattr(fastfood, "All fast food restaurants")
    ).filter(
        fastfood.State == obesity.State
    ).order_by(
        getattr(fastfood, "All fast food restaurants")
    ).all()
    session.close()

    # Convert data to a list of dictionaries
    data_dicts = [dict(zip(["State", "Prevalence", "All fast food restaurants"], row)) for row in data]

    # Convert to JSON
    return jsonify(data_dicts)

@app.route("/api/v1.0/geojson")
def get_geojson():
    return send_file("../data/us-states-obesity.geojson", mimetype='application/geo+json')

if __name__ == "__main__":
    app.run(debug=True)