import urllib.request
import json

def call_ml_service(id, answers):
    data = {
        "Inputs": {
            "input2":
            [
                {
                    'userid1': str(id),
                    'userid2': "",
                    "rating": "0"   
                }
            ],
            "input1":
            [
                {
                    'id': str(id),   
                    'Q1': str(answers[0]),   
                    'Q2': str(answers[1]),   
                    'Q3': str(answers[2]),   
                    'Q4': str(answers[3]),   
                    'Q5': str(answers[4]),   
                    'Q6': str(answers[5]),   
                    'Q7': str(answers[6]),   
                    'Q8': str(answers[7]),   
                    'Q9': str(answers[8]),   
                    'Q10': str(answers[9]),   
                }
            ],
        },
        "GlobalParameters":  {
        }
    }

    body = str.encode(json.dumps(data))
    url = 'https://ussouthcentral.services.azureml.net/workspaces/9309588b62d346c989029d7d6bef5f7f/services/648683e4d44f4f868bde7492363a8b46/execute?api-version=2.0&format=swagger'
    # Replace this with the API key for the web service
    api_key = 'C0UZkOR48sfBNWzAE+oMAPABEUKAr+Pn4q3IulYtke5BHuBr7cZamA6x0/5TEBZuTV8zKa/A7yKzpv5MUVjCWQ=='
    headers = {
        'Content-Type': 'application/json',
        'Authorization': (
            'Bearer ' +
            api_key)}
    req = urllib.request.Request(url, body, headers)

    try:
        response = urllib.request.urlopen(req)

        result = response.read()
        result = json.loads(result)
        print(result)
        return result["Results"]
    except urllib.error.HTTPError as error:
        print("The request failed with status code: " + str(error.code))

        # Print the headers - they include the requert ID and the timestamp, which
        # are useful for debugging the failure
        print(error.info())
        print(json.loads(error.read().decode("utf8", 'ignore')))