import os
import re

import pandas as pd

from dotenv import load_dotenv
load_dotenv()

import requests

'''
Github format:
    curl --request GET \
    --url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
    --header "Accept: application/vnd.github+json" \
    --header "Authorization: Bearer YOUR-TOKEN"
#? can include API versioning header for forward compatibility
'''

url = "https://api.github.com/users/DevPrana"
AUTH = "Bearer "+os.getenv('GITHUB_TOKEN')
# print(AUTH)

headers = {
    'Accept': 'application/vnd.github+json',
    "Authorization": AUTH
}
#* Test command to see if auth is working
#* resp = requests.get(url, headers= headers)

ReposDB = set()

def clean_input(input_string):
    cleaned_string = re.sub(r'(?<=[a-z])(?=[A-Z])|[-_]|[^a-zA-Z0-9\s]', ' ', input_string)
    return cleaned_string

def clean_descrips(input_string):
    cleaned_string = re.sub(r'[^a-zA-Z0-9\s]', '', input_string)
    return cleaned_string


def get_repos(username):
    tot_repos_fetched=0
    repos_data=[]# This is where we will store all our repository data 
    data=requests.get('https://api.github.com/users/' + username, headers = headers)

    data = data.json()
    #* pretty_data=json.dumps(data,indent=4)
    #* print(pretty_data)

    user_name = data['name']
    user_location = data['location']    #For further information about the user
    user_email = data['email']          
    user_bio = data['bio']
    user_public_repos_num = data['public_repos']
    user_repos_url = data['repos_url'] #provides the github API to fetch the repository details for the user

    #* pretty_data= json.dumps(data,indent=4)
    if user_bio:
        ReposDB.add(user_bio)

    page_no = 1
    repos_fetched = 30 #Setting to start the while loop
    while(repos_fetched == 30):
        response = requests.get(user_repos_url, headers = headers)
        response = response.json()
        repos_data = repos_data + response
        repos_fetched = len(response)
        tot_repos_fetched += repos_fetched

        if(repos_fetched == 30):
            page_no += 1
            user_repos_url = data["repos_url"] + "?page=" + str(page_no)

    for i in range(tot_repos_fetched):
        #* print(clean_input(repos_data[i]["name"]))
        #* print(clean_descrips(repos_data[i]["description"]))
        repository_description = repos_data[i]["description"]
        if not repository_description:
           repository_description = "None"
        repos_descrip = "Repository name: " + clean_input(repos_data[i]["name"]) + ", Description: " + clean_descrips(repository_description)

        ReposDB.add(repos_descrip)

    return ReposDB  