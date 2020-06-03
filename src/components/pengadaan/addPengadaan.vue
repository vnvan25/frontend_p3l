<template>
<v-container>
    <h2 class="mb-4 mt-4 text-center font-weight-black brown--text">Bagian Pengadaan Produk Kouvee Pet Shop</h2>
        <v-card class="mt-5 ml-9 mr-9 mx-lg-auto" max-width="1000">
        <v-stepper v-model="e6" vertical>
            <div class="ml-7 mt-5 mb-5"><h3><v-icon class="mr-3 mt-n2"> mdi-dark mdi-36px mdi-shape-square-plus</v-icon>Pengadaan No. {{kode}}{{kodelength}}</h3></div>
            <v-divider></v-divider>
            <v-stepper-step step="1">
            Pilih Supplier
            <small>Pilih Supplier untuk memesan pengadaan produk</small>
            </v-stepper-step>

            <v-stepper-content step="1">
            <div v-if="type=='new'">
            <v-card color="#FFFBE6" class="mb-12 mx-lg-auto" >
                <v-card-text>
                    <v-container>
                        <v-row>
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
                            <v-col cols="12">
                                Alamat Supplier : {{selectedSupplier.alamat}}
                            </v-col>
                            <v-col cols="12">
                                Telepon Supplier : {{selectedSupplier.no_telp}}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
            <v-btn color="#DEB887" class="mb-2" @click="sendDataSupplier()">Lanjutkan</v-btn>
            <v-btn text @click="selectedSupplier=''" class="ml-2 mb-2" color="error">Batal</v-btn>
            </div>
            <div v-else>
                    <v-card color="#FFFBE6" class="mb-12 mx-lg-auto" >
                    <v-card-text>
                        <v-container>
                            <v-row>
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
                                <v-col cols="12">
                                    Alamat Supplier : {{selectedSupplier.alamat}}
                                </v-col>
                                <v-col cols="12">
                                    Telepon Supplier : {{selectedSupplier.no_telp}}
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-btn color="#DEB887" class="mb-2" @click="updateSupplier()">Update dan Lanjutkan</v-btn>
                <v-btn text @click="e6=2"  class="ml-2 mb-2" color="error">Batal</v-btn>
            </div>
            </v-stepper-content>

            <v-stepper-step step="2">Pilih Produk Untuk Pengadaan</v-stepper-step>

            <v-stepper-content step="2">
            <v-card class="mb-12 mx-lg-auto">
                <small>NB : Klik pada baris produk jika ingin menambahkan produk</small>
                    <v-data-table
                        hide-default-header
                        :items="allproduk"
                        hide-default-footer
                        class="mt-4 ">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="item in items" :key="item.id_produk" :class="selectedRows.indexOf(item.id_produk)>-1?'brown lighten-4':''" @click="rowClicked(item)">
                                <td><img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="50px"></td>
                                <td>{{ item.nama }}</td>
                                <td>Rp.{{ item.harga }},-</td>
                                <td>
                                    <v-chip :color="getColor(item.stok, item.minimal)" small dark>{{ item.stok }}</v-chip>
                                </td>
                                <td>{{ item.satuan }}</td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
            </v-card>
            <v-btn color="#DEB887" @click="e6 = 3" class="mb-2">Lanjutkan</v-btn>
            <v-btn text @click="e6 = 1"  class="ml-2 mb-2" color="error">Kembali</v-btn>
            </v-stepper-content>

            <v-stepper-step step="3">Lihat Keranjang Belanja</v-stepper-step>

            <v-stepper-content step="3">
            <v-card color="#FFFBE6" class="mb-12" height="200px">
                <v-card-title class="body-1 font-weight-black">Keranjang Belanja Pengadaan</v-card-title>
                <v-card-subtitle>NB : Klik pada kolom jumlah untuk mengubah jumlah pengadaan</v-card-subtitle>
                <v-divider></v-divider>
                <v-data-table
                        :items="pemesanan"
                        :loading="load"
                        hide-default-header
                        hide-default-footer
                        class="mr-4 ml-4 mt-2">
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
                                            <div><v-chip color="blue" label dark>{{ item.jumlah }}</v-chip></div>
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
                                    </tr>
                                </tbody>
                            </template>                           
                        </v-data-table>
                        <br>
                        <h4 class="ml-4 mb-4"> TOTAL TRANSAKSI : Rp.{{ total }},-</h4>
            </v-card>
            <v-btn color="#DEB887" @click="e6 = 4" class="mb-2">Lanjutkan</v-btn>
            <v-btn text @click="e6 = 2"  class="ml-2 mb-2" color="error">Kembali</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">Selesaikan Pemesanan</v-stepper-step>
            <v-stepper-content step="4">
            <v-card color="#FFFBE6" class="mb-12" height="150px">
                <br>
                <p class="dialog-2 ml-4">Pemesanan pengadaan akan dilanjutkan ke bagian history untuk melakukan pengecekan dan mencetak surat pemesanan</p> 
                <h4 class="ml-4">Anda Memesan sebanyak : </h4>
                <h2 class="red--text ml-4"> {{pemesanan.length}} item produk</h2> 
            </v-card>
            <v-btn color="#DEB887" @click="finish()" class="mb-2">Lanjutkan ke History Pemesanan</v-btn>
            <v-btn text @click="e6 = 3"  class="ml-2 mb-2" color="error">Kembali</v-btn>
            </v-stepper-content>
        </v-stepper>
        </v-card>
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
    data () {
      return {
        dialogJumlah: false,
        kode: "PO-"+new Date().getFullYear().toString()+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+("0" + (new Date().getDate())).slice(-2)+"-",
        kodelength: 0,
        e6: 1,
        keyword: '',
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
            var uri = this.$apiUrl + '/produk'
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
                    this.e6 = 2;
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
        getPemesanan(){
            var uri = this.$apiUrl + '/detail_pengadaan?id_pengadaan='+this.id_pengadaan;
            this.$http.get(uri).then( (response) =>{
                this.pemesanan=response.data
            })
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
                console.log(this.grandTotalValue)
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