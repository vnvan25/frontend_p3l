import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import('../components/dashboard/dashboard.vue')
const UserDashboardLayout = () => import('../components/dashboard/userDashboard.vue')
const CSDashboardLayout = () => import('../components/dashboard/dashboardCS.vue')
const KasirDashboardLayout = () => import('../components/dashboard/dashboardKasir.vue')
const LandingLayout = () => import('../components/landingPage.vue')
const HistoryLayout = () => import('../components/pengadaan/historyLayout.vue')
const DataMasterLog = () => import('../components/history/datamaster.vue')
const DataTransaksiLog = () => import('../components/history/transaksilog.vue')
const LaporanLayout = () => import('../components/laporan/laporanLayout.vue')
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
    return () => {
        return import(`../components/transaksi/${view}.vue`)
    }
}

function pengadaanContent(view){
    return () => {
        return import(`../components/pengadaan/${view}.vue`)
    }
}

function laporanContent(view){
    return () => {
        return import(`../components/laporan/${view}.vue`)
    }
}

function logContent(view){
    return () => {
        return import(`../components/history/${view}.vue`)
    }
}

const routes = [
    {
        name: 'landingPage',
        path: '/',
        component : LandingLayout
    },
    {
        name: 'newDashboard',
        path: '/new',
        component : loadContent('newDashboard')
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
            },
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
                name: 'daftartransaksiProduk',
                path: '/daftarTransaksiProduk',
                component : transaksiContent('daftarTransaksiProduk')
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
            {
                name: 'listBatalProduk',
                path: '/listBatalProduk',
                component : transaksiContent('listBatalProduk')
            },
            {
                name: 'daftarLayanan',
                path: '/daftarLayanan',
                component : transaksiContent('daftarLayanan')
            },
            {
                name: 'historyLayanan',
                path: '/historyLayanan',
                component : transaksiContent('historyLayanan')
            },
            {
                name: 'listBatalLayanan',
                path: '/listBatalLayanan',
                component : transaksiContent('listBatalLayanan')
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
            {
                name: 'pembayaranProduk',
                path: '/pembayaranProduk',
                component : transaksiContent('pembayaranProduk')
            },
            {
                name: 'selesaiPage',
                path: '/selesaiPage',
                component : transaksiContent('selesaiPage')
            },
            {
                name: 'cetakNotaLayanan',
                path: '/cetakNotaLayanan',
                component : transaksiContent('cetakNotaLayanan')
            },
            {
                name: 'pembayaranLayanan',
                path: '/pembayaranLayanan',
                component : transaksiContent('pembayaranLayanan')
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
                name: 'customerMaster',
                path: '/datacustomer',
                component : loadView('customerMaster')
            },
            {
                name: 'hewanMaster',
                path: '/datahewan',
                component : loadView('hewanMaster')
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
            {
                name: 'daftarStokHabis',
                path: '/daftarStokHabis',
                component : pengadaanContent('tampilProduk')
            },
            {
                name: 'addPengadaan',
                path: '/addPengadaan',
                component : pengadaanContent('tambahPengadaan')
            },
            {
                path : '/dataMasterLog',
                component : DataMasterLog,
                children: [
                    {
                        name: 'customerLog',
                        path: '/customerLog',
                        component : logContent('customer')
                    },
                    {
                        name: 'hewanLog',
                        path: '/hewanLog',
                        component : logContent('hewan')
                    },
                    {
                        name: 'produkLog',
                        path: '/produkLog',
                        component : logContent('produk')
                    },
                    {
                        name: 'layananLog',
                        path: '/layananLog',
                        component : logContent('layanan')
                    },
                    {
                        name: 'pegawaiLog',
                        path: '/pegawaiLog',
                        component : logContent('pegawai')
                    },
                    {
                        name: 'supplierLog',
                        path: '/supplierLog',
                        component : logContent('supplier')
                    },
                    {
                        name: 'ukuranLog',
                        path: '/ukuranLog',
                        component : logContent('ukuran_hewan')
                    },
                    {
                        name: 'jenisLog',
                        path: '/jenisLog',
                        component : logContent('jenis_hewan')
                    },
                ]
            },
            {
                path : '/transaksiLog',
                component : DataTransaksiLog,
                children: [
                    {
                        name: 'tpLog',
                        path: '/tpLog',
                        component : logContent('transaksi_produk')
                    },
                    {
                        name: 'tlLog',
                        path: '/tlLog',
                        component : logContent('transaksi_layanan')
                    },
                    {
                        name: 'pengadaanLog',
                        path: '/pengadaanLog',
                        component : logContent('pengadaan')
                    },
                ]
             },
            {
                path : '/logAktifitas',
                component : HistoryLayout,
                children: [
                    {
                        name: 'historyPengadaan',
                        path: '/historyPengadaan',
                        component : pengadaanContent('historyPengadaan')
                    },
                    {
                        name: 'batalPengadaan',
                        path: '/batalPengadaan',
                        component : pengadaanContent('batalPengadaan')
                    },
                    {
                        name: 'pesananPengadaan',
                        path: '/pesananPengadaan',
                        component : pengadaanContent('pesananPengadaan')
                    },
                    {
                        name: 'selesaiPengadaan',
                        path: '/selesaiPengadaan',
                        component : pengadaanContent('selesaiPengadaan')
                    },
                ]
            },
            {
                path : '/laporanLayout',
                component : LaporanLayout,
                children: [
                    {
                        name: 'pendapatanTahunan',
                        path: '/pendapatanTahunan',
                        component : laporanContent('pendapatanTahunan')
                    },
                    {
                        name: 'produkTerlaris',
                        path: '/produkTerlaris',
                        component : laporanContent('produkTerlaris')
                    },
                    {
                        name: 'layananTerlaris',
                        path: '/layananTerlaris',
                        component : laporanContent('layananTerlaris')
                    },
                    {
                        name: 'pengadaanTahunan',
                        path: '/pengadaanTahunan',
                        component : laporanContent('pengadaanTahunan')
                    },
                    {
                        name: 'pengadaanBulanan',
                        path: '/pengadaanBulanan',
                        component : laporanContent('pengadaanBulanan')
                    },
                    {
                        name: 'pendapatanBulanan',
                        path: '/pendapatanBulanan',
                        component : laporanContent('pendapatanBulanan')
                    },
                ]
            },
        ]
    },
]

Vue.use(Router)

const router = new Router({mode: 'history', routes : routes})

export default router