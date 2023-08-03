# Project-3
#### Please note the following documents
- Project-3-Proposal.docx: This document has the story and initial design of the dashboard
- Project-3-Requirements.xlsx: This spreadsheet lists the requirements from the project and which component (file) meets the requirement

## Instructions to get the application up and running
### Initial Data Load
- Open a command propmt window and navigate to the ..\Project-3\Resources folder
  - There should be two files:
    - geo_alt_fuel_stations.json
    - load_mongo_db.bat
- Run mongosh to ensure the Mongo DB is running. If not then you may need to start the service manually.
  - Exit the mongosh app
- Run the bat file by typing load_mongo_db.bat
  - Alternatively you can open the bat file in notepad and just copy and paste the command:   
     mongoimport --type json -d alt_fuel -c geo_stations --drop --jsonArray geo_alt_fuel_stations.json --maintainInsertionOrder

### Running the Web Page
- Ensure the Mongo DB service is running either by starting mongosh or manually starting the service.
- Open an anaconda command propmt window and activate your dev environment if you have one (pymongo should be installed)
- Navigate to the ..\Project-3\Project-3 folder
  - There should be a file named app.py
  - Enter python app.py to start the python flask server
- Open a new browser window and go to localhost:5000. The web app should open. Give it a minute or so as the page takes a little time to load.

### Coding
- After editing your function.js file, just hit save and refesh the browser and you should see your changes


  
