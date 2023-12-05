Mongodb:
This part of the project connects to Mongo Database using MongoDB Atlas which is a fully managed cloud database service provided by MongoDB, Inc. Typescript is the language used here. Mongoose was used to interact with the data as Object-Document Mapper library.

Mongoose is a Node.js ODM for MongoDB, enabling developers to define data schemas, enforce validation rules, and seamlessly interact with the database. With schema definition, Mongoose adds structure to MongoDB, facilitating data validation for types, defaults, and custom rules. The library's middleware support allows developers to execute custom logic before or after operations, and its powerful query API simplifies the construction of complex queries, enhancing the overall development experience. Additionally, Mongoose eases connection management, providing a connection pool and handling events related to database connections.

 In this CRUD Operations are performed where the operations are performed on the models created which are equivalent to tables in an RDBMS. Data is created using different methods such as creating an instance of each model and then calling .save() on the resulting object, using model.create().  

In the read operations model.aggregate(), .findOne(), findById(), .exists(), .populate() chained queries, along with the .virtual, .methods, .static, .query options defined on the model, are used.
 
In the update operations model.findOneAndUpdate, model.updateMany, modelUsed.updateOne are used.
 
In the delete operations model.deleteMany(), model.findOneAndDelete(), model.deleteOne(), model.findByIdAndDelete() are used.

