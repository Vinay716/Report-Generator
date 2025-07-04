# main.py
from .test_t1 import Tables
# from .ji import Tables
from .test_t import Intro
import json
import os
import tempfile

def load_json(json_path):
    with open(json_path, 'r') as file:
        data = json.load(file)
    return data


def main(template_file, json_data, output_file, image_paths):
    # print("Main Function starts")
    
    if isinstance(json_data, dict):
        # print("JSON Data:", json.dumps(json_data, indent=2))  # Pretty-print JSON data
        with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix='.json') as temp_json_file:
            json.dump(json_data, temp_json_file)
            temp_json_file_path = temp_json_file.name
    else:
        temp_json_file_path = json_data

    # Process the document with the provided JSON data
    # print("Table starts")
    Tables(template_file, temp_json_file_path, output_file , image_paths)
    Intro(output_file, temp_json_file_path, output_file)
    
       
    # Remove the temporary JSON file
    os.remove(temp_json_file_path)
    
    return output_file
