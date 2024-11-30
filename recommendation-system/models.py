from config import get_db_connection

def fetch_reviews():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    query = """
        SELECT user_id, product_id, rating
        FROM votes
        WHERE status = 'pending'
    """
    cursor.execute(query)
    reviews = cursor.fetchall()
    connection.close()
    return reviews


def fetch_all_products():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    query = """
        SELECT id, name, price, avatar
        FROM ec_products
        WHERE true
    """
    cursor.execute(query)
    products = cursor.fetchall()
    connection.close()
    return products