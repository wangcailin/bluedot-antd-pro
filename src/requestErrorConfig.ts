import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';
import { codeMessage, errcode } from './utils/errcode';
import { history } from '@umijs/max';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errcode?: number;
  errmsg?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, errcode, errmsg, showType } = res as unknown as ResponseStructure;
      console.log(res);

      if (!success) {
        const error: any = new Error(errmsg);
        error.name = 'BizError';
        error.info = { errcode, errmsg, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any) => {
      const { response }: any = error;

      if (error.errcode) {
        let errcodeValue = errcode[error.errcode];

        if (typeof errcodeValue === 'object') {
          if (errcodeValue.hideNotification) {
            throw error;
          } else {
            errcodeValue = errcodeValue.message;
          }
        }

        if (errcodeValue) {
          notification.error({
            message: errcodeValue,
          });
        } else if (typeof error.errmsg === 'object') {
          const keys = Object.keys(error.errmsg);
          notification.error({
            message: error.errmsg[keys[0]],
          });
        } else {
          notification.error({
            message: error.errmsg || '网络异常',
          });
        }
        throw error;
      }

      if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status } = response;

        notification.error({
          message: `请求错误 ${status}`,
          description: errorText,
        });
        if (status === 401) {
          history.push('/user/login');
        }
      }

      if (!response) {
        notification.error({
          description: '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
      }

      throw error;
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
        };
      }
      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理

      if (response?.data?.errcode) {
        throw response?.data || response;
      }
      return response;
    },
  ],
};
