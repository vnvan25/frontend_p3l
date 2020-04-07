<template>
<div>
    <!-- <v-card> -->
        <v-container grid-list-md mb-0>
            <h1 class="text-center">MENU DATA KELOLA TRANSAKSI PEMBAYARAN KOUVEE PET SHOP</h1>
            <h2 class="text-center">Pengelolaan Semua Data PEMBAYARAN Kouvee Pet Shop</h2>
            <h3 class="text-center">Kasir</h3>
            <br>
        <v-card class="pa-md-4 mx-lg-auto amber lighten-5">
           <v-card-title>Kelola Data Pembayaran Kouvee Pet Shop</v-card-title>
           <v-row>
                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Pembayaran Produk</v-list-item-title>
                        <v-list-item-subtitle>Kelola data pembayaran produk customer Kouvee Pet Shop</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="brown">
                        <v-icon large dark>mdi-paw</v-icon>
                        </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn link to="/pembayaranProduk">Kelola</v-btn>
                    </v-card-actions>
                </v-card>

                <v-card
                    class="mx-auto"
                    max-width="400"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Pembayaran Layanan</v-list-item-title>
                        <v-list-item-subtitle>Kelola data pembayaran layanan selesai customer</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar
                    size="80"
                    color="orange">
                        <v-icon large dark>mdi-needle</v-icon>
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
              next()
        }else if(localStorage.getItem("peran")=="Customer Service"){
              window.location.replace('/homeCS')
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