import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingProductSkeleton = () => {
    return (
        <ContentLoader
            speed={2}
            width={200}
            height={320}
            viewBox="0 0 200 320"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            style={{ marginRight: '10px', marginBottom: '10px',marginTop: '20px' }} // Thêm style trực tiếp
        >
            <rect x="0" y="0" rx="5" ry="5" width="200" height="200" />
            <rect x="0" y="210" rx="4" ry="4" width="200" height="20" />
            <rect x="0" y="240" rx="3" ry="3" width="150" height="20" />
            <rect x="0" y="280" rx="3" ry="3" width="100" height="30" />
        </ContentLoader>
    );
};

export default LoadingProductSkeleton;
