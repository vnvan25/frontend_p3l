<template>
    <v-container>
        <v-card class="pa-md-4 mx-lg-auto" max-width="900">
             <v-toolbar
                flat
                color="#DEAE8D"
                >
                 <v-toolbar-title class=" text-center font-weight-bold" >History Penjualan Produk Kouvee Pet Shop</v-toolbar-title>
                
             </v-toolbar>
             <br>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn
                        depressed
                        dark
                        rounded
                        style="text-transform: none !important;"
                        color="green accent-3"
                        link to="/transaksiProduk">
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Transaksi Penjualan
                        </v-btn>
                    </v-flex>
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
                            <!-- <td>{{ item.sub_total }}</td> -->
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
                                            <span>Aksi Transaksi</span>
                                            </v-tooltip>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                            <v-list-item-title  @click="showHandler(item); tempHandler(item)">Details</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title @click="konfirmasiHandler(item)">Konfirmasi</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title @click="editHandler(item)">Edit</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title @click="batalHandler(item)">Batalkan</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                        </v-menu>
                                    </div>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            <!-- </v-container> -->
        </v-card>
         <!-- </div> -->
        <br>
        <!-- card untuk yang dibatalin -->
        <v-card class="pa-md-4 mx-lg-auto" color="#FFE4E1" max-width="900">
            <v-card-title>
                Lihat List Pemesanan yang dibatalkan
            </v-card-title>
            <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn
                        rounded
                        class="text-black"
                        color="#B0C4DE"
                        link to="/listBatalProduk">
                            Telusuri Halaman
                            <v-icon size="18" class="mr-2">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-flex>
            </v-layout>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Detail Produk</span>
                </v-card-title>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn
                        depressed
                        dark
                        rounded
                        style="text-transform: none !important;"
                        color="green accent-3"
                        @click="dialogDetail = true">

                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                        Tambah
                        </v-btn>
                    </v-flex>
                </v-layout>
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
                                <div v-if="type == 'new'">
                                    <v-autocomplete
                                    v-model="selectedProduk"
                                    :items="produks"
                                    filled
                                    :hint="value"
                                    dense
                                    item-value="id_produk" item-text="nama"
                                    return-object
                                    label="Pilihan Produk*"
                                    required
                                ></v-autocomplete>
                                </div>
                                <div v-else>
                                    <v-text-field :value="value" label="Nama Produk" disabled></v-text-field>
                                </div>
                                </v-col>
                                <v-col cols="12">
                                    <div v-if="type == 'new'">
                                        <v-btn color="orange darken-3"> Stok Tersisa Produk : {{selectedProduk.stok}} {{selectedProduk.satuan}} </v-btn>
                                    </div>
                                    <div v-else>
                                        <v-btn color="orange darken-3"> Stok Tersisa Produk : {{valuestok}}</v-btn>
                                    </div>
                                </v-col>
                                 <v-col cols="12">
                                    <div v-if="type == 'new'">
                                        <v-input v-model="form.total">  Harga Satuan Produk: {{selectedProduk.harga}} </v-input>
                                    </div>
                                    <div v-else>
                                        <v-input v-model="form.total">  Harga Satuan Produk: {{valueharga}} </v-input>
                                    </div>
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
                            <!-- <v-btn color="blue darken-1" text @click="Cek2()">Close</v-btn> -->
                            <!-- pengecekan -->
                            <!-- <div v-if="cek == true">  -->
                                <v-btn color="blue darken-1" text @click="Cek2(); setFormDetail()">Save</v-btn>
                            <!-- </div> -->
                            <!-- <div v-else> -->
                                <!-- <v-btn color="blue darken-1" text @click="setFormDetail()">Save</v-btn> -->
                            <!-- </div> -->
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                 <v-dialog v-model="dialogTransaksi" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Update Data Hewan</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-input hidden>Kode Transaksi : {{this.form.kode}}</v-input>
                                </v-col>
                                <v-col cols="12">
                                    <v-select v-model="selectedHewan" :items="hewan" item-value="id_hewan" :hint="hew" item-text="nama" label="Nama Hewan Pelanggan*" return-object required > 
                                        <option v-for="hew in hewan" :key="hew.id_hewan" >{{ hew.nama }}</option>
                                    </v-select>
                                    <v-input> Pemilik : {{ selectedHewan.customer }} </v-input>
                                    <v-input> Hewan : {{ selectedHewan.jenis_hewan }} </v-input>
                                    <v-input> Ukuran Hewan : {{ selectedHewan.ukuran_hewan }} </v-input>
                                </v-col>  
                            </v-row>
                        </v-container>
                        <small>*Yang dapat diedit hanya nama hewan pelanggan</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogTransaksi = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogGuest" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Update Data Hewan</span>
                        </v-card-title>
                        <v-card-text>
                            Guest Tidak dapat melakukan update
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogGuest = false">Close</v-btn>
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
            status:'',
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
                },
                {
                    text: 'Aksi',
                    value: 'aksi',
                }
            ],
            rules: {
                age: [
                    val => val < this.selectedProduk.stok || 'Sesuai Stok',
                ]
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
                // {
                //     text: 'Sub Total',
                //     value: 'sub_total',
                // },
                {
                    text: 'Total Harga',
                    value: 'sub_total',
                },
                // {
                //     text: 'Konfirmasi',
                //     value: 'konfirmasi',
                // },
                {
                    text: 'Aksi',
                    value: 'null',
                },
            ],
            transactions: [],
            detailsTp: [],
            produks: [],
            hewan: [],
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
            tp : new FormData,
            dtl : new FormData,
            upd : new FormData,
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
            value:'',
            valueID: '',
            valueharga: '',
            valuestok: '',
            hew: '',
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
            var uri = this.$apiUrl + '/transaksi_produk'
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
        sendData(){
            this.produk.append('nama', this.form.nama);
            this.produk.append('harga', this.form.harga);
            this.produk.append('stok', this.form.stok);
            this.produk.append('satuan', this.form.satuan);
            this.produk.append('minimal', this.form.minimal);
            // this.produk.append('gambar', this.upload);
            this.produk.append('gambar', this.selectedFile, this.selectedFile.nama);
            this.produk.append('deskripsi', this.form.deskripsi);
            var uri =this.$apiUrl + '/produk'
            this.load = true
            this.$http.post(uri, this.produk).then( (response) =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;

                this.load = false;
                this.dialog = false
                this.getData();
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
            this.$confirm("Yakin Selesai melakukan pembelian produk").then(() => {
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
                // alert('Pesanan sudah di konfirmasi. Silahkan Lanjutkan ke Pembayaran')
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
            });
        },
        batal(){
        this.$confirm("Yakin ingin membatalkan transaksi No. "+this.form.kode+" ?").then(() => {
            this.tp.append('id_hewan', this.form.id_hewan);
            this.tp.append('id_pegawai_k', this.kasir);
            this.tp.append('id_pegawai_cs', this.form.id_pegawai_cs);
            this.tp.append('kode', this.form.kode);
            this.tp.append('tanggal', this.form.tanggal);
            this.tp.append('sub_total', this.form.sub_total);
            this.tp.append('total_harga', this.form.total_harga);
            this.tp.append('status', this.form.status);
            // this.tp.append('updated_by', this.form.updated_by);
            var uri = this.$apiUrl + '/transaksi_produk/' + this.batalId;
            this.load = true
            this.$http.post(uri, this.tp).then( (response) =>{
                // alert('Pesanan dibatalkan')
                this.$alert("Pesanan di batalkan");
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
            });
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
        konfirmasiHandler(item){
            this.form.id_hewan = item.id_hewan,
            this.form.id_pegawai_k = this.kasir,
            this.form.id_pegawai_cs = item.id_pegawai_cs,
            this.form.kode = item.kode,
            this.form.tanggal = item.tanggal,
            this.form.sub_total = item.sub_total,
            this.form.total_harga = item.total_harga,
            this.form.status = 'Pembayaran',
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
        editHandler(item){
            console.log(item.hewan)
            if(item.hewan == 'Guest'){
                this.dialogGuest = true;
            }else{
                this.typeInput = 'edit';
                this.dialogTransaksi = true;
                this.form.id_hewan = this.selectedHewan,
                this.form.id_pegawai_k = this.kasir,

                this.hew = item.hewan,
                this.form.id_pegawai_cs = item.id_pegawai_cs,
                this.form.kode = item.kode,
                this.form.tanggal = item.tanggal,
                this.form.sub_total = item.sub_total,
                this.form.total_harga = item.total_harga,
                this.form.status = 'Penjualan',
                this.updatedId = item.id_tp;
            }
        },
        editHandlerDetail(item){
            this.type = 'edit';
            this.dialogDetail = true;
            this.selectedProduk = this.selectedProduk;
            this.value= item.produk;
            this.valueID = item.id_produk;
            this.valueharga = item.harga;
            this.valuestok = item.stok;
            this.form.total = this.form.jumlah*item.harga;
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