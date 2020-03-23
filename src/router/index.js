import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import('../components/dashboard/dashboard.vue')
const UserDashboardLayout = () => import('../components/dashboard/userDashboard.vue')
const LandingLayout = () => import('../components/landingPage.vue')
function loadView(view){
    return () => import(`../components/content/${view}.vue`)
}

function loadContent(view){
    return () => import(`../components/${view}.vue`)
}

function userContent(view){
    return () => import(`../components/userContent/${view}.vue`)
}

const routes = [
    {
        name: 'landingPage',
        path: '',
        component : LandingLayout
    },
    {
        path: '/',
        component: UserDashboardLayout,
        children: [
            {
                name: 'listProduk',
                path: '/listProduk',
                component : userContent('listProduk')
            },
            {
                name: 'homeController',
                path: '/home',
                component : loadContent('Home')
            },
            {
                name: 'listLayanan',
                path: '/listLayanan',
                component : userContent('listLayanan')
            }
        ]
    },
    {
        path : '/admin',
        component : DashboardLayout,
        children: [
            {
                name: 'produkController',
                path: '/produk',
                component : loadView('produkController')
            },
            {
                name: 'homeController',
                path: '/home',
                component : loadContent('Home')
            },
            {
                name: 'layananController',
                path: '/layanan',
                component : loadView('layananController')
            },
            {
                name: 'supplierController',
                path: '/supplier',
                component : loadView('supplierController')
            },
            {
                name: 'pegawaiController',
                path: '/pegawai',
                component : loadView('pegawaiController')
            },
            {
                name: 'jenisHewanController',
                path: '/jenisHewan',
                component : loadView('jenisHewanController')
            },
            {
                name: 'ukuranHewanController',
                path: '/ukuranHewan',
                component : loadView('ukuranHewanController')
            }
        ]
    },
]
Vue.use(Router)

const router = new Router({mode: 'history', routes : routes})

export default router