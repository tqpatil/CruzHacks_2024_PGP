import requests
import json
r = requests.post("http://127.0.0.1:8000/replace", data= json.dumps({"secret": "Tanishqisthegoat", "corpus_id":4})).json()
print(r)