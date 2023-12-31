## Fast Food and Obesity: A Geospatial Analysis
This project investigates the relationship between the number of fast food establishments per capita and obesity rates across different U.S. states. The primary datasets for the fast food locations per capita per state come from NiceRx and the Centers for Disease Control and Prevention (CDC).  

The project includes data extraction, transformation, and loading (ETL), building a  API, and data visualization through an interactive dashboard with a choropleth map, various charts, and the results of a Correlation Test.  

## Project Structure
ETL: Data is gathered from the NiceRx and CDC websites and stored in a PostgreSQL database.  
API: The data is cleaned and processed. Geo-json data is fetched and a API is built using Flask.  
Data Visualization: The API is used to retrieve the processed data and an interactive HTML page is created. The page includes a map, various charts, and the results of a Correlation Test using the stdlib library.  

## Tech Stacks
Python: Used for building the ETL pipeline.  
BeautifulSoup: Used for data extraction from the web.  
Pandas: Used for data analysis and manipulation.  
PostgreSQL: An open-source relational database used for data storage.  
Flask: A web framework used to build the API.  
JavaScript: Powers the interactivity of the dashboard.  
Plotly.js: A library for creating interactive charts and graphs.  
D3.js: A library that helps with data manipulation and visualization.  
Leaflet.js: A library for building interactive maps.  
stdlib: Provides a wide range of statistical functions.  
HTML/CSS: Used to structure and style the website.  
## Data Sources  
CDC Obesity Data  
https://www.cdc.gov/obesity/data/prevalence-maps.html  
NiceRx Fast Food Data  
https://www.nicerx.com/fast-food-capitals/
## Getting Started
### Clone the repository.  
### ETL:  
 1  at jupyter notebook:  
    run: "Database and ETL"\code\scrape_nicerx.ipynb   
    to write data in the "Database and ETL"\data\fastfood.csv
    
 2  at anaconda powershell:    
    cd to the folder: "Database and ETL"\code  
    run :python Create_SQLite_database.py    
    to create the fastfood_obesity.sqlite under "Database and ETL"\data
    
 3  in PostgreSQL:   
    import "Database and ETL"\data\QuickDBD-ERD.sql    
    to build the database  
    import "Database and ETL"\data\fastfood.csv and "Database and ETL"\data\obesity.csv 
    
### API set:
 1 at anaconda powershell  
 install the Flask-CORS extension using pip: pip install -U flask-cors  
 cd to "Database and ETL"\code   
 run: python obesity_app.py     
 2 at web browser   
 open the address http://127.0.0.1:5000        
 
### Running stdlib for Correlation Test:

The 'pcorrtest' function is used to calculate the correlation between the obesityPrevalence and fastFoodCount data sets.

First download and install Nodejs to be able to run the web environment.
Use the command 'npm install @stdlib/stats-pcorrtest' from commandline to download and install the stats-pcorrtest package and its dependencies into the project directory. After running this code, npm will create a node_modules folder in the project directory and install the package inside it.

From the command line, import:'npx' a command-line tool that comes with npm (Node Package Manager) and allows you to execute packages installed locally in your project.

Also install 'browserify', a tool used for bundling JavaScript files, especially in environments where require() or import statements are not natively supported, like in a web browser.

The browserify tool will process the correlationTest.js file along with its dependencies, and create a bundled JavaScript file (correlationTest2.js) that can be used in a web browser or another environment. The resulting file will contain all the necessary code from the input file and its dependencies, making it easier to distribute and run the JavaScript code in a self-contained manner.

Further information on the stdlib JavaScript library could be found at -  https://github.com/stdlib-js/stats-pcorrtest/blob/main/lib/main.js

and https://github.com/stdlib-js/stdlib/blob/develop/README.md#installation

### webpage:
Open the index.html file(under \DataVisualize) in a web browser 

Proposal: https://docs.google.com/document/d/1S7qYATV4bDSzBYI82jwjbzQ5Hfmy2Rdoo8mNEouOBLA/edit
Slides: https://docs.google.com/presentation/d/1HEuZplCfvLfpsEWb25kR2qYXHTQjFffEmAMuv54MgEI/edit#slide=id.gc6f73a04f_0_0
ERD: https://app.quickdatabasediagrams.com/#/d/2qBujY
