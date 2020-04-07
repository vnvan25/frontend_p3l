<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <v-carousel>
                            <v-carousel-item
                            v-for="(item,i) in items"
                            :key="i"
                            :src="item.src"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            ></v-carousel-item>
                        </v-carousel>
                        <br>
                    <h1 class="text-md-center font-weight-black">PRODUK KOUVEE PET SHOP</h1>
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
                    :items="products"
                    :search="keyword"
                    :loading="load">
                <template :items="products" v-slot:body="{ items }">
                    <tbody>
                <!-- <tr v-for="item in items" :key="item.id_produk"> -->
                    <v-row>
                    <v-col
                        v-for="item in items"
                        :key="item.id_produk"
                        cols="10"
                        md="4"
                        >
                    <v-card class="mx-auto" max-width="455" outlined hover>
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-2 text-center font-weight-black">{{ item.nama }}</v-list-item-title>
                        <img :src="'https://kouvee.modifierisme.com/upload/' + item.gambar" width="200px"  height="200px">
                        <div class="purple darken-2 text-center">
                             <v-list-item-subtitle class="headline mb-0 font-weight-medium text-center white--text"> Rp.{{ item.harga }}</v-list-item-subtitle>
                        </div>
                        <v-list-item-subtitle class="text-center subtitle-1">Stok : {{ item.stok }} {{ item.satuan }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    </v-card>
                    </v-col>
                    </v-row>
                <!-- </tr> -->
                    </tbody>
                </template>
                </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Detail Data Produk</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="5">
                            <v-text-field label="Nama*"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
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
            items: [
            {
                src: 'https://www.standuppouches.co.id/wp-content/uploads/2018/01/Pet-Food-Packaging.jpg',
            },
            {
                src: 'https://www.standuppouches.co.id/wp-content/uploads/2019/06/Happy-and-Grumpy-Pet-Food-Packaging.jpg',
            },
            {
                src: 'https://www.prima.dog/sites/default/files/styles/front_page_main_image_desktop/public/images/PrimaDog-frontpage-banner-1920x810_0.png?itok=oCWNZwC8',
            },
            ],
            dialog: false,
            keyword: '',
            status:'',
            satuan: ['Pax','Botol', 'Sachet'],
            headers: [
                {
                    text: '',
                    value: 'nama',
                },
                {
                    text: 'Urutkan: ',
                    value: '',
                },
                {
                    text: 'Sort_Stok',
                    value: 'stok',
                },
                {
                    text: 'Sort_Harga',
                    value: 'harga',
                },
            ],
            products: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama: '',
                harga: '',
                stok: '',
                gambar: '',
                satuan: '',
                minimal: '',
                deskripsi: ''
            },
            produk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/produk/getAll'
            this.$http.get(uri).then( (response) =>{
                this.products=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
        },
        // getData(){
        // axios.get('http://localhost:5002/API2/index.php').then(res => {
        // this.products = res.data //respon dari rest api dimasukan ke users
        //     }).catch ((err) => {
        //         console.log(err);
        //     })
        //  },
        sendData(){
            this.produk.append('nama', this.form.nama);
            this.produk.append('harga', this.form.harga);
            this.produk.append('stok', this.form.stok);
            this.produk.append('satuan', this.form.satuan);
            this.produk.append('minimal', this.form.minimal);
            var uri =this.$apiUrl + '/produk'
            this.load = true
            this.$http.post(uri, this.produk).then( (response) =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;

                this.load = false;
                this.dialog = false
                this.getData();
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
            this.produk.append('nama', this.form.nama);
            this.produk.append('harga', this.form.harga);
            this.produk.append('stok', this.form.stok);
            this.produk.append('satuan', this.form.satuan);
            this.produk.append('minimal', this.form.minimal);
            var uri = this.$apiUrl + '/produk/' + this.updatedId;
            this.load = true
            this.$http.post(uri, this.produk).then( (response) =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;

                this.load = false;
                this.dialog = false
                this.getData();
                this.resetForm();
                this.typeInput = 'new';
            }).catch( error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
                this.typeInput = 'new';
            })
        },
        editHandler(item){
            this.typeInput = 'edit';
            this.dialog = true;
            this.form.nama = item.nama;
            this.form.harga = item.harga;
            this.form.stok = item.stok;
            this.form.satuan = item.satuan;
            this.form.minimal = item.minimal;
            this.updatedId = item.id_produk;
        },
        delData(deleteId){
            var uri = this.$apiUrl + '/produk/' + deleteId;
            this.$http.delete(uri).then( response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                this.deleteDialog = false
                this.getData();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        },
        setForm(){
            if(this.typeInput == 'new'){
                this.sendData()
            }else{
                //console.log("dddd")
                this.updateData()
            }
        },
        resetForm(){
            this.form = {
                nama : '',
                harga :'',
                stok: '',
                satuan: '',
                minimal: ''
            }
        }
    },
    mounted(){
        this.getData();
        if (localStorage.getItem("token") != null) {
        if(localStorage.getItem("peran")=="Kasir"){
              window.location.replace('/homeKasir')
        }else if(localStorage.getItem("peran")=="Customer Service"){
              window.location.replace('/homeCS')
        }else if(localStorage.getItem("peran")=="Owner"){
              window.location.replace('/homeMaster')
        }
    }
    else{
      next()
    }
    },
}
</script>