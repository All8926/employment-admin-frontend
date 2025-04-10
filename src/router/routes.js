export const routes = [
    {
        path: '/register',
        name: '注册',
        meta: {
            hideInLayout: true,
        },
        component: () => import('@/views/register.vue')
    },

    {
        path: '/login',
        name: '登录',
        meta: {
            hideInLayout: true,
            icon: 'User',
        },
        component: () => import('@/views/login.vue')
    },
    {
        path: '/user',
        name: '个人页',
        redirect: '/user/index',
        component: () => import('@/views/user/setting.vue'),
        meta: {
            icon: 'User' ,
        },
        children: [
            {
                path: '/user/index',
                name: '个人中心',
                component: () => import('@/views/user/index.vue')
            },
            {
                path: '/user/setting',
                name: '个人设置',
                meta: {
                    icon: "Setting",
                },
                component: () => import('@/views/user/setting.vue'),
            }
        ]
    },
    {
        path: '/student',
        name: '学生管理',
        redirect: '/student/index',
        children: [
            {
                path: '/student/index',
                name: '学生列表',
                component: () => import('@/views/student/list.vue')
            },
            {
                path: '/student/resume',
                name: '简历管理',
                meta: {
                    userRole: "student",
                },
                component: () => import('@/views/student/resume.vue'),
            }
        ]
    },
    {
        path: '/statistics',
        name: '数据统计',
        component: () => import('@/views/statistics/index.vue'),
    },
    {path: '/404', name: '404', meta: {hideInLayout: true}, component: () => import('@/views/404.vue')},
    {path: '/', redirect: '/user/index'},
]
