import React, { useEffect, useState } from 'react';
import ProductCarousel from "../components/product/ProductCarousel";
import ServiceCards from "../components/service/ServiceCards";
import apiProductService from "./../../api/apiProductService";
import categoryService from "./../../api/categoryService";
import LoadingProductSkeleton from "../components/loading/LoadingProductSkeleton";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [categoryProducts, setCategoryProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCategoriesAndProducts = async () => {
            try {
                // Gọi API lấy danh sách các category cần hiển thị
                const categoriesResponse = await categoryService.getListsGuest({
                    page: 1,
                    page_size: 3 // Giả sử bạn muốn lấy 3 category đầu tiên
                });
                const categories = categoriesResponse.data.data;

                // Tạo object chứa sản phẩm cho từng category
                const productsByCategory = {};

                // Dùng Promise.all để thực hiện đồng thời các API call cho mỗi category
                await Promise.all(
                    categories.map(async (category) => {
                        const productsResponse = await apiProductService.getLists({
                            page: 1,
                            page_size: 10,
                            category_id: category.id
                        });
                        productsByCategory[category.name] = productsResponse.data.data;
                    })
                );

                setCategoryProducts(productsByCategory);
            } catch (error) {
                console.error("Error fetching categories or products:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCategoriesAndProducts().then(r => {});
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <LoadingProductSkeleton />
                    <LoadingProductSkeleton />
                    <LoadingProductSkeleton />
                    <LoadingProductSkeleton />
                    <LoadingProductSkeleton />
                    <LoadingProductSkeleton />
                </>
            ) : (
                <>
                    {Object.keys(categoryProducts).map((categoryName, idx) => (
                        <ProductCarousel
                            key={idx}
                            title={categoryName}
                            showTitle={true}
                            products={categoryProducts[categoryName]}
                        />
                    ))}
                </>
            )}
        </>
    );
};

export default Home;
