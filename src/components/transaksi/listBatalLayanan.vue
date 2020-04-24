<template>
    <v-container>
        <v-card class="pa-md-4 mx-lg-auto" max-width="900">
             <v-toolbar
                flat
                color="#D2B48C"
                >
                 <v-toolbar-title class=" text-center font-weight-bold" > History Pembatalan Pemesanan Layanan Kouvee Pet Shop</v-toolbar-title>
                
             </v-toolbar>
            <v-container grid-list-md mb-0>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Pemesanan Layanan"
                        hide-details
                    ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    :headers="headers"
                    :items="layanan"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_tp">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.kode }}</td>
                            <td>{{ item.tanggal }}</td>
                            <td>{{ item.hewan }}</td>
                            <td>{{ item.customer_service }}</td>
                            <td>{{ item.sub_total }}</td>
                            <td>
                                <div>
                                        <v-menu>
                                        <template v-slot:activator="{ on: menu }">
                                            <v-tooltip bottom>
                                            <template v-slot:activator="{ on: tooltip }">
                                                <v-btn
                                                color="primary"
                                                dark
                                                text
                                                v-on="{ ...tooltip, ...menu }"
                                                >:</v-btn>
                                            </template>
                                            <span>Menu Return</span>
                                            </v-tooltip>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                            <v-list-item-title @click="detailShowHandler(item)">Details</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title @click="konfirmasiTransaksi(item)">Return Ke Halaman Transaksi</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                        </v-menu>
                                    </div>
                                </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                 <small>*Tombol Return akan memulihkan kembali pesanan yang dibatalkan ke bagian penjualan</small>
                 <br>
                 <v-btn color="green lighten-3" class="mt-4 mb-4" link to="historyLayanan">Kembali</v-btn>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Detail Layanan</span>
                </v-card-title>
                <v-card-subtitle class="mt-1">
                    <span>Data Detail pemesanan layanan yang dilakukan customer</span>
                </v-card-subtitle>
                <v-data-table
                    :headers="headersDetail"
                    :items="detailLayanan"
                    :search="keyword"
                    :loading="load"
                    hide-default-footer
                    class="ml-4">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_detail_tl">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.layanan }} {{item.ukuran}}</td>
                            <td>{{ item.harga}}</td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                <br>
                <h4 class="ml-4"> TOTAL PEMESANAN : Rp.{{ totalBeli }}</h4>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false;">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="true"
        :timeout="3000"
        >
        {{ text }}
        <v-btn
        dark
        text
        @click="snackbar= false"
        >
        Close
        </v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
export default {
    data() {
        return{
            dialog: false,
            keyword: '',
            snackbar: false,
            color: null,
            text: '',
            load: false,
            status: 'Penjualan',
            headersDetail: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Layanan',
                    value: 'layanan',
                },
                {
                    text: 'Harga',
                    value: 'harga',
                }
            ],
            headers: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Kode Produk',
                    value: 'kode',
                },
                {
                    text: 'Tanggal',
                    value: 'tanggal',
                },
                {
                    text: 'Pelanggan',
                    value: 'hewan',
                },
                {
                    text: 'Customer Service',
                    value: 'customer_service',
                },
                {
                    text: 'Total Harga',
                    value: 'sub_total',
                },
                {
                    text: 'Konfirmasi',
                    value: 'konfirmasi',
                }
            ],
            layanan: [],
            detailLayanan: [],
            id_tl: [],
            return : new FormData(),
        }
    },
    computed: {
        totalBeli: function(){
            return this.detailLayanan.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
    },
    methods:{
        getLayanan(){
            var uri = this.$apiUrl + '/transaksi_layanan/dataBatal'
            this.$http.get(uri).then( (response) =>{
                this.layanan=response.data
            })
        },
        getDetailLayanan(){
          var uri = this.$apiUrl + '/tl_detail?id_tl='+this.id_tl;
          console.log(uri)
            this.$http.get(uri).then( (response) =>{
                this.detailLayanan=response.data
            })
        },
        detailShowHandler(data){
            this.dialog = true,
            this.id_tl = data.id_tl,
            this.getDetailLayanan();
        },
        konfirmasiTransaksi(data){
            this.$confirm("Yakin Ingin Return Transaksi No."+data.kode+"?").then(() => {
            this.return.append('id_tl', data.id_tl);
            this.return.append('status', "Penjualan");
            var uri =this.$apiUrl + '/transaksi_layanan/changeStatus'
            this.load = true
            this.$http.post(uri, this.return).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Transaksi "+data.kode+" telah dipulihkan.";
                this.load = false;
                this.dialog = false;
                this.getLayanan();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
            });
        },
    },
    mounted(){
        this.getLayanan();
        this.getDetailLayanan();
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
    },
}
</script>