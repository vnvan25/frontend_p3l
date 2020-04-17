<template>
    <v-container>
        <v-card class="pa-md-4 mx-lg-auto" color="#FFEFD5" max-width="644">
            <v-card-title class="font-weight-bold">Transaksi Layanan No. {{kode}}{{kodelength}} </v-card-title>
            <v-divider></v-divider>
            <br>
            <v-card-text>Customer Service  : {{ namaCS }}</v-card-text>
            <v-card-text>Tanggal Transaksi : {{ tglTransaksi }}</v-card-text>
            <v-stepper v-model="e1">
                <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Daftar Nama Hewan</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Pilih Layanan</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Review Pesanan</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card
                        class="mb-12"
                        height="350px"
                    >

                    <v-card-title>Data Pengunjung</v-card-title>
                    <v-card-subtitle>Data hewan dan customer</v-card-subtitle>

                    <v-checkbox
                        label="Guest (non-member)"
                        color="orange"
                        value="true"
                        v-model="checked"
                        class="ml-4"
                    ></v-checkbox>
                    <div v-if="checked === 'true'">
                     <v-select  class="ml-4" v-model="selectedHewan" :items="hewan" item-value="id_hewan" item-text="nama" label="Nama Hewan Pelanggan*" return-object required disabled> 
                        <option v-for="hew in hewan" :key="hew.id_hewan" >{{ hew.nama }}</option>
                    </v-select>
                    <v-input class="ml-4"> Pemilik : - </v-input>
                    <v-input class="ml-4"> Jenis Hewan : - </v-input>
                    <v-input class="ml-4" > Ukuran Hewan : - </v-input>
                    </div>
                    <div v-else>
                        <v-select  class="ml-4" v-model="selectedHewan" :items="hewan" item-value="id_hewan" item-text="nama" label="Nama Hewan Pelanggan*" return-object required > 
                            <option v-for="hew in hewan" :key="hew.id_hewan" >{{ hew.nama }}</option>
                        </v-select>
                        <v-input  class="ml-4"> Pemilik : {{ selectedHewan.customer }} </v-input>
                        <v-input  class="ml-4">  Jenis Hewan : {{ selectedHewan.jenis_hewan }} </v-input>
                        <v-input  class="ml-4"> Ukuran Hewan : {{ selectedHewan.ukuran_hewan }} </v-input>
                    </div>
                    </v-card>
                    <div v-if="selectedHewan==0 && checked!='true'">
                        <v-alert dense type="error">
                           Isi data Hewan terlebih dahulu
                        </v-alert>
                        <v-btn  color="primary" disabled>
                             Daftar
                        </v-btn>
                        <v-btn text disabled>Cancel</v-btn>
                        <!-- <v-btn text v-on:click="resetFormTransaksi()">Cancel</v-btn> -->
                    </div>
                    <div v-else>
                        <v-btn  color="primary" @click="sendDataTransaksi()">
                             Daftar
                        </v-btn>
                        <v-btn text v-on:click="resetFormTransaksi()">Cancel</v-btn>
                    </div>
                    
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card
                    class="mx-auto mb-12"
                    >
                    <v-card-title>Daftar Layanan Tersedia Untuk {{selectedHewan.nama }} </v-card-title>
                    <v-card-subtitle>Pilih daftar layanan yang diinginkan dengan click pada nama layanan</v-card-subtitle>
                    <v-select class="ml-4" v-if="checked=='true'" v-model="selectedUkuran" :items="ukuranHewan" item-value="id_ukuran_hewan" item-text="nama" label="Pilih Ukuran Hewan*" return-object @input="loadLayananUkuran" required>
                            <option v-for="ukuran in ukuranHewan" :key="ukuran.id_ukuran_hewan">{{ selectedUkuran.nama }}</option>
                    </v-select>
                    <v-data-table
                    :headers="headers"
                    :items="layanan"
                    :loading="load"
                    v-model="selectedRows"
                    hide-default-header
                    hide-default-footer>
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

                    </v-card>
                   

                    <v-btn
                    color="primary"
                    @click="e1 = 3"
                    >
                    Continue
                    </v-btn>

                    
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card
                    class="mx-auto mb-12"
                    >
                    <div v-if="checked=='true'">
                        <v-card-title>Customer Guest Memilih Layanan :  </v-card-title>
                    </div>
                    <div v-else>
                        <v-card-title>Daftar layanan yang anda pilih untuk {{selectedHewan.nama}} </v-card-title>
                    </div>
                    <v-data-table
                    :items="pemesanan"
                    :loading="load"
                    hide-default-header
                    hide-default-footer>
                        <template v-slot:body="{ items }">
                            <tbody>
                                <tr v-for="(item,index) in items" :key="item.id_detail_tp">
                                    <td class="font-weight-bold brown-text">{{ index + 1 }}</td>
                                    <td class="font-weight-bold brown-text">{{ item.layanan }} {{ item.ukuran }}</td>
                                    <td class="font-weight-bold brown-text" v-if="item.layanan.includes('Penitipan')">Rp. {{ item.harga }} x {{data.jumlah}} = {{item.total}}</td>
                                    <td class="font-weight-bold brown-text" v-else>Rp. {{ item.total }}</td>
                                </tr>
                            </tbody>
                        </template>
                        </v-data-table>
                        <br>
                        <h4 class="ml-4 mb-4"> TOTAL TRANSAKSI : Rp.{{ total }}</h4>
                    <small class="ml-4">*Jika sudah yakin silahkan konfirmasi pesanan di halaman konfirmasi</small>
                    </v-card>
                    <br>
                    <v-btn
                    small
                    color="primary"
                    @click="finish()"
                    >
                        Selesaikan Pendaftaran Layanan
                    </v-btn>

                    <v-btn color="red" text @click="e1 = 2">Kembali</v-btn>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>
        <v-dialog v-model="dialogPenitipan" persistent max-width="300px">
            <v-card>
                <v-card-title>Anda memilih Penitipan</v-card-title>
                <v-card-subtitle>Masukkan Jumlah Hari</v-card-subtitle>
                <v-text-field v-model="jlhHari" class="ml-4 mr-4" placeholder="Jumlah Hari" outlined type="number"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="hari()">OK</v-btn>
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
            e1: 1,
            snackbar: false,
            color: null,
            text: '',
            load: false,
            dialogPenitipan: false,
            namaCS : localStorage.getItem("nama"),
            idCS: localStorage.getItem("id_pegawai"),
            tglTransaksi: new Date().toLocaleString(),
            tglSimpan: new Date().toISOString(),
            selectedHewan: 0,
            hewan: [],
            checked:'',
            selected: [],
            selectedRows: [],
            //kode transaksi layanan
            kode: "LY-"+new Date().getFullYear().toString().substr(-2)+("0" + (new Date().getMonth() + 1)).slice(-2)+("0" + (new Date().getDate())).slice(-2)+"-",
            kodelength: 0,
            status: "Proses",
            id_transaksi: 0,
            id_hapus: 0,
            tempKode: 0,
            transaction : new FormData,
            dtl : new FormData,
            data:{
                id_layanan: '',
                harga : '',
                layanan: '',
                tempIdLayanan: '',
                jumlah: 0,
            },
            grandTotalValue: 0,
            //load ukuran
            ukuranHewan: [],
            selectedUkuran: 0,
            //load layanan
            layanan: [],
            pemesanan: [],
            headers: [
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
            //penitipan
            state: 0,
            send: 0,
            jlhHari: 0,
            rowTemp: [],
            penitipanID: 0,
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
        rowClicked(row) {
            this.data.tempIdLayanan = row.id_layanan;
                this.sendHandler(row);
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
        log(logItem) {
        console.log(logItem);
        },
        loadHewan(){
             var uri = this.$apiUrl + '/hewan'
            this.$http.get(uri).then( (response) =>{
                this.hewan=response.data
            })
        },
        loadUkuranHewan(){
             var uri = this.$apiUrl + '/ukuranhewan'
            this.$http.get(uri).then((response) =>{
                this.ukuranHewan=response.data
            })
        },
        loadLayanan(){
            var uri = this.$apiUrl + '/layanan/layananUkuran?id_ukuran_hewan='+this.selectedHewan.id_ukuran_hewan
            this.$http.get(uri).then((response) =>{
                this.layanan=response.data
            })
            
        },
        loadLayananUkuran(){
            var uri = this.$apiUrl + '/layanan/layananUkuran?id_ukuran_hewan='+this.selectedUkuran.id_ukuran_hewan
            this.$http.get(uri).then((response) =>{
                this.layanan=response.data
            })
        },
        getKodeLayanan(){  
            var uri = this.$apiUrl + '/transaksi_layanan/codelength?kode='+this.kode
             this.$http.get(uri).then( (response) =>{
                this.kodelength=response.data
                if(this.kodelength+1<10){
                    this.kodelength++;
                    this.kodelength = "0"+this.kodelength;
                }else{
                    this.kodelength++;
                }
            })
            
        },
        //daftar transaksi
        sendDataTransaksi(){
            if(this.checked=='true'){
                this.transaction.append('id_hewan', 0);
            }
            else{
                this.transaction.append('id_hewan', this.selectedHewan.id_hewan);
            }
            this.transaction.append('id_pegawai_k', 0);
            this.transaction.append('id_pegawai_cs', this.idCS);
            this.transaction.append('tanggal', this.tglSimpan);
            this.transaction.append('kode', this.kode+this.kodelength);
            this.transaction.append('status', this.status);
            this.transaction.append('sub_total', 0);
            this.transaction.append('total', 0);
            this.transaction.append('created_by', this.namaCS);
            this.tempKode = this.kode+this.kodelength;
            var uri =this.$apiUrl + '/transaksi_layanan'
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = "Berhasil Mendaftarkan Hewan";
                this.e1 = 2;
                this.loadLayanan();
                this.idTransaksi();
                this.load = false;
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        resetFormTransaksi(){
            this.selectedHewan=0
            this.checked=false
        },
        //daftar untun detail layanan transaksi
        //get id transaksi
        idTransaksi(){
            var uri = this.$apiUrl + '/tl_detail/searchKode?kode='+this.kode+this.kodelength;
            this.$http.get(uri).then( (response) =>{
                this.id_transaksi=response.data[0].id_tl
            })  
        },
        //simpan data layanan
        sendHandler(row){
                this.data.id_layanan = row.id_layanan,
                this.data.harga = row.harga,
                this.data.layanan = row.layanan
                if(row.layanan.includes('Penitipan') && this.state==0){
                    this.dialogPenitipan = true
                    this.rowTemp = row
                }else{
                    this.swapSelectionStatus(row.id_layanan);
                    this.log(row);
                }
        },
        hari(){
            this.data.jumlah = this.jlhHari,
            this.state=1,
            this.send=1,
            this.swapSelectionStatus(this.rowTemp.id_layanan);
            this.penitipanID = this.rowTemp.id_layanan
            this.log(this.rowTemp);
            this.dialogPenitipan=false
        },
        sendDetail(){
            this.dtl.append('id_tl', this.id_transaksi);
            this.dtl.append('id_layanan', this.data.id_layanan);
            if(this.state==1 && this.send==1){
                this.dtl.append('jumlah', this.data.jumlah);
                this.send=0;
            }else{
                this.dtl.append('jumlah', 0);
            }

            if(this.state==1 && this.send==1){
                this.dtl.append('total', this.data.harga*this.data.jumlah);
                console.log(this.data.harga*this.data.jumlah)
            }else{
                this.dtl.append('total', this.data.harga);
            }
            
            var uri =this.$apiUrl + '/tl_detail'
            this.load = true
            this.$http.post(uri, this.dtl).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = "Berhasil menambahkan layanan "+this.data.layanan;
                this.load = false;
                this.getPemesanan();
                // this.resetFormDetail();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        idDetailTransaksi(){
            var uri = this.$apiUrl + '/tl_detail/searchDetail?id_tl='+this.id_transaksi+'&id_layanan='+this.data.tempIdLayanan;
            this.$http.get(uri).then( (response) =>{
                this.id_hapus=response.data[0].id_detail_tl
                this.delDetail()
            })  
        },
        delDetail(){
            var uri = this.$apiUrl + '/tl_detail/' + this.id_hapus;
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
            var uri = this.$apiUrl + '/tl_detail?id_tl='+this.id_transaksi;
            this.$http.get(uri).then( (response) =>{
                this.pemesanan=response.data
            })
        },
        //hitung total pemesanan
        grandTotal(){
            return this.pemesanan.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
        finish(){
            this.grandTotalValue = this.grandTotal();
            this.updateData();
            location.reload();
        },
        updateData(){
            if(this.checked=='true'){
                this.transaction.append('id_hewan', 0);
            }
            else{
                this.transaction.append('id_hewan', this.selectedHewan.id_hewan);
            }
            this.transaction.append('id_pegawai_k', 0);
            this.transaction.append('id_pegawai_cs', this.idCS);
            this.transaction.append('tanggal', this.tglSimpan);
            this.transaction.append('kode', this.tempKode);
            this.transaction.append('status', this.status);
            this.transaction.append('sub_total', this.grandTotalValue);
            this.transaction.append('total', 0);
            this.transaction.append('created_by', this.namaCS);
            var uri =this.$apiUrl + '/transaksi_layanan/' + this.id_transaksi;
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.load = false;
            }).catch(error =>{
                this.load = false;
            })
        },
    },

    mounted(){
        this.loadHewan();
        this.getKodeLayanan();
        this.loadUkuranHewan();
        this.loadLayanan();
        this.getPemesanan();
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