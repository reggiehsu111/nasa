import azure.cosmos.cosmos_client as cosmos_client
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
            'DATABASE': 'nasa_DB',
            'CONTAINER': 'AQI_result'
        }
        self.client = cosmos_client.CosmosClient(url_connection=self.config['ENDPOINT'], auth={
                                'masterKey': self.config['PRIMARYKEY']})

    def load_AQI_data(self):
        db = self.find_database(self.config['DATABASE'])
        container = self.find_container("dbs/" +self.config['DATABASE'],  self.config['CONTAINER'])

        query = "SELECT item.longtitude, item.lattitude, item.AQI FROM item"
        options = {}
        options['enableCrossPartitionQuery'] = True        
        results = self.client.QueryItems(container['_self'], query, options)
        return results

    

    def find_database(self, id):
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
            print("ERROR! DB not found")
            exit()   

    def find_container(self, database_link, id):
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
            print("ERROR! Container not found")
            exit()

if __name__ == "__main__":
    nasa_dbm = Database_Manager()
    nasa_dbm.load_AQI_data()
    