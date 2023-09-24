const cassandra = require('cassandra-driver');

// Define the contact points (IP addresses) of your Cassandra nodes.
const contactPoints = ['127.0.0.1:9043/', '127.0.0.1:9042/'];

// Create a new Cassandra client instance.
const client = new cassandra.Client({
  contactPoints,
  localDataCenter: 'datacenter1', // Set the local data center name.
  keyspace: 'learn_cassandra', // Specify the keyspace you want to use.
});

// Connect to the Cassandra cluster.
client.connect((err) => {
  if (err) {
    console.error('Error connecting to Cassandra:', err);
  } else {
    console.log('Connected to Cassandra cluster');
    // Now you can execute Cassandra queries here.
    client.execute(
      'SELECT * FROM learn_cassandra.users_by_country',
      [],
      (err, result) => {
        console.log('🚀 ~ file: cass.js:21 ~ client.connect ~ result:', result);
      }
    );
  }
});
