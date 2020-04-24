<template>
    <v-container>
        <v-card class="pa-md-4 mx-lg-auto" max-width="900">
             <v-toolbar
                flat
                color="#DEAE8D"
                >
                 <v-toolbar-title class=" text-center font-weight-bold" >History Pemesanan Layanan Kouvee Pet Shop</v-toolbar-title>
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
                        link to="/daftarLayanan">
                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Pemesanan
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field class="mb-4"
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Transaksi Layanan"
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
                        <tr v-for="(item,index) in items" :key="item.id_tl">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.kode }}</td>
                            <td>{{ item.tanggal }}</td>
                            <td>{{ item.hewan }}</td>
                            <td>{{ item.customer_service }}</td>
                            <td>Rp. {{ item.sub_total }}</td>
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
                                            <v-list-item-title @click="detailShowHandler(item)">Details</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title @click="konfirmasiTransaksi(item)">Konfirmasi</v-list-item-title>
                                            </v-list-item>
                                            <!-- <v-list-item>
                                            <v-list-item-title>Kirim SMS</v-list-item-title>
                                            </v-list-item> -->
                                            <v-list-item>
                                            <v-list-item-title @click="updateHandler(item)">Edit</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-list-item-title @click="batalTransaksi(item)">Batalkan</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                        </v-menu>
                                    </div>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
        </v-card>
        <br>
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
                        link to="/listBatalLayanan">
                            Telusuri Halaman
                            <v-icon size="18" class="mr-2">mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-flex>
            </v-layout>
        </v-card>
        <v-dialog v-model="dialogDetail" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Detail Pesanan Layanan</span>
                        </v-card-title>
                        <v-card-text>
                             Data dibawah ini adalah data layanan yang dipesan oleh customer
                        </v-card-text>
                        <v-layout row wrap style="margin:10px">
                            <v-flex xs6>
                                <v-btn
                                small
                                depressed
                                dark
                                rounded
                                style="text-transform: none !important;"
                                color="green accent-3"
                                class="ml-4 mb-4"
                                @click=" getDataLayanan();dialogTambah=true"
                                >

                                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                                Tambah Detail
                                </v-btn>
                            </v-flex>
                        </v-layout> 
                        <div v-if="this.detailLayanan.length==0">
                            <v-data-table
                            hide-default-header
                            hide-default-footer>
                                <template v-slot:no-data>
                                    <v-alert :value="true" border="left" color="red lighten-2"  dense outlined dark>
                                        <v-icon>mdi-close-octagon</v-icon>
                                        Customer tidak memesan layanan apapun
                                    </v-alert>
                                </template>
                            </v-data-table>
                        </div>
                        <div v-else>
                        <v-data-table
                            :headers="headerDetail"
                            :items="detailLayanan"
                            :search="keyword"
                            :loading="load"
                             hide-default-header
                             hide-default-footer
                             class="ml-4">
                        <template v-slot:body="{ items }">
                            <tbody>
                                <tr v-for="(item,index) in items" :key="item.id_detail_tl">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.layanan }} {{ item.ukuran }}</td>
                                    <td v-if="item.layanan.includes('Penitipan')">Rp. {{ item.harga }} x {{item.jumlah}} hari = Rp.{{item.total}}</td>
                                    <td v-else>Rp. {{item.total}}</td>
                                    <td>
                                        <v-btn
                                            icon
                                            color="error"
                                            light
                                            @click="deleteDetail(item.id_detail_tl)"
                                        >
                                        <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-btn v-if="item.layanan.includes('Penitipan')"
                                            icon
                                            color="indigo"
                                            light
                                            @click="editPenitipanHandler(item); dialogPenitipan=true"
                                            >
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn v-if="item.layanan.includes('Grooming') && formMaster.nama!='Guest'"
                                            color="indigo"
                                            light
                                            text
                                            @click="sendSMS()"
                                            >
                                            <v-icon class="mr-2">mdi-email-outline</v-icon>
                                            SMS
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                       
                        </v-data-table>
                        </div>
                        <br>
                        <h4 class="ml-6"> TOTAL PEMESANAN : Rp.{{ totalBeli }}</h4>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- update subtotal disini -->
                            <v-btn color="blue darken-1" text @click="updateSubTotal(); dialogDetail = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate" persistent max-width="600px">
        <div v-if="this.formMaster.hewan!='Guest'">
            <v-card>
                <v-card-title>
                    <span class="headline ml-3">Update Data Hewan</span>
                </v-card-title>
                <v-container class="ml-4">
                    <v-row>
                        <v-col cols="12">
                            <v-input hidden>Kode Transaksi : {{this.formMaster.kode}}</v-input>
                        </v-col>
                        <v-col cols="10">
                            <v-select v-model="selectedHewan" :items="hewan" item-value="id_hewan" :hint="'Inputan Sebelumnya : '+this.formMaster.hewan" item-text="nama" label="Nama Hewan Pelanggan*" return-object required > 
                                <option v-for="hew in hewan" :key="hew.id_hewan" >{{ hew.nama }}</option>
                            </v-select>
                            <br>
                            <v-input> Pemilik : {{ selectedHewan.customer }} </v-input>
                            <v-input> Hewan : {{ selectedHewan.jenis_hewan }} </v-input>
                            <v-input> Ukuran Hewan : {{ selectedHewan.ukuran_hewan }} </v-input>
                        </v-col>  
                    </v-row>
                </v-container>
                <small class="ml-5">*Yang dapat diedit hanya nama hewan pelanggan</small>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogUpdate = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="updateHewan()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div v-else>
            <v-card>
                <v-card-title>
                   <span class="headline">Update Data Hewan</span>
                </v-card-title>
                <v-card-text>
                    Guest tidak dapat mengedit data
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogUpdate = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </div>
        </v-dialog>
        <v-dialog v-model="dialogPenitipan" persistent max-width="300px">
            <v-card>
                <v-card-title>Update Jumlah Hari</v-card-title>
                <v-card-subtitle>Masukkan Jumlah Hari</v-card-subtitle>
                <v-text-field :hint="'Jumlah Sebelumnya : '+formEdit.jumlah+' hari'" :rules="rules.jumlah" v-model="jlhHari" class="ml-4 mr-4" placeholder="Jumlah Hari" outlined type="number"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="updateJumlah()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- data hari penitipan -->
         <v-dialog v-model="dialogHari" persistent max-width="300px">
            <v-card>
                <v-card-title>Anda memilih Penitipan</v-card-title>
                <v-card-subtitle>Masukkan Jumlah Hari</v-card-subtitle>
                <v-text-field v-model="jlhPenitipan" :rules="rules.jumlah" class="ml-4 mr-4" placeholder="Jumlah Hari" outlined type="number"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogHari=false; hari()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogTambah" persistent max-width="600px">
            <v-card>
                <v-card-title>Tambah Layanan</v-card-title>
                <v-card-subtitle>Masukkan tambahan layanan yang anda inginkan</v-card-subtitle>
                <v-card-subtitle class="font-weight-black">*click pada nama layanan</v-card-subtitle>
                <v-data-table
                    :headers="headers"
                    :items="tambahLayanan"
                    :loading="load"
                    v-model="selectedRows"
                    hide-default-header
                    hide-default-footer
                    class="ml-4">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item,index) in items" :key="item.id_layanan" :class="selectedRows.indexOf(item.id_layanan)>-1?'brown lighten-4':''" @click="rowClicked(item)">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.layanan }} {{ item.ukuran }}</td>
                                <td>Rp. {{ item.harga }}</td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogTambah=false">CLOSE</v-btn>
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
            layanan: [],
            detailLayanan: [],
            hewan: [],
            tambahLayanan: [],
            selectedRows: [],
            number: '',
            dialog: false,
            dialogDetail: false,
            dialogUpdate: false,
            dialogPenitipan: false,
            dialogTambah: false,
            dialogHari: false,
            keyword: '',
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
                    text: 'Sub Total',
                    value: 'sub_total',
                },
                {
                    text: 'Aksi',
                    value: 'null',
                },
            ],
            headerDetail: [
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
                },
                {
                    text: 'Aksi',
                    value: 'null',
                },
            ],
            rules: {
                jumlah: [
                     v => v > 0  || 'Masukkan dengan benar',
                ],
            },
            //cari detail
            id_tl: 0,
            //form
            formMaster: {
                kode: '',
                id_tl: 0,
                hewan: '',
                id_hewan: '',
                id_ukuran_hewan: '',
            },
            formEdit: {
                id_detail: 0,
                jumlah: 0,
                harga: 0,
            },
            data:{
                id_layanan: '',
                harga : '',
                layanan: '',
                tempIdLayanan: '',
                jumlah: 0,
            },
            //newData
            batal : new FormData(),
            update : new FormData(),
            jumlah : new FormData(),
            dtl : new FormData(),
            total : new FormData(),
            //update
            selectedHewan: 0,
            jlhHari: 0,
            jlhPenitipan: 0,
            state: 0,
            send: 0,
            rowTemp: [],
            penitipanID: 0,
            id_hapus: 0,
            ukuranGuest: 0,
            
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
        hitungTotal: function(){
            return this.detailLayanan.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
        getLayanan(){
            var uri = this.$apiUrl + '/transaksi_layanan'
            this.$http.get(uri).then( (response) =>{
                this.layanan=response.data
            })
        },
        getNumber(){
            var uri = this.$apiUrl + '/transaksi_layanan/number?id_hewan='+this.formMaster.id_hewan
            this.$http.get(uri).then( (response) =>{
                this.number=response.data[0].no_telp
                if(this.number.substring(0, 1)=="0"){
                    this.number = this.number.replace('0','+62');
                    console.log(this.number)
                }
            })
        },
        getDetailLayanan(){
          var uri = this.$apiUrl + '/tl_detail?id_tl='+this.formMaster.id_tl;
            this.$http.get(uri).then( (response) =>{
                this.detailLayanan=response.data
                if(this.formMaster.nama=='Guest'){
                    this.ukuranGuest=response.data[0].id_ukuran_hewan
                }
            })
        },
        getDataLayanan(){
        if(this.formMaster.nama=='Guest'){
             var uri = this.$apiUrl + '/tl_detail/getLayanan?id_ukuran_hewan='+this.ukuranGuest+'&id_tl='+this.formMaster.id_tl;
        }else{
            var uri = this.$apiUrl + '/tl_detail/getLayanan?id_ukuran_hewan='+this.formMaster.id_ukuran_hewan+'&id_tl='+this.formMaster.id_tl;
        }
            this.$http.get(uri).then( (response) =>{
                this.tambahLayanan=response.data
            })
        },
        getHewan(){
             var uri = this.$apiUrl + '/hewan'
            this.$http.get(uri).then( (response) =>{
                this.hewan=response.data
            })
        },
        detailShowHandler(data){
            this.dialogDetail = true,
            this.formMaster.nama = data.hewan,
            this.formMaster.id_tl = data.id_tl,
            this.formMaster.id_ukuran_hewan = data.id_ukuran_hewan,
            this.formMaster.id_hewan = data.id_hewan,
            this.getNumber();
            this.getDetailLayanan();
            this.getDataLayanan();
        },
        deleteDetail(deleteId){
            var uri = this.$apiUrl + '/tl_detail/' + deleteId;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = 'Berhasil Menghapus detail';
                this.getDetailLayanan();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        },
        batalTransaksi(data){
            this.$confirm("Batalkan transaksi "+data.kode+"?").then(() => {
            this.batal.append('id_tl', data.id_tl);
            this.batal.append('status', "Batal");
            var uri =this.$apiUrl + '/transaksi_layanan/changeStatus'
            this.load = true
            this.$http.post(uri, this.batal).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Transaksi "+data.kode+" berhasil dibatalkan";
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
        konfirmasiTransaksi(data){
            this.$confirm("Yakin Konfrimasi Transaksi No."+data.kode+"?").then(() => {
            this.batal.append('id_tl', data.id_tl);
            this.batal.append('status', "Pembayaran");
            var uri =this.$apiUrl + '/transaksi_layanan/changeStatus'
            this.load = true
            this.$http.post(uri, this.batal).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Transaksi "+data.kode+" telah dikonfirmasi.";
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
        updateHandler(data){
            this.formMaster.kode = data.kode,
            this.formMaster.id_tl = data.id_tl,
            this.formMaster.hewan = data.hewan,
            this.dialogUpdate = true
        },
        editPenitipanHandler(data){
            this.formEdit.jumlah = data.jumlah,
            this.formEdit.id_detail = data.id_detail_tl,
            this.formEdit.harga = data.harga
        },
        updateHewan(){
            this.update.append('id_tl', this.formMaster.id_tl);
            this.update.append('id_hewan', this.selectedHewan.id_hewan);
            var uri =this.$apiUrl + '/transaksi_layanan/updateHewan'
            this.load = true
            this.$http.post(uri, this.update).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Data anda berhasil di update";
                this.load = false;
                this.dialogUpdate = false;
                this.getLayanan();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        updateJumlah(){
            if(this.jlhHari<=0){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Minimal Penitipan adalah 1 hari";
            }else{
                this.jumlah.append('id_detail_tl', this.formEdit.id_detail);
                this.jumlah.append('jumlah', this.jlhHari);
                this.jumlah.append('harga', this.formEdit.harga);
                var uri =this.$apiUrl + '/tl_detail/changeJumlah'
                this.load = true
                this.$http.post(uri, this.jumlah).then( (response) =>{
                this.snackbar = true;
                    this.color = 'Green';
                    this.text = "Data anda berhasil di update";
                    this.load = false;
                    this.dialogPenitipan = false;
                    this.getDetailLayanan();
                }).catch(error =>{
                    this.errors = error
                    this.snackbar = true;
                    this.text = 'Try Again';
                    this.color = 'red';
                    this.load = false;
                })
            }
        },
        updateSubTotal(){
            this.total.append('id_tl', this.formMaster.id_tl);
            this.total.append('sub_total', this.hitungTotal());
            var uri =this.$apiUrl + '/transaksi_layanan/updateSub'
            this.load = true
            this.$http.post(uri, this.total).then( (response) =>{
                this.load = false;
                this.getLayanan();
            }).catch(error =>{
                this.load = false;
            })
        },
        idDetailTransaksi(){
            var uri = this.$apiUrl + '/tl_detail/searchDetail?id_tl='+this.formMaster.id_tl+'&id_layanan='+this.data.tempIdLayanan;
            this.$http.get(uri).then( (response) =>{
                this.id_hapus=response.data[0].id_detail_tl
                this.delDetail()
            })  
        },
        hari(){
            if(this.jlhPenitipan<=0){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Minimal Penitipan adalah 1 hari";
            }else{
                this.data.jumlah = this.jlhPenitipan,
                this.state=1,
                this.send=1,
                this.swapSelectionStatus(this.rowTemp.id_layanan);
                this.penitipanID = this.rowTemp.id_layanan
                this.log(this.rowTemp);
                this.dialogHari = false
            }
        },
        rowClicked(row) {
            this.data.tempIdLayanan = row.id_layanan;
                this.sendHandler(row);
        },
        sendHandler(row){
                this.data.id_layanan = row.id_layanan,
                this.data.harga = row.harga,
                this.data.layanan = row.layanan
                if(row.layanan.includes('Penitipan') && this.state==0){
                    this.dialogHari = true
                    this.rowTemp = row
                }else{
                    this.swapSelectionStatus(row.id_layanan);
                    this.log(row);
                }
        },
        swapSelectionStatus(keyID) {
            if (this.selectedRows.includes(keyID)) {
                this.selectedRows = this.selectedRows.filter(
                selectedKeyID => selectedKeyID !== keyID
                );
                if(keyID == this.penitipanID){
                    this.state=0
                }
                this.idDetailTransaksi()
                console.log(this.state)
            } else {
                this.sendDetail()
                this.selectedRows.push(keyID);
            }
        },
        sendDetail(){
            this.dtl.append('id_tl', this.formMaster.id_tl);
            this.dtl.append('id_layanan', this.data.id_layanan);
            if(this.state==1 && this.send==1){
                this.dtl.append('jumlah', this.data.jumlah);
            }else{
                this.dtl.append('jumlah', 1);
            }

            if(this.state==1 && this.send==1){
                this.dtl.append('total', this.data.harga*this.data.jumlah);
                console.log(this.data.harga*this.data.jumlah)
                this.send=0;
            }else{
                this.dtl.append('total', this.data.harga);
            }
            
            var uri =this.$apiUrl + '/tl_detail'
            this.load = true
            this.$http.post(uri, this.dtl).then(response =>{
                this.getDetailLayanan();
                this.getDataLayanan();
                this.snackbar = true;
                this.color = 'green';
                this.text = "Berhasil menambahkan layanan "+this.data.layanan;
                this.load = false;
                // this.dialogTambah=false;
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        delDetail(){
            var uri = this.$apiUrl + '/tl_detail/' + this.id_hapus;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = 'Berhasil Menghapus data';
                this.getDetailLayanan();
                this.getDataLayanan();
            }).catch(error =>{ 
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        },
        sendSMS(){
            var twilio = require('twilio');
            var client = new twilio('AC301b8d616ad5fd2c962b71675ecae99a', '29343d7c31b24d5899a5ecfef13fdd81');
            client.messages.create({
                to: this.number.toString(),
                from: '+14158708581',
                body: 'Hello from Kouvee Pet Shop! Hewan peliharaan anda '+this.formMaster.nama+' layanan Gromming sudah selesai'
            });
        },
    },
    mounted(){
        this.getLayanan();
        this.getDetailLayanan();
        this.getHewan();
        this.getDataLayanan();
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