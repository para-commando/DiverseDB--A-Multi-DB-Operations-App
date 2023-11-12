const { runMultipleQueries } = require('./neo4jRunMultipleQueries');

// Create a session to run Cypher queries

module.exports.readOps = async (driver) => {
  const readOpsSession = driver.session();

  const cypherQuery = [
    {
      query: `MATCH (bookings:Bookings)-[booked_on:BOOKED_ON]->(s:Shipments)
    WITH bookings, booked_on, s,
         split(booked_on.BookingID_Date, '/') AS dateParts
    WITH bookings, booked_on, s, 
         toInteger(dateParts[2]) AS year,
         toInteger(dateParts[0]) AS month,
         toInteger(dateParts[1]) AS day
    WHERE datetime({year: year, month: month, day: day}) >= datetime({year: 2023, month: 7, day: 1})
      AND datetime({year: year, month: month, day: day}) < datetime({year: 2023, month: 8, day: 1})
    RETURN bookings, booked_on, s`,
      message: 'get all bookings in date range success',
    },
    { query: `MATCH (N) RETURN N`, message: 'get all nodes success' },
    {
      query: `MATCH (shipments:Shipments) 
    where shipments.shipment_type='Next Day'
    return shipments
    `,
      message: 'get shipments based on shipment types success',
    },
    {
      query: `MATCH (origin:Origin)
      WHERE origin.originLocation =~ '.*Wieczfnia.*'
      RETURN origin;
    `,
      message: 'get shipments originated at a given location success',
    },
    {
      query: `MATCH (shipments:Shipments) 
      WITH split(shipments.trip_start_date, ' ') AS dateWithoutTime, shipments
      WITH split (dateWithoutTime[0],'/') as dateParts,shipments
     WITH toInteger(dateParts[2]) AS year,
     toInteger(dateParts[0]) AS month,
     toInteger(dateParts[1]) AS day, shipments
     WHERE datetime({year: year, month: month, day: day}) = datetime({year: 2023, month: 1, day: 24}) return shipments;
    `,
      message: 'get shipments whose trip start at a given date success',
    },

    {
      query: `MATCH (shipments:Shipments)-[:SHIPPED_VEHICLE_TYPE]->(:VehicleModel)<-[:CURRENTLY_AT]-(currentLocation:CurrentLocation) WHERE currentLocation.currentLocation  =~ '.*Brazil.*' return shipments;`,
      message: 'get all those shipments which are currently at a given location success',
    },
    {
      query: `MATCH (shipments:Shipments {BookingID: 'BKG012345' })-[:SHIPPED_VEHICLE_TYPE]->(:VehicleModel)-[:DRIVEN_BY{bookingsCarried:'BKG012345'}]->(Driver:Drivers) return Driver;`,
      message: 'get details of a driver carrying a shipment',
    },
  ];
  
  const result = await runMultipleQueries({
    cypherQueries: cypherQuery,
    session: readOpsSession,
  });
  console.log(
    '🚀 ~ file: neo4jReadOps.js:18 ~ module.exports.readOps= ~ result:',
    result
  );
  readOpsSession.close();
  return true;
};
