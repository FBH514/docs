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
        f"Node: /{version}/{project}/node",
        f"Stack: /{version}/{project}/stack",
        f"Queue: /{version}/{project}/queue",
        f"Linked List: /{version}/{project}/linkedlist",
    ]
    return data


def function_props_conversion(data: list[tuple]) -> list[dict]:
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


@cache(days_in_minutes)
@app.get("/v1/dsa/{target}/functions")
def get_functions(response: Response, target: str) -> list[dict]:
    """
    Returns the target's functions.
    :param response: Response
    :param target: str
    :return: list[dict]
    """
    if target.casefold() not in ["node", "stack", "queue", "linkedlist"]:
        return []
    with Database() as db:
        functions = db.select_data(
            os.getenv("{}_FUNCTIONS".format(target.upper()))
        )
    return function_props_conversion(functions)


def info_props_conversion(data: list[tuple]) -> list[dict]:
    return [
        {"title": item[2], "description": ast.literal_eval(item[3])}
        for item in data
    ]

# GET /v1/dsa/{target}/info
@cache(days_in_minutes)
@app.get("/v1/dsa/{target}/info")
def get_info(response: Response, target: str) -> list[dict]:
    """
    Returns the target's info.
    :param response: Response
    :param target: str
    :return: list[dict]
    """
    if target.casefold() not in ["home", "node", "stack", "queue", "linkedlist"]:
        return []
    with Database() as db:
        info = db.select_data(
            os.getenv("{}_INFO".format(target.upper()))
        )

    return info_props_conversion(info)
