import React, { useEffect } from 'react';

import { PageBlockWrapper } from '@/components/common';

import styles from './video-mobile-view-adv.module.scss';

export const VideoMobileViewAdv = React.memo(() => {
  useEffect(() => {
    // @ts-ignore
    window.adsbygoogle = window.adsbygoogle || [];
    // @ts-ignore
    window.adsbygoogle.push({});
  }, []);

  return (
    <PageBlockWrapper>
      <ins
        className={'adsbygoogle ' + styles.adv_mobile}
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3012178430375150"
        data-ad-slot="4077063924"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </PageBlockWrapper>
  );
});
VideoMobileViewAdv.displayName = 'VideoMobileViewAdv';
