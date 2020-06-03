
<template>
<div>
  <v-card color="white">
    <v-card-title class="text-center justify-center py-6">
      <h3 class="font-weight-bold headline brown--text">History Pengadaan Kouvee Pet Shop</h3>
    </v-card-title>

    <v-tabs
      background-color="transparent"
      color="#DEB887"
      centered
    >
      <v-tab link to="historyPengadaan">
          Belum Dikonfirmasi
      </v-tab>
      <v-tab link to="batalPengadaan">
          Batal
      </v-tab>
      <v-tab link to="pesananPengadaan">
          Dalam Proses
      </v-tab>
      <v-tab link to="selesaiPengadaan">
          Selesai 
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
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>