import os
import sys
import requests
from bottle import get, post, request,response ,run, template, static_file

from dotenv import load_dotenv
load_dotenv()

sys.path.insert(0,"./modules")
from creatingUserData import get_repos
from gettingModelPreds import get_preds

@get("/user")
def user():
    return response.body

@post("/user")
def get_user():
    jsonObj = request.json

    Fname = jsonObj["Fname"]
    Lname = jsonObj["Lname"]
    email = jsonObj["email"]
    githubID = jsonObj["githubID"]
    preds = get_preds(get_repos(githubID))
    return {
        "predictions": preds
    }

if __name__ == "__main__":
    PORT = int(os.environ.get('PORT',8080))
    run(host= "localhost", port=PORT)