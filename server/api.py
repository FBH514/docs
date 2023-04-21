import ast
import functools
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from database import Database

days = 30
days_in_minutes = 60 * 24 * days
max_age = days * (24 * (60 ** 2))
project = "dsa"
version = "v1"

load_dotenv()
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


def conversion(data: list[tuple]) -> list[dict]:
    """
    Converts fetched item from database to Python formats.
    :param data: list[tuple]
    :return: list[dict]
    """
    return [{'id': item[0],
             'title': item[1],
             'params': ast.literal_eval(item[2]),
             'returns': item[3],
             'overview': item[4],
             'description': ast.literal_eval(item[5])} for item in data]


# GET /v1/dsa/stack
@cache(days_in_minutes)
@app.get(f"/{version}/{project}/stack")
def get_stack(response: Response) -> list[dict]:
    """
    Returns the Stack data.
    :param response: Response
    :return: list[dict]
    """
    with Database() as db:
        stack = db.select_data(
            os.getenv("STACK")
        )
    return conversion(stack)


# GET /v1/dsa/queue
@cache(days_in_minutes)
@app.get(f"/{version}/{project}/queue")
def get_queue(response: Response) -> list[dict]:
    """
    Returns the queue data.
    :param response: Response
    :return: list[dict]
    """
    with Database() as db:
        queue = db.select_data(
            os.getenv("QUEUE")
        )
    return conversion(queue)


# GET /v1/dsa/linkedlist
@cache(days_in_minutes)
@app.get(f"/{version}/{project}/linkedlist")
def get_queue(response: Response) -> list[dict]:
    """
    Returns the linked list data.
    :param response: Response
    :return: list[dict]
    """
    with Database() as db:
        linked_list = db.select_data(
            os.getenv("LINKED_LIST")
        )
    return conversion(linked_list)


# GET /v1/dsa/home
@cache(days_in_minutes)
@app.get(f"/{version}/{project}/home")
def get_home(response: Response) -> list[dict]:
    """
    Returns Home Page content.
    :param response: Response
    :return: list[dict]
    """
    with Database() as db:
        home = db.select_data(
            os.getenv("HOME_PAGE")
        )

    def conversion(data: list[tuple]) -> list[dict]:
        return [
            {"title": item[1], "description": ast.literal_eval(item[2])}
            for item in data
        ]

    return conversion(home)
