import azure.functions as func
import logging
import json

app = func.FunctionApp()

# @app.function_name(name="HttpTrigger1")
@app.route(route="GetData", auth_level=func.AuthLevel.ANONYMOUS)
def test_function(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    return func.HttpResponse(
        json.dumps([{"id": 1, "name": "hoge"}]),
        # "This HTTP triggered function executed successfully.",
        status_code=200
        )