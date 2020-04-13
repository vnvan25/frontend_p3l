<template>
    <v-container>
        <v-card>
             <v-toolbar
                flat
                color="#D2B48C"
                >
                <!-- <v-icon large>mdi-note-multiple-outline
                </v-icon> -->
                 <v-toolbar-title class=" text-center font-weight-bold" > History Pembayaran Produk Selesai Kouvee Pet Shop</v-toolbar-title>
                
             </v-toolbar>
            <v-container grid-list-md mb-0>
                <!-- <h2 class="text-md-center">History Penjualan Produk Kouvee Pet Shop</h2> -->
                <v-layout row wrap style="margin:10px">
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
                            <td><v-btn @click="showHandler(item); tempHandler(item)">{{ item.kode }}</v-btn></td>
                            <td>{{ item.tanggal }}</td>
                            <td>{{ item.hewan }}</td>
                            <td>{{ item.customer_service }}</td>
                            <!-- <td>{{ item.sub_total }}</td> -->
                            <td>{{ item.sub_total }}</td>
                            <td>
                                <v-btn
                                color="red"
                                light
                                outlined
                                small
                                @click="selesaiHandler(item); createPDF()"
                                >
                                Cetak Nota
                                <v-icon>mdi-printer</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
                 <small>*Tombol Return akan memulihkan kembali pesanan yang dibatalkan ke bagian penjualan</small>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Detail Produk</span>
                </v-card-title>
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
            namakasir: localStorage.getItem("nama"),
            dialogTransaksi: false,
            dialogDetail: false,
            dialogGuest: false,
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
                    text: 'Nama Hewan Pelanggan',
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
            console.log(this.tempKode)
            this.getDetailData();
            this.loadHewanById();
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
        createPDF () {
            let pdfName = this.data.kode; 
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
            doc.text(20, 115, this.data.kode)
            doc.setFontSize(10)
            doc.text(20, 130, "Member : "+this.customer+"("+this.data.hewan+")")
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
            console.log(this.detailsTp)
            console.log(this.detailsTp.length)
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
            var diskon = this.data.total_harga-this.data.sub_total
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
        this.getDetailData();
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