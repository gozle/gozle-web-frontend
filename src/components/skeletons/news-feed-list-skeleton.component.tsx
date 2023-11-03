import React from 'react';
import ContentLoader from 'react-content-loader';

export const NewsFeedListSkeleton = () => (
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
      height={128}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ width: '100%' }}
    >
      <circle cx="64" cy="53" r="16" />
      <rect x="19" y="76" rx="7" ry="7" width="90" height="14" />
      <circle cx="192" cy="53" r="16" />
      <rect x="147" y="76" rx="7" ry="7" width="90" height="14" />
      <circle cx="320" cy="53" r="16" />
      <rect x="275" y="76" rx="7" ry="7" width="90" height="14" />
    </ContentLoader>
  </div>
);
