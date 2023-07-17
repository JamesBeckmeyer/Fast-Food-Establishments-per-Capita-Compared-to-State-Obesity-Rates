# Project-3

Proposal: https://docs.google.com/document/d/1S7qYATV4bDSzBYI82jwjbzQ5Hfmy2Rdoo8mNEouOBLA/edit
Slides: https://docs.google.com/presentation/d/1HEuZplCfvLfpsEWb25kR2qYXHTQjFffEmAMuv54MgEI/edit#slide=id.gc6f73a04f_0_0
ERD: https://app.quickdatabasediagrams.com/#/d/2qBujY

Used scrape_nicerx.ipynb to obtain the fastfood_df
Created the obesity_db with Obesity_db.sqlite

When setting up the SQL Database in pgAdmin, please follow the order of table creations and imports as presented in the comments in QuickDBD-ERD.sql file. If done in an incorrect order, pgAdmin may throw an error.
To set up SQLite Database file run SQLite_Batch_File.bat file in powershell.

Bat file will execute and establish database in sqlite for use later.

Please pip install flask_cors to run flask app successfully.


Running stdlib for Correlation Test:
====================================

The 'pcorrtest' function is used to calculate the correlation between the obesityPrevalence and fastFoodCount data sets.

First download and install Nodejs to be able to run the web environment.
Use the command 'npm install @stdlib/stats-pcorrtest' from commandline to download and install the stats-pcorrtest package and its dependencies into the project directory. After running this code, npm will create a node_modules folder in the project directory and install the package inside it.

From the command line, import:'npx' a command-line tool that comes with npm (Node Package Manager) and allows you to execute packages installed locally in your project.

Also install 'browserify', a tool used for bundling JavaScript files, especially in environments where require() or import statements are not natively supported, like in a web browser.

The browserify tool will process the correlationTest.js file along with its dependencies, and create a bundled JavaScript file (correlationTest2.js) that can be used in a web browser or another environment. The resulting file will contain all the necessary code from the input file and its dependencies, making it easier to distribute and run the JavaScript code in a self-contained manner.


Further information on the stdlib JavaScript library could be found at -  https://github.com/stdlib-js/stats-pcorrtest/blob/main/lib/main.js

and https://github.com/stdlib-js/stdlib/blob/develop/README.md#installation

