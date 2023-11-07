const { driver } = require('./neo4jInstanceDriverConnect');
require('dotenv').config();
const { runQuery } = require('./neo4jRunSingleQuery');

// Create a session to run Cypher queries
const session = driver.session();

module.exports.updateOps = async () => {
  // Example Cypher query
  const cypherQuery = `
LOAD CSV WITH HEADERS FROM '${process.env.NEO4J_REMOTE_DATASET_URL}' AS row 
MATCH (Customer:Customer {customerID: row['customerID']}),(Shipments:Shipments {BookingID: row['BookingID']}), (VehicleModel:VehicleModel {vehicle_no: row['vehicle_no']}), (Suppliers:Suppliers {supplierID: row['supplierID']}), (Drivers:Drivers {Driver_MobileNo: row['Driver_MobileNo']}), (Origin:Origin {Org_lat_lon: row['Org_lat_lon']}), (Destination:Destination {DestinationLocation_Code: row['DestinationLocation_Code']}),(CurrentLocation:CurrentLocation {Curr_lat: row['Curr_lat'], Curr_lon: row['Curr_lon']})

SET Customer.customerNameCode = row['customerNameCode'],Shipments.Planned_ETA=row['Planned_ETA'],Shipments.actual_eta= row['actual_eta'],Shipments.trip_start_date= row['trip_start_date'],Shipments.trip_end_date= row['trip_end_date'],Shipments.MaterialShipped= row['Material Shipped'],Shipments.shipment_type= row['shipment_type'], VehicleModel.vehicleType = row['shipment_vehicle_type'], Suppliers.supplierID = row['supplierID'], Suppliers.supplierNameCode = row['supplierNameCode'], Drivers.Driver_Name = row['Driver_Name'], Drivers.Driver_MobileNo = row['Driver_MobileNo'], Origin.originLocation= row['Origin_Location'], Origin.Org_lat_lon = row['Org_lat_lon'], Origin.originLocation_Code = row['OriginLocation_Code'], Destination.Destination_Location= row['Destination_Location'], Destination.DestinationLocation_Code = row['DestinationLocation_Code'], CurrentLocation.currentLocation = row['Current_Location'], CurrentLocation.Curr_lat = row['Curr_lat'], CurrentLocation.Curr_lon = row['Curr_lon']

`;

  await runQuery({
    driver: driver,
    cypherQuery: cypherQuery,
    session: session,
    message: 'Update Operations Successful',
  });

  const aaa = await session.executeWrite(async (tx) => {
    // Create new Person node with given name, if not already existing
    const kk = await tx.run(`MATCH (N) RETURN N`);

    console.log(
      '🚀 ~ file: neo4jRunQuery copy.js:10 ~ session.executeWrite ~ kk:',
      JSON.stringify(kk)
    );
    const a = await tx.run(`
    MATCH (N:Customer)
    RETURN N
    `);

    console.log(
      '🚀 ~ file: neo4jRunQuery copy.js:20 ~ module.exports.runQuery= ~ a:',
      JSON.stringify(a)
    );
  });

  console.log('🚀 ~ file: neo4jUpdateOps.js:45 ~ aaa ~ aaa:', aaa);
  session.close();
  driver.close();
};
