require('dotenv').config();
const { runSingleQuery } = require('./neo4jRunSingleQuery');

// Create a session to run Cypher queries

module.exports.createOps = async (driver) => {
  const createOpsSession = driver.session();

  const createNodesCypherQuery = `
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

  await runSingleQuery({
    driver: driver,
    cypherQuery: createNodesCypherQuery,
    session: createOpsSession,
    message: 'Create Operations Successful',
  });

  const batchQueryExecutionResult = await createOpsSession.executeWrite(
    async (tx) => {
      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row
      MATCH    
      (Customer:Customer {customerID: row['customerID']}),
      (Bookings:Bookings {BookingID: row['BookingID']}), 
      (Shipments:Shipments {BookingID: row['BookingID']}),
      (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']})

      WITH Customer,Bookings,Shipments,VehicleModel,row
      MERGE (Customer)-[:BOOKED]->(Bookings)-[:BOOKED_ON{bookingID_Date:row['BookingID_Date']}]->(Shipments)-[:SHIPPED_VEHICLE_TYPE]->(VehicleModel);
`);

      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row
            MATCH (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']}),(Suppliers:Suppliers {supplierID: row['supplierID']})
            WITH VehicleModel, Suppliers
            MERGE (VehicleModel )<-[:SUPPLIED_VEHICLE_TYPE]-(Suppliers );
      `);

      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row
            MATCH (CurrentLocation:CurrentLocation {Curr_lat: row['Curr_lat'], Curr_lon: row['Curr_lon']}),(VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']})
            WITH CurrentLocation, VehicleModel
            MERGE (CurrentLocation)-[:CURRENTLY_AT]->(VehicleModel);

      `);

      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row 
      
      MATCH (CurrentLocation:CurrentLocation {Curr_lat: row['Curr_lat'], Curr_lon: row['Curr_lon']}), (Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']})
      WITH Drivers,CurrentLocation
      MERGE (CurrentLocation)-[:CURRENTLY_AT]->(Drivers);
      `);

      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row
      MATCH (GpsProviders:GpsProviders {GpsProvider: row['GpsProvider']}),(CurrentLocation:CurrentLocation {Curr_lat: row['Curr_lat'], Curr_lon: row['Curr_lon']})
      WITH GpsProviders, CurrentLocation
      MERGE (GpsProviders)-[:SHIPMENT_LOCATED_AT]->(CurrentLocation);
      `);
      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row 

      MATCH (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']}),(Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']})

      WITH VehicleModel, Drivers

      MERGE (VehicleModel)-[:DRIVEN_BY]->(Drivers);
      `);
      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row 
      
      MATCH (Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']}),(Origin:Origin {Org_lat_lon: row['Org_lat_lon']})

      WITH row, Drivers, Origin

      MERGE (Drivers)-[:START_FROM{originLocation_Code: row['OriginLocation_Code']}]->(Origin);
      `);

      await tx.run(` LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row 
      
      MATCH (Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']}),(Destination:Destination {DestinationLocation_Code: row['DestinationLocation_Code']})
      
      WITH Drivers,Destination, row

      MERGE (Drivers)-[:END_AT{destinationLocation_code:row['DestinationLocation_Code']}]->(Destination);
      `);

      return 'Relationships between nodes created successfully';
    }
  );
  console.log(
    '🚀 ~ file: neo4jUpdateOps.js:44 ~ batchQueryExecutionResult ~ batchQueryExecutionResult:',
    JSON.stringify(batchQueryExecutionResult)
  );

  createOpsSession.close();
  return true;
};
