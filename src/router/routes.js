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
        path: '/department',
        name: '部门管理',
        meta: {
            icon: 'CreditCard',
            userRole: "admin"
        },
        component: () => import('@/views/department/index.vue'),
    },
    {
        path: '/teacher',
        name:'教师管理',
        meta: {
            icon: 'School',
              userRole: "admin"
        },
        component: () => import('@/views/teacher/index.vue'),
    },
    {
        path: '/contract',
        name: '合同管理',
        meta: {
            icon: 'Files',
        },
        component: () => import('@/views/contract/contract.vue'),
    },
    {
        path: '/user',
        name: '个人页',
        redirect: '/user/index',
        component: () => import('@/views/user/setting.vue'),
        meta: {
            icon: 'Postcard' ,
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
                },
                component: () => import('@/views/user/setting.vue'),
            }
        ]
    },
    {
        path: '/student',
        name: '学生管理',
        meta: {
            icon: 'User',
            userRole: ["student","admin","teacher"],
        },
        redirect: '/student/index',
        children: [
            {
                path: '/student/index',
                name: '学生列表',
                meta: {
                    userRole: ["admin","teacher"],
                },
                component: () => import('@/views/student/student.vue')
            },
            {
                path: '/student/resume',
                name: '简历管理',
                meta: {
                   
                },
                component: () => import('@/views/student/resume.vue'),
            }
        ]
    },
    {
        path: '/enterprise',
        name: '企业管理',
        meta: {
            icon: 'OfficeBuilding',
            userRole: ["enterprise","admin","teacher"],
        },
        redirect: '/enterprise/list',
        children: [
            {
                path: '/enterprise/list',
                name: '企业列表',
                meta: {
                    userRole: ["admin","teacher"],
                },
                component: () => import('@/views/enterprise/enterprise.vue')
            },
            {
                path: '/enterprise/certification',
                name: '资质管理', 
                component: () => import('@/views/enterprise/certification.vue'),
            }
        ]
    },
    {
        path: '/audit/log',
        name: '审核记录',
        meta: {
            icon: 'Tickets',
            userRole: ["admin","teacher"],
        },
        component: () => import('@/views/auditLog/index.vue'),
    }, 
    {
        path: '/sign/info',
        name: '签约信息',
        meta: {
            icon: 'CreditCard',
            userRole: ["admin","teacher","student"],
        },
        component: () => import('@/views/signInfo/index.vue'),
    },
    {path: '/404', name: '404', meta: {hideInLayout: true}, component: () => import('@/views/404.vue')},
    {path: '/', redirect: '/user/index'},
]
