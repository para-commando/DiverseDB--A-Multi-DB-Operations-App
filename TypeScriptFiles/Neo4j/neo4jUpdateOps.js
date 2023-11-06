const { driver } = require('./neo4jInstanceDriverConnect');
require('dotenv').config();

// Create a session to run Cypher queries
const session = driver.session();

 
// Example Cypher query
const cypherQuery = `
LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row 
MATCH (Customer:Customer {customerID: row['customerID']}),(Shipments:Shipments {BookingID: row['BookingID']}), (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']}), (Suppliers:Suppliers {supplierID: row['supplierID']}), (Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']}), (Origin:Origin {Org_lat_lon: row['Org_lat_lon']}), (Destination:Destination {DestinationLocation_Code: row['DestinationLocation_Code']}),(CurrentLocation:CurrentLocation {Curr_lat: row['Curr_lat'], Curr_lon: row['Curr_lon']})

SET Customer.customerNameCode = row['customerNameCode'],Shipments.Planned_ETA=row['Planned_ETA'],Shipments.actual_eta= row['actual_eta'],Shipments.trip_start_date= row['trip_start_date'],Shipments.trip_end_date= row['trip_end_date'],Shipments.MaterialShipped= row['Material Shipped'],Shipments.shipment_type= row['shipment_type'], VehicleModel.vehicleType = row['shipment_vehicle_type'], Suppliers.supplierID = row['supplierID'], Suppliers.supplierNameCode = row['supplierNameCode'], Drivers.Driver_Name = row['Driver_Name'], Drivers.Driver_MobileNo = row['Driver_MobileNo'], Origin.originLocation= row['Origin_Location'], Origin.Org_lat_lon = row['Org_lat_lon'], Origin.originLocation_Code = row['OriginLocation_Code'], Destination.Destination_Location= row['Destination_Location'], Destination.DestinationLocation_Code = row['DestinationLocation_Code'], CurrentLocation.currentLocation = row['Current_Location'], CurrentLocation.Curr_lat = row['Curr_lat'], CurrentLocation.Curr_lon = row['Curr_lon']

`;
// MATCH (Shipments:Shipments {BookingID: row['BookingID']})
// SET Shipments.Planned_ETA=row['Planned_ETA'],Shipments.actual_eta= row['actual_eta'],Shipments.trip_start_date= row['trip_start_date'],Shipments.trip_end_date= row['trip_end_date'],Shipments.MaterialShipped= row['Material Shipped'],Shipments.shipment_type= row['shipment_type']

// MERGE (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']})
// ON MATCH SET VehicleModel.vehicleType = row['shipment_vehicle_type']

// MERGE (Suppliers:Suppliers {supplierID: row['supplierID']})
// ON MATCH SET Suppliers.supplierID = row['supplierID'], Suppliers.supplierNameCode = row['supplierNameCode']

// MERGE (Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']})
// ON MATCH SET Drivers.Driver_Name = row['Driver_Name'], Drivers.Driver_MobileNo = row['Driver_MobileNo']

// MERGE (Origin:Origin {Org_lat_lon: row['Org_lat_lon']})
// ON MATCH SET Origin.Origin_Location= row['Origin_Location'], Origin.Org_lat_lon = row['Org_lat_lon'], Origin.OriginLocation_Code = row['OriginLocation_Code']

// MERGE (Destination:Destination {DestinationLocation_Code: row['DestinationLocation_Code']})
// ON MATCH SET Destination.Destination_Location= row['Destination_Location'], Destination.DestinationLocation_Code = row['DestinationLocation_Code']


// MERGE (CurrentLocation:CurrentLocation {Curr_lat: row['Curr_lat'], Curr_lon: row['Curr_lon']})
// ON MATCH SET CurrentLocation.Current_Location = row['Current_Location'], CurrentLocation.Curr_lat = row['Curr_lat'], CurrentLocation.Curr_lon = row['Curr_lon']
async function runQuery() {
  try {
   
      const result = await session.run(cypherQuery);
      console.log("🚀 ~ file: neo4jUpdateOps.js:43 ~ runQuery ~ result:", result)
      
   
    // result.records.forEach((record) => {
    //   console.log('🚀 ~ record._fields:', record._fields);
    //   // Access node properties
    // });
  } catch (error) {
    console.error('Error running Cypher query:', error);
  } finally {
    session.close();
    driver.close();
  }
}

runQuery();
