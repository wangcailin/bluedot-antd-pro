import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'CMS',
  pwa: true,
  logo: 'https://lookstar-landing.oss-cn-beijing.aliyuncs.com/uploads/tenant/landing/202202/rc-upload-1645671333028-2.png',
  iconfontUrl: '',
};

export default Settings;
