import sys 
sys.path.append('..')
import config
import azure.cosmos.cosmos_client as cosmos_client
import time
import pickle
import numpy as np
from tqdm import tqdm

'''
Trash Code
Don' support remove and any error handling
Just a temporal solution
'''

class Database_Manager:
    def __init__(self):
        self.config = {
            'ENDPOINT': 'https://nasa-hackathon-db.documents.azure.com:443/',
            'PRIMARYKEY': 'XwAxG7ma3R2KUAWHAQJXVFD95FDSAnVANaeiOlMeQwOgyCl4v0i2jnW8uWkQ2n1ssHQai7yh4ScdKJgPlgD02Q==',
            'DATABASE': 'NewsDatabase',
            'CONTAINER': 'NewsContainer'
        }
        self.client = cosmos_client.CosmosClient(url_connection=self.config['ENDPOINT'], auth={
                                'masterKey': self.config['PRIMARYKEY']})

    def upload_people(self):
        
        # Create a database
        db = self.find_or_create_database("nasa_DB")
        # Create a container
        database_link = "dbs/nasa_DB"
        container = self.find_or_create_container(database_link, "accuracy")

        with open(config.model_filename, "rb") as f:
            model = pickle.load(f)
        
        for i in tqdm(range(len(model.matrix_list))):
            matrix = model.matrix_list[i]
            acc = np.sum(np.diag(matrix)) / np.sum(matrix)
            item = dict()
            _id = "person_" + str(i)
            item["id"] = _id
            item["accuracy"] = acc
            item = self.client.CreateItem(container['_self'], item)

    def upload_AQI(self):

        # Create a database
        db = self.find_or_create_database("nasa_DB")
        # Create a container
        database_link = "dbs/nasa_DB"
        container = self.find_or_create_container(database_link, "AQI_result")

        print(container['_self'])

        with open("../../loc.csv", "rb") as f:
            locations = np.genfromtxt(f, delimiter=',')
        with open(config.gold_filename, "rb") as f:
            gold_labels = np.genfromtxt(f, delimiter=',')
        
        for i in tqdm(range(1,len(locations))):
            longtitude = locations[i, 0]
            lattitude = locations[i, 1]
            item = dict()
            _id = "location_" + str(i)
            item["id"] = _id
            item["longtitude"] = longtitude
            item["lattitude"] = lattitude
            item["AQI"] = gold_labels[i, 0]
            item = self.client.CreateItem(container['_self'], item)

    def find_or_create_database(self, id):
        print('Query for Database')

        databases = list(self.client.QueryDatabases({
            "query": "SELECT * FROM r WHERE r.id=@id",
            "parameters": [
                { "name":"@id", "value": id }
            ]
        }))

        if len(databases) > 0:
            print('Database with id \'{0}\' was found'.format(id))
            return databases[0]
        else:
            return self.client.CreateDatabase({ 'id': db_name })    

    def find_or_create_container(self, database_link, id):
        print('Query for Collection')

        collections = list(self.client.QueryContainers(
            database_link,
            {
                "query": "SELECT * FROM r WHERE r.id=@id",
                "parameters": [
                    { "name":"@id", "value": id }
                ]
            }
        ))

        if len(collections) > 0:
            print('Collection with id \'{0}\' was found'.format(id))
            return collections[0]
        else:
            options = {
                'offerThroughput': 400
            }
            container_definition = {
                'id': id
            }
            return self.client.CreateContainer(database_link, container_definition, options)

if __name__ == "__main__":
    nasa_dbm = Database_Manager()
    # nasa_dbm.InitDB("nasa_DB", "accuracy")
    # nasa_dbm.upload_people()
    nasa_dbm.upload_AQI()
    