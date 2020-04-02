import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import('../components/dashboard/dashboard.vue')
const UserDashboardLayout = () => import('../components/dashboard/userDashboard.vue')
const CSDashboardLayout = () => import('../components/dashboard/dashboardCS.vue')
const KasirDashboardLayout = () => import('../components/dashboard/dashboardKasir.vue')
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

function transaksiContent(view){
    return () => import(`../components/transaksi/${view}.vue`)
}

const routes = [
    {
        name: 'landingPage',
        path: '/',
        component : LandingLayout
    },
    {
        path: '/user',
        component: UserDashboardLayout,
        children: [
            {
                name: 'listProduk',
                path: '/listProduk',
                component : userContent('listProduk')
            },
            {
                name: 'home',
                path: '/home',
                component : loadContent('Home')
            },
            {
                name: 'listLayanan',
                path: '/listLayanan',
                component : userContent('listLayanan')
            },
            {
                name: 'loginPage',
                path: '/login',
                component : loadContent('loginPage')
            }
        ]
    },
    {
        path: '/customer_service',
        component: CSDashboardLayout,
        children: [
            {
                name: 'homeCS',
                path: '/homeCS',
                component : loadContent('HomeCS')
            },
            {
                name: 'transaksiProduk',
                path: '/transaksiProduk',
                component : transaksiContent('transaksiProduk')
            },
            {
                name: 'historyProduk',
                path: '/historyProduk',
                component : transaksiContent('historyProduk')
            },
            {
                name: 'customerController',
                path: '/customer',
                component : loadView('customerController')
            },
            {
                name: 'hewanController',
                path: '/hewan',
                component : loadView('hewanController')
            },
            {
                name: 'profileCS',
                path: '/profileCS',
                component : loadContent('profileCS')
            },
        ]
    },
    {
        path: '/kasir',
        component: KasirDashboardLayout,
        children: [
            {
                name: 'homeKasir',
                path: '/homeKasir',
                component : loadContent('HomeKasir')
            },
            {
                name: 'profileKasir',
                path: '/profileKasir',
                component : loadContent('profileKasir')
            },
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
                name: 'homeMaster',
                path: '/homeMaster',
                component : loadContent('HomeMaster')
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
            },
            {
                name: 'profileMaster',
                path: '/profileMaster',
                component : loadContent('profileMaster')
            },
        ]
    },
]
Vue.use(Router)

const router = new Router({mode: 'history', routes : routes})

export default router