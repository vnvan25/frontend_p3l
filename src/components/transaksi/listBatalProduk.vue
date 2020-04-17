<template>
    <v-container>
        <v-card>
             <v-toolbar
                flat
                color="#D2B48C"
                >
                <!-- <v-icon large>mdi-note-multiple-outline
                </v-icon> -->
                 <v-toolbar-title class=" text-center font-weight-bold" > History Pembatalan Penjualan Produk Kouvee Pet Shop</v-toolbar-title>
                
             </v-toolbar>
            <v-container grid-list-md mb-0>
                <!-- <h2 class="text-md-center">History Penjualan Produk Kouvee Pet Shop</h2> -->
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Produk"
                        hide-details
                    ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    :headers="headers"
                    :items="transactions"
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
                                            <v-list-item-title @click="showHandler(item); tempHandler(item)">Details</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title @click="batalHandler(item)">Return Ke Halaman Transaksi</v-list-item-title>
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
                 <v-btn color="green lighten-3" class="mt-4 mb-4" link to="historyProduk">Kembali</v-btn>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Detail Produk</span>
                </v-card-title>
                <v-data-table
                    :headers="headersDetail"
                    :items="detailsTp"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_detail_tp">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.produk }}</td>
                            <td>{{ item.jumlah }}</td>
                            <td>{{ item.total }}</td>
                        </tr>
                        <tr>
                            <td>
                                <h4> TOTAL PEMBELIAN : Rp.{{ totalBeli }}</h4>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false; selected()">Close</v-btn>
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
        return {
            dialogTransaksi: false,
            dialogDetail: false,
            dialogGuest: false,
            dialog: false,
            keyword: '',
            status: 'Penjualan',
            selectedProduk: 0,
            selectedHewan: 0,
            headersDetail: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Produk',
                    value: 'produk',
                },
                {
                    text: 'Jumlah',
                    value: 'jumlah',
                },
                {
                    text: 'Total',
                    value: 'total',
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
                    text: 'Nama Hewan Pelanggan',
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
            transactions: [],
            detailsTp: [],
            produks: [],
            hewan: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            batal : new FormData,
            errors : '',
            updatedId : '',
            updatedIdDetail : '',
            tempKode: '',
            konfirmasiId: '',
            batalId: '',
            kasir: 0,
            totalall: '',
            updatedTemp: '',
            nama: '',
            cek : '',
            flen: '',
            i: '',
            id_temp :'',
            jumlahDetail: 0,
            totalDetail: 0,
            id_tp : 0,
        }
    },
    computed: {
        totalBeli: function(){
            return this.detailsTp.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
    },
    methods:{
        loadHewan(){
             var uri = this.$apiUrl + '/hewan'
            this.$http.get(uri).then( (response) =>{
                this.hewan=response.data
            })
        },
        getDataProduk(){
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then( (response) =>{
                this.produks=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
        },
        getData(){
            var uri = this.$apiUrl + '/transaksi_produk/dataBatal'
            this.$http.get(uri).then( (response) =>{
                this.transactions=response.data
            })
        },
        getDetailData(){
          var uri = this.$apiUrl + '/tp_detail?id_tp='+this.tempKode;
          console.log(uri)
            this.$http.get(uri).then( (response) =>{
                this.detailsTp=response.data
            })
        },
        showHandler(id){
                this.nama = id.hewan;
                this.dialog = true;
                this.tempKode = id.id_tp;
                this.getDetailData();
        },
        batalHandler(item){
                this.id_tp = item.id_tp;
                this.isBatal();
        },
        isBatal(){
        this.$confirm("Yakin ingin mengembalikan transaksi?").then(() => {
            this.batal.append('id_tp', this.id_tp);
            this.batal.append('status', this.status);
            var uri =this.$apiUrl + '/transaksi_produk/pulihkan'
            this.load = true
            this.$http.post(uri, this.batal).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Berhasil di pulihkan";
                this.load = false;
                this.dialog = false;
                this.getData();
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
        this.getData();
        this.getDetailData();
        this.getDataProduk();
        this.loadHewan();
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