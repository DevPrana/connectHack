import os
import sys
from dotenv import load_dotenv
import requests
from bottle import route, get, post, request,response ,run, template, static_file

sys.path.insert(0,"./data_fetch")
from creatingUserData import get_repos

load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/MoritzLaurer/DeBERTa-v3-large-mnli-fever-anli-ling-wanli"
headers = {"Authorization": "Bearer {}}".format(os.getenv("MODEL_TOKEN"))}

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

output = query({
    "inputs": "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!",
    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
})

def get_preds(prediction_string: str):




@get("/user")
def user():
    
    return response.body

@post("/user")
def get_user():
    jsonObj = request.json
    Fname = jsonObj["Fname"]
    Lname = jsonObj["Lname"]
    githubID = jsonObj["githubID"]
    email = jsonObj["email"]
    print(get_repos(githubID))
    return response

if __name__ == "__main__":
    PORT = int(os.environ.get('PORT',8080))
    run(host= "localhost", port=PORT)