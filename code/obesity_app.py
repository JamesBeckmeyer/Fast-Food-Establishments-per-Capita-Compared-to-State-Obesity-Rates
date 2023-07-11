# Import the dependencies
import sqlalchemy
import pandas as pd
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

#preview data in joined_table
joined_table.head()

#convert to json
json_table = joined_table.to_json()

#######################################################
# Flask Setup
#######################################################

app = Flask(__name__)

#######################################################
# General Purpose Functions
#######################################################

#Home Route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return jsonify(json_table)




if __name__ == "__main__":
    app.run(debug=True)
