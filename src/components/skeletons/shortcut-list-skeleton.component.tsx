import React from 'react';
import ContentLoader from 'react-content-loader';

export const ShortcutListSkeleton = () => (
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
      height={108}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ width: '100%' }}
    >
      <circle cx="29.25" cy="29.25" r="20.25" />
      <rect x="9" y="55" rx="7" ry="7" width="90" height="14" />
      <rect x="9" y="73" rx="6" ry="6" width="90" height="12" />
      <rect x="9" y="87" rx="6" ry="6" width="90" height="12" />
      <circle cx="145.25" cy="29.25" r="20.25" />
      <rect x="125" y="55" rx="7" ry="7" width="90" height="14" />
      <rect x="125" y="73" rx="6" ry="6" width="90" height="12" />
      <rect x="125" y="87" rx="6" ry="6" width="90" height="12" />
    </ContentLoader>
  </div>
);
