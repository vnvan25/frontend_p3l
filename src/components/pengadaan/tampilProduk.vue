<template>
<v-container>
  <v-card class="mt-5 mx-lg-auto" max-width="1000">
    <v-toolbar flat color="#DEB887" dark>
      <v-toolbar-title>Daftar Produk Kouvee Pet Shop</v-toolbar-title>
    </v-toolbar>
    <v-tabs grow>
      <v-tab>
          <v-badge
          color="red"
          :content="this.products.length"
          inline
          class="ml-2"
        >
          Stok Habis
        </v-badge>
      </v-tab>
      <v-tab>
        Semua Stok
      </v-tab>

      <v-tab-item>
        <h2 class="mb-4 mt-4 font-weight-black red--text text-center">Daftar Stok Habis</h2>
        <v-divider></v-divider>
        <v-card class="mt-5" flat>
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
                     hide-default-header
                     hide-default-footer
                     class="elevation-1"
                     >
                   <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_produk">
                            <td>{{ index + 1 }}</td>
                            <td><img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="100px"></td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.harga }}</td>
                            <td>
                                 <v-chip color="red" dark>{{ item.stok }}</v-chip>
                            </td>
                            <td>{{ item.satuan }}</td>
                            <td>{{ item.minimal }}</td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </div>
        </v-card>
      </v-tab-item>
      <!-- semua stok -->
      <v-tab-item>
            <h2 class="mb-4 mt-4 font-weight-black red--text text-center">Semua Stok Produk Kouvee Pet Shop</h2>
            <v-divider></v-divider>
        <v-card flat>
            <div v-if="this.allproduk.length==0">
                <v-data-table
                hide-default-header
                hide-default-footer>
                    <template v-slot:no-data>
                        <v-alert :value="true" border="left" color="red lighten-2"  dense outlined dark>
                            <v-icon>mdi-close-octagon</v-icon>
                            Tidak ada produk
                        </v-alert>
                    </template>
                </v-data-table>
            </div>
            <div v-else>
             <v-data-table
                    hide-default-footer
                    hide-default-header
                    :items="allproduk"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_produk">
                            <td>{{ index + 1 }}</td>
                            <td><img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="100px"></td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.harga }}</td>
                            <td>
                                 <v-chip :color="getColor(item.stok, item.minimal)" dark>{{ item.stok }}</v-chip>
                            </td>
                            <td>{{ item.satuan }}</td>
                            <td>{{ item.minimal }}</td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</v-container>
</template>
<script>
export default {
    data() {
        return {
            allproduk: [],
            keyword: '',
            status:'',
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
        getDataAll(){
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then( (response) =>{
                this.allproduk=response.data
                console.log(this.allproduk)
            })
        },
        getColor(stok, minimal) {
            if ((stok-minimal)<0 || stok==minimal) return 'red'
            else return 'green'
        },
    },
    mounted(){
        this.getData();
        this.getDataAll();
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