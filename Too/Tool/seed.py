# Tool/seed.py
from Tool.models import *
from faker import Faker
import json

# Load the vulnerabilities from the JSON file
with open('Tool/vulnerabilities.json', 'r') as file:
    vulnerabilities = json.load(file)


# a file to create data which is put into the object which is created by Name 

def seed_db(n):
    fake = Faker()
    for _ in range(n):
        print(fake.name()) # Get randem name function
        Name.objects.create(name=fake.name())  # createname and putting that randome name function resulted data

def yolo():
    for vulnerability in vulnerabilities:
        # print(f"Name: {vulnerability['name']}")
        # print(f"Risk: {vulnerability['risk']}")
        # print(f"Description: {vulnerability['description']}")
        # print(f"Impact: {vulnerability['impact']}")
        # print(f"Recommendations:{vulnerability['recommendations']}")
        Vanribality.objects.create(Vanribality = vulnerability['name'], 
                                   Risk = vulnerability['risk'],
                                   Discription = vulnerability['description'],
                                   Impace = vulnerability['impact'],
                                   Recommendation = vulnerability['recommendations']
                                   )
