import psycopg2

def get_connection():
    try:
        connection = psycopg2.connect(
            host="localhost",
            database="learning_path",
            user="postgres",
            password="password",
            port="5432"
        )

        print("Connected to PostgreSQL successfully.")
        return connection

    except Exception as error:
        print("Database connection error:")
        print(error)
        return None