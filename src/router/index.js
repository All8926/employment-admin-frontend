import {createRouter, createWebHistory} from 'vue-router'
import {getCurrentUser} from '@/api/index.js'
import {useUserStore} from "@/stores/modules/user.js";
import {routes} from "./routes.js";

const router = createRouter({
    history: createWebHistory(),
    routes: flattenRoutes(routes),
})

// 递归处理路由
function flattenRoutes(routes) {
    const flattenedRoutes = [];

    routes.forEach(route => {
        // 处理嵌套路由
        if (route.children && route.children.length > 0) {
            // 将子路由加入到一级路由
            route.children.forEach(childRoute => {
                // 克隆子路由，避免修改原始数据
                const clonedChildRoute = { ...childRoute, path: childRoute.path };
                flattenedRoutes.push(clonedChildRoute);
            });
        }
        // 将当前路由加入到一级路由
        flattenedRoutes.push({ ...route, children: undefined });
    });

    return flattenedRoutes;
}

// 白名单路由
const WHITE_PATH_LIST = ['/login', '/register'];

// 获取当前用户信息
const currentUser = async () => {
    try {
        const res = await getCurrentUser();
        const userStore = useUserStore()
        userStore.userinfo = res.data;
        console.log(userStore.userinfo, 'userinfo');
        return res.data;
    } catch (error) {
        return null;
    }
}

    router.beforeEach(async (to, from, next) => {
        // 白名单路由不需要登录
        console.log('beforeEach---to', to);
        if (WHITE_PATH_LIST.includes(to.path)) {
            return next();
        }

        // 校验登录态，如果没有登录，跳转到登录页
        const userinfo = await currentUser();
        console.log(userinfo, 'userinfo');
        if (!userinfo) {
            return next({path: "/login"});
        }

        // 校验用户角色权限
        const userRole = userinfo.userRole;
        const toRouteRole = to.meta.userRole;
        if (toRouteRole) {
            if (Array.isArray(toRouteRole) && !toRouteRole.includes(userRole)) {

                return next({path: '/404'});
            } else {
                next();
            }
            if (toRouteRole && toRouteRole !== userRole) {
                return next({path: '/404'});

            } else {
                next();
            }
        } else {
            next();
        }


    })

    export default router
