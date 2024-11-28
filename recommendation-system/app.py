from flask import Flask, jsonify, request
from models import fetch_reviews, fetch_all_products
from recommender import RecommenderSystem

app = Flask(__name__)

# Khởi tạo hệ thống gợi ý
recommender = RecommenderSystem()

@app.route('/train', methods=['POST'])
def train_model():
    reviews = fetch_reviews()
    recommender.train(reviews)
    return jsonify({"message": "Model trained successfully!"})

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.args.get('user_id', type=int)
    all_products = fetch_all_products()
    print("product: ", all_products)
    product_ids = [product['id'] for product in all_products]
    recommendations = recommender.get_recommendations(user_id, product_ids)
    recommended_products = [
        {
            "product_id": rec[0],
            "predicted_rating": rec[1],
            "product_details": next((p for p in all_products if p['id'] == rec[0]), {})
        }
        for rec in recommendations
    ]

    return jsonify(recommended_products)

if __name__ == '__main__':
    app.run(debug=True)
