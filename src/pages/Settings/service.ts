import { request } from 'umi';

const url = API_URL_PREFIX + '/backend/auth';

export async function bindMailRule(params: any) {
  return request(`${url}/bind-mail`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function unbindMailRule(params: any) {
  return request(`${url}/unbind-mail`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getCaptchaRule(params?: any): Promise<any> {
  return request(`${url}/captcha`, {
    params,
  });
}

export async function getUnbindMailRule(params?: any): Promise<any> {
  return request(`${url}/unbind-mail`, {
    params,
  });
}

export async function getUnbindSmsRule(params?: any): Promise<any> {
  return request(`${url}/unbind-sms`, {
    params,
  });
}

export async function bindSmsRule(params: any) {
  return request(`${url}/bind-sms`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function unbindSmsRule(params: any) {
  return request(`${url}/unbind-sms`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function passwordResetRule(params: any) {
  return request(`${url}/password-reset`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updatePersonalRule(params: any) {
  return request(`${url}/personal`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
