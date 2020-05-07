<template>
    <v-container>
        <v-card  class="pa-md-4 mx-lg-auto" max-width="900">
             <v-toolbar
                flat
                color="#D2B48C"
                >
                 <v-toolbar-title class=" text-center font-weight-bold" > Menu Kasir : Pembayaran Produk</v-toolbar-title>
                
             </v-toolbar>
            <v-container grid-list-md mb-0>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Transaksi"
                        hide-details
                    ></v-text-field>
                    </v-flex>
                </v-layout>
                <div v-if="this.transactions.length==0">
                    <v-data-table>
                        <template v-slot:no-data>
                            <v-alert :value="true" border="left" color="red lighten-2" dark>
                                <v-icon>mdi-close-octagon</v-icon>
                                Sorry, nothing to display here :(
                            </v-alert>
                        </template>
                    </v-data-table>
                </div>
                <div v-else>
                <v-data-table
                    :headers="headers"
                    :items="transactions"
                    :search="keyword"
                    :loading="load"
                    >
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
                                <v-menu>
                                        <template v-slot:activator="{ on: menu }">
                                            <v-tooltip bottom>
                                            <template v-slot:activator="{ on: tooltip }">
                                                <v-btn
                                                color="primary"
                                                dark
                                                text
                                                v-on="{ ...tooltip, ...menu }"
                                                class="font-weight-bold title"
                                                >:</v-btn>
                                            </template>
                                            <span>Aksi Transaksi</span>
                                            </v-tooltip>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                            <v-btn text @click="showHandler(item); tempHandler(item)">Details</v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-btn text @click="bayarHandler(item)">Bayar Transaksi</v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-btn text @click="rollback(item)">Rollback Ke CS</v-btn>
                                            </v-list-item>
                                        </v-list>
                                        </v-menu>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                </div>
            </v-container>
        </v-card>

        <br>
        <!-- card untuk cetak nota -->
        <v-card class="pa-md-4 mx-lg-auto" max-width="900" color="#FFEFD5">
            <v-card-title>
                Lihat List Pembayaran yang selesai
            </v-card-title>
            <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn
                        rounded
                        class="text-black"
                        color="#DEB887"
                        link to="/selesaiPage">
                            Telusuri Halaman
                            <v-icon size="18" class="mr-2">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-flex>
            </v-layout>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Detail Pembelian Produk</span>
                </v-card-title>
                <v-data-table
                    :headers="headersDetail"
                    :items="detailsTp"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <!-- <table id="table"> -->
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_detail_tp">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.produk }}</td>
                            <td>{{ item.jumlah }}</td>
                            <td>{{ item.total }}</td>
                            <td>
                                <v-btn
                                    icon
                                    color="indigo"
                                    light
                                    @click="editHandlerDetail(item)"
                                    >
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                icon
                                color="error"
                                light
                                @click="delDataDetail(item.id_detail_tp)"
                                >
                                <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4> TOTAL PEMBELIAN : Rp.{{ totalBeli }}</h4>
                            </td>
                        </tr>
                    </tbody>
                    <!-- </table> -->
                </template>
                </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false; selected()">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDetail" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Detail Pembelian</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn disabled>ID Transaksi : {{ this.tempKode }}</v-btn>
                                </v-col>
                                <v-col cols="12">
                                <v-text-field :value="value" label="Nama Produk" disabled></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <!-- checkpoint -->
                                    <v-btn color="orange darken-3"> Stok Tersisa Produk : {{valuestok}} {{valuesatuan}} </v-btn>
                                </v-col>
                                 <v-col cols="12">
                                    <v-input v-model="form.total">  Harga Satuan : {{valueharga}}</v-input>
                                </v-col>
                                <v-col cols="12">
                                    <v-slider
                                            v-model="form.jumlah"
                                            :rules="rules.age"
                                            color="orange"
                                            label="Jumlah Beli"
                                            hint="Pilih Jumlah Pembelian"
                                            min="0"
                                            :max = valuestok
                                            thumb-label
                                            ></v-slider>
                                </v-col>
                               
                                    
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogDetail = false">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="Cek2(); setFormDetail()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogBayar" persistent max-width="800px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">PEMBAYARAN PRODUK</span>
                        </v-card-title>
                        <!-- data transaksi -->
                              <v-card 
                                class="pa-md-3 mx-lg-auto"
                                color="white"
                                width="650px"> 
                                <span class="title">Transaksi No. {{this.bayar.kode}}</span>
                                <v-divider></v-divider>
                                <tr>
                                    <td>Tanggal Transaksi</td>
                                    <td> : {{this.bayar.tanggal}}</td>
                                </tr>
                                <tr>
                                    <td>Customer Service</td>
                                    <td> : {{this.bayar.cs}} </td>
                                </tr>
                                <tr>
                                    <td>Kasir</td>
                                    <td> : {{ this.namakasir }} </td>
                                </tr>
                              </v-card>
                            <br>
                            <!-- data customer -->
                              <v-card 
                                class="pa-md-3 mx-lg-auto"
                                color="white"
                                width="650px"> 
                                <span class="title">Data Customer</span>
                                <v-divider></v-divider>
                                <tr>
                                    <td>Nama Hewan</td>
                                    <td> : {{this.bayar.hewan}}</td>
                                </tr>
                                <tr v-if="this.bayar.hewan=='Guest'">
                                        <td>Pemilik</td>
                                        <td> : Guest </td>
                                </tr>
                                <tr v-else>
                                        <td>Pemilik</td>
                                        <td> : {{this.customer}}</td>
                                </tr>
                                <tr v-if="this.bayar.hewan=='Guest'">
                                        <td>Nomor Telepon</td>
                                        <td> : 0 </td>
                                </tr>
                                 <tr v-else>
                                        <td>Nomor Telepon</td>
                                        <td> : {{this.no_telp}}</td>
                                </tr>
                              </v-card>
                                <!-- data detail -->
                                <br>
                            <v-card
                            class="pa-md-3 mx-lg-auto"
                                color="white"
                                width="650px">
                                <span class="title">Data Produk</span>
                                <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left">No</th>
                                    <th class="text-left">Nama Produk</th>
                                    <th class="text-left">Jumlah</th>
                                    <th class="text-left">Total Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in detailsTp" :key="item.id_detail_tp">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ item.produk }}</td>
                                            <td>{{ item.jumlah }}</td>
                                            <td>{{ item.total }}</td>
                                    </tr>
                                </tbody>
                                </template>
                            </v-simple-table>
                            </v-card>
                            <br>
                            <v-card
                                class="pa-md-3 mx-lg-auto"
                                color="white"
                                width="650px">
                                <span class="title">Kelola Diskon Member</span>
                                <br>
                            <div v-if="this.bayar.hewan=='Guest'">
                                <v-text-field v-model="percent" label="Input Diskon" placeholder="Rupiah" disabled></v-text-field>
                                <small class="text-weight-black">*Diskon hanya untuk member</small>
                            </div>
                            <div v-else>
                                <v-text-field v-model="percent" label="Input Diskon" placeholder="Rupiah" type="number" :rules="rules.number"></v-text-field>
                            </div>
                            </v-card>
                            <br>
                            <v-card
                                class="pa-md-3 mx-lg-auto"
                                color="white"
                                width="650px">
                                <span class="title">Total Bayar</span>
                                <br>
                                <div class="blue lighten-4">
                                <tr>
                                    <td>Sub Total</td>
                                    <td> : Rp.{{totalBeli}}</td>
                                </tr>
                                <tr v-if="this.bayar.hewan=='Guest'">
                                    <td>Total</td>
                                    <td> : Rp.{{totalBeli}} </td>
                                </tr>
                                <tr v-else>
                                    <td>Total</td>
                                    <td> : Rp.{{ totalBeli-percent}} </td>
                                </tr>
                                <tr>
                                    <td>Diskon</td>
                                    <td> : Rp.{{ percent }} </td>
                                </tr>
                                </div>
                            </v-card>
                            <br>
                            <v-card
                                class="pa-md-3 mx-lg-auto"
                                color="white"
                                width="650px">
                                <span class="title">Uang Pembayaran</span>
                                <br>
                                <v-text-field v-model="uang" label="Input Uang Pembayaran" placeholder="Rp. XXXXXX" type="number" :rules="rules.uang"></v-text-field>
                                <p>Kembalian : Rp.{{kembalian}}</p>
                            </v-card>
                            <br>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" @click="selected(); selesaiHandler()">Bayar dan Cetak Nota</v-btn>
                            <v-btn color="blue darken-1" text  @click="dialogBayar = false">Close</v-btn>
                            <!-- @click="dialogBayar = false" -->
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
import jsPDF from 'jspdf';
import 'jspdf-autotable'
export default {
    data() {
        return {
            tglTransaksi: new Date().toLocaleString(),
            namakasir: localStorage.getItem("nama"),
            id_kasir: localStorage.getItem("id_pegawai"),
            dialogBayar: false,
            dialogTransaksi: false,
            dialogDetail: false,
            dialog: false,
            keyword: '',
            status:'',
            percent: 0,
            diskon: 0,
            uang: 0,
            value: '',
            valueID: '',
            valuestok: '',
            valuesatuan: '',
            valueharga: '',
            selectedProduk: 0,
            selectedHewan: 0,
            status: 'Penjualan',
            max: {
                type: Number,
                default: 100
            },
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
                },
                {
                    text: 'Aksi',
                    value: 'aksi',
                }
            ],
            headersDetailNota: [
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
                },
            ],
            rules: {
                age: [
                    val => val < this.selectedProduk.stok || 'Sesuai Stok',
                ],
                number: [
                     v => v > 0 && v < this.totalBeli || 'Melebihi total Beli',
                ],
                uang: [
                     v => v > 0  || 'Tidak boleh minus',
                ],
            },
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
                    text: 'Tanggal Transaksi',
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
                },
            ],
            transactions: [],
            detailsTp: [],
            produks: [],
            hewan: [],
            hewans: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                id_hewan: '',
                id_pegawai_k: '',
                id_pegawai_cs: '',
                kode: '',
                tanggal: '',
                sub_total: '',
                total_harga: '',
                status: '',
                created_by: '',
                updated_by: '',
                jumlah: '',
            },
            temp: {
                hewan: '',
                id_hewan: '',
                id_pegawai_k: '',
                id_pegawai_cs: '',
                kode: '',
                tanggal: '',
                sub_total: '',
                total_harga: '',
                status: '',
                created_by: '',
                updated_by: '',
                jumlah: '',
            },
            tempDetail:{
                id_tp: '',
                kode: '',
                id_produk : '',
                jumlah : '',
                total: '',
            },
            bayar:{
                tanggal : '',
                kode : '',
                cs : '',
                hewan : '',
                id_hewan: '',
                sub_total: '',
                id_tp: '',
                id_pegawai_cs: '',
            },
            kurang: [{
                nama : '',
                jumlah : '',
            }],
            selesai: {
                id_hewan: '',
                id_pegawai_k: '',
                id_pegawai_cs: '',
                kode: '',
                tanggal: '',
                sub_total: '',
                total_harga: '',
                status: '',
                created_by: '',
                updated_by: '',
                jumlah: '',
            },
            tp : new FormData,
            dtl : new FormData,
            upd : new FormData,
            minus : new FormData,
            batal: new FormData,
            typeInput: 'new',
            type: 'new',
            errors : '',
            updatedId : '',
            updatedIdDetail : '',
            tempKode: '',
            selesaiId: '',
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
            customer: '',
            no_telp:'',
            totalBayar: 0,
            data: '',
            jenis: '',
            percentTemp: 0,
        }
    },
    computed: {
        Cek: function(){
        if(this.detailsTp.nama == this.selectedProduk.nama){
            return this.detailsTp.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        }else{
            return "0"
        }   
        },
        totalBeli: function(){
            return this.detailsTp.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
        kembalian(){
            return this.uang-(this.totalBeli-this.percent)
        }
    },
    methods:{
        Cek2(){
            console.log(this.selectedProduk.nama)
            this.flen= this.detailsTp.length;
            console.log(this.flen)
            for(this.i=0; this.i<this.flen; this.i++){
            if(this.detailsTp[this.i].produk == this.selectedProduk.nama){
                console.log(this.detailsTp[this.i].produk)
                console.log(this.detailsTp[this.i])
                this.cek='true';
                this.id_temp = this.detailsTp[this.i].id_detail_tp;
                this.tempDetail.kode = this.detailsTp[this.i].kode;
                this.tempDetail.jumlah = this.detailsTp[this.i].jumlah; 
                this.tempDetail.total = this.detailsTp[this.i].total;
                this.tempDetail.id_tp = this.detailsTp[this.i].id_tp;
            }
        }
        console.log(this.cek)
        },
        totalBeli2: function(){
            return this.detailsTp.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
        selected(){
                this.temp.sub_total = this.totalBeli2()
                console.log(this.totalBeli2())
                this.updateDataTemp() 
        },
        loadHewanById(){
            var uri = this.$apiUrl + '/hewan?id_hewan='+this.bayar.id_hewan
            this.$http.get(uri).then( (response) =>{
                this.hewans=response.data
                this.customer=response.data[0].nama
                this.no_telp=response.data[0].no_telp
                console.log(this.bayar.id_hewan)
                console.log(this.hewans)
            })
        },
        loadHewan(){
            var uri = this.$apiUrl + '/hewan'
            this.$http.get(uri).then( (response) =>{
                this.hewan=response.data
            })
        },
        getJenis(){
            var uri = this.$apiUrl + '/transaksi_layanan/jenis?id_hewan='+this.bayar.id_hewan
            this.$http.get(uri).then( (response) =>{
                if(this.bayar.hewan=='Guest'){
                    this.jenis='Guest'
                }else{
                    this.jenis=response.data[0].nama
                    console.log(this.jenis)
                }
                
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
        getDataPDF(){
            var uri = this.$apiUrl + '/laporanpdf'
            this.$http.get(uri).then( (response) =>{
                this.data=response.data
               
            })
        },
        getDataTransaksi(){
            var uri = this.$apiUrl + '/transaksi_produk/dataBayar'
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
        hitungTotal(){
            this.diskon = parseInt(this.percent)*parseInt(this.totalBeli2())
            this.totalBayar = parseInt(this.totalBeli2(), 10) - this.diskon;
        },
        updateStok(){
            this.flen= this.detailsTp.length;
            for(let i=0; i<this.flen; i++){
                    this.kurang.nama = this.detailsTp[i].produk;
                    this.kurang.jumlah = this.detailsTp[i].jumlah;
                    this.minus.append('nama', this.detailsTp[i].produk);
                    this.minus.append('jumlah', this.detailsTp[i].jumlah);
                    var uri =this.$apiUrl + '/transaksi_produk/kurangStok'
                    this.load = true
                    this.$http.post(uri, this.minus).then( (response) =>{
                        this.load = false;
                    }).catch(error =>{
                        this.color = 'red';
                        this.load = false;
                    })
            }
        },
        updateKurang(){
            // this.flen= this.detailsTp.length;
             for(let i=0; this.detailsTp.length; i++){
                this.minus.append('nama', this.detailsTp[i].produk);
                this.minus.append('jumlah', this.detailsTp[i].jumlah);
                var uri =this.$apiUrl + '/transaksi_produk/kurangStok'
                this.load = true
                this.$http.post(uri, this.minus).then( (response) =>{
                    console.log(response.data)
                    this.load = false;
                }).catch(error =>{
                    this.color = 'red';
                    this.load = false;
                })
             }
        },
        selesaiBayar(){
        if(this.uang<this.selesai.total_harga){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Uang Pembayaran Kurang";
        }else if(this.totalBeli < this.percent){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Input Diskon Salah";
        }else{
            this.$confirm("Yakin Menyelesaikan Pembayaran?").then(() => {
                this.tp.append('id_hewan', this.selesai.id_hewan);
                this.tp.append('id_pegawai_k', this.selesai.id_pegawai_k);
                this.tp.append('id_pegawai_cs', this.selesai.id_pegawai_cs);
                this.tp.append('kode', this.selesai.kode);
                this.tp.append('tanggal', this.selesai.tanggal);
                this.tp.append('sub_total', this.selesai.sub_total);
                this.tp.append('total_harga', this.selesai.total_harga);
                this.tp.append('status', this.selesai.status);
                // this.tp.append('updated_by', this.form.updated_by);
                var uri = this.$apiUrl + '/transaksi_produk/' + this.selesaiId;
                this.load = true
                this.$http.post(uri, this.tp).then( (response) =>{
                    this.load = false;
                    this.dialogBayar = false
                    this.percentTemp=this.percent,
                    this.uang=0,
                    this.percent=0,
                    this.createPDF()
                    this.getDataTransaksi();
                    this.resetForm();
                    this.typeInput = 'new';
                }).catch( error =>{
                    this.color = 'red';
                    this.load = false;
                    this.typeInput = 'new';
                })
                });
            }
        },
        tempHandler(item){
            this.temp.hewan = item.hewan,
            this.temp.id_hewan = item.id_hewan,
            this.temp.kode = item.kode,
            this.temp.id_pegawai_k = item.id_pegawai_k,
            this.temp.id_pegawai_cs = item.id_pegawai_cs,
            this.temp.tanggal = item.tanggal,
            this.temp.sub_total = item.sub_total,
            this.temp.total_harga = item.total_harga,
            this.temp.status = item.status,
            this.temp.created_by = item.created_by,
            this.temp.updated_by = item.created_by,
            this.updatedTemp = item.id_tp;
            // this.updateDataTemp();
        },
        updateDataTemp(){
            this.tp.append('id_hewan', this.temp.id_hewan);
            this.tp.append('id_pegawai_k', this.temp.id_pegawai_k);
            this.tp.append('id_pegawai_cs', this.temp.id_pegawai_cs);
            this.tp.append('kode', this.temp.kode);
            this.tp.append('tanggal', this.temp.tanggal);
            this.tp.append('sub_total', this.temp.sub_total);
            this.tp.append('total_harga', this.temp.total_harga);
            this.tp.append('status', this.temp.status);
            this.tp.append('updated_by', this.temp.updated_by)
            var uri = this.$apiUrl + '/transaksi_produk/' + this.updatedTemp;
            this.load = true
            this.$http.post(uri, this.tp).then( (response) =>{
                this.load = false;
                this.dialogTransaksi = false
                this.getDataTransaksi();
                this.resetForm();
                this.typeInput = 'new';
            }).catch( error =>{
                this.errors = error
                this.load = false;
                this.typeInput = 'new';
            })
        },
        updateData(){
            this.tp.append('id_hewan', this.selectedHewan.id_hewan);
            this.tp.append('id_pegawai_k', this.form.id_pegawai_k);
            this.tp.append('id_pegawai_cs', this.form.id_pegawai_cs);
            this.tp.append('kode', this.form.kode);
            this.tp.append('tanggal', this.form.tanggal);
            this.tp.append('sub_total', this.form.sub_total);
            this.tp.append('total_harga', this.form.total_harga);
            this.tp.append('status', this.form.status)
            var uri = this.$apiUrl + '/transaksi_produk/' + this.updatedId;
            this.load = true
            this.$http.post(uri, this.tp).then( (response) =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                this.load = false;
                this.dialogTransaksi = false
                this.getData();
                this.resetForm();
                this.typeInput = 'new';
            }).catch( error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
                this.typeInput = 'new';
            })
        },
        sendDataDetail(){
            this.dtl.append('id_tp', this.tempKode);
            this.dtl.append('id_produk', this.selectedProduk.id_produk);
            this.dtl.append('jumlah', this.form.jumlah);
            this.dtl.append('total', this.selectedProduk.harga*this.form.jumlah);
            var uri =this.$apiUrl + '/tp_detail'
            this.load = true
            this.$http.post(uri, this.dtl).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                console.log(response.data.message)
                this.load = false;
                this.dialogDetail = false
                this.getDetailData();
                this.resetFormDetail();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        updateDataDetail(){
            this.dtl.append('id_tp', this.tempKode);
            this.dtl.append('id_produk', this.valueID);
            this.dtl.append('jumlah', this.form.jumlah);
            this.dtl.append('total', this.valueharga*this.form.jumlah);
            var uri = this.$apiUrl + '/tp_detail/' + this.updatedIdDetail;
            this.load = true
            this.$http.post(uri, this.dtl).then( (response) =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                this.load = false;
                this.dialogDetail = false
                this.getDetailData();
                this.resetFormDetail();
                this.type = 'new';
            }).catch( error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
                this.type = 'new';
            })
        },
        updateSameDetail(){
            this.jumlahDetail= parseInt(this.form.jumlah, 10) + parseInt(this.tempDetail.jumlah,10);
            this.totalDetail=(this.selectedProduk.harga*this.form.jumlah)+ parseInt(this.tempDetail.total,10);
            console.log(this.jumlahDetail)
            console.log(this.totalDetail)
            this.dtl.append('id_tp', this.tempDetail.id_tp);
            this.dtl.append('id_produk', this.selectedProduk.id_produk);
            this.dtl.append('jumlah', this.jumlahDetail);
            this.dtl.append('total', this.totalDetail);
            var uri = this.$apiUrl + '/tp_detail/' + this.id_temp;
            this.load = true
            this.$http.post(uri, this.dtl).then( (response) =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                this.load = false;
                this.dialogDetail = false
                this.getDetailData();
                this.resetFormDetail();
                this.type = 'new';
            }).catch( error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
                this.type = 'new';
            })
        },
        showHandler(id){
                this.nama = id.hewan;
                this.dialog = true;
                this.tempKode = id.id_tp;
                this.getDetailData();
        },
        bayarHandler(id){
                this.bayar.hewan = id.hewan;
                this.dialogBayar = true;
                this.bayar.kode = id.kode;
                this.bayar.cs = id.customer_service;
                this.bayar.tanggal = id.tanggal;
                this.bayar.id_hewan = id.id_hewan;
                this.bayar.id_tp = id.id_tp;
                this.bayar.id_pegawai_cs = id.id_pegawai_cs;
                this.tempKode = id.id_tp;
                this.getDetailData();
                this.loadHewanById();
                this.getJenis();
        },
        selesaiHandler(){
            this.selesai.id_hewan = this.bayar.id_hewan,
            this.selesai.id_pegawai_k = this.id_kasir,
            this.selesai.id_pegawai_cs = this.bayar.id_pegawai_cs,
            this.selesai.kode = this.bayar.kode,
            this.selesai.tanggal = this.bayar.tanggal,
            this.selesai.sub_total = this.temp.sub_total;
            if(this.bayar.hewan == 'Guest'){
                this.selesai.total_harga = this.temp.sub_total;
            }else{
                this.selesai.total_harga = this.temp.sub_total-(this.percent);
            }
            this.selesai.status = 'Selesai',
            this.selesaiId = this.bayar.id_tp;
            // this.updateStok();
            this.selesaiBayar();
            // this.createPDF();
            
        },
        batalHandler(item){
            this.form.id_hewan = item.id_hewan,
            this.form.id_pegawai_k = this.kasir,
            this.form.id_pegawai_cs = item.id_pegawai_cs,
            this.form.kode = item.kode,
            this.form.tanggal = item.tanggal,
            this.form.sub_total = item.sub_total,
            this.form.total_harga = item.total_harga,
            this.form.status = 'batal',
            this.batalId = item.id_tp;
            this.batal();
        },
        editHandlerDetail(item){
            this.type = 'edit';
            this.dialogDetail = true;
             this.value= item.produk;
            this.valueID = item.id_produk;
            this.valueharga = item.harga;
            this.valuestok = item.stok;
            this.valuesatuan = item.satuan;
            this.form.total = this.form.jumlah*item.harga;
            this.form.jumlah = item.jumlah;
            this.tempKode = this.tempKode;
            this.updatedIdDetail = item.id_detail_tp;
            // this.updateDataDetail();
        },
        delData(deleteId){
            var uri = this.$apiUrl + '/produk/' + deleteId;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                this.deleteDialog = false
                this.getData();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        },
         delDataDetail(deleteId){
            this.$confirm("Hapus Produk?").then(() => {
            var uri = this.$apiUrl + '/tp_detail/' + deleteId;
            this.$http.delete(uri).then( response =>{
                alert('Berhasil Hapus Data')
                this.deleteDialog = false
                this.getDetailData();
            }).catch(error =>{
                alert('Kenapa keisni')
                this.errors = error
                console.log(this.errors)
            })
            });
        },
        setForm(){
            if(this.typeInput == 'new'){
                this.sendData()
            }else{
                //console.log("dddd")
                this.updateData()
            }
        },
        setFormDetail(){
            if(this.type == 'new'){
                if(this.cek=="true"){
                    this.updateSameDetail()
                }else{
                    this.sendDataDetail()
                }
            }else{
                this.updateDataDetail()
            }
        },
        resetFormDetail(){
            this.selectedProduk=0,
            this.form = {
                jumlah : '',
                total: '',
                ukuran_hewan: ''
            }
        },
        resetForm(){
            this.form = {
                nama : '',
                harga :'',
                stok: '',
                satuan: '',
                gambar: '',
                minimal: '',
                deskripsi: '',
                gambar: ''
            }
        },
        rollback(item){
        this.$confirm("Yakin ingin mengembalikan transaksi?").then(() => {
            this.batal.append('id_tp', item.id_tp);
            this.batal.append('status', this.status);
            var uri =this.$apiUrl + '/transaksi_produk/pulihkan'
            this.load = true
            this.$http.post(uri, this.batal).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Berhasil di kembalikan ke transaksi";
                this.load = false;
                this.getDataTransaksi();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        });
        },
        createPDF () {
            let pdfName = this.bayar.kode; 
            var doc = new jsPDF('2', 'pt', 'a5', true);

            var img = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4REsRXhpZgAATU0AKgAAAAgABwEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAE7AAIAAAAQAAAAcodpAAQAAAABAAAIrpydAAEAAAAgAAAAguocAAcAAAgMAAAAogAAAAAAAABgAAAAAQAAAGAAAAABVmFuZXNzYSBBbmdlbGF+AFYAYQBuAGUAcwBzAGEAIABBAG4AZwBlAGwAYQB+AAAAHOoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABZADAAIAAAAUAAAI8JAEAAIAAAAUAAAJBJKRAAIAAAADMjUAAJKSAAIAAAADMjUAAOocAAcAAAgMAAAJGAAAAAAyMDIwOjA0OjA4IDExOjQ5OjQ0ADIwMjA6MDQ6MDggMTE6NDk6NDQAHOoAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4QsiaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIvPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj48eG1wOkNyZWF0ZURhdGU+MjAyMC0wNC0wOFQxMTo0OTo0NC4yNDY8L3htcDpDcmVhdGVEYXRlPjwvcmRmOkRlc2NyaXB0aW9uPjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSJ1dWlkOmZhZjViZGQ1LWJhM2QtMTFkYS1hZDMxLWQzM2Q3NTE4MmYxYiIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj48ZGM6Y3JlYXRvcj48cmRmOlNlcSB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxyZGY6bGk+VmFuZXNzYSBBbmdlbGF+PC9yZGY6bGk+PC9yZGY6U2VxPg0KCQkJPC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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'

            doc.addImage(img, "JPEG", 2, 1, 130, 80);
            
            doc.setFontSize(20)
            doc.text(180, 30, 'KOUVEE PET SHOP')
            doc.setFontSize(11)
            doc.text(150, 45, 'Jalan Moses GatotKaca No.22 Yogyakarta 55281')
            doc.setFontSize(11)
            doc.text(225, 60, 'Telp. (0274) 357735')
            doc.setFontSize(11)
            doc.text(195, 73, 'http://www.sayanghewan.com')
            // urutan line(padding, titik awal garis, panjang, titik akhir)
            doc.setLineWidth(0.5);
            doc.line(0, 80, 420, 80);
            doc.setFontSize(16)
            doc.text(157, 100, 'NOTA LUNAS')
            doc.setFontSize(10)
            doc.text(this.tglTransaksi, 373, 115, null, null, "right");
            doc.setFontSize(10)
            doc.text(20, 115, this.bayar.kode)
            doc.setFontSize(10)
            doc.text(20, 130, "Member : "+this.customer+"("+" "+this.bayar.hewan+" "+"-"+" "+this.jenis+" "+")")
            if(this.bayar.hewan=="Guest"){
                doc.setFontSize(10)
                doc.text(20, 145, "Telepon : 0")
            }else{
                doc.setFontSize(10)
                doc.text(20, 145, "Telepon : "+this.no_telp)
            }
            doc.setFontSize(10)
            doc.text(280, 130, "CS    : "+this.bayar.cs)
            doc.setFontSize(10)
            doc.text(280, 145, "Kasir : "+this.namakasir)
            doc.setLineWidth(0.2);
            doc.line(0, 152, 420, 152);
            doc.setFontSize(12)
            doc.text(185, 165, 'Produk')
            doc.setLineWidth(0.2);
            doc.line(0, 170, 420, 170);
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(20, 195, "No")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(60, 195, "Nama Produk")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(250, 195, "Harga")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(305, 195, "Jumlah")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(360, 195, "Total")
            doc.setLineWidth(0.2);
            doc.line(20, 200, 400, 200);
            doc.setFontStyle("normal");
            let k=10;
            for (let i = 0, j = 1; i < this.detailsTp.length; i++) {
                var splitproduk = doc.splitTextToSize(this.detailsTp[i].produk, 180);
                doc.text(22, 210+k , j.toString())
                doc.text(60, 210+k , splitproduk)
                doc.text(250, 210+k , this.detailsTp[i].harga)
                doc.text(315, 210+k , this.detailsTp[i].jumlah)
                doc.text(360, 210+k , this.detailsTp[i].total)
                j++;
                k+=28;
            }

            doc.setLineWidth(0.2);
            doc.line(20, 210+k-21, 400, 210+k-21);
            doc.text(280, 210+k, "Sub Total")
            doc.text(345, 210+k, "Rp."+this.temp.sub_total.toString())
            var diskon = this.percentTemp
            doc.text(280, 210+k+22, "Diskon")
            doc.text(345, 210+k+22, "Rp."+diskon.toString())
            doc.setFontStyle("bold");
            doc.setFontSize(12)
            var total = this.temp.sub_total-diskon
            doc.text(280, 210+k+44, "Total")
            doc.text(345, 210+k+44, "Rp."+total.toString())

            doc.setProperties({
                title: "Nota Transaksi No."+this.bayar.kode
            });
            var string = doc.output('dataurlnewwindow');
            var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
            var x = window.open();
            x.document.open();
            x.document.write(embed);
            x.document.close();
        },
    },
    mounted(){
        this.loadHewanById();
        this.getDataTransaksi();
        this.getDetailData();
        this.getDataProduk();
        this.loadHewan();
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
    },
}
</script>