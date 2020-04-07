<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Tambah Transaksi Produk</h2>
            </v-container>
        </v-card>
        <v-container></v-container>
        <v-card>
        <v-container>
            <v-row 
            no-gutters
            >
            <v-col
            >
                <v-card
                class="pa-2"
                outlined
                tile
                >
                <v-card-title>
                Informasi Transaksi
                </v-card-title>
                    <!-- <v-select v-model="selectedCS" :items="pegawai" item-value="id_pegawai" item-text="nama" return-object label="Customer Service*" required >
                        <option v-for="peg in pegawai" :key="peg.id_pegawai">{{ peg.nama }}</option>
                    </v-select> -->
                    <!-- <span v-bind:title="date">Tanggal : callFunction()</span> -->
                    <!-- <v-date-picker show-current landscape disabled  light></v-date-picker> -->
                    <!-- jangan lupas kasih v-model untuk masukin data tanggalnya -->
                <v-card-text>
                    <v-input> Customer Service : {{ this.cs }} </v-input>
                    <v-input> Transaksi : {{ new Date().toLocaleString() }} </v-input>
                    <div v-if="countId+1>9">
                    <v-input> Kode Transaksi : {{kode}}{{this.countId+1}} </v-input>
                    </div>
                    <div v-else>
                        <v-input> Kode Transaksi : {{kode}}0{{this.countId+1}} </v-input>
                    </div>
                    

                      <v-input></v-input>
                      <v-input></v-input>
                      <v-input></v-input>
                      <v-input></v-input>
                      <v-input></v-input>
                      <v-input></v-input>
                      </v-card-text>
                </v-card>
            </v-col>
            <v-col>
            <v-card
                class="pa-2"
                outlined
                tile
                >
                <v-card-title>
                Data Hewan
                </v-card-title>
                
                <v-checkbox
                label="Guest (non-member)"
                color="orange"
                value="true"
                v-model="checked"
                ></v-checkbox>
                <!-- <input type="checkbox" id="checkbox" v-model="checked">
                <label for="checkbox">{{ checked }}</label> -->
                <div v-if="checked === 'true'">
                     <v-select v-model="selectedHewan" :items="hewan" item-value="id_hewan" item-text="nama" label="Nama Hewan Pelanggan*" return-object required disabled> 
                        <option v-for="hew in hewan" :key="hew.id_hewan" >{{ hew.nama }}</option>
                    </v-select>
                    <v-input> Pemilik : - </v-input>
                    <v-input> Jenis Hewan : - </v-input>
                    <v-input> Ukuran Hewan : - </v-input>
                </div>
                <div v-else>
                    <v-select v-model="selectedHewan" :items="hewan" item-value="id_hewan" item-text="nama" label="Nama Hewan Pelanggan*" return-object required > 
                        <option v-for="hew in hewan" :key="hew.id_hewan" >{{ hew.nama }}</option>
                    </v-select>
                    <v-input> Pemilik : {{ selectedHewan.customer }} </v-input>
                    <v-input> Hewan : {{ selectedHewan.jenis_hewan }} </v-input>
                    <v-input> Ukuran Hewan : {{ selectedHewan.ukuran_hewan }} </v-input>
                </div>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
         <v-layout row wrap style="margin:10px">
            <v-flex class="text-right" style="margin:10px">
                <!-- condition kalau dia Guest -->
                <div v-if="checked === 'true'"> 
                    <v-btn
                    depressed
                    dark
                    rounded
                    style="text-transform: none !important;"
                    color="green accent-3"
                    @click="setForm(); terms=true"
                    v-on:click="isHidden = !isHidden"
                    :disabled="terms"
                    >

                    <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                        Simpan
                    </v-btn>
                </div>
                <!-- condition kalau dia bukan guest -->
                <div v-else>
                    <v-btn
                    depressed
                    dark
                    rounded
                    style="text-transform: none !important;"
                    color="green accent-3"
                    @click="setForm(); terms=true"
                    v-on:click="isHidden = !isHidden"
                    :disabled="terms"
                    >

                    <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                        Simpan
                    </v-btn>
                </div>
            </v-flex>
            <v-btn
                depressed
                dark
                rounded
                style="text-transform: none !important; margin:10px "
                color="red accent-3"
                v-on:click="resetFormTransaksi()"
                :disabled="terms"
                >

                <v-icon size="18" class="mr-2">mdi-delete</v-icon>
                    Batal
                </v-btn>
        </v-layout>
        </v-card>
        <v-card v-show="!isHidden">
            <v-container>
            <v-row 
            no-gutters
            >
            <v-col
            >
                <v-card
                class="pa-2"
                outlined
                tile
                >
                Data Pembelian Produk {{this.tempKode}}
                <v-layout></v-layout>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn
                        depressed
                        dark
                        rounded
                        style="text-transform: none !important;"
                        color="green accent-3"
                        @click="dialog = true">

                        <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                            Tambah Pembelian
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <!-- <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search"
                        hide-details
                    ></v-text-field> -->
                    <v-btn
                        depressed
                        dark
                        rounded
                        style="text-transform: none !important;"
                        color="blue accent-3"
                        type="submit"
                        @click="selected()"
                        >
                        <v-icon size="18" class="mr-2">mdi-arrow-collapse-down</v-icon>
                            Selesai dan lanjutkan
                        </v-btn>
                    </v-flex>
                </v-layout>
                 <v-data-table
                    :headers="headers"
                    :items="details"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_detail_tp">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.kode }}</td>
                            <td>{{ item.produk }}</td>
                            <td>{{ item.jumlah }}</td>
                            <td>{{ item.total }}</td>
                            <td>
                                <v-btn
                                    icon
                                    color="indigo"
                                    light
                                    @click="editHandlerDetail(item)">
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
                           <h4> TOTAL PEMBELIAN : {{ totalBeli }}</h4>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                </v-card>

                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Pembelian</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn disabled>ID Transaksi : {{ this.tempKode }}</v-btn>
                                </v-col>
                                <v-col cols="12">
                                <!-- <v-select v-model="selectedProduk" :items="produks" item-value="id_produk" item-text="nama" label="Pilihan Produk*" return-object required>
                                    <option v-for="pro in produks" :key="pro.id_produk" >{{ pro.nama }}</option>
                                </v-select> -->
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
                                </v-col>
                                <v-col cols="12">
                                    <v-btn color="orange darken-1"> Stok Tersisa Produk : {{selectedProduk.stok}}{{selectedProduk.satuan}} </v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-input v-model="form.total">  Harga Satuan Produk: {{selectedProduk.harga}} </v-input>
                                </v-col>
                                <v-col cols="12">
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
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="Cek2(); setFormDetail()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
            <!-- <v-col>
            <v-card
                class="pa-2"
                outlined
                tile
                >
                List Pembelian
                </v-card>
            </v-col> -->
            </v-row>
        </v-container>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data(){
        return {
            checked:'',
            value:'',
            dialog: false,
            keyword: '',
            isHidden: true, 
            terms : false,
            tglTransaksi: new Date().toISOString(),
            year: new Date().getFullYear().toString().substr(-2),
            month: "0"+ (new Date().getMonth()+1),
            day: new Date().getDate(),
            kode: "PR-"+new Date().getFullYear().toString().substr(-2)+("0" + (new Date().getMonth() + 1)).slice(-2)+("0" + (new Date().getDate())).slice(-2)+"-",
            kode1: '',
            selectedHewan: 0,
            selectedCS: 0,
            selectedProduk: 0,
            cs: localStorage.getItem("nama"),
            id_cs: localStorage.getItem("id_pegawai"),
            hewan: [],
            pegawai: [{
                id_pegawai:0,
                nama: ''
            }],
            headers: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Kode',
                    value: 'kode',
                },
                {
                    text: 'Nama Produk',
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
                    value: 'null',
                },
            ],
            rules: {
                age: [
                    val => val < this.selectedProduk.stok || 'Sesuai Stok',
                ]
            },
            transaksi : [],
            produks: [],
            details:[],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                jumlah: '',
                total: '',
            },
            tempDetail:{
                id_tp: '',
                kode: '',
                id_produk : '',
                jumlah : '',
                total: '',
            },
            transaction : new FormData,
            dtl : new FormData,
            // hewan: {},
            typeInput: 'new',
            type: 'new',
            errors : '',
            updatedId : '',
            updatedIdTp: '',
            total: 0,
            status: "penjualan",
            tempKode: '',
            jlh: 0,
            countId: '',
            temp:'',
            subtotal: '',
            totalall: '',
            cek : '',
            flen: '',
            i: '',
            id_temp :'',
            jumlahDetail: 0,
            totalDetail: 0,
            transaksiID: 0,
            idd: 0,
            code: '',
        }
    },
    computed: {
        totalBeli: function(){
            return this.details.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        }
    },
    methods:{
        Cek2(){
            console.log(this.selectedProduk.nama)
        this.flen= this.details.length;
        console.log(this.flen)
        for(this.i=0; this.i<this.flen; this.i++){
            if(this.details[this.i].produk == this.selectedProduk.nama){
                // console.log(this.details[this.i].produk)
                // console.log(this.details[this.i])
                this.cek='true';
                this.id_temp = this.details[this.i].id_detail_tp;
                this.tempDetail.kode = this.details[this.i].kode;
                this.tempDetail.jumlah = this.details[this.i].jumlah; 
                this.tempDetail.total = this.details[this.i].total;
                this.tempDetail.id_tp = this.details[this.i].id_tp;
            }
        }
        console.log(this.cek)
        },
        totalBeli2(){
            return this.details.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
        getIdTp(){
            var uri = this.$apiUrl + '/transaksi_produk?id_tp=0'
            this.$http.get(uri).then( (response) =>{
                this.transaksiID=response.data  
                //  alert('Customer: ' + this.transaksiID)
            })  
        },
        getTransaksiID(){
            if(this.countId>9){
                var uri = this.$apiUrl + '/tp_detail/searchKode?kode='+this.kode+this.countId;
            }else{
                var uri = this.$apiUrl + '/tp_detail/searchKode?kode='+this.kode+'0'+(this.countId);
            }
             this.$http.get(uri).then( (response) =>{
                this.idd=response.data[0].id_tp
                this.idd=parseInt(this.idd,10)+parseInt(1,10)
                console.log(uri)  
                console.log(this.idd)
               
            })  
        },
        selected(){
            if(this.checked == ''){
                 this.totalall = this.totalBeli2()
                console.log(this.totalall)
                this.updateData()
            }else{
                 this.totalall = this.totalBeli2()
                console.log(this.totalall)
                this.updateDataCheck()
            }
               
                alert('Anda bisa cek transaksi sebelumnya di halaman History!')
                location.reload();
                
                // console.log("Value: ", this.selectedBank.value) 
        },
        loadCS(){
            var uri = this.$apiUrl + '/pegawai?peran=customer service'
            this.$http.get(uri).then( (response) =>{
                this.pegawai=response.data
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
        getDataDetail(){
            var uri = this.$apiUrl + '/tp_detail?id_tp='+this.idd;
            console.log(uri)
            this.$http.get(uri).then( (response) =>{
                this.details=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
        },
        getCountTransaksi(){
            var uri = this.$apiUrl + '/transaksi_produk?id_tp=0'
            this.$http.get(uri).then( (response) =>{
                this.transaksi=response.data
            })
        },
        getDataTransaksi(){
            var uri = this.$apiUrl + '/transaksi_produk'
            this.$http.get(uri).then( (response) =>{
                this.transaksi=response.data  
            })
        },
        getID(){  
            var uri = this.$apiUrl + '/transaksi_produk/codelength?kode='+this.kode
             this.$http.get(uri).then( (response) =>{
                this.kode1=response.body.length
                // console.log(response.data.message)
            })
            console.log(this.kode)
            console.log(uri)
            alert(this.kode1)
        },
        getCount(){
            var uri = this.$apiUrl + '/transaksi_produk/codelength?kode='+this.kode
            this.$http.get(uri).then( (response) =>{
                this.countId=response.data  
                //  alert('Customer: ' + this.countId)
            })  
        },
        sendDataTransaksi(){
            this.transaction.append('id_hewan', this.selectedHewan.id_hewan);
            this.transaction.append('id_pegawai_k', this.total);
            this.transaction.append('id_pegawai_cs', this.id_cs);
            if(this.countId+1>9){
                this.transaction.append('kode', this.kode+(this.countId+1));
                this.code = this.kode+(this.countId+1);
                console.log(this.code)
            }else{
                this.transaction.append('kode', this.kode+'0'+(this.countId+1));
                this.code = this.kode+'0'+(this.countId+1);
                console.log(this.code)
            }
            this.transaction.append('tanggal', this.tglTransaksi);
            this.transaction.append('status', this.status);
            this.transaction.append('sub_total', this.total);
            this.transaction.append('total_harga', this.total);
            this.transaction.append('created_by', this.cs);
            this.tempKode = '0'+(this.countId+1);
            this.temp = this.countId+1;
            // this.idd++;
            // console.log(this.transaksiID)
            var uri =this.$apiUrl + '/transaksi_produk'
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                console.log(response.data.message)
                this.load = false;
                this.dialog = false
                // this.getDataDetail();
                this.resetForm();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        sendDataTransaksiCheckBox(){
            this.transaction.append('id_hewan', this.total);
            this.transaction.append('id_pegawai_k', this.total);
            this.transaction.append('id_pegawai_cs', this.id_cs);
            if(this.countId+1>9){
                this.transaction.append('kode', this.kode+(this.countId+1));
                this.code = this.kode+(this.countId+1);
            }else{
                this.transaction.append('kode', this.kode+'0'+(this.countId+1));
                this.code = this.kode+'0'+(this.countId+1);
            }
            // this.transaction.append('kode', this.kode+'0'+(this.countId+1));
            this.transaction.append('tanggal', this.tglTransaksi);
            this.transaction.append('status', this.status);
            this.transaction.append('sub_total', this.total);
            this.transaction.append('total_harga', this.total);
            this.transaction.append('created_by', this.cs);
            this.tempKode = '0'+(this.countId+1);
            this.temp = this.countId+1;
            // this.transaksiID++;
            var uri =this.$apiUrl + '/transaksi_produk'
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                console.log(response.data.message)
                this.load = false;
                this.dialog = false
                // this.getDataDetail();
                this.resetForm();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
         updateData(){
            this.transaction.append('id_hewan', this.selectedHewan.id_hewan);
            this.transaction.append('id_pegawai_k', this.total);
            this.transaction.append('id_pegawai_cs', this.id_cs);
            if(this.temp>9){
                this.transaction.append('kode', this.kode+(this.temp));
            }else{
                this.transaction.append('kode', this.kode+'0'+(this.temp));
            }
            this.transaction.append('tanggal', this.tglTransaksi);
            this.transaction.append('status', this.status);
            this.transaction.append('sub_total', this.totalall);
            this.transaction.append('total_harga', this.total);
            this.transaction.append('created_by', this.cs);
            var uri =this.$apiUrl + '/transaksi_produk/' + this.idd;
            console.log(this.kode+'0'+(this.countId))
            console.log(this.temp)
            console.log('link' + uri)
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                console.log(response.data.message)
                this.load = false;
                this.dialog = false
                this.getDataDetail();
                this.resetForm();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        updateDataCheck(){
            this.transaction.append('id_hewan', this.total);
            this.transaction.append('id_pegawai_k', this.total);
            this.transaction.append('id_pegawai_cs', this.id_cs);
             if(this.temp>9){
                this.transaction.append('kode', this.kode+(this.temp));
            }else{
                this.transaction.append('kode', this.kode+'0'+(this.temp));
            }
            // this.transaction.append('kode', this.kode+'0'+(this.temp));
            this.transaction.append('tanggal', this.tglTransaksi);
            this.transaction.append('status', this.status);
            this.transaction.append('sub_total', this.totalall);
            this.transaction.append('total_harga', this.total);
            this.transaction.append('created_by', this.cs);
            var uri =this.$apiUrl + '/transaksi_produk/' + this.idd;
            console.log(this.kode+'0'+(this.countId))
            console.log(this.temp)
            console.log('link' + uri)
            this.load = true
            this.$http.post(uri, this.transaction).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                console.log(response.data.message)
                this.load = false;
                this.dialog = false
                this.getDataDetail();
                this.resetForm();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        },
        sendDataDetail(){
            this.dtl.append('id_tp', this.idd);
            this.dtl.append('id_produk', this.selectedProduk.id_produk);
            this.dtl.append('jumlah', this.form.jumlah);
            this.dtl.append('total', this.selectedProduk.harga*this.form.jumlah);
            console.log(this.totalall)
            // console.log(this.totalBeli)
            // console.log(this.totalBeli())
            var uri =this.$apiUrl + '/tp_detail'
            this.load = true
            this.$http.post(uri, this.dtl).then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                console.log(response.data.message)
                this.load = false;
                this.dialog = false
                this.getDataDetail();
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
            this.dtl.append('id_tp', this.idd);
            this.dtl.append('id_produk', this.selectedProduk.id_produk);
            this.dtl.append('jumlah', this.form.jumlah);
            this.dtl.append('total', this.selectedProduk.harga*this.form.jumlah);
            var uri = this.$apiUrl + '/tp_detail/' + this.updatedId;
            this.load = true
            this.$http.post(uri, this.dtl).then( (response) =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                this.load = false;
                this.dialog = false
                this.getDataDetail();
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
                this.dialog = false
                this.getDataDetail();
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
        editHandler(){
                this.typeInput = 'edit';
                // this.dialogTransaksi = true;
                this.form.id_hewan = this.selectedHewan,
                this.form.id_pegawai_k = this.kasir,
                this.form.id_pegawai_cs = this.id_cs,
                this.form.kode = this.kode+'0'+(this.countId),
                this.form.tanggal = new Date().toLocaleString(),
                this.form.total = this.totalall,
                this.form.status = 'Penjualan',
                this.updatedIdTp = this.countId;
        },
        editHandlerDetail(item){
            this.type = 'edit';
            this.dialog = true;
            this.value = item.produk;
            this.selectedProduk = this.selectedProduk;
            this.form.total = this.form.jumlah*this.selectedProduk.harga;
            this.form.jumlah = item.jumlah;
            this.tempKode = this.tempKode;
            this.updatedId = item.id_detail_tp;
        },
        delDataDetail(deleteId){
            var uri = this.$apiUrl + '/tp_detail/' + deleteId;
            console.log(uri)
            this.$http.delete(uri).then( response =>{
                alert('Berhasil Hapus Data')
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                this.deleteDialog = false
                this.getDataDetail();
            }).catch(error =>{
                alert('Maaf Tidak dapat menghapus data')
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        },
        setForm(){
            if(this.typeInput == 'new' && this.checked == ''){
                this.sendDataTransaksi()
                this.getTransaksiID()
                console.log(this.idd)
                this.getDataDetail()
                
            }else if(this.typeInput == 'new' && this.checked == 'true'){
                this.sendDataTransaksiCheckBox()
                // this.getTransaksiID()
                 this.getTransaksiID()
                this.getDataDetail()
            }else if(this.typeInput != 'new' && this.checked == ''){
                this.updateData()
            }else{
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
        resetFormTransaksi(){
            // this.selectedCS=0,
            this.selectedHewan=0
            this.checked=false
        },
        resetFormDetail(){
            this.selectedProduk=0,
            this.form = {
                jumlah : '',
                total: '',
                ukuran_hewan: ''
            }
        },

        increment(index){
            this.jumlah++;
        },
        decrement(index){
            if(this.jumlah!=0){
                this.jumlah--;
            }    
        }
    },  
    mounted(){
        // this.getID();
        this.getTransaksiID();
        this.getIdTp()
        this.getDataProduk();
        this.loadCS();
        this.loadHewan();
        this.getCountTransaksi();
        this.getDataTransaksi();
        this.getDataDetail();
        this.getCount();
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