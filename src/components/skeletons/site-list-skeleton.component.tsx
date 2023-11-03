import React from 'react';
import ContentLoader from 'react-content-loader';

export const SiteListSkeleton = () => (
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
      height={120}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ width: '100%' }}
    >
      <circle cx="16" cy="20" r="16" />
      <rect
        x="40"
        y="3"
        rx="9"
        ry="9"
        height="18"
        style={{ width: 'calc(60% - 40px)' }}
      />
      <rect
        x="40"
        y="24"
        rx="6"
        ry="6"
        height="12"
        style={{ width: 'calc(90% - 40px)' }}
      />
      <circle cx="16" cy="60" r="16" />
      <rect
        x="40"
        y="43"
        rx="9"
        ry="9"
        height="18"
        style={{ width: 'calc(60% - 40px)' }}
      />
      <rect
        x="40"
        y="64"
        rx="6"
        ry="6"
        height="12"
        style={{ width: 'calc(90% - 40px)' }}
      />
      <circle cx="16" cy="100" r="16" />
      <rect
        x="40"
        y="83"
        rx="9"
        ry="9"
        height="18"
        style={{ width: 'calc(60% - 40px)' }}
      />
      <rect
        x="40"
        y="104"
        rx="6"
        ry="6"
        height="12"
        style={{ width: 'calc(90% - 40px)' }}
      />
    </ContentLoader>
  </div>
);
