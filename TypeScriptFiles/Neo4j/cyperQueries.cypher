
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


// Creating relationship between the existing nodes

MATCH (p:Person {name: 'Michael Caine'})
MATCH (m:Movie {title: 'The Dark Knight'})
MERGE (p)-[:ACTED_IN]->(m)

// note that in this query the direction of relationship to be found is not specified hence it will find all the connected nodes
MATCH (p:Person {name: 'Michael Caine'})-[:ACTED_IN]-(m:Movie {title: 'The Dark Knight'})
RETURN p, m


// creating nodes and creating relationships between them at the same time also note that the direction in which relation should be created is not mentioned hence by default it will be from left to right as we are using MERGE clause here
MERGE (p:Person {name: 'Chadwick Boseman'})
MERGE (m:Movie {title: 'Black Panther'})
MERGE (p)-[:ACTED_IN]-(m)

// creating nodes and relationships between them in a single statement
MERGE (p:Person {name: 'Emily Blunt'})-[:ACTED_IN]->(m:Movie {title: 'A Quiet Place'})
RETURN p, m

// updating relationships between nodes, note that same clause can be used to even overwrite the value of a specfic property 

MATCH (p:Person)-[r:ACTED_IN]->(m:Movie)
WHERE p.name = 'Michael Caine' AND m.title = 'The Dark Knight'
SET r.roles = ['Alfred Penny']
RETURN p, r, m

// removing specific property from a node
MATCH (p:Person)-[r:ACTED_IN]->(m:Movie)
WHERE p.name = 'Michael Caine' AND m.title = 'The Dark Knight'
REMOVE r.roles
RETURN p, r, m

// setting value of a property to null also deletes it
MATCH (p:Person)
WHERE p.name = 'Gene Hackman'
SET p.born = null
RETURN p


// options in MERGE Clause

MERGE (p:Person {name: 'McKenna Grace'})
// Only set the `createdAt` property if the node is created during this query
ON CREATE SET p.createdAt = datetime()
// Only set the `updatedAt` property if the node was created previously
ON MATCH SET p.updatedAt = datetime()
// Set the `born` property regardless
SET p.born = 2006
RETURN p

// Deleting a node  
MATCH (p:Person)
WHERE p.name = 'Jane Doe'
DELETE p

// Deleting a relationship
MATCH (p:Person {name: 'Jane Doe'})-[r:ACTED_IN]->(m:Movie {title: 'The Matrix'})
DELETE r
RETURN p, m

// deleting a node with its relationships
MATCH (p:Person {name: 'Jane Doe'})
DETACH DELETE p

// to delete everything in a graph 
MATCH (n)
DETACH DELETE n

// adding a label to an existing node
MATCH (p:Person {name: 'Jane Doe'})
SET p:Developer
RETURN p

// Deleting a label
MATCH (p:Person {name: 'Jane Doe'})
REMOVE p:Developer
RETURN p

// printing all the labels in the graph
CALL db.labels()

// query used to find the yougest actor acted in a movie
MATCH (p:Person)-[:ACTED_IN]-(m:Movie)
WHERE m.title = 'Hoffa'
RETURN  p.name AS Actor, p.born as `Year Born` ORDER BY p.born DESC LIMIT 1

// adding profile keyword to get overview of the performance of the query
PROFILE MATCH (p:Person)-[:ACTED_IN]-(m:Movie)
WHERE p.name = 'Tom Hanks'
RETURN m.title AS Movie