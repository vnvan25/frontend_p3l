<template>
    <v-container>
        <h1 class="text-center mt-5" style="color: #DEB887; font-family:Sans-serif">Pengadaan Kouvee Pet Shop</h1>
        <div v-if="type=='new'">
        <v-card flat width="800" >
                <v-card-text>
                    <div class="ml-6 mt-5 mb-n7"><h3>Pengadaan No. {{kode}}{{kodelength}}</h3></div>
                    <v-container>
                        <v-row>
                            <v-col cols="7">
                            <v-col cols="12">
                                <v-card-text class="ml-n4">Pilih Supplier Pengadaan</v-card-text>
                                <v-autocomplete
                                        v-model="selectedSupplier"
                                        :items="supplier"
                                        filled
                                        dense
                                        outlined
                                        item-value="id_supplier" item-text="nama"
                                        return-object
                                        placeholder="Supplier"
                                        required
                                    ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" class="mt-n8">
                                Alamat Supplier : {{selectedSupplier.alamat}}
                            </v-col>
                            <v-col cols="12" class="mt-n3">
                                Telepon Supplier : {{selectedSupplier.no_telp}}
                            </v-col>
                            </v-col>
                            <v-col cols="8" class="mt-n6 ml-5">
                                <v-row>
                                    <v-btn color="#DEB887" class="mt-5" @click="sendDataSupplier();" rounded>Simpan</v-btn>
                                    <v-btn text @click="selectedSupplier=''" class="ml-2 mt-5" color="error">Batal</v-btn>
                                    <!-- <v-btn text @click="cardProduk=true" class="ml-2 mt-5" color="error">Batal</v-btn> -->
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
            </div>
            <div v-else>
                    <v-card flat width="800">
                    <v-card-text>
                        <div class="ml-6 mt-5 "><h3>Pengadaan No. {{tempKode}}</h3></div>
                        <v-container>
                            <v-row>
                                <v-col cols="7">
                                <v-col cols="12">
                                    <v-autocomplete
                                            v-model="selectedSupplier"
                                            :items="supplier"
                                            filled
                                            dense
                                            outlined
                                            item-value="id_supplier" item-text="nama"
                                            return-object
                                            label="Pilih Supplier*"
                                            required
                                        ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="mt-n8">
                                    Alamat Supplier : {{selectedSupplier.alamat}}
                                </v-col>
                                <v-col cols="12" class="mt-n3">
                                    Telepon Supplier : {{selectedSupplier.no_telp}}
                                </v-col>
                                </v-col>
                                <v-col cols="8" class="mt-n6 ml-5">
                                    <v-row>
                                        <v-btn color="#DEB887" rounded class="mb-2" @click="updateSupplier()">Update</v-btn>
                                        <!-- <v-btn text @click="e6=2"  class="ml-2 mb-2" color="error">Batal</v-btn> -->
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
            </div>
            <v-divider></v-divider>
            <v-card v-if="cardProduk==true" flat class="mt-5 mx-lg-auto" width="800">
                <v-row>
                <h1 class="text-center mt-2 ml-7" style="color: #DEB887; font-family:Sans-serif">Pilih Produk</h1>
                <v-spacer></v-spacer>
                <v-divider
                class="mx-6"
                vertical
                ></v-divider>
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-width="350"
                    offset-y
                >
                <template v-slot:activator="{ on }">
                    <br>
                        <v-btn icon color="black" class="mt-5" v-on="on">
                        <v-badge
                        dot
                        color="red"
                        >
                        <v-icon class=""> mdi-36px mdi-cart-outline</v-icon>
                        </v-badge>
                        </v-btn>
                </template>
                <v-card>
                    <div v-if="this.pemesanan.length!=0">
                    <br>
                    <h4 class="ml-4" style="color: #DEB887;">Produk pengadaan yang dipesan : </h4>
                    <br>
                    <v-data-table
                        hide-default-header
                        :items="pemesanan"
                        hide-default-footer
                        >
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
                                            <div><v-chip color="#DEB887" label dark>{{ item.jumlah }}</v-chip></div>
                                            <template v-slot:input>
                                                <div class="mt-4 title">Update Jumlah</div>
                                            </template>
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="jumlah"
                                                :hint="'Jumlah sebelumnya : '+item.jumlah+' item'"
                                                label="Edit"
                                                single-line
                                                autofocus
                                                ></v-text-field>
                                            </template>
                                            </v-edit-dialog>
                                        </td>
                                        <td class="font-weight-bold brown-text">Rp. {{ item.total }}</td>
                                        <td>
                                            <v-btn icon
                                                @click="delDetail(item.id_detail_p); updateTotalKurang(item.total)"
                                            ><v-icon>mdi-delete</v-icon></v-btn>
                                        </td>
                                    </tr>
                        </tbody>
                    </template>
                    </v-data-table>
                    </div>
                    <div v-else>
                        <br>
                        <h4 class="ml-4" style="color: red;">Belum ada pengadaan produk</h4>
                    </div>
                    <br>
                    <h5 class="ml-4 mb-4"> TOTAL TRANSAKSI : Rp.{{ total }},-</h5>
                    <v-divider></v-divider>


                    <v-card-actions>
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn text color="red" @click="cetak()" v-on="on">Cetak Pemesanan</v-btn>
                    </template>
                    <span>Pesanan akan langsung selesai <br>dan data tidak dapat diubah</span>
                    </v-tooltip>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn color="#DEB887" @click="finish()" class="mb-2 mt-2" v-on="on">Selesai</v-btn>
                    </template>
                    <span>Pesanan akan dialihkan ke bagian History</span>
                    </v-tooltip>
                    <!-- <v-btn color="#DEB887" @click="finish()" class="mb-2 mt-2" flat>Selesai</v-btn> -->
                    </v-card-actions>
                </v-card>
                </v-menu>
                </v-row>
                    <v-data-table
                        hide-default-header
                        :items="allproduk"
                        hide-default-footer
                        class="mt-5 ">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="item in items" :key="item.id_produk">
                                <td><img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="50px"></td>
                                <td>{{ item.nama }}</td>
                                <td>Rp.{{ item.harga }},-</td>
                                <td>
                                    <v-chip :color="getColor(item.stok, item.minimal)" small dark>{{ item.stok }}</v-chip>
                                </td>
                                <td>{{ item.satuan }}</td>
                                <td>
                                    <v-btn icon
                                        @click="dialogJumlah = true; sendHandler(item)"
                                    ><v-icon>mdi-plus</v-icon></v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
            </v-card>
            <v-dialog v-model="dialogJumlah" persistent max-width="300px">
            <v-card>
                <v-card-title>Masukkan Jumlah</v-card-title>
                <v-text-field v-model="jumlah" class="ml-4 mr-4" :rules="rules.jumlah" min="1" placeholder="Jumlah" outlined type="number"></v-text-field>
                <v-card-actions>
                    <v-btn text color="red" @click="dialogJumlah=false">Cancel</v-btn>
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
import jsPDF from 'jspdf';
import 'jspdf-autotable'
  export default {
    data () {
      return {
        dialogJumlah: false,
        cardProduk: false,
        kode: "PO-"+new Date().getFullYear().toString()+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + (new Date().getDate())).slice(-2)+"-",
        kodelength: 0,
        e6: 1,
        keyword: '',
        menu: false,
        status:'',
        snackbar: false,
        color: null,
        text: '',
        load: false,
        jumlah: 0,
        //formData
        pengadaan: new FormData(),
        update: new FormData(),
        dtl: new FormData(),
        transaction: new FormData(),
        jlh: new FormData(),
        tgl: new Date().toISOString(),
        tglTransaksi: new Date().toLocaleString(),
        konfirmasi: new FormData,
        status: "Proses",
        //data supplier
        type: 'new',
        selectedSupplier: 0,
        supplier: [],
        supplierDetail: 0,
        id_supplier: 0,
        //data produk
        minimum: [],
        allproduk: [],
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
            headers2: [
                {
                    text: '',
                    value: 'gambar',
                },
                {
                    text: '',
                    value: 'nama',
                },
                {
                    text: '',
                    value: 'harga',
                },
                {
                    text: '',
                    value: 'stok',
                },
                {
                    text: '',
                    value: 'satuan',
                },
                {
                    text: '',
                    value: 'minimal',
                },
            ],
            //keranjang belanja
            pemesanan: [],
            selectedRows: [],
            rowTemp: [],
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
            rules: {
                jumlah: [
                     v => v > 0  || 'Masukkan dengan benar',
                ],
            },
            grandTotalValue: 0,
            totalBeli: 0,
      }
    },
    computed: {
        total: function(){
            return this.pemesanan.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        }
    },
    methods: {
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
        getSupplier(){
            var uri = this.$apiUrl + '/supplier'
            this.$http.get(uri).then( (response) =>{
                this.supplier=response.data
            })
        },
        getDataSupplier(){
            var uri = this.$apiUrl + '/supplier?id_supplier='+this.id_supplier
            this.$http.get(uri).then( (response) =>{
                this.supplierDetail=response.data[0]
                console.log(this.supplierDetail)
            })
        },
        cariId(){
            var uri = this.$apiUrl + '/pengadaan/searchKode?kode='+this.kode+this.kodelength;
            this.$http.get(uri).then( (response) =>{
                this.id_pengadaan=response.data[0].id_pengadaan
                console.log(this.id_pengadaan)
            })  
        },
        getAllProduk(){
            var uri = this.$apiUrl + '/detail_pengadaan/getProduk?id_pengadaan='+this.id_pengadaan
            this.$http.get(uri).then( (response) =>{
                this.allproduk=response.data
            })
        },
        getColor(stok, minimal) {
            if ((stok-minimal)<0 || stok==minimal) return 'red'
            else return 'green'
        },
        //tambah supplier
        sendDataSupplier(){
            if(this.selectedSupplier==''){
                this.snackbar = true;
                this.text = 'Isi Terlebih Dahulu Data Supplier untuk Melanjutkan.';
                this.color = 'red';
            }else{
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
                    // this.getPemesanan();
                    this.cardProduk=true;
                    this.type='edit';
                    this.load = false;
                }).catch(error =>{
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            }
        },
        updateSupplier(){
            this.update.append('id_supplier', this.selectedSupplier.id_supplier);
            this.update.append('id_pengadaan', this.id_pengadaan);
            var uri =this.$apiUrl + '/pengadaan/changeSupplier'
            this.load = true
            this.$http.post(uri, this.update).then(response =>{
                this.id_supplier = this.selectedSupplier.id_supplier;
                this.snackbar = true;
                this.color = 'green';
                this.text = "Berhasil Ubah Supplier";
                this.getDataSupplier();
                this.e6 = 2;
                this.load = false;
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        //pemesanan
        rowClicked(row) {
            this.data.tempIdProduk = row.id_produk;
            this.data.stok =  row.stok;
            this.data.minimal = row.minimal;
            this.rowTemp= row;
            this.sendHandler(this.rowTemp);
        },
        sendHandler(row){
                this.data.tempIdProduk = row.id_produk;
                this.data.id_produk = row.id_produk,
                this.data.harga = row.harga,
                this.data.nama = row.nama,
                this.data.stok = row.stok,
                this.data.minimal = row.minimal
                // this.swapSelectionStatus(row.id_produk);
                // this.log(row);
        },
        cetak(){
             if(this.pemesanan.length==0){
                this.snackbar = true;
                this.text = 'Anda Belum Memesan Produk Apapun';
                this.color = 'red';
            }else{
            this.$confirm("Cetak Surat Pemesanan?").then(() => {
            this.konfirmasi.append('id_pengadaan', this.id_pengadaan);
            this.konfirmasi.append('status', "Dipesan");
            var uri =this.$apiUrl + '/pengadaan/changeStatus'
            this.load = true
            this.$http.post(uri, this.konfirmasi).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Surat Berhasil di cetak";
                this.load = false;
                // this.tanggal();
                location.reload();
                this.createPDF();
                location.reload();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = this.errors;
                this.color = 'red';
                this.load = false;
            })
            });
            }
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
        getPemesanan(){
            var uri = this.$apiUrl + '/detail_pengadaan?id_pengadaan='+this.id_pengadaan;
            this.$http.get(uri).then( (response) =>{
                this.pemesanan=response.data
            })
            
        },
        getTotal(){
            var uri = this.$apiUrl + '/detail_pengadaan/total?id_pengadaan=1'+this.id_pengadaan;
            this.$http.get(uri).then( (response) =>{
                this.totalBeli=response.data[0].total
                console.log(this.totalBeli)
            })
        },
        detail_transaksi(){
            var uri = this.$apiUrl + '/detail_pengadaan/searchDetail?id_pengadaan='+this.id_pengadaan+'&id_produk='+this.data.tempIdProduk;
            this.$http.get(uri).then( (response) =>{
                this.id_hapus=response.data[0].id_detail_p
                this.delDetail()
            })  
        },
        delDetail(deleteID){
            var uri = this.$apiUrl + '/detail_pengadaan/' + deleteID;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = 'Berhasil Menghapus data';
                this.getPemesanan();
                this.getAllProduk();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
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
                    this.updateTotalTambah(this.data.harga*this.jumlah)
                    this.getPemesanan();
                    this.getAllProduk();
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
            this.text = 'Pemesanan Pengadaan Selesai. Lihat Pesanan di History untuk mengedit';
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.load = false;
                location.reload();
            }).catch(error =>{
                this.load = false;
            })
        });
        },
        updateTotalTambah(harga){
            this.transaction.append('id_pengadaan', this.id_pengadaan);
            this.transaction.append('total_harga', harga);
            var uri =this.$apiUrl + '/detail_pengadaan/changeTotalby'
            this.$http.post(uri, this.transaction).then(response =>{
                this.load = false;
            }).catch(error =>{
                this.load = false;
            })
        },
        updateTotalKurang(harga){
            this.transaction.append('id_pengadaan', this.id_pengadaan);
            this.transaction.append('total_harga', harga);
            var uri =this.$apiUrl + '/detail_pengadaan/changeTotalmin'
            this.$http.post(uri, this.transaction).then(response =>{
                this.load = false;
            }).catch(error =>{
                this.load = false;
            })
        },
        updateJumlah(item){
            if(this.jumlah<=0){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Minimal Jumlah adalah 1";
            }else{
                this.jlh.append('id_detail_p', item.id_detail_p);
                this.jlh.append('jumlah', this.jumlah);
                this.jlh.append('harga', item.harga);
                var uri =this.$apiUrl + '/detail_pengadaan/changeJumlah'
                this.load = true
                this.$http.post(uri, this.jlh).then( (response) =>{
                    this.load = false;
                    this.snackbar = true
                    this.color = 'success'
                    this.text = 'Data saved'
                    this.getPemesanan();
                    this.jumlah = 0;
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
            this.text = 'Silahkan update jumlah'
        },
        close () {
            console.log('Batal Update')
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
         createPDF(){
            let pdfName = this.tempKode; 
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
            doc.setFontSize(13)
            doc.text(150, 100, 'SURAT PEMESANAN')
            doc.setFontSize(10)
            doc.text("No : "+this.tempKode.toString(), 384, 125, null, null, "right");
            doc.setFontSize(10)
            var date = new Date();
            var hari = date.getDate();
            var bulan = date.getMonth();
            if(bulan=='0'){
                bulan = "january";
            }else if(bulan=='1'){
                bulan = "februari";
            }else if(bulan=='2'){
                bulan = "Maret";
            }else if(bulan=='3'){
                bulan = "April";
            }else if(bulan=='4'){
                bulan = "Mei";
            }else if(bulan=='5'){
                bulan = "Juni";
            }else if(bulan=='6'){
                bulan = "July";
            }else if(bulan=='7'){
                bulan = "Agustus";
            }else if(bulan=='8'){
                bulan = "September";
            }else if(bulan=='9'){
                bulan = "Oktober";
            }else if(bulan=='10'){
                bulan = "November";
            }else if(bulan=='11'){
                bulan = "Desember";
            }
            var year = date.getFullYear();
            doc.text("Tanggal : "+hari+" "+bulan+" "+year, 380, 145, null, null, "right");
            
            doc.setLineDash([2.5]);
            doc.setLineWidth(1);
            doc.rect(40, 150, 140, 70);

            doc.setFontSize(10)
            doc.text(45, 165, 'Kepada Yth.')
            doc.setFontSize(10)
            var supplier = this.selectedSupplier.nama;
            doc.text(45, 180, supplier.toString())
            doc.setFontSize(10)
            var alamat = this.selectedSupplier.alamat;
            doc.text(45, 195, alamat.toString())
            doc.setFontSize(10)
            var telp = this.selectedSupplier.no_telp;
            doc.text(45, 210, telp.toString())
            doc.setFontSize(10)
            doc.text(40, 240, "Mohon untuk disediakan produk-produk berikut ini :")

            doc.setFontStyle("bold");
            doc.text(50, 265 , "No")
            doc.text(80, 265 , "Nama Produk")
            doc.text(260, 265 , "Satuan")
            doc.text(330, 265 , "Jumlah")
            doc.setFontStyle("normal");
            doc.setLineWidth(1);
            doc.setLineDash();
            doc.line(40, 275, 390, 275);

            let k=10;
            for (let i = 0, j = 1; i < this.pemesanan.length; i++) {
                var split = doc.splitTextToSize(this.pemesanan[i].nama, 150);
                doc.text(50, 285+k , j.toString())
                doc.text(80, 285+k , split)
                doc.text(260, 285+k , this.pemesanan[i].satuan)
                doc.text(342, 285+k , this.pemesanan[i].jumlah)
                j++;
                k+=28;
            }
            doc.setLineWidth(1);
            doc.setLineDash();
            doc.rect(40, 250, 350, k+28);

            doc.setLineWidth(1);
            doc.setLineDash();
            doc.line(70, 250, 70, 278+k);

            doc.setLineWidth(1);
            doc.setLineDash();
            doc.line(250, 250, 250, 278+k);

            doc.setLineWidth(1);
            doc.setLineDash();
            doc.line(315, 250, 315, 278+k);

            doc.text(220, 320+k , "Dicetak tanggal "+this.tglTransaksi)
            
            doc.setProperties({
                title: "Surat Pemesanan No."+this.tempKode
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
        this.kode_supplier();
        this.getSupplier();
        this.getAllProduk();
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