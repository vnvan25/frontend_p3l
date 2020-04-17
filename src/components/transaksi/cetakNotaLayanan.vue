<template>
    <v-container>
        <v-card class="pa-md-4 mx-lg-auto" max-width="1000">
             <v-toolbar
                flat
                color="#D2B48C"
                >
                 <v-toolbar-title class=" text-center font-weight-bold" > Form Cetak Ulang Nota Transaksi Layanan Kouvee Pet Shop</v-toolbar-title>
                
             </v-toolbar>
            <v-container grid-list-md mb-0>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Nota"
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
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_tl">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.kode }}</td>
                            <td>{{ item.tanggal }}</td>
                            <td>{{ item.hewan }}</td>
                            <td>{{ item.customer_service }}</td>
                            <td>{{ item.sub_total }}</td>
                            <td>{{ item.total }}</td>
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
                                            <v-btn text @click="showFormBayar(item); createPDF()">Cetak Ulang Nota</v-btn>
                                            </v-list-item>
                                        </v-list>
                                </v-menu>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                </div>
                 <small>*Tombol Return akan memulihkan kembali pesanan yang dibatalkan ke bagian penjualan</small>
                 <br>
                 <v-btn class="mt-4 ml-2 mb-4" color="green lighten-3" rounded link to="pembayaranLayanan"><v-icon size="18" class="mr-2">mdi-arrow-left</v-icon>Kembali</v-btn>
            </v-container>
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
                                </tr>
                            </tbody>
                        </template>
                        </v-data-table>
                        <br>
                        <h4 class="ml-6"> TOTAL PEMESANAN : Rp.{{ totalBeli }}</h4>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <!-- update subtotal disini -->
                            <v-btn color="blue darken-1" text @click="dialogDetail = false">Close</v-btn>
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
        class="mr-4"
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
            layanan: [],
            detailLayanan: [],
            hewan: [],
            dialogDetail: false,
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
                    text: 'Kode',
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
                    text: 'Total Harga',
                    value: 'total',
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
            ],
            formMaster: {
                kode: '',
                id_tl: 0,
                hewan: '',
                id_hewan: '',
                id_ukuran_hewan: '',
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
        getData(){
            var uri = this.$apiUrl + '/transaksi_layanan/dataSelesai'
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
        showFormBayar(item){
            this.formBayar.kode = item.kode,
            this.formBayar.tanggal = item.tanggal,
            this.formBayar.hewan = item.hewan,
            this.formBayar.cs = item.customer_service,
            this.formBayar.sub_total = item.sub_total,
            this.formBayar.id_hewan = item.id_hewan,
            this.formBayar.total = item.total,
            this.formBayar.kasir = localStorage.getItem("nama"),
            this.formMaster.id_tl = item.id_tl,
            this.getCustomer()
            this.getDetailLayanan()
        },
        createPDF () {
            let pdfName = this.formBayar.kode; 
            var doc = new jsPDF('2', 'pt', 'a5', true);
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
            var diskon = this.formBayar.sub_total-this.formBayar.total
            doc.text(280, 210+k+22, "Diskon")
            doc.text(345, 210+k+22, "Rp."+diskon.toString())
            doc.setFontStyle("bold");
            doc.setFontSize(12)
            var total = this.formBayar.total
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
        this.getData();
        this.getDetailLayanan();
        this.getCustomer();
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