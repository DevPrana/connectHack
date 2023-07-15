import os
from dotenv import load_dotenv
load_dotenv()

import requests
API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
headers = {"Authorization": "Bearer {}".format(os.getenv("MODEL_TOKEN"))}

candidate_labels = ['Drupal Developer', 'ASP.NET Developer',        #random skills from GPT
                    'Express.js Developer', 'HTML/CSS Developer', 
                    'Back-end Developer', 'TypeScript Developer', 
                    'Julia Developer', 'DevOps Engineer', 
                    'iOS Developer', 'Scala Developer', 
                    'MEAN Stack Developer', 'Shell Scripting Developer', 
                    'Front-end Developer', 'AI Developer', 
                    'Data Analyst', 'Full Stack Developer', 
                    'Laravel Developer', 'Cloud Architect',
                    'Ruby Developer', 'Machine Learning Engineer', 
                    'Cloud Engineer', 'AWS Developer', 
                    'Python Developer', 'Node.js Developer', 
                    'WordPress Developer', 'Flask Developer', 
                    'UI/UX Designer', 'Swift Developer', 
                    'Mobile App Developer', 
                    'Spring Developer', 'Symfony Developer', 
                    'SQL Developer', 'Shopify Developer', 
                    'Docker Developer', 'Android Developer', 
                    'Angular Developer', 'MySQL Developer', 
                    'React Developer', 'SQL Server Developer', 
                    'UI/UX Developer', 'Java Developer', 
                    'Ruby on Rails Developer', 'Oracle Developer', 
                    'Google Cloud Developer', 'C++ Developer', 
                    'PHP Developer', 'Database Administrator', 
                    'Go Developer', 'Flutter Developer', 
                    'Kotlin Developer', 'Vue.js Developer', 
                    'Lua Developer', 'MongoDB Developer', 
                    'RESTful API Developer', 'Golang Developer', 
                    'MERN Stack Developer', 'Perl Developer', 
                    'Continuous Integration/Deployment (CI/CD)', 
                    'Git Version Control', 'Heroku Developer', 
                    'React Native Developer', 'JavaScript Developer', 
                    'Rust Developer', 'Kubernetes Developer', 
                    'Magento Developer', 'Azure Developer', 
                    'Agile Development', 'PostgreSQL Developer', 
                    'Data Scientist', 'C# Developer', 'Django Developer', 
                    'LAMP Stack Developer', 'Test-Driven Development', 
                    'Haskell Developer', 'GraphQL Developer', 
                    'HTML/CSS Specialist', 'Firebase Developer']

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

def get_preds(prediction_string: str):      # can be edited to ensure more cohesive english for particular models #TODO (GPT 3.5) using OpenAI API
    skills = []
    for i in range(0,len(candidate_labels),10):
        print("request number "+str(int(i/10)))
        output = query({                                 #query format for zero shot classification (read parameters for more control)
            "inputs": "Projects that i have built are "+prediction_string,
            "parameters": {"candidate_labels": candidate_labels[i:i+10],    #limitation of API only allows 10 labels per request
                           "wait_for_model": True,                          #https://huggingface.co/docs/api-inference/detailed_parameters#zeroshot-classification-task
                           "multi_label": True}         # allow for multiple labels without normalizing to prevent conflicts if two prominent skills come
            })
        
        for j in range(len(output["scores"])):
             if(output["scores"][j] > 0.4):            #score threshold to enable skills (wont matter if getting top 5 anyways)
                  skills.append([output["labels"][j],output["scores"][j]])
        # print(output["labels"])                   DEBUG stuff
        # print(output["scores"])
        # print("batch "+str(int((i/10)+1))+" done")
    skills.sort(key=lambda x: x[1], reverse=True)   #sorts based on scores obtained in descending order
    return [skills[i][0] for i in range(min(5,len(skills)))]   #returns skills either top 5 or all that are present in list (whichever is smaller)

