import {createRouter, createWebHashHistory} from 'vue-router'

import DefaultComponent1 from './components/week-10/Main.vue'
import DefaultComponent2 from './components/componentDemo/Home.vue'
import DefaultComponent1Content from './components/week-10/index.vue'
import DefaultComponent2Content from './admin/Index.vue'
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // {path: '/lost-items',component: ()=>import("./components/week-10/ShowLost.vue")},
        // {path: '/found-items',component: ()=>import("./components/week-10/ShowFound.vue")},
        // {path: '/',component: ()=>import("./components/week-10/Main.vue")},
        // {path: '/user',component: ()=>import("./components/week-09/Users.vue")},
        // {path: '/',component: ()=>import("./components/componentDemo/Ec01.vue")},
        {path: '/1',component: ()=>import("./components/userManagement/AddUsers.vue")},
        {path: '/2',component: ()=>import("./components/userManagement/ModifyUserInformation.vue")},
        {path: '/3',component: ()=>import("./components/userManagement/DeleteUser.vue")},
        {path: '/4',component: ()=>import("./components/userManagement/ViewUser.vue")},
        // {path: '/l5',component: ()=>import("./components/week-09/Found.vue")},
        // {path: '/l6',component: ()=>import("./components/week-09/Lost.vue")},
        {path: '/card/:id',component: ()=>import("./components/week-10/CardDetails.vue")},

        {
            path:'/',
            name:'Login',
            component:()=>import('./components/week-09/Login1.vue')
        },
        {
            path:'/home',
            name:'home',
            redirect:'/home/itemHome',
            component:()=>import('./components/week-10/index.vue'),
            meta: {requiresAuth: true},
            children:[
                {
                    path:'itemHome',
                    name:'Home',
                    component:()=>import('./components/week-10/Main.vue')
                },
                {
                    path:'lost',
                    component:()=>import('./components/week-10/ShowLost.vue')
                },
                {
                    path:'found',
                    component:()=>import('./components/week-10/ShowFound.vue')
                },
                {
                    path:'person',
                    component:()=>import('./components/week-10/PerInfor.vue')
                }
            ]
        },
        {
            path:'/register',
            name:'Register',
            component:()=>import('./components/week-09/Register.vue')
        },
        {
            path:'/admin',
            name:'Admin',
            // redirect:'/admin/aa',
            component:()=>import('./admin/Index.vue'),
            children:[
                // {
                //     path: '/aa',
                //     component:()=>import('./components/componentDemo/Home.vue')
                // },
                {
                    path: '/user',
                    component: ()=>import("./components/week-09/Users.vue")
                },
                {
                    path: '/l5',
                    component: ()=>import("./components/week-09/Found.vue")
                },
                {
                    path: '/l6',
                    component: ()=>import("./components/week-09/Lost.vue")
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('loginData');
    console.log(isAuthenticated)
    if (to.meta.requiresAuth && !isAuthenticated) {
        // 路由需要登录但用户未认证，重定向到登录页面
        ElMessage.error('请先登录！！！');
        next({name: 'Login'});
    } else {
        next();
    }
});
export default router;
