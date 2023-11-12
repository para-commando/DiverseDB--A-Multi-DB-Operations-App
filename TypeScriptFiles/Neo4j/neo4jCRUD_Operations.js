const {createOps} = require('./neo4jCreateOps')
const {readOps} = require('./neo4jReadOps')
const {updateOps} = require('./neo4jUpdateOps')
const {deleteOps} = require('./neo4jDeleteOps')

const neo4jCRUD_Operations = async () => {
    await createOps();
    // await updateOps();
    // await deleteOps();
    // await readOps();
}

neo4jCRUD_Operations();