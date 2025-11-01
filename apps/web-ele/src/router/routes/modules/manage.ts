import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      // title: $t('page.dashboard.title'),
      title: '管理',
    },
    name: 'Manage',
    path: '/manage',
    redirect: '/manage/user',
    children: [
      {
        name: 'User',
        path: 'user',
        component: () => import('#/views/manage/user/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          // title: $t('page.dashboard.analytics'),
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role',
        component: () => import('#/views/manage/role/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '角色管理',
        },
      },
      {
        name: 'Permission',
        path: 'permission',
        component: () => import('#/views/manage/permission/index.vue'),
        meta: {
          icon: 'carbon:locked',
          title: '权限管理',
        },
      },
      {
        name: 'Log',
        path: 'log',
        component: () => import('#/views/manage/log/index.vue'),
        meta: {
          icon: 'carbon:book',
          title: '日志管理',
        },
      },
    ],
  },
];

export default routes;
