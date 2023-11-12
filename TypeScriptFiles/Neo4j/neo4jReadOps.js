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
