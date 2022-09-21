import json
import numpy as np
import pandas as pd
from getpass import getpass

import requests
from requests.auth import HTTPBasicAuth

credentials = json.loads(open('Sec\credentials.json').read())
authentication = HTTPBasicAuth(credentials['username'], credentials['password'])
#We authorize our requests using this authentication variable (equivalen to auth=(username,password) in a request)

data = requests.get('https://api.github.com/users/' + credentials['username'],
                    auth = authentication)
data = data.json()
pretty_data=json.dumps(data,indent=4)
# print(pretty_data)
user_name=data['name']
user_location=data['location']
user_email=data['email']
user_bio=data['bio']
user_public_repos_num=data['public_repos']
user_repos_url=data['repos_url'] #provides the github API to fetch the repository details for the user

#Since the given api only fetches about 30 repositories we use a seperatre parameter known as page numbers to fetch the further repos
while (True):
    response = requests.get(url, auth = authentication)
    response = response.json()
    repos_data = repos_data + response
    repos_fetched = len(response)
    print("Total repositories fetched: {}".format(repos_fetched))
    if (repos_fetched == 30):
        page_no = page_no + 1
        url = data['repos_url'].encode("UTF-8") + '?page=' + str(page_no)
    else:
        break


