import os
from dotenv import load_dotenv
import psycopg2 as postgres
from psycopg2 import connection


class Database:
    """Defines the Postgres Database implementation"""

    _instance: 'Database' = None

    def __init__(self) -> None:
        """
        Constructor for the Database class.
        """
        load_dotenv()
        self._conn: connection = self.connection()
        self._cur: postgres.cursor = self._conn.cursor()
        self._resources = {"cur": self._cur, "conn": self._conn}

    def __str__(self) -> str:
        """
        Returns a string representation of the Database class to display.
        :return: str
        """
        pass

    def __repr__(self) -> str:
        """
        Returns a string representation of the Database class to debug.
        :return: str
        """
        pass

    def __del__(self) -> None:
        """
        Destructor for the Database class.
        """
        self.close("cur")
        self.close("conn")

    def __enter__(self) -> 'Database':
        """
        Context manager method to handle opening of the database resources.
        """
        return self

    def __exit__(self, exc_type: Exception, exc_value: Exception, traceback: Exception) -> None:
        """
        Context manager method to handle closing of the database resources.
        :param exc_type: Exception
        :param exc_value: Exception
        :param traceback: Exception
        """
        self.commit()

    @classmethod
    def instance(cls) -> 'Database':
        """
        Singleton pattern method to return the database instance.
        """
        if not cls._instance:
            cls._instance = cls()
        return cls._instance

    @staticmethod
    def connection() -> connection:
        """
        Creates a connection to the database.
        :return: None
        """
        database: str = os.getenv("DATABASE")
        user: str = os.getenv("USER")
        password: str = os.getenv("PASSWORD")
        host: str = os.getenv("HOST")
        port: str = os.getenv("PORT")
        return postgres.connect(
            database=database,
            user=user,
            password=password,
            host=host,
            port=port,
        )

    def cursor(self) -> postgres.cursor:
        """
        Creates a cursor to the database.
        :return: None
        """
        return self._conn.cursor()

    def commit(self) -> None:
        """
        Commits the changes to the database.
        :return: None
        """
        self._conn.commit()

    def close(self, resource: str) -> None:
        """
        Closes the specified resource of the database.
        :param resource: str
        :return: None
        """
        if resource in self._resources:
            self._resources[resource].close()

    @staticmethod
    def guard(query: str) -> None:
        """
        Guards the query from being executed.
        :param query: str
        :return: None
        """
        if len(query) < 5: raise ValueError("Invalid Query.")

    def create_table(self, query: str) -> None:
        """
        Creates a table in the database.
        :param query: str
        :return: None
        """
        self.guard(query)
        with self._conn:
            self._cur.execute(query)
        self.commit()

    def insert_data(self, query: str, data: tuple) -> None:
        """
        Inserts data into the database.
        :param query: str
        :param data: tuple
        :return: None
        """
        self.guard(query)
        with self._conn:
            self._cur.execute(query, data)
        self.commit()

    def select_data(self, query: str) -> list[tuple]:
        """
        Selects data from the database.
        :param query: str
        :return: list[tuple]
        """
        self.guard(query)
        with self._conn:
            self._cur.execute(query)
        return self._cur.fetchall()

    def update_data(self, query: str, data: tuple) -> None:
        """
        Updates data in the database.
        :param query: str
        :param data: tuple
        :return: None
        """
        self.guard(query)
        with self._conn:
            self._cur.execute(query, data)
        self.commit()

    def delete_data(self, query: str, data: tuple) -> None:
        """
        Deletes data from the database.
        :param query: str
        :param data: tuple
        :return: None
        """
        self.guard(query)
        with self._conn:
            self._cur.execute(query, data)
        self.commit()
