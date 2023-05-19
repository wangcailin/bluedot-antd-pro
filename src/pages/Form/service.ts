import { request } from '@umijs/max';

const url: string = API_URL_PREFIX + '/backend/demo/form';

export async function updateRule(id: number, options?: any) {
  return request(`${url}/${id}`, {
    method: 'PUT',
    data: options || {},
  });
}

export async function getRule(id: number) {
  return request(`${url}/${id}`);
}
