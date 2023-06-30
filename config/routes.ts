export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    access: 'canAdmin',
    icon: 'SettingOutlined',
    routes: [
      {
        path: '/settings/account',
        name: 'account',
        component: './Settings/Account',
      },
      {
        path: '/settings/staff',
        name: 'staff',
        component: './Settings/Staff',
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    component: './Demo',
  },
  {
    path: '/form',
    name: 'form',
    component: './Form',
  },
  {
    path: '/demo-dragger',
    name: 'demo-dragger',
    component: './DemoDragger',
  },
  {
    path: '/welcome',
    component: './Welcome',
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
