const neo4j = require('neo4j-driver');

// Set up the Neo4j driver
const driver = neo4j.driver(
  'bolt://localhost:7687', // URL to your Neo4j server
  neo4j.auth.basic('neo4j', 'password')
);

// Create a session to run Cypher queries
const session = driver.session();
// console.log("🚀 ~ file: neo.js:11 ~ session:", session)

// Example Cypher query
const cypherQuery = `
LOAD CSV WITH HEADERS FROM 'file:///Delivery_truc_trip_data.csv' AS row  

CREATE (Customer:Customer {customerID: row['customerID'], customerNameCode: row['customerNameCode']})

CREATE (Bookings:Bookings {BookingID: row['BookingID']})

CREATE (Shipments:Shipments {Planned_ETA: row['Planned_ETA'],actual_eta: row['actual_eta'],trip_start_date: row['trip_start_date'],trip_end_date: row['trip_end_date'],MaterialShipped: row['Material Shipped'],ShipmentID: row['ShipmentID'],shipment_type: row['shipment_type']})

CREATE (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no'], vehicleType : row['vehicleType']})

CREATE (Suppliers:Suppliers {supplierID: row['supplierID'], supplierNameCode : row['supplierNameCode']})

CREATE (Drivers:Drivers {Driver_Name: row['Driver_Name'], Driver_MobileNo : row['Driver_MobileNo']})

CREATE (Origin:Origin {Origin_Location: row['Origin_Location'], Org_lat_lon : row['Org_lat_lon'], OriginLocation_Code: row['OriginLocation_Code']})

CREATE (Destination:Destination {Destination_Location: row['Destination_Location'], DestinationLocation_Code : row['DestinationLocation_Code']})

CREATE (GpsProviders:GpsProviders {GpsProvider: row['GpsProvider']})

CREATE (CurrentLocation:CurrentLocation {Current_Location: row['Current_Location'], Curr_lat : row['Curr_lat'], Curr_lon : row['Curr_lon']})

MERGE (Customer)-[:BOOKED]->(Bookings)

MERGE (Bookings)-[:BOOKED_ON {BookingID_Date: row['BookingID_Date']}]->(Shipments)

MERGE (Shipments)-[:SHIPPED_VEHICLE_TYPE]->(VehicleModel)

MERGE (VehicleModel)<-[:SUPPLIED_VEHICLE_TYPE]-(Suppliers)

MERGE (VehicleModel)<-[:CURRENTLY_AT]-(CurrentLocation)

MERGE (CurrentLocation)<-[:SHIPMENT_LOCATED_AT]-(GpsProviders)

MERGE (CurrentLocation)-[:CURRENTLY_AT]->(Drivers)

MERGE (Drivers)-[:START_FROM]->(Origin)

MERGE (Drivers)-[:END_AT]->(Destination)

MERGE (shipment)-[:HAS_TRACKING_NUMBER]->(trackingNumber)

MERGE (Origin)-[:TO_COVER_DISTANCE {TRANSPORTATION_DISTANCE_IN_KM: row['TRANSPORTATION_DISTANCE_IN_KM']}]->(Destination)


MERGE (log:Log {log_id: row['GpsProvider']})
`;

// Run the query
session
  .run(cypherQuery)
  .then((result) => {
    console.log('sasfdsdsdfsdfasdfsadfads');
    result.records.forEach((record) => {
      console.log(record.get('n').properties); // Access node properties
    });
  })
  .catch((error) => {
    console.error('Error running Cypher query:', error);
  })
  .finally(() => {
    session.close();
    driver.close();
  });


//   session
//   .run('MATCH (N) RETURN N;')
//   .then((result) => {
//     console.log('sasfdsdsdfsdfasdfsadfads');
//     result.records.forEach((record) => {
//       console.log(record.get('n').properties); // Access node properties
//     });
//   })
//   .catch((error) => {
//     console.error('Error running Cypher query:', error);
//   })
//   .finally(() => {
//     session.close();
//     driver.close();
//   });