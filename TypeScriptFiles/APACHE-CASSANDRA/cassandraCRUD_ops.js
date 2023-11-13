const shell = require('shelljs');

// Check if the image is present
const isImagePresent = shell
  .exec('./isImagePresent.sh', { silent: true })
  .stdout.trim();
console.log(
  '🚀 ~ file: cassandraCRUD_ops.js:5 ~ isImagePresent:',
  isImagePresent
);
const isContainer1Present = shell
  .exec('./isContainerPresent.sh "cassandra-node-1"', { silent: true })
  .stdout.trim();
console.log(
  '🚀 ~ file: cassandraCRUD_ops.js:6 ~ isContainer1Present:',
  isContainer1Present
);
const isContainer2Present = shell
  .exec('./isContainerPresent.sh "cassandra-node-2"', { silent: true })
  .stdout.trim();
console.log(
  '🚀 ~ file: cassandraCRUD_ops.js:7 ~ isContainer2Present:',
  isContainer2Present
);
const isContainer1Running = shell
  .exec('./isContainerRunning.sh "cassandra-node-1"', { silent: true })
  .stdout.trim();
console.log(
  '🚀 ~ file: cassandraCRUD_ops.js:8 ~ isContainer1Running:',
  isContainer1Running
);
const isContainer2Running = shell
  .exec('./isContainerRunning.sh "cassandra-node-2"', { silent: true })
  .stdout.trim();
console.log(
  '🚀 ~ file: cassandraCRUD_ops.js:9 ~ isContainer2Running:',
  isContainer2Running
);
if (isImagePresent === 'false') {
  console.log('Concerned image was not present, building it...');
  shell.cd('configurations');
  shell.exec('./build-custom-cassandra-image.sh');
  shell.exec('./initial-cluster-setup.sh');
  shell.cd('..');
} else if (isContainer1Present === 'false' || isContainer2Present === 'false') {
  shell.cd('configurations');
  console.log('Concerned container(s) is/are absent, creating it...');
  shell.exec('./initial-cluster-setup.sh');
  shell.cd('..');
} else if (isContainer1Running === 'false' || isContainer2Running === 'false') {
  shell.cd('configurations');
  console.log('Container(s) is/are not running, starting them...');
  shell.exec('./start-cluster.sh');
  shell.cd('..');
} else if (isContainer1Running === 'true' && isContainer2Running === 'true') {
  console.log('Container(s) is/are running successfully...');
} else {
  console.log('exception occured');
  shell.exit(1);
}

console.log('Starting create query operations...');
shell.exec('./queryExecuter.sh cassandra-node-1 createOpsQueries.cql');
shell.exec('sleep 2');

console.log('Starting read query operations...');
shell.exec('./queryExecuter.sh cassandra-node-1 readOpsQueries.cql');
shell.exec('sleep 2');

console.log('Starting update query operations...');
shell.exec('./queryExecuter.sh cassandra-node-1 updateOpsQueries.cql');
shell.exec('sleep 2');

console.log('Starting delete query operations...');
shell.exec('./queryExecuter.sh cassandra-node-1 deleteOpsQueries.cql');

// console.log('Starting to erase the entire cluster...');
// shell.cd('configurations');
// shell.exec('./stop-cluster.sh');
// shell.exec('./destroy-container-nodes.sh');
// shell.exec('./destroy-custom-cassandra-image.sh');
// shell.cd('..');
// console.log('Successfully erased the entire cluster...');
