import requests
import json

for i in range(1, 4):
    with open(f'./dataset-extra{i}.json', 'r') as dataset:
        data = json.load(dataset)
        for user in data:
            response = requests.post('localhost:3000', data=data)
            if response.status_code != 200:
                print('POST request failed:', response.status_code)
                print(data)
                