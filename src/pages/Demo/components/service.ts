import { request } from '@umijs/max';

const url: string = API_URL_PREFIX + '/backend/demo/category';

export async function queryTree(params = {}) {
  return request(url, {
    params,
  });
}
