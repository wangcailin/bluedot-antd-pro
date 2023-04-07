import { history, useModel, Link } from 'umi';
import ProLayout from '@ant-design/pro-layout';
import defaultSettings from '../../config/defaultSettings';
import handleRoutesName from '@/utils/handleRoutesName';
// import { UserOutlined } from '@ant-design/icons';
import { SettingDrawer } from '@ant-design/pro-components';
import { AvatarDropdown, AvatarName } from '@/components/RightContent/AvatarDropdown';

import Footer from '@/components/Footer';
import NoPermission from '@/pages/403';
const loginPath = '/user/login';
export default (props: any) => {
  const { children } = props;
  const { initialState, setInitialState } = useModel('@@initialState');

  const appConfig = {
    actionsRender: () => [],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <NoPermission />,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };

  const routes = handleRoutesName('menu.settings', props?.route?.routes);

  return (
    <ProLayout
      {...props}
      {...appConfig}
      {...defaultSettings}
      onMenuHeaderClick={() => history.push('/')}
      route={{ routes }}
      menuItemRender={(menuItemProps, defaultDom: any) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      location={{ pathname: history.location.pathname }}
    >
      {children}
    </ProLayout>
  );
};
