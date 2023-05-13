from flask import Flask
app = Flask(__name__)
#We first create the app instance and thne use that instance to import the routes inside the app
from app import routes
import pymongo
try:
    mongo=pymongo.MongoClient("mongodb+srv://rootKillswitch:bakecake123@clusterstart.lkjmflc.mongodb.net/?retryWrites=true&w=majority")
    mongo.server_info()
except:
    print("Error couldnt connect to server")

if __name__=="__main__":
    app.run(port=8080,debug=True)
    print("hello")