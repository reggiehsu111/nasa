import azure.cosmos.cosmos_client as cosmos_client
import numpy as np
from tqdm import tqdm
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "*"}})

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
        res = [x for x in results]
        self.aqi_data = res
        return res

    def load_accuracy_data(self):
        db = self.find_database(self.config['DATABASE'])
        container = self.find_container("dbs/" +self.config['DATABASE'],  "accuracy")
        query = "SELECT item.id, item.accuracy FROM item ORDER BY item.accuracy DESC"
        options = {}
        options['enableCrossPartitionQuery'] = True        
        results = self.client.QueryItems(container['_self'], query, options)
        res = [x for x in results]
        self.load_accuracy_data = res
        return res


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

    def load_pickle(self):
        with open('loc_cal.pkl', 'rb') as f:
            data = pickle.load(f)
        print(data)
        self.loc = data
        return data

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

def json_response(payload, status=200):
 return (json.dumps(payload), status, {'content-type': 'application/json'})

@app.route('/perceived_data', methods=["GET"])
def get_preceived_data():
    try:
        return jsonify(nasa_dbm.aqi_data)
    except:
        results = nasa_dbm.load_AQI_data()
        print("called")
    return jsonify(results)

@app.route('/loc_data', methods=["GET"])
def get_loc_data():
    try:
        return jsonify(nasa_dbm.loc)
    except:
        results = nasa_dbm.load_pickle()
        print("called")
    return jsonify(results)

if __name__ == "__main__":


    nasa_dbm = Database_Manager()
    # nasa_dbm.load_AQI_data()
    # nasa_dbm.load_accuracy_data()
    app.run(debug=True)
