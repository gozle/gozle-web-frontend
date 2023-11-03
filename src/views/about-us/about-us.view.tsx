import React, { useContext } from 'react';

import { AboutUsMainContent, BlogPostList } from '@/components/about-us';
import { LogoSettingsBlock } from '@/page-blocks';
import { BlogPost } from 'lib/types';
import { AppThemeContext } from 'pages/_app';

import styles from './about-us.module.scss';

interface P {
  blogPosts: BlogPost[];
  className?: string;
  getLink: (id: number | string) => string;
}

const AboutUsView = ({ blogPosts, className = '', getLink }: P) => {
  const theme = useContext(AppThemeContext);
  return (
    <section
      className={styles.about_us_page + ' ' + className}
      style={{ backgroundColor: theme?.palette.background.pageBlock }}
    >
      <LogoSettingsBlock className={styles.logo_language_switch} />
      <main className={styles.media_content}>
        <AboutUsMainContent />
        <div className={styles.blog_post_container}>
          <BlogPostList
            className={styles.blog_post}
            blogPosts={blogPosts}
            getLink={getLink}
          />
        </div>
      </main>
    </section>
  );
};

export default AboutUsView;
