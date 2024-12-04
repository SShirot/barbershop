import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductSkeleton = () => (
    <ContentLoader
        speed={2}
        width={'100%'}
        height={400}
        viewBox="0 0 300 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="4" ry="4" width="100%" height="200" />  {/* Image */}
        <rect x="0" y="210" rx="4" ry="4" width="80%" height="20" />  {/* Title */}
        <rect x="0" y="240" rx="4" ry="4" width="60%" height="20" />  {/* Price */}
        <rect x="0" y="280" rx="4" ry="4" width="50%" height="20" />  {/* Status */}
    </ContentLoader>
);

export default ProductSkeleton;
