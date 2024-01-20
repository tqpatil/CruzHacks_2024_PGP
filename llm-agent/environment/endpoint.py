# from sentence_transformers import SentenceTransformer
# import uuid
# from langchain.tools import StructuredTool
# from langchain.prompts import MessagesPlaceholder
# from langchain.agents import AgentType, initialize_agent, Tool
# from langchain.chat_models import ChatOpenAI
# from langchain.memory import ConversationBufferMemory
# from pydantic import BaseModel, Field
# import spacy
from fastapi import FastAPI, Request, Response
from fastapi.encoders import jsonable_encoder
from vectara import vectara
import os
app = FastAPI()
secretKey = "Tanishqisthegoat"
def read_env_file(file_path):
    env_vars = {}
    with open(file_path, "r") as file:
        for line in file:
            # Ignore comments and empty lines
            if line.startswith("#") or line.strip() == "":
                continue
            # Split the line by the first "=" sign
            key, value = line.split("=", 1)
            # Remove whitespace and quotes
            key = key.strip()
            value = value.strip().strip("\"'")
            # Add the key-value pair to the dictionary
            env_vars[key] = value
    return env_vars
def readReq(text, corpus_id, secret):
    if(secret != secretKey):
        return {'ErrorCode': 404, 'Response' : "Invalid secret key"}
    vars = read_env_file(".env")
    client = vectara(vars["VECTARA_CUSTOMER_ID"], vars["VECTARA_CLIENT_ID"], vars["VECTARA_CLIENT_SECRET"])
    response= client.query(corpus_id,text, top_k=6)
    return response
def replace(corpus_id, secret):
    if(secret != secretKey):
        return {'ErrorCode': 404, 'Response' : "Invalid secret key"}
    vars = read_env_file(".env")
    client = vectara(vars["VECTARA_CUSTOMER_ID"], vars["VECTARA_CLIENT_ID"], vars["VECTARA_CLIENT_SECRET"])
    client.reset_corpus(corpus_id)
    client.upload(corpus_id, 'temp.txt', description= "Knowledge base")
def store(text,secret):
    if(secret != secretKey):
        return {'ErrorCode': 404, 'Response' : "Invalid secret key"}
    f = open("temp.txt", "a")
    f.write(text)
    f.close()
@app.get("/")
async def home():
    return "What are you doing here"
@app.post("/readReq")
async def request_api(request: Request, response: Response):
    data = await request.json()
    text = data.get("text")
    secret = data.get("secret")
    corpus_id = data.get("corpus_id")
    result = readReq(text, corpus_id, secret)
    result = jsonable_encoder({result['responseSet'][0]['summary'][0]["text"]: result['responseSet'][0]['response'][0]['text']})
    response.status_code = 200
    response.headers["Content-Type"] = "application/json"
    return result
@app.post("/replace")
async def replace_api(request: Request, response: Response):
    # Get the request data as JSON
    data = await request.json()
    # Get the corpus_id from the data
    corpus_id = data.get("corpus_id")
    secret = data.get("secret")
    # Call the replace function
    replace(corpus_id, secret)
    # Set the response status code and content type
    response.status_code = 200
    response.headers["Content-Type"] = "application/json"
    # Return a success message as JSON
    return {"message": "Corpus replaced successfully"}

# Create a path operation for the store function
@app.post("/store")
async def store_api(request: Request, response: Response):
    # Get the request data as JSON
    data = await request.json()
    # Get the text from the data
    text = data.get("text")
    secret = data.get("secret")
    # Call the store function
    store(text,secret)
    # Set the response status code and content type
    response.status_code = 200
    response.headers["Content-Type"] = "application/json"
    # Return a success message as JSON
    return {"message": "Text stored successfully"}
##sentence bert dimension is 384

# if __name__ == "__main__":
#     dic = request("How much water is in Africa?", 4)
#     print(dic['responseSet'][0]['summary'][0]["text"])
#     print("source:" + dic['responseSet'][0]['response'][0]['text'])
    ##corpus_id = 4