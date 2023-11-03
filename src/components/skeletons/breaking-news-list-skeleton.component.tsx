import React from 'react';
import ContentLoader from 'react-content-loader';

export const BreakingNewsListSkeleton = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    }}
  >
    <ContentLoader
      speed={1}
      height={200}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ width: '100%' }}
    >
      <circle cx="16" cy="20" r="16" />
      <rect
        x="40"
        y="11"
        rx="9"
        ry="9"
        style={{ width: 'calc(100% - 40px)' }}
        height="18"
      />
      <circle cx="16" cy="60" r="16" />
      <rect
        x="40"
        y="51"
        rx="9"
        ry="9"
        style={{ width: 'calc(100% - 40px)' }}
        height="18"
      />
      <circle cx="16" cy="100" r="16" />
      <rect
        x="40"
        y="91"
        rx="9"
        ry="9"
        style={{ width: 'calc(100% - 40px)' }}
        height="18"
      />
      <circle cx="16" cy="140" r="16" />
      <rect
        x="40"
        y="131"
        rx="9"
        ry="9"
        style={{ width: 'calc(100% - 40px)' }}
        height="18"
      />
      <circle cx="16" cy="180" r="16" />
      <rect
        x="40"
        y="171"
        rx="9"
        ry="9"
        style={{ width: 'calc(100% - 40px)' }}
        height="18"
      />
    </ContentLoader>
  </div>
);
