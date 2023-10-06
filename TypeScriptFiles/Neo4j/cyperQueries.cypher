
// OR clause

MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
WHERE m.released = 2008 OR m.released = 2009
RETURN p, m

// alternative way of writing where clause
MATCH (p)-[:ACTED_IN]->(m)
WHERE p:Person AND m:Movie AND m.title='The Matrix'
RETURN p.name

// filtering by parital strings
MATCH (p:Person)-[:ACTED_IN]->()
WHERE p.name STARTS WITH 'Michael'
RETURN p.name

// character case modification for strings
MATCH (p:Person)-[:ACTED_IN]->()
WHERE toLower(p.name) STARTS WITH 'michael'
RETURN p.name

// suppose we want to return some specfic nodes such that the mentioned relation does not exist
MATCH (p:Person)-[:WROTE]->(m:Movie)
WHERE NOT exists( (p)-[:DIRECTED]->(m) )
RETURN p.name, m.title

// in clause
MATCH (p:Person)
WHERE p.born IN [1965, 1970, 1975]
RETURN p.name, p.born

MATCH (p:Person)-[r:ACTED_IN]->(m:Movie)
WHERE  'Neo' IN r.roles AND m.title='The Matrix'
RETURN p.name, r.roles

// using getting all the keys of a node's property list
MATCH (p:Person)
RETURN p.name, keys(p)

// to return all the property keys defined in the graph.
CALL db.propertyKeys()

// filtering using ranges
// observe that it is not written like m.release <= 2008 and m.release <= 2003
MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
WHERE 2000 <= m.released <= 2003
RETURN p.name, m.title, m.released


// options for creating nodes

// It is said that MERGE clause checks if the node-property or relationship already exists to ensure uniqueness in thse nodes and. CREATE does not check for duplicates

// CREATE Clause
CREATE (alice:Person {name: 'Alice'})-[knows:KNOWS]->(bob:Person {name: 'Bob'})

// MERGE Clause
MERGE (alice:Person {name: 'Alice'})-[knows:KNOWS]->(bob:Person {name: 'Bob'})
