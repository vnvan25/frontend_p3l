<template>
    <v-container>
        <v-card class="pa-md-4 mx-lg-auto" max-width="900">
             <v-toolbar flat color="#D2B48C">
                 <v-toolbar-title class=" text-center font-weight-bold" > Menu Kasir : Pembayaran Layanan</v-toolbar-title>   
             </v-toolbar>
            <v-container grid-list-md mb-0>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Transaksi Layanan"
                        hide-details
                    ></v-text-field>
                    </v-flex>
                </v-layout>
                <div v-if="this.layanan.length==0">
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
                    :items="layanan"
                    :search="keyword"
                    :loading="load"
                    >
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_tl">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.kode}}</td>
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
                                            <v-btn text @click="detailShowHandler(item)">Details</v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-btn text @click="dialogBayar=true; showFormBayar(item)">Bayar Transaksi</v-btn>
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
        <v-card class="pa-md-4 mt-4 mx-lg-auto" max-width="900" color="#FFEFD5">
            <v-card-title>
                Lihat List Pembayaran Layanan yang Selesai
            </v-card-title>
            <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn
                        rounded
                        class="text-black"
                        color="#DEB887"
                        link to="/cetakNotaLayanan">
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
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                        </v-data-table>
                        <br>
                        <h4 class="ml-6"> TOTAL PEMESANAN : Rp.{{ totalBeli }}</h4>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- update subtotal disini -->
                            <v-btn color="blue darken-1" text @click="updateSubTotal(); dialogDetail = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
        </v-dialog>
        <v-dialog v-model="dialogPenitipan" persistent max-width="300px">
            <v-card>
                <v-card-title>Update Jumlah Hari</v-card-title>
                <v-card-subtitle>Masukkan Jumlah Hari</v-card-subtitle>
                <v-text-field :hint="'Jumlah Sebelumnya : '+formEdit.jumlah+' hari'" v-model="jlhHari" class="ml-4 mr-4" placeholder="Jumlah Hari" outlined type="number"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="updateJumlah()">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogBayar" persistent max-width="800px">
            <v-card>
                <v-card-title>
                    <span class="headline">Form Pembayaran Layanan</span>
                </v-card-title>
                    <v-card 
                        class="pa-md-3 mx-lg-auto"
                        color="white"
                        width="650px"> 
                        <span class="title">Transaksi No. {{this.formBayar.kode}} </span>
                        <v-divider></v-divider>
                        <tr>
                            <td>Tanggal Transaksi </td>
                            <td> : {{this.formBayar.tanggal}} </td>
                        </tr>
                        <tr>
                            <td>Customer Service</td>
                            <td> : {{this.formBayar.cs}} </td>
                        </tr>
                        <tr>
                            <td>Kasir</td>
                            <td> : {{this.formBayar.kasir}}</td>
                        </tr>
                    </v-card>
                    
                    <v-card 
                        class="pa-md-3 mt-4 mx-lg-auto"
                        color="white"
                        width="650px"> 
                        <span class="title">Data Customer</span>
                        <v-divider></v-divider>
                        <tr>
                            <td>Nama Hewan</td>
                            <td> : {{this.formBayar.hewan}}</td>
                        </tr>
                        <tr v-if="this.formBayar.hewan=='Guest'">
                                <td>Pemilik</td>
                                <td> : Guest </td>
                        </tr>
                        <tr v-else>
                                <td>Pemilik</td>
                                <td> : {{this.formBayar.customer}}</td>
                        </tr>
                        <tr v-if="this.formBayar.hewan=='Guest'">
                                <td>Nomor Telepon</td>
                                <td> : 0 </td>
                        </tr>
                            <tr v-else>
                                <td>Nomor Telepon</td>
                                <td> : {{this.formBayar.no_telp}}</td>
                        </tr>
                    </v-card>

                    <v-card
                        class="pa-md-3 mt-4 mx-lg-auto"
                            color="white"
                            width="650px">
                            <span class="title">Data Pesanan Layanan</span>
                            <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">No</th>
                                <th class="text-left">Nama Layanan</th>
                                <th class="text-left">Total Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in detailLayanan" :key="item.id_detail_tl">
                                        <td>{{ index + 1 }}</td>
                                        <td v-if="item.layanan.includes('Penitipan')">Rp. {{ item.harga }} x {{item.jumlah}} hari</td>
                                        <td v-else>{{ item.layanan }}</td>
                                        <td>Rp. {{ item.total }}</td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>

                    <v-card
                        class="pa-md-3 mt-4 mx-lg-auto"
                        color="white"
                        width="650px">
                        <span class="title">Kelola Diskon Member</span>
                        <br>
                        <div v-if="this.formBayar.hewan=='Guest'">
                            <v-text-field v-model="percent" label="Input Diskon" placeholder="% - Percent" disabled></v-text-field>
                            <small class="text-weight-black">*Diskon hanya untuk member</small>
                        </div>
                        <div v-else>
                            <v-text-field v-model="percent" label="Input Diskon" placeholder="% - Percent" type="number" :rules="rules.number"></v-text-field>
                        </div>
                    </v-card>

                    <v-card
                        class="pa-md-3 mt-4 mx-lg-auto"
                        color="white"
                        width="650px">
                        <span class="title">Total Bayar</span>
                        <br>
                        <div class="blue lighten-4">
                        <tr>
                            <td>Sub Total</td>
                            <td> : Rp.{{totalBeli}}</td>
                        </tr>
                        <tr v-if="this.formBayar.hewan=='Guest'">
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

                    <v-card
                        class="pa-md-3 mt-4 mb-4 mx-lg-auto"
                        color="white"
                        width="650px">
                        <span class="title">Uang Pembayaran</span>
                        <br>
                        <v-text-field v-model="uang" label="Input Uang Pembayaran" placeholder="Rp. XXXXXX" type="number" :rules="rules.uang"></v-text-field>
                        <p>Kembalian : Rp.{{uang-(totalBeli-(totalBeli*percent/100))}}</p>
                    </v-card>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="mb-4" color="red lighten-1" @click="pembayaranHandler()">Bayar dan Cetak Nota</v-btn>
                    <!-- <v-btn class="mb-4" text color="primary"  @click="createPDF()">Create</v-btn> -->
                    <v-btn class="mb-4" text color="primary"  @click="dialogBayar=false">Close</v-btn>
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
            dialogDetail: false,
            dialogPenitipan: false,
            dialogBayar: false,
            keyword: '',
            snackbar: false,
            color: null,
            text: '',
            load: false,
            jumlah : new FormData(),
            total : new FormData(),
            bayar: new FormData(),
            jlhHari: 0,
            percent: 0,
            uang: 0,
            //untuk get data
            layanan: [],
            detailLayanan: [],
            hewan: [],
            //header
            headers: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Kode Layanan',
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
                number: [
                     v => v < 100 && v > 0  || 'Rannge hanya max. 100',
                ],
                uang: [
                     v => v > 0  || 'Tidak boleh minus',
                ]
            },
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
            formBayar: {
                kode: '',
                tanggal: '',
                hewan: '',
                cs: '',
                sub_total: 0,
                total: 0,
                id_tl: 0,
                kasir: '',
                customer: '',
                id_hewan: '',
                no_telp: 0,
            },
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
        getDataBayar(){
            var uri = this.$apiUrl + '/transaksi_layanan/dataBayar'
            this.$http.get(uri).then( (response) =>{
                this.layanan=response.data
            })
        },
        getDetailLayanan(){
          var uri = this.$apiUrl + '/tl_detail?id_tl='+this.formMaster.id_tl;
            this.$http.get(uri).then( (response) =>{
                this.detailLayanan=response.data
            })
        },
        getCustomer(){
            var uri = this.$apiUrl + '/hewan?id_hewan='+this.formBayar.id_hewan
            this.$http.get(uri).then( (response) =>{
                this.hewan=response.data
                this.formBayar.customer=response.data[0].nama
                this.formBayar.no_telp=response.data[0].no_telp
            })
        },
        detailShowHandler(data){
            this.dialogDetail = true,
            this.formMaster.nama = data.hewan,
            this.formMaster.id_tl = data.id_tl,
            this.formMaster.id_ukuran_hewan = data.id_ukuran_hewan,
            this.getDetailLayanan();
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
        editPenitipanHandler(data){
            this.formEdit.jumlah = data.jumlah,
            this.formEdit.id_detail = data.id_detail_tl,
            this.formEdit.harga = data.harga
        },
        updateJumlah(){
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
        },
        hitungTotal: function(){
            return this.detailLayanan.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
        updateSubTotal(){
            this.total.append('id_tl', this.formMaster.id_tl);
            this.total.append('sub_total', this.hitungTotal());
            var uri =this.$apiUrl + '/transaksi_layanan/updateSub'
            this.load = true
            this.$http.post(uri, this.total).then( (response) =>{
                this.load = false;
                this.getDataBayar();
            }).catch(error =>{
                this.load = false;
            })
        },
        showFormBayar(item){
            this.formBayar.kode = item.kode,
            this.formBayar.tanggal = item.tanggal,
            this.formBayar.hewan = item.hewan,
            this.formBayar.cs = item.customer_service,
            this.formBayar.sub_total = item.sub_total,
            this.formBayar.id_hewan = item.id_hewan,
            this.formBayar.kasir = localStorage.getItem("nama"),
            this.formMaster.id_tl = item.id_tl,
            this.getCustomer();
            this.getDetailLayanan();
        },
        pembayaranHandler(){
            if(this.formBayar.hewan == 'Guest'){
                this.formBayar.total = this.formBayar.sub_total;
            }else{
                this.formBayar.total = this.formBayar.sub_total-(this.formBayar.sub_total*this.percent/100);
            }
            this.pembayaran();
        },
        pembayaran(){
        if(this.uang<this.formBayar.total){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Uang Pembayaran Kurang";
        }else{
            this.$confirm("Yakin Menyelesaikan Pembayaran?").then(() => {
                this.bayar.append('id_tl', this.formMaster.id_tl);
                this.bayar.append('total', this.formBayar.total);
                this.bayar.append('status', "Selesai");
                var uri = this.$apiUrl + '/transaksi_layanan/updateBayar'
                this.load = true
                this.$http.post(uri, this.bayar).then( (response) =>{
                    this.load = false;
                    this.dialogBayar = false
                    this.getDataBayar();
                    this.createPDF();
                }).catch( error =>{
                    this.load = false;
                })
                });
            }
        },
        createPDF () {
            let pdfName = this.formBayar.kode; 
            var doc = new jsPDF('2', 'pt', 'a5', true);

            // var img = new Image(),
            //     canvas = document.createElement("canvas"),
            //     ctx = canvas.getContext("2d");
            //     ctx.fillStyle = "white";
            //     img.src = 'http://kouvee.modifierisme.com/upload/logo.jpg'
            // ctx.drawImage(img, 0, 0);
            // var imgData = canvas.toDataURL('image/jpeg');
            // doc.addImage(imgData, 'JPEG', 1, 1, 140, 90);
            
            doc.setFontSize(20)
            doc.text(117, 30, 'KOUVEE PET SHOP')
            doc.setFontSize(12)
            doc.text(80, 45, 'Jalan Moses GatotKaca No.22 Yogyakarta 55281')
            doc.setFontSize(12)
            doc.text(145, 60, 'Telp. (0274) 357735')
            doc.setFontSize(12)
            doc.text(125, 73, 'http://www.sayanghewan.com')
            // urutan line(padding, titik awal garis, panjang, titik akhir)
            doc.setLineWidth(0.5);
            doc.line(0, 80, 420, 80);
            doc.setFontSize(16)
            doc.text(157, 95, 'NOTA LUNAS')
            doc.setFontSize(10)
            doc.text(this.tglTransaksi, 373, 115, null, null, "right");
            doc.setFontSize(10)
            doc.text(20, 115, this.formBayar.kode)
            doc.setFontSize(10)
            doc.text(20, 130, "Member : "+this.formBayar.customer+"("+this.formBayar.hewan+")")
            if(this.formBayar.hewan=="Guest"){
                doc.setFontSize(10)
                doc.text(20, 145, "Telepon : 0")
            }else{
                doc.setFontSize(10)
                doc.text(20, 145, "Telepon : "+this.formBayar.no_telp)
            }
            doc.setFontSize(10)
            doc.text(280, 130, "CS    : "+this.formBayar.cs)
            doc.setFontSize(10)
            doc.text(280, 145, "Kasir : "+this.formBayar.kasir)
            doc.setLineWidth(0.2);
            doc.line(0, 152, 420, 152);
            doc.setFontSize(12)
            doc.text(185, 165, 'Jasa Layanan')
            doc.setLineWidth(0.2);
            doc.line(0, 170, 420, 170);
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(20, 195, "No")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(60, 195, "Nama Layanan")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(250, 195, "Harga")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(360, 195, "Total")
            doc.setLineWidth(0.2);
            doc.line(20, 200, 400, 200);
            doc.setFontStyle("normal");
            let k=10;
            for (let i = 0, j = 1; i < this.detailLayanan.length; i++) {
                if(this.detailLayanan[i].layanan.includes('Penitipan')){
                    var splitLayanan = doc.splitTextToSize(this.detailLayanan[i].layanan+' '+this.detailLayanan[i].ukuran+' '+this.detailLayanan[i].jumlah+' hari', 180);
                }else{
                    var splitLayanan = doc.splitTextToSize(this.detailLayanan[i].layanan+' '+this.detailLayanan[i].ukuran, 180);
                }
                doc.text(22, 210+k , j.toString())
                doc.text(60, 210+k , splitLayanan)
                doc.text(250, 210+k , this.detailLayanan[i].harga)
                doc.text(360, 210+k , this.detailLayanan[i].total)
                j++;
                k+=28;
            }

            doc.setLineWidth(0.2);
            doc.line(20, 210+k-21, 400, 210+k-21);
            doc.text(280, 210+k, "Sub Total")
            doc.text(345, 210+k, "Rp."+this.formBayar.sub_total.toString())
            var diskon = this.formBayar.sub_total*this.percent/100
            doc.text(280, 210+k+22, "Diskon")
            doc.text(345, 210+k+22, "Rp."+diskon.toString())
            doc.setFontStyle("bold");
            doc.setFontSize(12)
            var total = this.formBayar.sub_total-diskon
            doc.text(280, 210+k+44, "Total")
            doc.text(345, 210+k+44, "Rp."+total.toString())

            doc.setProperties({
                title: "Nota Transaksi No."+this.formBayar.kode
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
        this.getDataBayar();
        this.getDetailLayanan();
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