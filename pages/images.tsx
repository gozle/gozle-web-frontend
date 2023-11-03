import { Backdrop, CircularProgress, Theme } from '@mui/material';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, {
  ReactElement,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import Swiper from 'swiper';

import { ImagePicker } from '@/components/image/image-picker/image-picker.component';
import {
  WithFooterLayout,
  WithNavigationLayout,
  WithModalLayout,
} from '@/layouts';
import { extractQueryPage } from 'lib/helpers';
import { useAppSelector, usePaginatedData, useQueryPage } from 'lib/hooks';
import { wrapper } from 'lib/store';
import { imageApi, useImageSearchQuery } from 'services/image';
import {
  reverseImageApi,
  useReverseImageSearchMutation,
} from 'services/reverse-image';

import { NextPageWithLayout } from './_app';

const ImageSearchDesktopView = dynamic(
  () => import('@/views/image/search/desktop/image-search-desktop.view'),
  { suspense: true },
);
const ImageSearchMobileView = dynamic(
  () => import('@/views/image/search/mobile/image-search-mobile.view'),
  { suspense: true },
);

const ReverseImageSearchDesktopView = dynamic(
  () =>
    import(
      '@/views/image/reverse-search/desktop/reverse-image-search-desktop.view'
    ),
  { suspense: true },
);
const ReverseImageSearchMobileView = dynamic(
  () =>
    import(
      '@/views/image/reverse-search/mobile/reverse-image-search-mobile.view'
    ),
  { suspense: true },
);

type SSP = SSRConfig;

export const getServerSideProps: GetServerSideProps<SSP> =
  wrapper.getServerSideProps<SSP>((store) => async (ctx) => {
    const { query, page } = extractQueryPage(ctx.query);

    if (query) {
      store.dispatch(imageApi.endpoints.imageSearch.initiate({ query, page }));
      await Promise.all(store.dispatch(imageApi.util.getRunningQueriesThunk()));
    }

    return { props: await serverSideTranslations(ctx.locale as string) };
  });

const ImageSearch: NextPageWithLayout<SSP> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  // Direct Image Search

  const mobile = useAppSelector((state) => state.settings.mobile);

  const router = useRouter();
  const { query, page } = useQueryPage(router);

  const { data, isFetching } = useImageSearchQuery(
    { query, page },
    { skip: !query },
  );

  const {
    reducedData: reducedImages,
    minPage,
    maxPage,
  } = usePaginatedData(data, query);

  const handleImgClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const page = event.currentTarget.getAttribute('data-page');
    const id = event.currentTarget.getAttribute('data-id');
    if (page && id)
      router.push(
        { pathname: router.pathname, query: { q: router.query.q, page, id } },
        undefined,
        { scroll: false, shallow: true },
      );
  };

  const handleCloseModal = () =>
    router.push(
      {
        pathname: router.pathname,
        query: { q: router.query.q, page: router.query.page },
      },
      undefined,
      { scroll: false, shallow: true },
    );

  const handleActiveIndexChange = (swiper: Swiper) => {
    const img = reducedImages[swiper.activeIndex];
    if (img && router.query.id !== img.id)
      router.replace(
        {
          pathname: router.pathname,
          query: {
            q: router.query.q,
            page: img.page,
            id: img.id,
          },
        },
        undefined,
        { scroll: false, shallow: true },
      );
  };

  const openedIndex = useMemo(() => {
    const id =
      'id' in router.query && typeof router.query['id'] === 'string'
        ? router.query['id']
        : '';
    if (id) return reducedImages.findIndex((img) => img.id === id);
    else return -1;
  }, [router, reducedImages]);

  // Reverse Image Search

  const [image, setImage] = useState<File | undefined>(undefined);
  const [url, setUrl] = useState<string>('');

  const { t } = useTranslation('image');
  const dispatch = useDispatch();

  const [reverseSearch, { data: reverseData, isLoading }] =
    useReverseImageSearchMutation();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);

  const handleUrlSearch = () => {
    setImage(undefined);
    reverseSearch({ url, page, size: 10 });
  };

  const handlePick = (image: File) => {
    setUrl('');
    setImage(image);
    reverseSearch({ image, page, size: 10 });
  };

  const handleReverseImgClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const id = event.currentTarget.getAttribute('data-id');
    if (id)
      router.push(
        { pathname: router.pathname, query: { reverse: 1, id } },
        undefined,
        { scroll: false, shallow: true },
      );
  };

  const handleCloseReverseModal = () =>
    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { scroll: false, shallow: true },
    );

  const handleActiveReverseIndexChange = (swiper: Swiper) => {
    if (reverseData) {
      const img = reverseData.data[swiper.activeIndex];
      if (img && router.query.id !== img.id)
        router.replace(
          {
            pathname: router.pathname,
            query: { reverse: 1, id: img.id },
          },
          undefined,
          { scroll: false, shallow: true },
        );
    }
  };

  const openedReverseIndex = useMemo(() => {
    const id =
      'id' in router.query && typeof router.query['id'] === 'string'
        ? router.query['id']
        : '';
    if (id && reverseData)
      return reverseData.data.findIndex((img) => img.id === id);
    else return -1;
  }, [router, reverseData]);

  // Effects

  useEffect(() => {
    if (query) {
      setImage(undefined);
      setUrl('');
      dispatch(reverseImageApi.util.resetApiState());
    }
  }, [query, dispatch]);

  return (
    <>
      <Head>
        <title>{t('images_page_title')}</title>
      </Head>
      <WithNavigationLayout
        extraButtons={
          <ImagePicker
            image={image}
            url={url}
            onUrlChange={handleUrlChange}
            onUrlSearch={handleUrlSearch}
            onPick={handlePick}
          />
        }
        hideLanguage
        href="/images"
      >
        <section className="page">
          <Suspense>
            {reverseData ? (
              <Suspense>
                {mobile ? (
                  <ReverseImageSearchMobileView
                    image={image}
                    url={reverseData.url}
                    data={reverseData.data}
                    openedIndex={openedReverseIndex}
                    handleImgClick={handleReverseImgClick}
                    handleCloseModal={handleCloseReverseModal}
                    handleActiveIndexChange={handleActiveReverseIndexChange}
                  />
                ) : (
                  <ReverseImageSearchDesktopView
                    image={image}
                    url={reverseData.url}
                    data={reverseData.data}
                    openedIndex={openedReverseIndex}
                    handleImgClick={handleReverseImgClick}
                    handleCloseModal={handleCloseReverseModal}
                    handleActiveIndexChange={handleActiveReverseIndexChange}
                  />
                )}
              </Suspense>
            ) : (
              <Suspense>
                {mobile ? (
                  <ImageSearchMobileView
                    minPage={minPage}
                    maxPage={maxPage}
                    reducedImages={reducedImages}
                    data={data}
                    isFetching={isFetching}
                    openedIndex={openedIndex}
                    handleImgClick={handleImgClick}
                    handleCloseModal={handleCloseModal}
                    handleActiveIndexChange={handleActiveIndexChange}
                  />
                ) : (
                  <ImageSearchDesktopView
                    minPage={minPage}
                    maxPage={maxPage}
                    reducedImages={reducedImages}
                    data={data}
                    isFetching={isFetching}
                    openedIndex={openedIndex}
                    handleImgClick={handleImgClick}
                    handleCloseModal={handleCloseModal}
                    handleActiveIndexChange={handleActiveIndexChange}
                  />
                )}
              </Suspense>
            )}
          </Suspense>
          <Backdrop
            sx={{
              color: '#fff',
              zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
            }}
            open={isFetching || isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </section>
      </WithNavigationLayout>
    </>
  );
};

ImageSearch.getLayout = (page: ReactElement) => (
  <WithFooterLayout>
    <WithModalLayout>{page}</WithModalLayout>
  </WithFooterLayout>
);

export default ImageSearch;
