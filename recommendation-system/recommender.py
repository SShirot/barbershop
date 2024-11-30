import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split

class RecommenderSystem:
    def __init__(self):
        self.model = SVD()

    def train(self, reviews):
        # Chuyển đổi dữ liệu đánh giá thành DataFrame
        df = pd.DataFrame(reviews)
        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(df[['user_id', 'product_id', 'rating']], reader)

        # Chia dữ liệu train/test và huấn luyện mô hình
        trainset, testset = train_test_split(data, test_size=0.2)
        self.model.fit(trainset)

    def get_recommendations(self, user_id, products, num_recommendations=5):
        recommendations = []
        for product_id in products:
            pred = self.model.predict(user_id, product_id)
            recommendations.append((product_id, pred.est))

        # Sắp xếp theo rating dự đoán
        recommendations = sorted(recommendations, key=lambda x: x[1], reverse=True)
        return recommendations[:num_recommendations]
