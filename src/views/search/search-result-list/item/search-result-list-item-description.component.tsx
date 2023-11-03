import { css } from '@emotion/react';
import { sanitize } from 'isomorphic-dompurify';
import React, { useContext } from 'react';

import { WebSearchData } from 'lib/types';

import { TranslationContext } from '../../translation.context';

import { SearchResultListItemImage } from './search-result-list-item-image.component';

interface P {
  data: WebSearchData;
}

const styles = css`
  margin-top: 0.5em;
  font-size: 1em;
  overflow: hidden;

  & > .image-container {
    float: right;

    display: flex;
    max-width: 40%;
    border-radius: 0.5em;
    margin: 0 0 0.5em 0.5em;
    overflow: hidden;
  }

  & > input {
    & ~ div.full-description {
      display: none;
    }

    &:checked {
      & ~ div.short-description {
        display: none;
      }
      & ~ div.full-description {
        display: block;
      }
    }
  }

  & > div {
    & > span.show-full-description,
    & > span.hide-full-description {
      cursor: pointer;
      font-weight: 700;
      margin-left: 0.5em;
      white-space: nowrap;
    }
  }

  @media (min-width: 769px) {
    & > .image-container {
      max-width: 30%;
      margin: 0 0 1em 1em;
    }
  }
`;

export const SearchResultListItemDescription = ({ data }: P) => {
  const sanitizedDescription = sanitize(data.description.trim(), {
    ALLOWED_TAGS: ['b', 'i'],
  });

  const translations = useContext(TranslationContext);

  return (
    <div className="search-result-list-item-description" css={styles}>
      {data.image && (
        <div className="image-container">
          <SearchResultListItemImage data={data} />
        </div>
      )}
      <input style={{ display: 'none' }} type="checkbox" />
      {sanitizedDescription.length > 150 ? (
        <>
          <div className="short-description">
            <span
              dangerouslySetInnerHTML={{
                __html:
                  sanitize(sanitizedDescription.slice(0, 150), {
                    ALLOWED_TAGS: ['b', 'i'],
                  }) + '...',
              }}
            />
            <span className="show-full-description">
              {translations['show_full_description'] || ''}
            </span>
          </div>
          <div className="full-description">
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription,
              }}
            />
            <span className="hide-full-description">
              {translations['hide_full_description'] || ''}
            </span>
          </div>
        </>
      ) : (
        sanitizedDescription
      )}
    </div>
  );
};
