
<template>
<div>
  <v-card color="white">
    <!-- <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold headline brown--text">Laporan Kouvee Pet Shop</h1>
    </v-card-title> -->

    <v-tabs
      background-color="transparent"
      color="#DEB887"
      grow
    >
      <v-tab link to="produkTerlaris">
          Produk Terlaris
      </v-tab>
      <v-tab link to="layananTerlaris">
          Layanan Terlaris
      </v-tab>
      <v-tab link to="pendapatanBulanan">
          Pendapatan Bulanan
      </v-tab>
      <v-tab link to="pendapatanTahunan">
          Pendapatan Tahunan
      </v-tab>
      <v-tab link to="pengadaanBulanan">
          Pengadaan Bulanan
      </v-tab>
      <v-tab link to="pengadaanTahunan">
          Pengadaan Tahunan
      </v-tab>
    </v-tabs>
  </v-card>
  <VContent >
      <router-view />
  </VContent>
  </div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    },
    mounted(){
      this.getData();
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
        },
    }
</script>
<style>
/* Helper classes */
.basil {
  background-color:	#FFF8DC !important;
}
.basil--text {
  color: #DEB887 !important;
}
</style>