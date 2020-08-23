import logging
import random
import json
import azure.functions as func
from .call_ml import call_ml_service


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    id = req_body["id"]
    answers = req_body["answers"]

    random_id = random.randint(10000, 20000)

    result_ml = call_ml_service(id, answers)
    return_json = {
        "matched_id": id,
        "result":result_ml 
    }

    if id:
        return func.HttpResponse(json.dumps(return_json))
    else:
        return func.HttpResponse(
             "Error occurred",
             status_code=400
        )
