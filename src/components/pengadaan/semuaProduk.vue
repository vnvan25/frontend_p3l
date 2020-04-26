<template>
    <v-container>
        <v-card class="pa-md-4 mt-5 mx-lg-auto" max-width="900">
             <h2 class="mb-4 text-center font-weight-black black--text">Bagian Pengadaan Produk Kouvee Pet Shop</h2>
             <v-divider></v-divider>
             <h2 class="mb-4 mt-4 text-center font-weight-black red--text">Daftar Semua Stok Kouvee Pet Shop</h2>
             <div v-if="this.products.length==0">
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
                    :headers="headers"
                    :items="products"
                    :search="keyword"
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mb-5 ml-1 mt-5" color="green lighten-1" link to="tambahPengadaan">Lakukan Pengadaan</v-btn>
                </v-card-actions>
        </v-card>
    </v-container>
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
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Gambar',
                    value: 'gambar',
                },
                {
                    text: 'Nama',
                    value: 'nama',
                },
                {
                    text: 'Harga',
                    value: 'harga',
                },
                {
                    text: 'Stok',
                    value: 'stok',
                },
                {
                    text: 'Satuan',
                    value: 'satuan',
                },
                {
                    text: 'Minimal',
                    value: 'minimal',
                },
            ],
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then( (response) =>{
                this.products=response.data
                console.log(this.products)
            })
        },
        getColor(stok, minimal) {
            if ((stok-minimal)<0 || stok==minimal) return 'red'
            else return 'green'
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