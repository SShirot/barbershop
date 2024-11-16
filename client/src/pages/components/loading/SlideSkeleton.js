// SlideSkeleton.js
import React from 'react';
import ContentLoader from 'react-content-loader';

const SlideSkeleton = () => (
    <ContentLoader
        speed={2}
        width="100%"
        height="400px"  // Chiều cao slide, điều chỉnh theo nhu cầu
        backgroundColor="#f0f0f0"
        foregroundColor="#e0e0e0"
    >
        {/* Placeholder cho hình ảnh */}
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />

            {/* Placeholder cho tiêu đề */}
            <rect x="30" y="300" rx="4" ry="4" width="70%" height="24" />

            {/* Placeholder cho mô tả */}
            <rect x="30" y="340" rx="3" ry="3" width="50%" height="18" />
            <rect x="30" y="370" rx="3" ry="3" width="60%" height="18" />
    </ContentLoader>
);

export default SlideSkeleton;
