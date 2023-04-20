import functools
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response


days = 30
days_in_minutes = 60 * 24 * days
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

def cache(minutes: int = 60) -> callable:
    """
    Caches responses.
    :param minutes: int, default=60
    :return: callable
    """
    def decorator(function: callable) -> callable:
        @functools.wraps(function)
        def wrapper(*args, **kwargs) -> callable:
            """
            Decorator wrapper.
            :param args: list
            :param kwargs: dict
            :return: function
            """
            response = args[0]
            response.headers['Cache-Control'] = f"public, max-age={minutes * 60}"
            return function(*args, **kwargs)
        return wrapper
    return decorator


@cache(days_in_minutes)
@app.get("/")
def root(response: Response) -> list:
    """
    Home page for API routes.
    :param response: Response
    :return: str
    """
    data = [
        f"Stack: /{version}/{project}/stack",
        f"Queue: /{version}/{project}/queue",
        f"Linked List: /{version}/{project}/linkedlist",
    ]
    return data


# GET /v1/dsa/stack
@cache(days_in_minutes)
@app.get(f"/{version}/{project}/stack")
def get_stack(response: Response) -> list[dict]:
    """
    Returns the Stack data.
    :param response: Response
    :return: list[dict]
    """
    with open(f"{DATA_DIRECTORY}/stack.json", "r") as file:
        return json.load(file)


# GET /v1/dsa/queue
@cache(days_in_minutes)
@app.get(f"/{version}/{project}/queue")
def get_queue(response: Response) -> list[dict]:
    """
    Returns the queue data.
    :param response: Response
    :return: list[dict]
    """
    with open(f"{DATA_DIRECTORY}/queue.json", "r") as file:
        return json.load(file)


# GET /v1/dsa/linkedlist
@cache(days_in_minutes)
@app.get(f"/{version}/{project}/linkedlist")
def get_queue(response: Response) -> list[dict]:
    """
    Returns the linked list data.
    :param response: Response
    :return: list[dict]
    """
    with open(f"{DATA_DIRECTORY}/linkedlist.json", "r") as file:
        return json.load(file)
