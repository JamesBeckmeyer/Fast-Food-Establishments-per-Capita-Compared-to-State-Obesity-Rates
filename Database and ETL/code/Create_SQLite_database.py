# Create a new SQLite database
import sqlite3
import pandas as pd

conn = sqlite3.connect('../data/fastfood_obesity.sqlite')

# Update the file paths
obesity_data_path = "../data/Obesity.csv"
fastfood_data_path = "../data/fastfood.csv"

# Load the CSV data
obesity_data = pd.read_csv(obesity_data_path)
fastfood_data = pd.read_csv(fastfood_data_path)

# Create cursor object
cursor = conn.cursor()

# Convert the dataframes to SQL
obesity_data.to_sql('obesity_temp', conn, if_exists='replace', index=False)
fastfood_data.to_sql('fastfood_temp', conn, if_exists='replace', index=False)

# Create new tables with 'State' as primary key and for 'obesity' table 'State' as foreign key referencing 'fastfood'
cursor.execute("""
    CREATE TABLE fastfood (
        State TEXT PRIMARY KEY,
        "All fast food restaurants" REAL,
        "Full-service restaurants" REAL,
        Subway REAL,
        Starbucks REAL,
        McDonalds REAL,
        "Dunkin Donut" REAL,
        "Burger King" REAL,
        "Taco Bell" REAL,
        Dominos REAL,
        Wendys REAL,
        "Dairy Queen" REAL
    );
""")

cursor.execute("""
    INSERT INTO fastfood SELECT * FROM fastfood_temp;
""")

cursor.execute("""
    CREATE TABLE obesity (
        State TEXT PRIMARY KEY,
        Prevalence TEXT,
        "95% CI" TEXT,
        FOREIGN KEY(State) REFERENCES fastfood(State)
    );
""")

cursor.execute("""
    INSERT INTO obesity SELECT * FROM obesity_temp;
""")

# Drop the temporary tables
cursor.execute("DROP TABLE obesity_temp;")
cursor.execute("DROP TABLE fastfood_temp;")

# Commit changes and close connection
conn.commit()
conn.close()