import React, { useEffect, useState } from "react";
import apiProductService from "../../../api/apiProductService";
import categoryService from "../../../api/categoryService";
import { Card, Col, Container, Nav, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { createSlug } from "../../../helpers/formatters";

const ProductCarousel = React.lazy(() =>
  import("../../components/product/ProductCarousel")
);
const LoadingProductSkeleton = React.lazy(() =>
  import("../../components/loading/LoadingProductSkeleton")
);

const CategoryLoader = () => {
  // Hiển thị hiệu ứng shimmer khi loading
  return (
    <Row className="gy-3">
      {[...Array(6)].map((_, index) => (
        <Col key={index} xs={6} sm={4} md={3} lg={2}>
          <ContentLoader
            speed={2}
            width={120}
            height={150}
            viewBox="0 0 120 150"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="60" cy="40" r="30" />
            <rect x="20" y="80" rx="5" ry="5" width="80" height="15" />
            <rect x="35" y="105" rx="5" ry="5" width="50" height="10" />
          </ContentLoader>
        </Col>
      ))}
    </Row>
  );
};

const Home = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);

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

    useEffect(() => {
        const fetchCategoryHome = async () => {
            setLoadingCategory(true);
            try {
                const categoriesResponse = await categoryService.getListsGuest({
                    page: 1,
                    page_size: 5,
                });
                setCategories(categoriesResponse.data.data);
            } catch (error) {
                console.error("Error fetching categories or products:", error);
            } finally {
                setTimeout(() => setLoadingCategory(false), 1000);
            }
        }
        fetchCategoryHome();
    },[]);

  return (
    <>
        <Container>
            <div className={'carousel-title'}>
                <h6 className="text-start my-4">Danh mục</h6>
            </div>
            {loadingCategory ? (
                <CategoryLoader /> // Hiển thị shimmer loader khi loading
            ) : (
                <Row className="gy-3">
                    {categories.map((category, index) => (
                        <Col key={index} xs={6} sm={4} md={3} lg={2}>
                            <Card className="text-center home-categories">
                                <Card.Body>
                                    <img
                                        src={ category.avatar ? category.avatar : '/images/default-category.png'}
                                        alt={category.name}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <Nav.Link as={Link} to={`/c/${createSlug(category.name)}`} className="fw-bold text-dark">{category.name}</Nav.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
        {loading
        ? Array.from({ length: 6 }).map((_, idx) => (
            <LoadingProductSkeleton key={idx} />
          ))
        : Object.keys(categoryProducts).map((categoryName, idx) => (
            <ProductCarousel
              key={idx}
              title={categoryName}
              showTitle={true}
              products={categoryProducts[categoryName]}
            />
        ))}
    </>
  );
};

export default Home;
