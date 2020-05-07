<template>
    <v-container>
        <h1 class="mb-4 text-center font-weight-black black--text">Bagian Pengadaan Produk Kouvee Pet Shop</h1>
        <v-row>
            <v-col>
                <v-card class="pa-md-4 mt-5 mx-lg-auto" max-width="900">
                    <h3 class="mb-4 text-center font-weight-black black--text">List Produk Untuk Pengadaan</h3>
                    <v-divider></v-divider>
                    <div v-if="click==false">
                            <v-btn class="mt-5" small rounded color="#F4A460" @click="dialog='true'"><v-icon>mdi-plus</v-icon> Tambah Pengadaan</v-btn>
                        </div>
                    <div v-if="this.products.length==0">
                        <v-data-table
                        hide-default-header
                        hide-default-footer
                        class="mt-4">
                            <template v-slot:no-data>
                                <v-alert :value="true" border="left" color="red lighten-2"  dense outlined dark>
                                    <v-icon>mdi-close-octagon</v-icon>
                                    Tidak ada produk dengan stok minim
                                </v-alert>
                            </template>
                        </v-data-table>
                    </div>
                    <div v-else>
                        <div class="red lighten-2">
                            <h3 class="mb-4 mt-5 ml-4 white--text">Prioritas Pengadaan</h3>
                        </div>
                        <v-data-table
                            :headers="headers"
                            :items="products"
                            :search="keyword"
                            :loading="load"
                            hide-default-footer
                            class="mt-4">
                        <template v-slot:body="{ items }">
                            <tbody v-if="click==true">
                                <tr v-for="item in items" :key="item.id_produk" :class="selectedRows.indexOf(item.id_produk)>-1?'brown lighten-4':''" @click="rowClicked(item)">
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
                            <tbody v-else>
                                <tr v-for="item in items" :key="item.id_produk">
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
                        <div class="green lighten-2">
                            <h3 class="mb-4 mt-5 ml-4 white--text">Seluruh Produk</h3>
                        </div>
                        <v-data-table
                            :headers="headers"
                            :items="allproduk"
                            :search="keyword"
                            :loading="load"
                            hide-default-footer
                            class="mt-4">
                        <template v-slot:body="{ items }">
                            <tbody v-if="click==true">
                                <tr v-for="item in items" :key="item.id_produk" :class="selectedRows.indexOf(item.id_produk)>-1?'brown lighten-4':''" @click="rowClicked(item)">
                                    <td><img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="100px"></td>
                                    <td>{{ item.nama }}</td>
                                    <td>{{ item.harga }}</td>
                                    <td>
                                        <v-chip color="green" dark>{{ item.stok }}</v-chip>
                                    </td>
                                    <td>{{ item.satuan }}</td>
                                    <td>{{ item.minimal }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr v-for="item in items" :key="item.id_produk">
                                    <td><img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="100px"></td>
                                    <td>{{ item.nama }}</td>
                                    <td>{{ item.harga }}</td>
                                    <td>
                                        <v-chip color="green" dark>{{ item.stok }}</v-chip>
                                    </td>
                                    <td>{{ item.satuan }}</td>
                                    <td>{{ item.minimal }}</td>
                                </tr>
                            </tbody>
                        </template>
                        </v-data-table>

                </v-card>
            </v-col>
            <v-col cols="13" sm="12" md="4">
                <div v-if="click==true">
                    <v-card class="pa-md-4 mt-5 mb-5 mx-lg-auto" max-width="600">
                        <h3 class="mb-4 text-center font-weight-black black--text">Data Supplier</h3>
                        <v-divider></v-divider>
                        <v-card-text>Supplier : {{ this.supplierDetail.nama }}</v-card-text>
                        <v-card-text>Telepon  : {{ this.supplierDetail.no_telp }}</v-card-text>
                        <v-card-text>Alamat   : {{ this.supplierDetail.alamat }}</v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red lighten-3" small @click="dialogUpdate='true'">Update Data</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card class="pa-md-4 mt-5 mx-lg-auto" max-width="600">
                        <h3 class="mb-4 text-center font-weight-black black--text"><v-icon class="mr-2">mdi-32px mdi-dark mdi-cart</v-icon> Keranjang Pengadaan</h3>
                        <v-divider></v-divider>
                        <v-data-table
                        :items="pemesanan"
                        :loading="load"
                        hide-default-header
                        hide-default-footer>
                            <template v-slot:body="{ items }">
                                <tbody>
                                    <tr v-for="(item,index) in items" :key="item.id_detail_p">
                                        <td class="font-weight-bold brown-text">{{ index + 1 }}</td>
                                        <td class="font-weight-bold brown-text">{{ item.nama }}</td>
                                        <td>
                                        <v-edit-dialog
                                            :return-value.sync="item.jumlah"
                                            large
                                            persistent
                                            @save="save(item)"
                                            @cancel="cancel"
                                            @open="open"
                                            @close="close"
                                            >
                                            <div>{{ item.jumlah }}</div>
                                            <template v-slot:input>
                                                <div class="mt-4 title">Update Jumlah</div>
                                            </template>
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="jumlah"
                                                label="Edit"
                                                single-line
                                                counter
                                                autofocus
                                                ></v-text-field>
                                            </template>
                                            </v-edit-dialog>
                                        </td>
                                        <td class="font-weight-bold brown-text">Rp. {{ item.total }}</td>
                                    </tr>
                                </tbody>
                            </template>                           
                        </v-data-table>
                        <br>
                        <h4 class="ml-4 mb-4"> TOTAL TRANSAKSI : Rp.{{ total }}</h4>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red lighten-3" small @click="finish()">Selesai Pesan</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Pengadaan Produk</span>
                </v-card-title>
                <v-card-title class="font-weight-bold">
                    Pengadaan No. {{kode}}{{kodelength}}
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-autocomplete
                                    v-model="selectedSupplier"
                                    :items="supplier"
                                    filled
                                    dense
                                    item-value="id_supplier" item-text="nama"
                                    return-object
                                    label="Pilih Supplier*"
                                    required
                                ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            Alamat Supplier : {{selectedSupplier.alamat}}
                        </v-col>
                        <v-col cols="12">
                            Telepon Supplier : {{selectedSupplier.no_telp}}
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" class="mb-3" @click="sendData()">Save</v-btn>
                    <v-btn color="blue darken-1" class="mb-3 mr-4" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Update Supplier</span>
                </v-card-title>
                <v-card-title class="font-weight-bold">
                    Pengadaan No. {{tempKode}}
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-autocomplete
                                    v-model="selectedUpdate"
                                    :items="supplier"
                                    filled
                                    dense
                                    item-value="id_supplier" item-text="nama"
                                    return-object
                                    label="Pilih Supplier*"
                                    required
                                ></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            Alamat Supplier : {{selectedUpdate.alamat}}
                        </v-col>
                        <v-col cols="12">
                            Telepon Supplier : {{selectedUpdate.no_telp}}
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" class="mb-3" @click="updateSupplier()">Update</v-btn>
                    <v-btn color="blue darken-1" class="mb-3 mr-4" text @click="dialogUpdate = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogJumlah" persistent max-width="300px">
            <v-card>
                <v-card-title>Masukkan Jumlah</v-card-title>
                <v-text-field v-model="jumlah" class="ml-4 mr-4" :rules="rules.jumlah" min="1" placeholder="Jumlah" outlined type="number"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="simpan()">OK</v-btn>
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
            dialog: false,
            dialogJumlah: false,
            dialogUpdate: false,
            click: false,
            tambah: false,
            snack: false,
            snackColor: '',
            snackText: '',
            products: [],
            allproduk: [],
            supplier: [],
            supplierDetail: [],
            selectedRows: [],
            pemesanan: [],
            keyword: '',
            status:'',
            snackbar: false,
            color: null,
            text: '',
            load: false,
            headers: [
                {
                    text: '',
                    value: 'gambar',
                },
                {
                    text: 'Produk',
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
            selectedSupplier: 0,
            selectedUpdate: 0,
            kode: "PO-"+new Date().getFullYear().toString()+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + (new Date().getDate())).slice(-2)+"-",
            kodelength: 0,
            pengadaan: new FormData(),
            update: new FormData(),
            dtl: new FormData(),
            transaction: new FormData(),
            jumlah: new FormData(),
            tgl: new Date().toISOString(),
            status: "Proses",
            tempKode: 0,
            id_pengadaan: 0,
            data:{
                id_produk: '',
                harga : '',
                nama: '',
                tempIdProduk: '',
                minimal: 0,
                stok: 0,
                id_hapus: 0,
                jumlah: 0,
                id_supplier: 0,
            },
            rowTemp: [],
            handler: false,
            rules: {
                jumlah: [
                     v => v > 0  || 'Masukkan dengan benar',
                ],
            },
            grandTotalValue: 0,
            min: 0,
            jumlah: 0,
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
            var uri = this.$apiUrl + '/produk/stokHabis'
            this.$http.get(uri).then( (response) =>{
                this.products=response.data
                console.log(this.products)
            })
        },
        getDataSupplier(){
            var uri = this.$apiUrl + '/supplier?id_supplier='+this.id_supplier
            this.$http.get(uri).then( (response) =>{
                this.supplierDetail=response.data[0]
                console.log(this.supplierDetail)
            })
        },
        getAllProduk(){
            var uri = this.$apiUrl + '/produk/stok'
            this.$http.get(uri).then( (response) =>{
                this.allproduk=response.data
            })
        },
        getSupplier(){
            var uri = this.$apiUrl + '/supplier'
            this.$http.get(uri).then( (response) =>{
                this.supplier=response.data
            })
        },
        kode_supplier(){
            var uri = this.$apiUrl + '/pengadaan/codelength?kode='+this.kode
            console.log(this.kode)
            this.$http.get(uri).then( (response) =>{
                this.kodelength=response.data
                if(this.kodelength+1<10){
                    this.kodelength++;
                    this.kodelength = "0"+this.kodelength;
                }else{
                    this.kodelength++;
                }
                console.log(this.kodelength)
            })
        },
        cariId(){
            var uri = this.$apiUrl + '/pengadaan/searchKode?kode='+this.kode+this.kodelength;
            this.$http.get(uri).then( (response) =>{
                this.id_pengadaan=response.data[0].id_pengadaan
                console.log(this.id_pengadaan)
            })  
        },
        sendData(){
            this.pengadaan.append('id_supplier', this.selectedSupplier.id_supplier);
            this.pengadaan.append('kode', this.kode+this.kodelength);
            this.pengadaan.append('tanggal', this.tgl);
            this.pengadaan.append('status', this.status);
            this.pengadaan.append('total_harga', 0);
            this.tempKode = this.kode+this.kodelength;
            var uri =this.$apiUrl + '/pengadaan'
            this.load = true
            this.$http.post(uri, this.pengadaan).then(response =>{
                this.id_supplier = this.selectedSupplier.id_supplier;
                this.snackbar = true;
                this.color = 'green';
                this.text = "Berhasil Menambahkan Supplier";
                this.click=true;
                this.getDataSupplier();
                this.cariId();
                this.dialog =false;
                this.load = false;
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        updateSupplier(){
            this.update.append('id_supplier', this.selectedUpdate.id_supplier);
            this.update.append('id_pengadaan', this.id_pengadaan);
            var uri =this.$apiUrl + '/pengadaan/changeSupplier'
            this.load = true
            this.$http.post(uri, this.update).then(response =>{
                this.id_supplier = this.selectedUpdate.id_supplier;
                this.snackbar = true;
                this.color = 'green';
                this.text = "Berhasil Ubah Supplier";
                this.click=true;
                this.getDataSupplier();
                this.dialogUpdate =false;
                this.load = false;
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        rowClicked(row) {
            this.data.tempIdProduk = row.id_produk;
            this.data.stok =  row.stok;
            this.data.minimal = row.minimal;
            this.rowTemp= row;
            this.sendHandler(this.rowTemp);
        },
        simpan(){
            if(this.jumlah<=0){
                this.snackbar = true;
                this.text = 'Jumlah tidak boleh 0';
                this.color = 'red';
            }else{
                this.sendDetail();
            }
        },
        sendHandler(row){
                this.data.id_produk = row.id_produk,
                this.data.harga = row.harga,
                this.data.nama = row.nama,
                this.data.stok = row.stok,
                this.data.minimal = row.minimal
                this.swapSelectionStatus(row.id_produk);
                this.log(row);

        },
        swapSelectionStatus(keyID) {
            if (this.selectedRows.includes(keyID)) {
                this.selectedRows = this.selectedRows.filter(
                selectedKeyID => selectedKeyID !== keyID
                );
                this.detail_transaksi();
            } else {
                this.dialogJumlah = true;
                this.selectedRows.push(keyID);
            }
        },
        log(logItem){
            console.log(logItem);
        },
        detail_transaksi(){
            var uri = this.$apiUrl + '/detail_pengadaan/searchDetail?id_pengadaan='+this.id_pengadaan+'&id_produk='+this.data.tempIdProduk;
            this.$http.get(uri).then( (response) =>{
                this.id_hapus=response.data[0].id_detail_p
                this.delDetail()
            })  
        },
        delDetail(){
            var uri = this.$apiUrl + '/detail_pengadaan/' + this.id_hapus;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = 'Berhasil Menghapus data';
                this.getPemesanan();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        },
        getPemesanan(){
            var uri = this.$apiUrl + '/detail_pengadaan?id_pengadaan='+this.id_pengadaan;
            this.$http.get(uri).then( (response) =>{
                this.pemesanan=response.data
            })
        },
        sendDetail(){
            this.dialogJumlah = true;
            if(this.jumlah<=0){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Jumlah Tidak Boleh 0";
            }else{
                this.dtl.append('id_pengadaan', this.id_pengadaan);
                this.dtl.append('id_produk', this.data.id_produk);
                this.dtl.append('jumlah', this.jumlah);
                this.dtl.append('total', this.data.harga*this.jumlah);
                var uri =this.$apiUrl + '/detail_pengadaan'
                this.load = true
                this.$http.post(uri, this.dtl).then(response =>{
                    this.snackbar = true;
                    this.color = 'green';
                    this.text = "Produk "+this.data.nama+" "+"berhasil ditambahkan";
                    this.load = false;
                    this.getPemesanan();
                    this.dialogJumlah=false;
                    this.jumlah=0;
                    // this.resetFormDetail();
                }).catch(error =>{
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            }
        },
        grandTotal(){
            return this.pemesanan.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
        finish(){
            if(this.pemesanan.length==0){
                this.snackbar = true;
                this.text = 'Anda Belum Memesan Produk Apapun';
                this.color = 'red';
            }else{
                this.grandTotalValue = this.grandTotal();
                this.updateData();
            }
        },
        updateData(){
        this.$confirm("Yakin Selesai Memesan?").then(() => {
            this.transaction.append('id_pengadaan', this.id_pengadaan);
            this.transaction.append('total_harga', this.grandTotalValue);
            var uri =this.$apiUrl + '/detail_pengadaan/changeTotal'
            this.snackbar = true;
            this.color = 'green';
            this.text = 'Pemesanan Pengadaan Selesai';
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.load = false;
                location.reload();
            }).catch(error =>{
                this.load = false;
            })
        });
        },
        updateJumlah(item){
            if(this.jumlah<=0){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Minimal Jumlah adalah 1";
            }else{
                this.jumlah.append('id_detail_p', item.id_detail_p);
                this.jumlah.append('jumlah', this.jumlah);
                this.jumlah.append('harga', item.harga);
                var uri =this.$apiUrl + '/detail_pengadaan/changeJumlah'
                this.load = true
                this.$http.post(uri, this.jumlah).then( (response) =>{
                    this.load = false;
                    this.snackbar = true
                    this.color = 'success'
                    this.text = 'Data saved'
                    this.jumlah = 0,
                    this.getPemesanan();
                }).catch(error =>{
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            }
        },
        save(item) {
             console.log(item)
            this.updateJumlah(item)
        },
        cancel () {
            this.snackbar = true
            this.color = 'error'
            this.text = 'Canceled'
        },
        open () {
            this.snackbar = true
            this.color = 'info'
            this.text = 'Dialog opened'
        },
        close () {
            console.log('Dialog closed')
        },
    },
    mounted(){
        this.getData();
        this.getAllProduk();
        this.getSupplier();
        this.kode_supplier();
        this.getDataSupplier();
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