<template>
<div>
    <div id="app">
        <!-- <h1>My app!</h1> -->
        <vue-snotify></vue-snotify>
    </div>
        <v-container grid-list-md mb-0>
            <h1 class="text-center">MENU DATA MASTER</h1>
            <h2 class="text-center">Pengelolaan Semua Data Administrasi Kouvee Pet Shop</h2>
            <br>
        <v-card class="pa-md-4 mx-lg-auto brown lighten-4">
           <v-card-title>Data Kouvee Pet Shop</v-card-title>
           <v-row>
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Produk</v-list-item-title>
                        <v-list-item-subtitle>Kelola data produk</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="brown">
                        <v-icon large dark>mdi-paw</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="produk">Kelola</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Layanan</v-list-item-title>
                        <v-list-item-subtitle>Kelola data layanan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="orange">
                        <v-icon large dark>mdi-needle</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="layanan">Kelola</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Supplier</v-list-item-title>
                        <v-list-item-subtitle>Kelola data supplier</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="red lighten-2">
                        <v-icon large dark>mdi-human-greeting</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="supplier">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
           </v-row>
           <br>
           <v-row>
               <v-card
                    class="mx-auto"
                    max-width="314"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Pegawai</v-list-item-title>
                        <v-list-item-subtitle>Kelola data pegawai</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="green">
                        <v-icon large dark>mdi-human-male-female</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="pegawai">Kelola</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="mx-auto"
                    max-width="324"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Jenis Hewan</v-list-item-title>
                        <v-list-item-subtitle>Kelola data jenis hewan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="blue">
                        <v-icon large dark>mdi-cow</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="jenisHewan">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card
                    class="mx-auto"
                    max-width="324"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Ukuran Hewan</v-list-item-title>
                        <v-list-item-subtitle>Kelola data ukuran hewan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="purple lighten-2">
                        <v-icon large dark>mdi-ruler</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="ukuranHewan">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
           </v-row>
            <br>
           <v-row>
               <v-col>
               <v-card
                    class="mx-auto"
                    max-width="324"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Customer</v-list-item-title>
                        <v-list-item-subtitle>Kelola data customer</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="#BC8F8F">
                        <v-icon large dark>mdi-account-star</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="datacustomer">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
               </v-col>
               <v-col>
                <v-card
                    class="mx-auto"
                    max-width="324"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Hewan</v-list-item-title>
                        <v-list-item-subtitle>Kelola data hewan Kouvee Pet Shop</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="#4682B4">
                        <v-icon large dark>mdi-cat</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="datahewan">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
               </v-col>
               <v-col>
               </v-col>
           </v-row>
        </v-card>
        <br>
        <v-card class="pa-md-4 mx-lg-auto brown lighten-3">
            <div>
           <v-card-title>Data Pengadaan Produk Kouvee Pet Shop</v-card-title>
            </div>
           <v-row>
               <v-col>
               <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Kelola Pengadaan</v-list-item-title>
                        <v-list-item-subtitle>Tambah dan ubah pengadaan produk ke supplier</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="blue-grey lighten-1">
                        <v-icon large dark>mdi-note-plus-outline</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn>Kelola</v-btn>
                    </v-card-actions>
                </v-card>
               </v-col>
               <v-col>
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">History Pengadaan</v-list-item-title>
                        <v-list-item-subtitle>History Pengadaan Produk</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="lime darken-2">
                        <v-icon large dark>mdi-note-multiple-outline</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn >Kelola</v-btn>
                    </v-card-actions>
                </v-card>
               </v-col>
               <v-col>
               </v-col>
           </v-row>
        </v-card>
        
        <br>
        <v-card class="pa-md-4 mx-lg-auto brown lighten-2">
           <v-card-title>Laporan Data Kouvee Pet Shop</v-card-title>
           <v-row>
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Produk Terlaris</v-list-item-title>
                        <v-list-item-subtitle>Laporan pembelian terbanyak untuk produk tertentu</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="brown">
                        <v-icon large dark>mdi-cube-outline</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn >Kelola</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Layanan Terlaris</v-list-item-title>
                        <v-list-item-subtitle>Laporan pemesanan layanan yang terbanyak</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="orange">
                        <v-icon large dark>mdi-star</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn>Kelola</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Pendapatan Tahunan</v-list-item-title>
                        <v-list-item-subtitle>Laporan akumulasi total pendapatan perbulan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="red lighten-2">
                        <v-icon large dark>mdi-decimal-increase</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn>Kelola</v-btn>
                    </v-card-actions>
                </v-card>
           </v-row>
           <br>
           <v-row>
               <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Pendapatan Bulanan</v-list-item-title>
                        <v-list-item-subtitle>Laporan administrasi data dalam satu bulan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="green">
                        <v-icon large dark>mdi-decimal-increase</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn>Kelola</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Pengadaan Bulanan</v-list-item-title>
                        <v-list-item-subtitle>Laporan pengadaan per bulan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="blue">
                        <v-icon large dark>mdi-cube-send</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn>Kelola</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Pengadaan Tahunan</v-list-item-title>
                        <v-list-item-subtitle>Laporan pengadaan per tahun</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="purple lighten-2">
                        <v-icon large dark>mdi-cube-send</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn>Kelola</v-btn>
                    </v-card-actions>
                </v-card>
           </v-row>
        </v-card>
            
            
        </v-container>
    <!-- </v-card> -->
</div>
</template>
<script>
import Snotify from 'vue-snotify';
  export default {
    data () {
      return {
          show1: false,
          show2: false,
          show3: false,
          produk: [],
      }
    },
    methods:{
        getDataStok(){
            var uri = this.$apiUrl + '/produk/stokHabis'
            this.$http.get(uri).then( (response) =>{
                this.produk=response.data
                console.log(this.produk.length)
                if(this.produk.length>"0"){
                this.$snotify.confirm('Beberapa Stok produk Habis', 'Cek Sekarang!', {
                timeout: 10000,
                showProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                buttons: [
                    {text: 'Cek Produk', action: (toast) => {console.log('Clicked: Later'); this.$router.push({ name: "daftarStokHabis" });} },
                    {text: 'Close', action: (toast) => {console.log('Clicked: No'); this.$snotify.remove(toast.id); }, bold: true},
                ]
                });
            }
            })
        },
    },
    mounted(){
    this.getDataStok();
    if (localStorage.getItem("token") != null) {
        if(localStorage.getItem("peran")=="Kasir"){
              window.location.replace('/homeKasir')
        }else if(localStorage.getItem("peran")=="Customer Service"){
              window.location.replace('/homeCS')
        }else if(localStorage.getItem("peran")=="Owner"){
              next()
        }
    }
    else{
      window.location.replace('/home')
    }
    }
  }
</script>