<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        class="brown darken-3"
        dark
        app
        clipped
        fixed
        temporary
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Kouvee Pet Shop
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Welcome to our shop
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
                <v-list-item link to ="homeMaster">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-group
                >
                <template v-slot:activator>
                    <v-list-item-icon>
                            <v-icon>mdi-database-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Data master</v-list-item-title>
                </template>
                        <v-list-item link to ="produk">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Produk</v-list-item-title>
                            <v-icon>mdi-paw</v-icon>
                        </v-list-item>

                        <v-list-item link to ="layanan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Layanan</v-list-item-title>
                            <v-icon>mdi-needle</v-icon>
                        </v-list-item>

                        <v-list-item link to ="supplier">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Supplier</v-list-item-title>
                            <v-icon>mdi-human-greeting</v-icon>
                        </v-list-item>

                        <v-list-item link to ="pegawai">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Pegawai</v-list-item-title>
                            <v-icon>mdi-human-male-female</v-icon>
                        </v-list-item>

                        <v-list-item link to ="datacustomer">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Customer</v-list-item-title>
                            <v-icon>mdi-account-star</v-icon>
                        </v-list-item>

                        <v-list-item link to ="datahewan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Hewan</v-list-item-title>
                            <v-icon>mdi-cat</v-icon>
                        </v-list-item>

                        <v-list-item link to ="jenisHewan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Jenis Hewan</v-list-item-title>
                            <v-icon>mdi-cow</v-icon>
                        </v-list-item>

                        <v-list-item link to ="ukuranHewan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Ukuran Hewan</v-list-item-title>
                            <v-icon>mdi-ruler</v-icon>
                        </v-list-item>
                </v-list-group>

                 <v-list-group
                >
                <template v-slot:activator>
                    <v-list-item-icon>
                            <v-icon>mdi-cart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Pengadaan</v-list-item-title>
                </template>
                <v-list-item link to ="/daftarStokHabis">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>List Stok Habis</v-list-item-title>
                    <v-icon>mdi-alert</v-icon>
                </v-list-item>
                <v-list-item link to ="/addPengadaan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Tambah Pengadaan</v-list-item-title>
                    <v-icon>mdi-arrow-right-bold-box-outline</v-icon>
                </v-list-item>
                <v-list-item link to ="/historyPengadaan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>History Pengadaan</v-list-item-title>
                    <v-icon>mdi-note-multiple-outline</v-icon>
                </v-list-item>
                 </v-list-group>

                <v-list-item link to ="laporanLayout">
                    <v-list-item-icon>
                        <v-icon>mdi-file-chart</v-icon>
                    </v-list-item-icon>
                <v-list-item-title>Laporan Data</v-list-item-title>
                </v-list-item>
                 
                 <!-- <v-list-group>
                <template v-slot:activator>
                    <v-list-item-icon>
                            <v-icon>mdi-cart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Laporan Data</v-list-item-title>
                </template>
                <v-list-item link to ="/produkTerlaris">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Produk terlaris</v-list-item-title>
                    <v-icon small>mdi-cube-outline</v-icon>
                </v-list-item>
                <v-list-item link to ="/layananTerlaris">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Layanan Terlaris</v-list-item-title>
                    <v-icon small>mdi-star</v-icon>
                </v-list-item>
                <v-list-item link to ="/pendapatanTahunan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Pendapatan Tahunan</v-list-item-title>
                    <v-icon small>mdi-decimal-increase</v-icon>
                </v-list-item>
                <v-list-item link to ="/pendapatanBulanan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Pendapatan Bulanan</v-list-item-title>
                    <v-icon small>mdi-decimal-increase</v-icon>
                </v-list-item>
                <v-list-item link to ="/pengadaanTahunan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Pengadaan Tahunan</v-list-item-title>
                    <v-icon small>mdi-cube-send</v-icon>
                </v-list-item>
                <v-list-item link to ="/pengadaanBulanan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Pengadaan Bulanan</v-list-item-title>
                    <v-icon small>mdi-cube-send</v-icon>
                </v-list-item>
                 </v-list-group> -->
                 
            </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block color="green darken-3" link to="/profileMaster">Profile Account</v-btn>
            </div>
            <div class="pa-2">
                <v-btn block @click="logout()">Logout</v-btn>
            </div>
        </template>
        </v-navigation-drawer>

        <v-app-bar
            dark
            app
            fixed
            clipped-left
            height="70px"
            color="brown darken-2">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <VSpacer />

            <v-toolbar-title
                style="font-size: 21px;"
                class="white--text ml-2"
            >
                Kouvee Pet Shop
            </v-toolbar-title>
        </v-app-bar>

        <VContent>
            <router-view />
        </VContent>
    </div>      
</template>

<script>
export default {
    data(){
        return{
            drawer: null,
            items: [
                {title: 'Produk', icon: 'mdi-cart'},
                {title: 'Layanan', icon: 'mdi-barcode'}
            ],
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings'],
            ],

        }
    },
    methods: {
        logout(){
            localStorage.clear();
            this.$router.push({ name: "home" });
        }
    }
}
</script>
