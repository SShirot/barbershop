import React, {useEffect,useState} from 'react';
import ProductCarousel from "../components/product/ProductCarousel";
import ServiceCards from "../components/service/ServiceCards";
import apiProductService from "./../../api/apiProductService";
import LoadingProductSkeleton from "../components/loading/LoadingProductSkeleton";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [PetsProducts, setPetsProducts] = useState([]);
    const [pateProducts, setPateProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            const products = await apiProductService.getLists({
                page: 1,
                page_size: 10
            });
            console.info("===========[] ===========[products] : ",products);
            // Giả sử bạn muốn lọc sản phẩm theo một tiêu chí nhất định
            const getPetProduct = products?.data?.products?.filter(product => product.category.name === 'Thức ăn hạt');
            const getPateProducts = products?.data?.products?.filter(product => product.category.name === 'Pate');
            setPetsProducts(getPetProduct);
            setPateProducts(getPateProducts);
            setTimeout(function () {
                setLoading(false);
            },2000)
        };

        loadProducts().then(r => {});
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
                    <ProductCarousel title={'Boss ăn nhanh'} showTitle={true} products={PetsProducts} />
                    <ProductCarousel title={'Pate'} showTitle={true} products={pateProducts} />
                </>
            )}

            {/*<ProductCarousel title={'Boss thời thượng'} showTitle={true}/>*/}
            <ServiceCards />
        </>
    );
};

export default Home;
