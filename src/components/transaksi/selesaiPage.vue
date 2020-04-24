<template>
    <v-container>
        <v-card class="pa-md-4 mx-lg-auto" max-width="900">
             <v-toolbar
                flat
                color="#D2B48C"
                >
                 <v-toolbar-title class=" text-center font-weight-bold" > Form Cetak Ulang Nota Transaksi Produk Kouvee Pet Shop</v-toolbar-title>
                
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
                                            <v-btn text @click="showHandler(item); tempHandler(item)">Details</v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                            <v-btn text @click="selesaiHandler(item);">Cetak Ulang Nota</v-btn>
                                            </v-list-item>
                                        </v-list>
                                </v-menu>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                 <small>*Tombol Return akan memulihkan kembali pesanan yang dibatalkan ke bagian penjualan</small>
                 <br>
                 <v-btn class="mt-4 ml-2 mb-4" color="green lighten-3" rounded link to="pembayaranProduk"><v-icon size="18" class="mr-2">mdi-arrow-left</v-icon>Kembali</v-btn>
            </v-container>
        </v-card>
        <v-dialog v-model="dialogCetak" persistent max-width="600px">
            <v-card>
                <v-card-title>Nota Lunas Produk No. {{this.data.kode}}
                    <v-spacer></v-spacer>
                        <v-btn icon color="red" @click="dialogCetak=false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                
                <v-card-actions>
                    <v-btn class="ml-4 mb-4 mt-4" color="primary" @click="cetak()">Preview Nota Lunas</v-btn>
                    <v-btn class="ml-4 mb-4 mt-4" color="warning" @click="download()">Download Nota Lunas</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Detail Produk</span>
                </v-card-title>
                <v-data-table
                    :headers="headersDetail"
                    :items="detailsTp"
                    :search="keyword"
                    :loading="load"
                    class="ml-5"
                    hide-default-footer>
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_detail_tp">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.produk }}</td>
                            <td>{{ item.jumlah }}</td>
                            <td>{{ item.total }}</td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                <br>
                <h4 class="ml-5"> TOTAL PEMBELIAN : Rp.{{ totalBeli }}</h4>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false; selected()">Close</v-btn>
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
            namakasir: localStorage.getItem("nama"),
            dialogTransaksi: false,
            dialogDetail: false,
            dialogGuest: false,
            dialogCetak: false,
            counter: 0,
            dialog: false,
            keyword: '',
            status: 'Penjualan',
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
                }
            ],
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
                    text: 'Total Harga',
                    value: 'sub_total',
                },
                {
                    text: 'Konfirmasi',
                    value: 'konfirmasi',
                }
            ],
            data: {
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
            transactions: [],
            detailsTp: [],
            produks: [],
            hewan: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            batal : new FormData,
            errors : '',
            updatedId : '',
            updatedIdDetail : '',
            tempKode: '',
            konfirmasiId: '',
            batalId: '',
            kasir: 0,
            totalall: '',
            updatedTemp: '',
            customer: '',
            no_telp: '',
            nama: '',
            cek : '',
            flen: '',
            i: '',
            id_temp :'',
            jumlahDetail: 0,
            totalDetail: 0,
            id_tp : 0,
            kodee: '',
            jenis: '',
        }
    },
    computed: {
        totalBeli: function(){
            return this.detailsTp.reduce((acc, item) => {
            return acc + (item.total*1)
            }, 0)
        },
    },
    methods:{
        loadHewan(){
             var uri = this.$apiUrl + '/hewan'
            this.$http.get(uri).then( (response) =>{
                this.hewan=response.data
            })
        },
        loadHewanById(){
            var uri = this.$apiUrl + '/hewan?id_hewan='+this.data.id_hewan
            this.$http.get(uri).then( (response) =>{
                this.hewans=response.data
                this.customer=response.data[0].nama
                this.no_telp=response.data[0].no_telp
                console.log(this.bayar.id_hewan)
                console.log(this.hewans)
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
            var uri = this.$apiUrl + '/transaksi_produk/dataSelesai'
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
        showHandler(id){
                this.nama = id.hewan;
                this.dialog = true;
                this.tempKode = id.id_tp;
                this.getDetailData();
        },
        selesaiHandler(item){
            this.data.hewan = item.hewan,
            this.data.id_hewan = item.id_hewan,
            this.data.cs = item.customer_service,
            this.data.sub_total = item.sub_total,
            this.data.total_harga = item.total_harga,
            this.data.kode = item.kode,
            this.tempKode = item.id_tp,
            this.getDetailData();
            this.loadHewanById();
            this.getJenis();
            this.dialogCetak=true;
        },
        cetak(){
            this.counter=1;
            this.createPDF();
        },
        download(){
            this.counter=2;
            this.createPDF();
        },
        getJenis(){
            var uri = this.$apiUrl + '/transaksi_layanan/jenis?id_hewan='+this.data.id_hewan
            this.$http.get(uri).then( (response) =>{
                if(this.data.hewan=='Guest'){
                    this.jenis='Guest'
                }else{
                    this.jenis=response.data[0].nama
                    console.log(this.jenis)
                }
                
            })
        },
        isBatal(){
        this.$confirm("Yakin ingin mengembalikan transaksi?").then(() => {
            this.batal.append('id_tp', this.id_tp);
            this.batal.append('status', this.status);
            var uri =this.$apiUrl + '/transaksi_produk/pulihkan'
            this.load = true
            this.$http.post(uri, this.batal).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Berhasil di pulihkan";
                this.load = false;
                this.dialog = false;
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
        });
        },
        createPDF(){
            let pdfName = this.data.kode; 
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
            doc.setFontSize(16)
            doc.text(157, 95, 'NOTA LUNAS')
            doc.setFontSize(10)
            doc.text(this.tglTransaksi, 373, 115, null, null, "right");
            doc.setFontSize(10)
            doc.text(20, 115, this.data.kode)
            doc.setFontSize(10)
            doc.text(20, 130, "Member : "+this.customer+"("+" "+this.data.hewan+" "+"-"+" "+this.jenis+" "+")")
            if(this.data.hewan=="Guest"){
                doc.setFontSize(10)
                doc.text(20, 145, "Telepon : 0")
            }else{
                doc.setFontSize(10)
                doc.text(20, 145, "Telepon : "+this.no_telp)
            }
            doc.setFontSize(10)
            doc.text(280, 130, "CS    : "+this.data.cs)
            doc.setFontSize(10)
            doc.text(280, 145, "Kasir : "+this.namakasir)
            doc.setLineWidth(0.2);
            doc.line(0, 152, 420, 152);
            doc.setFontSize(12)
            doc.text(185, 165, 'Produk')
            doc.setLineWidth(0.2);
            doc.line(0, 170, 420, 170);
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(20, 195, "No")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(60, 195, "Nama Produk")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(250, 195, "Harga")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(305, 195, "Jumlah")
            doc.setFontSize(10)
            doc.setFontStyle("bold");
            doc.text(360, 195, "Total")
            doc.setLineWidth(0.2);
            doc.line(20, 200, 400, 200);
            doc.setFontStyle("normal");
            let k=10;
            for (let i = 0, j = 1; i < this.detailsTp.length; i++) {
                var splitproduk = doc.splitTextToSize(this.detailsTp[i].produk, 180);
                doc.text(22, 210+k , j.toString())
                doc.text(60, 210+k , splitproduk)
                doc.text(250, 210+k , this.detailsTp[i].harga)
                doc.text(315, 210+k , this.detailsTp[i].jumlah)
                doc.text(360, 210+k , this.detailsTp[i].total)
                j++;
                k+=28;
            }

            doc.setLineWidth(0.2);
            doc.line(20, 210+k-21, 400, 210+k-21);
            doc.text(280, 210+k, "Sub Total")
            doc.text(345, 210+k, "Rp."+this.data.sub_total.toString())
            var diskon = this.data.sub_total-this.data.total_harga
            doc.text(280, 210+k+22, "Diskon")
            doc.text(345, 210+k+22, "Rp."+diskon.toString())
            doc.setFontStyle("bold");
            doc.setFontSize(12)
            var total = this.data.total_harga
            doc.text(280, 210+k+44, "Total")
            doc.text(345, 210+k+44, "Rp."+total.toString())

            doc.setProperties({
                title: "Nota Transaksi No."+this.data.kode
            });
            if(this.counter==1){
                var string = doc.output('dataurlnewwindow');
                var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
                var x = window.open();
                x.document.open();
                x.document.write(embed);
                x.document.close();
            }else{
                doc.save(this.data.kode + '.pdf');
            }
        },
    },
    mounted(){
        this.getData();
        // this.getDetailData();
        this.getDataProduk();
        this.loadHewan();
        this.loadHewanById();
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