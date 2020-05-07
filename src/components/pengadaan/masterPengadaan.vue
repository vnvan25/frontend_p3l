<template>
  <v-card class="ml-5 mr-5 mt-5">
    <v-toolbar flat color="#DEB887" dark>
      <v-toolbar-title>Bagian Pengadaan Kouvee Pet Shop</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        Stok Habis
      </v-tab>
      <v-tab>
        Semua Stok
      </v-tab>

      <v-tab-item>
        <v-card class="pa-md-4 mt-5 mx-lg-auto" max-width="900">
             <h2 class="mb-4 text-center font-weight-black black--text">Bagian Pengadaan Produk Kouvee Pet Shop</h2>
             <v-divider></v-divider>
             <h2 class="mb-4 mt-4 text-center font-weight-black red--text">Daftar Stok Habis</h2>
             <div v-if="this.products.length==0">
                <v-data-table
                hide-default-header
                hide-default-footer>
                    <template v-slot:no-data>
                        <v-alert :value="true" border="left" color="red lighten-2"  dense outlined dark>
                            <v-icon>mdi-close-octagon</v-icon>
                            Tidak ada produk dengan stok minim
                        </v-alert>
                    </template>
                </v-data-table>
            </div>
            <div v-else>
             <v-data-table
                    :headers="headers" 
                    :items="products"
                    :search="keyword"
                    :loading="load"
                     hide-default-header
                     hide-default-footer
                     class="elevation-1"
                     >
                    <template v-slot:body="{ items }">
                    <tbody>
                    <v-row>
                    <v-col
                        v-for="item in items"
                        :key="item.id_produk"
                        cols="10"
                        md="4"
                        >
                    <v-card class="mx-auto" max-width="500" outlined hover>
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-2 text-center font-weight-black">{{ item.nama }}</v-list-item-title>
                        <img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="200px"  height="200px">
                        <v-list-item-subtitle class="headline mb-0 font-weight-medium text-center red--text">Sisa Stok : {{ item.stok }} {{ item.satuan }}</v-list-item-subtitle>
                        <div>
                             <v-list-item-subtitle class="text-center subtitle-1"> Rp.{{ item.harga }}</v-list-item-subtitle>
                        </div>
                        </v-list-item-content>
                    </v-list-item>
                    </v-card>
                    </v-col>
                    </v-row>
                    </tbody>
                </template>
                </v-data-table>
            </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mb-5 ml-1 mt-5" color="green lighten-1" link to="semuaProduk">Lihat Semua Produk</v-btn>
                    <v-btn class="mb-5 ml-1 mt-5" color="green lighten-1" link to="tambahPengadaan">Lakukan Pengadaan</v-btn>
                </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
              Semua Stok
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Tambah Pengadaan
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
    data() {
        return {
            products: [],
            keyword: '',
            status:'',
            snackbar: false,
            color: null,
            text: '',
            load: false,
            headers: [
                {
                    text: 'Nama',
                    value: 'nama',
                },
                {
                    text: 'Urutkan: ',
                    value: '',
                },
                {
                    text: 'Sort_Stok',
                    value: 'stok',
                },
                {
                    text: 'Sort_Harga',
                    value: 'harga',
                },
            ],
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/produk/stokHabis'
            this.$http.get(uri).then( (response) =>{
                this.products=response.data
                console.log(this.products)
            })
        },
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