import { ADMIN_BASE_URL } from 'lib/constants';
import { objectToQueryStringSerializer } from 'lib/serializers';
import type { BlogPost } from 'lib/types';
import type {
  GetBlogPostListRequest,
  GetBlogPostListResponse,
  GetBlogPostOneRequest,
  GetBlogPostOneResponse,
} from './blog-post.type';

export const getBlogPostList = (() => {
  const cachedList: { [languageId: number]: [BlogPost[], number] } = {};

  return async (params: GetBlogPostListRequest): Promise<BlogPost[]> => {
    if (
      params.languageId &&
      params.languageId in cachedList &&
      cachedList[params.languageId][1] + 86400000 > +new Date()
    )
      return cachedList[params.languageId][0];

    const res = await fetch(
      `${ADMIN_BASE_URL}/blog-post/list?${objectToQueryStringSerializer(
        params,
      )}`,
    );

    const json: GetBlogPostListResponse = await res.json();
    const result =
      json && json.data
        ? json.data.map((el) => ({
            id: el.id,
            image: el.image || '',
            title: el.title || '',
            text: el.text || '',
            createdDate: el.createdDate || 0,
          }))
        : [];

    if (params.languageId)
      cachedList[params.languageId] = [result, +new Date()];

    return result;
  };
})();

export const getBlogPostOne = async ({
  id,
  languageId,
}: GetBlogPostOneRequest) => {
  const res = await fetch(
    `${ADMIN_BASE_URL}/blog-post/${id}?languageId=${languageId}`,
  );

  const json: GetBlogPostOneResponse = await res.json();
  return json;
};
