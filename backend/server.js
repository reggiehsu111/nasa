const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('./config');


// ADD THIS PART TO YOUR CODE
const endpoint = config.endpoint;
const key = config.key;

const client = new CosmosClient({ endpoint, key });


// ADD THIS PART TO YOUR CODE
const HttpStatusCodes = { NOTFOUND: 404 };

const databaseId = config.database.id;
const containerId = config.container.id;
const partitionKey = { kind: "Hash", paths: ["/Country"] };

async function readDatabase() {
   const { resource: databaseDefinition } = await client.database(databaseId).read();
   console.log(`Reading database:\n${databaseDefinition.id}\n`);
}

async function readContainer() {
   const { resource: containerDefinition } = await client.database(databaseId).container(containerId).read();
 console.log(`Reading container:\n${containerDefinition.id}\n`);
}

function exit(message) {
   console.log(message);
   console.log('Press any key to exit');
   process.stdin.setRawMode(true);
   process.stdin.resume();
   process.stdin.on('data', process.exit.bind(process, 0));
};

readDatabase()
  .then(() => { exit(`Completed successfully`); })
  .catch((error) => { exit(`Completed with error ${JSON.stringify(error) }`) });