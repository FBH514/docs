import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response


days = 30
max_age = days * (24 * (60 ** 2))
project = "dsa"
version = "v1"
DATA_DIRECTORY = "assets/data"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_headers=["*"],
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_credentials=True,
)

def set_headers(response: Response) -> None:
    """
    Sets response headers.
    :param response: Response
    :return: None
    """
    response.headers['Cache-Control'] = f"public, max-age={max_age}"


@app.get("/")
def root(response: Response) -> list:
    """
    Home page for API routes.
    :param response: Response
    :return: str
    """
    set_headers(response)
    data = [
        f"Stack: /{version}/{project}/stack",
        f"Queue: /{version}/{project}/queue",
        f"Linked List: /{version}/{project}/linkedlist",
    ]
    return data


# GET /v1/dsa/stack
@app.get(f"/{version}/{project}/stack")
def get_stack(response: Response) -> list[dict]:
    """
    Returns the Stack data.
    :param response: Response
    :return: list[dict]
    """
    set_headers(response)
    with open(f"{DATA_DIRECTORY}/stack.json", "r") as file:
        return json.load(file)


# GET /v1/dsa/queue
@app.get(f"/{version}/{project}/queue")
def get_queue(response: Response) -> list[dict]:
    """
    Returns the queue data.
    :param response: Response
    :return: list[dict]
    """
    set_headers(response)
    with open(f"{DATA_DIRECTORY}/queue.json", "r") as file:
        return json.load(file)


# GET /v1/dsa/linkedlist
@app.get(f"/{version}/{project}/linkedlist")
def get_queue(response: Response) -> list[dict]:
    """
    Returns the linked list data.
    :param response: Response
    :return: list[dict]
    """
    set_headers(response)
    with open(f"{DATA_DIRECTORY}/linkedlist.json", "r") as file:
        return json.load(file)
