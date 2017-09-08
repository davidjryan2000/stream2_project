from flask import Flask
from flask import render_template
from pymongo import MongoClient 
import json
import os


app = Flask(__name__)

MONGODB_URI='heroku_v4s05s9f:kr3c5il6lceocgfc9ktem5bsuo@ds149122.mlab.com:49122/heroku_v4s05s9f'
MONGO_DB_NAME='heroku_v4s05s9f'

#MONGODB_HOST = 'localhost'
#MONGODB_PORT = 27017
#MONGODB_URI = os.environ.get('MONGODB_URI')
#DBS_NAME = os.environ.get ('MONGO_DB_NAME','bitcoin')
COLLECTION_NAME = os.environ.get('MONGO_COLLECTION_NAME','project')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/bitcoin/project")
def donor_projects():

    FIELDS = {
        '_id': False, 'Date': True, 'MarketPrice': True, 'MarketCap': True, 'TotalinCirculation': True, 'TradeVolumeUSDExchange': True,
        'TotalTransactionFeesinUSD': True, 'CostperTransactionUSD': True,
        'TotalDailyTransactions': True, 'TotalTransactions': True,
        'GOLD/USD':True, 'Brent Oil/USD': True,
    }

    with MongoClient(MONGODB_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]

    projects = collection.find(projection=FIELDS, limit=55000)

    return json.dumps(list(projects))

if __name__ == "__main__":
    app.run(debug=True)