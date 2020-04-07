<template>
    <v-container>
        <v-card >
             <v-toolbar
                flat
                color="brown lighten-1"
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
                            <td><v-btn @click="showHandler(item); tempHandler(item)">{{ item.kode }}</v-btn></td>
                            <td>{{ item.tanggal }}</td>
                            <td>{{ item.hewan }}</td>
                            <td>{{ item.customer_service }}</td>
                            <td>{{ item.sub_total }}</td>
                            <td>
                                <v-btn
                                color="blue lighten-3"
                                light
                                @click="bayarHandler(item)"
                                >
                                Bayar
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </v-container>
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
                                <v-autocomplete
                                    v-model="selectedProduk"
                                    :items="produks"
                                    dense
                                    filled
                                    item-value="id_produk" item-text="nama"
                                    return-object
                                    label="Pilihan Produk*"
                                    required
                                ></v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn color="orange darken-3"> Stok Tersisa Produk : {{selectedProduk.stok}}{{selectedProduk.satuan}} </v-btn>
                                </v-col>
                                 <v-col cols="12">
                                    <v-input v-model="form.total">  Harga Satuan : {{selectedProduk.harga}} </v-input>
                                </v-col>
                                <v-col cols="12">
                                    <!-- <v-text-field label="Jumlah*" v-model="form.jumlah"  required></v-text-field> -->
                                    <v-slider
                                            v-model="form.jumlah"
                                            :rules="rules.age"
                                            color="orange"
                                            label="Jumlah Beli"
                                            hint="Pilih Jumlah Pembelian"
                                            min="0"
                                            :max = selectedProduk.stok
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
                                <v-divider :inset="inset"></v-divider>
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
                                <v-text-field v-model="percent" label="Input Diskon" placeholder="% - Percent" disabled></v-text-field>
                                <small class="text-weight-black">*Diskon hanya untuk member</small>
                            </div>
                            <div v-else>
                                <v-text-field v-model="percent" label="Input Diskon" placeholder="% - Percent" type="number" :rules="rules.number"></v-text-field>
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
                                    <td> : Rp.{{ totalBeli-(totalBeli*percent/100)}} </td>
                                </tr>
                                <tr>
                                    <td>Diskon</td>
                                    <td> : Rp.{{ (totalBeli*percent/100) }} </td>
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
                                <p>Kembalian : Rp.{{uang-(totalBeli-(totalBeli*percent/100))}}</p>
                            </v-card>
                            <br>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1">Bayar dan Cetak Nota</v-btn>
                            <v-btn color="blue darken-1" text @click="dialogBayar = false">Close</v-btn>
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
            namakasir: localStorage.getItem("nama"),
            dialogBayar: false,
            dialogTransaksi: false,
            dialogDetail: false,
            dialog: false,
            keyword: '',
            status:'',
            percent: 0,
            diskon: 0,
            uang: 0,
            selectedProduk: 0,
            selectedHewan: 0,
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
                     v => v < 100 && v > 0  || 'Rannge hanya max. 100',
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
            },
            tp : new FormData,
            dtl : new FormData,
            upd : new FormData,
            minus : new FormData,
            typeInput: 'new',
            type: 'new',
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
            customer: '',
            no_telp:'',
            totalBayar: 0,
            
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
            // if(this.temp.hewan != 'Guest'){
                 this.temp.sub_total = this.totalBeli2()
                console.log(this.totalBeli2())
                this.updateDataTemp()
            // }else{
            //     //  this.totalall = this.totalBeli2()
            //     console.log('aaaaa')
            //     // this.updateDataCheck()
            // }
            // alert('OK') 
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
        getDataProduk(){
            var uri = this.$apiUrl + '/produk'
            this.$http.get(uri).then( (response) =>{
                this.produks=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
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
            this.password.append('id_pegawai', localStorage.getItem("id_pegawai"));
            this.password.append('password', this.pass.confirm);
            var uri =this.$apiUrl + '/pegawai/changePassword'
            this.load = true
            this.$http.post(uri, this.password).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Ubah Password Berhasil!";
                localStorage.setItem("password", this.pass.confirm);
                this.load = false;
                this.dialog = false;
                this.resetForm();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })

        },
        konfirmasi(){
            this.tp.append('id_hewan', this.form.id_hewan);
            this.tp.append('id_pegawai_k', this.kasir);
            this.tp.append('id_pegawai_cs', this.form.id_pegawai_cs);
            this.tp.append('kode', this.form.kode);
            this.tp.append('tanggal', this.form.tanggal);
            this.tp.append('sub_total', this.form.sub_total);
            this.tp.append('total_harga', this.form.total_harga);
            this.tp.append('status', this.form.status);
            // this.tp.append('updated_by', this.form.updated_by);
            var uri = this.$apiUrl + '/transaksi_produk/' + this.konfirmasiId;
            this.load = true
            this.$http.post(uri, this.tp).then( (response) =>{
                alert('Pesanan sudah di konfirmasi. Silahkan Lanjutkan ke Pembayaran')
                this.load = false;
                this.dialog = false
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
                this.getData();
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
            this.dtl.append('id_produk', this.selectedProduk.id_produk);
            this.dtl.append('jumlah', this.form.jumlah);
            this.dtl.append('total', this.selectedProduk.harga*this.form.jumlah);
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
                this.tempKode = id.id_tp;
                this.getDetailData();
                this.loadHewanById();
        },
        konfirmasiHandler(item){
            this.form.id_hewan = item.id_hewan,
            this.form.id_pegawai_k = this.kasir,
            this.form.id_pegawai_cs = item.id_pegawai_cs,
            this.form.kode = item.kode,
            this.form.tanggal = item.tanggal,
            this.form.sub_total = item.sub_total,
            this.form.total_harga = item.total_harga,
            this.form.status = 'pembayaran',
            this.konfirmasiId = item.id_tp;
            this.konfirmasi();
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
            this.form.total = this.form.jumlah*this.selectedProduk.harga;
            this.selectedProduk = this.selectedProduk;
            console.log(this.selectedProduk)
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
            var uri = this.$apiUrl + '/tp_detail/' + deleteId;
            console.log(uri)
            this.$http.delete(uri).then( response =>{
                alert('Berhasil Hapus Data')
                this.deleteDialog = false
                this.getDetailData();
            }).catch(error =>{
                alert('Kenapa keisni')
                this.errors = error
                console.log(this.errors)
            })
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
        }
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