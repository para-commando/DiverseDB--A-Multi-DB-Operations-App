const { driver } = require('./neo4jInstanceDriverConnect');
require('dotenv').config();

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

async function runQuery() {
  try {
    const result = await session.run(cypherQuery);

    result.records.forEach((record) => {
      console.log('🚀 ~ record._fields:', record._fields);
      // Access node properties
    });
  } catch (error) {
    console.error('Error running Cypher query:', error);
  } finally {
    session.close();
    driver.close();
  }
}

runQuery();
