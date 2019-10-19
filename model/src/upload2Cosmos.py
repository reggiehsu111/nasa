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

class database:
    def __init__(self):
        self.config = {
            'ENDPOINT': 'https://nasa-hackathon-db.documents.azure.com:443/',
            'PRIMARYKEY': 'XwAxG7ma3R2KUAWHAQJXVFD95FDSAnVANaeiOlMeQwOgyCl4v0i2jnW8uWkQ2n1ssHQai7yh4ScdKJgPlgD02Q==',
            'DATABASE': 'NewsDatabase',
            'CONTAINER': 'NewsContainer'
        }
        self.client = cosmos_client.CosmosClient(url_connection=self.config['ENDPOINT'], auth={
                                'masterKey': self.config['PRIMARYKEY']})

    
    def InitDB(self, db_name, container_name):

        '''
        Don't run!!!!!!!!!
        Only used in the very first time to initialize the database
        '''

        # Create a database
        db = self.client.CreateDatabase({ 'id': db_name })

        # Create container options
        options = {
            'offerThroughput': 400
        }
        container_definition = {
            'id': container_name
        }
        # Create a container
        container = self.client.CreateContainer(db['_self'], container_definition, options)
        

    def upload_people(self):
        
        # dbs and containers have only 
        dbs = self.client.ReadDatabases()
        for db in dbs:
            self.db = db
        containers = self.client.ReadContainers(self.db["_self"])
        for container in containers:
            self.container = container

        with open(config.model_filename, "rb") as f:
            self.model = pickle.load(f)
        
        for i in tqdm(range(len(self.model.matrix_list))):
            matrix = self.model.matrix_list[i]
            acc = np.sum(np.diag(matrix)) / np.sum(matrix)
            item = dict()
            _id = "person_" + str(i)
            item["id"] = _id
            item["accuracy"] = acc
            item = self.client.CreateItem(self.container['_self'], item)

    def getPositiveNews(self, query_id):

        '''
        Given query_id, return all positive news (label = 3) in a list
        query_id: int (1~20)
        rvalue: list of str
        '''

        sql_query = 'SELECT news.id FROM news WHERE news.query' + str(query_id).zfill(2) + '=3'
        query = {'query': sql_query}
        result_iterable = self.__getquery__(query)
        result_list = [item['id'] for item in iter(result_iterable)]
        return result_list

    def getNegativeNews(self, query_id):

        '''
        Given query_id, return all negative news (label = 0) in a list
        query_id: int (1~20)
        rvalue: list of str
        '''

        sql_query = 'SELECT news.id FROM news WHERE news.query' + str(query_id).zfill(2) + '=0'
        query = {'query': sql_query}
        result_iterable = self.__getquery__(query)
        result_list = [item['id'] for item in iter(result_iterable)]
        return result_list

    def labelNews(self, news_fname, query_id, label):

        '''
        Update the label of query for a news
        news_fname: str (news_xxxxxx)
        query_id: int (1~20)
        label: int (1~3)
        '''
        sql_query = 'SELECT * FROM news WHERE news.id=\"' + news_fname + '\"'
        query = {'query': sql_query}
        result_iterable = self.__getquery__(query)
        for item in iter(result_iterable):
            item['query'+str(query_id).zfill(2)] = label
            self.client.ReplaceItem(item['_self'], item)
        return       

    def __getquery__(self, query):
        options = {}
        options['enableCrossPartitionQuery'] = True        
        return self.client.QueryItems(self.container['_self'], query, options)

if __name__ == "__main__":
    nasa_db = database()
    nasa_db.InitDB("nasa_DB", "accuracy")
    nasa_db.upload_people()