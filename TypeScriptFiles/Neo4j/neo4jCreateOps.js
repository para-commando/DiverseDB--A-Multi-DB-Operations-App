const { driver } = require('./neo4jInstanceDriverConnect');
require('dotenv').config();
const { runQuery } = require('./neo4jRunQuery');

// Create a session to run Cypher queries
const session = driver.session();

// Example Cypher query
const cypherQuery = `
LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row 

MERGE (Customer:Customer {customerID: row['customerID']})

MERGE (Bookings:Bookings {BookingID: row['BookingID']})

MERGE (Shipments:Shipments {BookingID: row['BookingID']})

MERGE (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']})

MERGE (Suppliers:Suppliers {supplierID: row['supplierID']})

MERGE (Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']})

MERGE (Origin:Origin {Org_lat_lon: row['Org_lat_lon']})

MERGE (Destination:Destination {DestinationLocation_Code: row['DestinationLocation_Code']})

MERGE (GpsProviders:GpsProviders {GpsProvider: row['GpsProvider']})

MERGE (CurrentLocation:CurrentLocation {Curr_lat: row['Curr_lat'], Curr_lon: row['Curr_lon']});
`;

runQuery({
  driver: driver,
  cypherQuery: cypherQuery,
  session: session,
  message: 'Create Operations Successful',
});