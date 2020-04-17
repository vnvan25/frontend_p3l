<template>
<div>
    <!-- <v-card> -->
        <v-container grid-list-md mb-0>
            <h1 class="text-center">MENU DATA KELOLA TRANSAKSI KOUVEE PET SHOP</h1>
            <h2 class="text-center">Pengelolaan Semua Data Transaksi Kouvee Pet Shop</h2>
            <br>
        <v-card class="pa-md-4 mx-lg-auto amber lighten-5">
           <v-card-title>Kelola Data Pelanggan Kouvee Pet Shop</v-card-title>
           <v-row>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Customer</v-list-item-title>
                        <v-list-item-subtitle>Kelola data customer Kouvee Pet Shop</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="brown">
                        <v-icon large dark>mdi-paw</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="customer">Kelola</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Hewan Customer</v-list-item-title>
                        <v-list-item-subtitle>Kelola data hewan peliharaan pelanggan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="orange">
                        <v-icon large dark>mdi-needle</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn  link to ="hewan">Kelola</v-btn>
                    </v-card-actions>
                </v-card>

           </v-row>
        </v-card>
        <br>
        <v-card class="pa-md-4 mx-lg-auto amber lighten-4">
            <div>
           <v-card-title>Data Transaksi Produk Kouvee Pet Shop</v-card-title>
            </div>
           <v-row>
               <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Data Penjualan Produk</v-list-item-title>
                        <v-list-item-subtitle>Kelola data transaksi produk</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="blue-grey lighten-1">
                        <v-icon large dark>mdi-note-plus-outline</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn link to="transaksiProduk">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Daftar Transaksi</v-list-item-title>
                        <v-list-item-subtitle>Daftar Transaksi Produk</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="lime darken-2">
                        <v-icon large dark>mdi-note-multiple-outline</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn link to="historyProduk">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
           </v-row>
        </v-card>
        <br>
        <v-card class="pa-md-4 mx-lg-auto orange lighten-3">
            <div>
           <v-card-title>Data Transaksi Layanan Kouvee Pet Shop</v-card-title>
            </div>
           <v-row>
               <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Data Transaksi Layanan</v-list-item-title>
                        <v-list-item-subtitle>Kelola data registerasi pemesanan layanan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="blue-grey lighten-2">
                        <v-icon large dark>mdi-note-plus-outline</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn link to="daftarLayanan">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Daftar Transaksi</v-list-item-title>
                        <v-list-item-subtitle>Daftar Transaksi Layanan</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="lime darken-3">
                        <v-icon large dark>mdi-note-multiple-outline</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn link to="/">Kelola</v-btn>
                    </v-card-actions>
                </v-card>
           </v-row>
        </v-card>
        </v-container>
    <!-- </v-card> -->
</div>
</template>
<script>
  export default {
    data () {
      return {
          show1: false,
          show2: false,
          show3: false,
      }
    },
    mounted(){
    if (localStorage.getItem("token") != null) {
        if(localStorage.getItem("peran")=="Kasir"){
              window.location.replace('/homeKasir')
        }else if(localStorage.getItem("peran")=="Customer Service"){
              next()
        }else if(localStorage.getItem("peran")=="Owner"){
              window.location.replace('/homeMaster')
        }
    }
    else{
      window.location.replace('/home')
    }
    }
  }
</script>