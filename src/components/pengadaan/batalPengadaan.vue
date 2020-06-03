<template>
    <v-container>
        <v-card class="pa-md-4 mt-n12 mx-lg-auto" max-width="900">
             <!-- <h2 class="mb-4 text-center font-weight-black black--text">History Pembatalan Pengadaan Produk Kouvee Pet Shop</h2> -->
             <div v-if="this.pengadaan.length==0">
                <v-data-table
                hide-default-header
                hide-default-footer
                class="mt-5">
                    <template v-slot:no-data>
                        <v-alert :value="true" border="left" color="red lighten-2"  dense outlined dark>
                            <v-icon>mdi-close-octagon</v-icon>
                            Tidak ada transaksi pengadaan yang dibatalkan
                        </v-alert>
                    </template>
                </v-data-table>
            </div>
            <div v-else>
             <v-data-table
                    :headers="headers"
                    :items="pengadaan"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_pengadaan">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.supplier }}</td>
                            <td>{{ item.no_telp }}</td>
                            <td>{{ item.kode }}</td>
                            <td>{{ item.tanggal }}</td>
                            <td>{{ item.total_harga }}</td>
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
                                            <span>Aksi Transaksi</span>
                                            </v-tooltip>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                            <v-btn text @click="detailHandler(item); dialog='true'">Details</v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-btn text @click="returnData(item)">Return</v-btn>
                                            </v-list-item>
                                        </v-list>
                                        </v-menu>
                                    </div>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </div>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>Detail Pengadaan No. {{this.form.kode}}</v-card-title>
                <v-divider></v-divider>
                <div v-if="this.pemesanan.length==0">
                    <h3 class="red--text text-center ml-10 mt-5">Tidak ada produk yang dipesan</h3>
                </div>
                <div v-else>
                        <v-data-table
                        :items="pemesanan"
                        :loading="load"
                        hide-default-header
                        hide-default-footer
                        class="ml-4 mt-6">
                            <template v-slot:body="{ items }">
                                <tbody>
                                    <tr v-for="(item,index) in items" :key="item.id_detail_p">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.nama }}</td>
                                        <td>{{ item.jumlah }}</td>
                                        <td class="font-weight-bold brown-text">Rp. {{ item.total }}</td>
                                    </tr>
                                </tbody>
                            </template>                           
                        </v-data-table>
                </div>
                        <br>
                        <h4 class="ml-4 mb-4"> TOTAL TRANSAKSI : Rp.{{ total }}</h4>
                        <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-5 mb-4" color="primary" text @click="dialog=false">Close</v-btn>
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
            pengadaan: [],
            pemesanan: [],
            keyword: '',
            snackbar: false,
            color: null,
            text: '',
            load: false,
            dialog: false,
            return: new FormData,
            headers: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Supplier',
                    value: 'supplier',
                },
                {
                    text: 'Kontak',
                    value: 'no_telp',
                },
                {
                    text: 'Kode',
                    value: 'kode',
                },
                {
                    text: 'Tanggal',
                    value: 'Tanggal',
                },
                {
                    text: 'Total Harga',
                    value: 'total_harga',
                },
                {
                    text: '',
                    value: '',
                },
            ],
            form: {
                id_pengadaan: '',
                supplier: 0,
                kode: '',
                no_telp: 0,
                alamat: 0,
                tanggal: '',
                total_harga: '',
                jumlah: '',
                id_hapus: 0,
            },
        }
    },
    computed: {
        total: function(){
            return this.pemesanan.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/pengadaan/dataPengadaan?status=Batal'
            this.$http.get(uri).then( (response) =>{
                this.pengadaan=response.data
            })
        },
        detailHandler(item){
            this.form.id_pengadaan = item.id_pengadaan,
            this.form.supplier = item.supplier,
            this.form.no_telp = item.no_telp,
            this.form.alamat = item.alamat,
            this.form.kode = item.kode,
            this.form.tanggal = item.tanggal,
            this.form.total_harga = item.total_harga,
            this.getPemesanan();
        },
        getPemesanan(){
            var uri = this.$apiUrl + '/detail_pengadaan?id_pengadaan='+this.form.id_pengadaan;
            this.$http.get(uri).then( (response) =>{
                this.pemesanan=response.data
            })
        },
        returnData(item){
            this.$confirm("Yakin ingin mereturn ke bagian proses pengadaan?").then(() => {
            this.return.append('id_pengadaan', item.id_pengadaan);
            this.return.append('status', "Proses");
            var uri =this.$apiUrl + '/pengadaan/changeStatus'
            this.load = true
            this.$http.post(uri, this.return).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Berhasil Dikembalikan ke bagian Proses";
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
        hapusData(item){
            this.$confirm("Yakin ingin menghapus data pengadaan?").then(() => {
            var uri = this.$apiUrl + '/pengadaan/' + item;
            this.$http.delete(uri).then( response =>{
                this.hapusDetail(item);
                this.getData();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
            });
        },
        hapusDetail(item){
            var uri = this.$apiUrl + '/detail_pengadaan/deletePengadaan/' + item;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = "Berhasil Menghapus Data Pengadaan";
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
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