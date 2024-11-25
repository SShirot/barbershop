import React, { useEffect, useState } from 'react';
import apiProductService from "./../../api/apiProductService";
import categoryService from "./../../api/categoryService";

const ProductCarousel = React.lazy(() => import('./../components/product/ProductCarousel'));
const LoadingProductSkeleton = React.lazy(() => import('./../components/loading/LoadingProductSkeleton'));

const Home = () => {
    const [categoryProducts, setCategoryProducts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadCategoriesAndProducts = async () => {
            setLoading(true);
            try {
                const categoriesResponse = await categoryService.getListsGuest({
                    page: 1,
                    page_size: 3,
                });
                if (!isMounted) return;

                const categories = categoriesResponse.data.data;
                const productsByCategory = {};

                await Promise.all(
                    categories.map(async (category) => {
                        const productsResponse = await apiProductService.getLists({
                            page: 1,
                            page_size: 10,
                            category_id: category.id,
                        });
                        if (!isMounted) return;
                        productsByCategory[category.name] = productsResponse.data.data;
                    })
                );

                if (isMounted) setCategoryProducts(productsByCategory);
            } catch (error) {
                console.error("Error fetching categories or products:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadCategoriesAndProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                    <LoadingProductSkeleton key={idx} />
                ))
            ) : (
                Object.keys(categoryProducts).map((categoryName, idx) => (
                    <ProductCarousel
                        key={idx}
                        title={categoryName}
                        showTitle={true}
                        products={categoryProducts[categoryName]}
                    />
                ))
            )}
        </>
    );
};

export default Home;
