
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


// creating new nodes from existing properties of a node
MATCH (m:Movie)
UNWIND m.languages AS language
WITH  language, collect(m) AS movies
MERGE (l:Language {name:language})
WITH l, movies
UNWIND movies AS m
WITH l,m
MERGE (m)-[:IN_LANGUAGE]->(l);
MATCH (m:Movie)
SET m.languages = null
// explanation
// MATCH (m:Movie): This part of the query matches all nodes labeled as Movie and assigns the alias m to each movie node.

// UNWIND m.languages AS language: It takes each movie's languages property (assuming it's an array) and unwinds it into individual elements, assigning each language to the variable language.

// WITH language, collect(m) AS movies: In this line, it groups movies by language using the WITH clause. It collects all movies with the same language into a list called movies and keeps the language as language.

// MERGE (l:Language {name:language}): For each unique language, it tries to create a Language node with the name property set to the language if it doesn't already exist. The MERGE clause ensures that duplicate language nodes are not created.

// WITH l, movies: It retains the Language node (l) and the list of movies (movies) in the context.

// UNWIND movies AS m: It unwinds the list of movies (movies) back into individual movie nodes (m), preparing for the next operation.

// WITH l, m: It retains the Language node (l) and the movie node (m) in the context.

// MERGE (m)-[:IN_LANGUAGE]->(l): For each movie (m) and language (l) pair, it creates a [:IN_LANGUAGE]` relationship from the movie to the language. This represents that the movie is in the specified language.

// MATCH (m:Movie) SET m.languages = null: After establishing the relationships between movies and languages, this line matches all movie nodes and sets their languages property to null. This step is presumably done to clear the languages property on movie nodes since the language information is now represented by the relationships to Language nodes.

// UNWIND:

// The UNWIND clause is used to break down a collection (e.g., an array or a list) into individual elements. It is commonly used to work with multi-valued properties or lists.
// It can be followed by a collection, and each element of that collection will be treated as an independent row in the query's result.
// In your query, UNWIND m.languages AS language takes the languages property of movie nodes (m) and breaks it down into individual languages. For each language, the query processes the subsequent clauses, creating one row in the result for each language.
// It's essential to use UNWIND before you use WITH to work with individual elements in the collection.


// WITH:

// The WITH clause is used to pass data from one part of a query to another, effectively chaining together multiple parts of a query.
// It can be used to select, filter, or transform data before it's passed to the next part of the query. This makes it a crucial tool for shaping the data throughout the query.
// In your query, WITH language, collect(m) AS movies selects the language and collects all movie nodes associated with that language into a list called movies. The result at this point includes one row for each language and the list of movies in that language.
// You can use WITH multiple times in a query to continue processing the data, filtering or aggregating it as needed.
// Combining UNWIND and WITH:

// These clauses are often used together when dealing with collections. UNWIND breaks the collection into individual elements, and WITH allows you to work with those elements.
// For example, in your query, you use UNWIND to handle each language separately and then pass the language and the list of associated movies to the next part of the query using WITH.
// This combination is useful when you need to work with each element of a collection independently while retaining other contextual data.

// The query processes each movie node and language combination separately due to the UNWIND clause, which unwinds the languages array, creating separate rows for each language.

// The WITH clause then collects the movies associated with each language into a list. So, for each row in the result, you have one language and a list of movies associated with that language.

// here the main problem in creating nodes for the genres is that they are present as an array in each movie node and hence are duplicated so first we want kinda unique elements of those hence use unwind to set free the elements from array as individual elements using the line "UNWIND m.genres AS genres" then we create a data such that infront of each genre its associated array of movies are present using the line "WITH genres, collect(m) AS movies" then for each unique genres we create nodes using the line "MERGE (g:genres{name:genres})" now since movies are present as list we want to get it as inidividual elements inorder to create link between those and the genre nodes we do that using the line "UNWIND movies AS m" then using this line "MERGE (m)-[:IN_GENRE]->(g)" we create unique link between movie and genre nodes then after that we fetch the movie nodes again and then delete the genres property from it using the line "SET m.genres=null"

MATCH (m:Movie)
UNWIND m.genres AS genres
WITH genres, collect(m) AS movies
MERGE (g:genres {name:genres})
WITH g, movies
UNWIND movies AS m
WITH g,m
MERGE (m)-[:IN_GENRE]->(g)
MATCH (m:Movie)
SET m.genres=null

// the above query can be written like this also

MATCH (m:Movie)
UNWIND m.genres AS genre
MERGE (g:Genre {name: genre})
MERGE (m)-[:IN_GENRE]->(g)
SET m.genres = null;


// creating a new relationship using the values in the node's properties
MATCH (n:Actor)-[:ACTED_IN]->(m:Movie)
CALL apoc.merge.relationship(n,
  'ACTED_IN_' + left(m.released,4),
  {},
  {},
  m ,
  {}
) YIELD rel
RETURN count(*) AS `Number of relationships merged`;

// USING OR condition to retrieve all of the nodes in the paths which has the mentioned relations
MATCH (p:Person)-[:ACTED_IN_1995|DIRECTED_1995]->()
RETURN p.name as `Actor or Director`

// changing the format of date value stored to yyyy-MM-dd from mm/dd/yyyy

MATCH (bookings:Bookings)-[booked_on:BOOKED_ON]->(s:Shipments)
WITH bookings, booked_on, s,
     split(booked_on.BookingID_Date, '/') AS dateParts
WITH bookings, booked_on, s, dateParts[2] AS year, dateParts[0] AS month, dateParts[1] AS day
WHERE toInteger(year) < 2023
WITH bookings, booked_on, s, 
     year + '-'  + month + '-' + day AS newDate
SET booked_on.BookingID_Date = newDate
RETURN bookings, booked_on, s

// getting data between a date range 

MATCH (bookings:Bookings)-[booked_on:BOOKED_ON]->(s:Shipments)
WITH bookings, booked_on, s,
     split(booked_on.BookingID_Date, '/') AS dateParts
WITH bookings, booked_on, s, 
     toInteger(dateParts[2]) AS year,
     toInteger(dateParts[0]) AS month,
     toInteger(dateParts[1]) AS day
WHERE datetime({year: year, month: month, day: day}) >= datetime({year: 2023, month: 7, day: 1})
  AND datetime({year: year, month: month, day: day}) < datetime({year: 2023, month: 8, day: 1})
RETURN bookings, booked_on, s
