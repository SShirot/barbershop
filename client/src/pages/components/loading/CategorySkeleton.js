import React from 'react';
import ContentLoader from 'react-content-loader';

const CategorySkeleton = () => (
    <ContentLoader
        speed={2}
        width={200}
        height={400}
        viewBox="0 0 200 400"
        backgroundColor="#f0f0f0"
        foregroundColor="#dedede"
    >
        {/* Thanh tiêu đề lớn */}
        <rect x="0" y="10" rx="8" ry="8" width="150" height="20" />

        {/* Các thanh loading nhỏ hơn, không đồng đều */}
        <rect x="0" y="60" rx="6" ry="6" width="120" height="16" />
        <rect x="0" y="100" rx="6" ry="6" width="140" height="16" />
        <rect x="0" y="140" rx="6" ry="6" width="130" height="16" />
        <rect x="0" y="180" rx="6" ry="6" width="110" height="16" />
        <rect x="0" y="220" rx="6" ry="6" width="150" height="16" />
        <rect x="0" y="260" rx="6" ry="6" width="90" height="16" />
        <rect x="0" y="300" rx="6" ry="6" width="140" height="16" />
    </ContentLoader>
);

export default CategorySkeleton;
