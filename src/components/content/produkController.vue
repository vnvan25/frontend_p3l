<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Produk</h2>
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
                            Tambah Produk
                        </v-btn>
                    </v-flex>
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
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_produk">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.harga }}</td>
                            <td>{{ item.stok }}</td>
                            <td>{{ item.satuan }}</td>
                            <td>{{ item.minimal }}</td>
                            <td><img :src="'http://127.0.0.1:5002/API2/upload/' + item.gambar" width="100px"></td>
                            <td class="text-center">
                                <v-btn
                                    icon
                                    color="indigo"
                                    light
                                    @click="editHandler(item)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn
                                icon
                                color="error"
                                light
                                @click="delData(item.id_produk)"
                                >
                                <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Data Produk</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nama*" v-model="form.nama" :rules="rules.nama" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Harga*" v-model="form.harga" :rules="rules.harga" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-label>Gambar</v-label>
                            <br>
                            <input type="file" @change="onFileUpload">
                            
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Stok*" v-model="form.stok" :rules="rules.stok" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="satuan" v-model="form.satuan" :rules="rules.satuan" required label="Satuan*"></v-select>
                        </v-col>
                        <!-- <v-col cols="12">
                            <v-text-field label="Satuan*" v-model="form.satuan" required></v-text-field>
                        </v-col> -->
                        <v-col cols="12">
                            <v-text-field label="Minimal*" v-model="form.minimal" :rules="rules.minimal" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
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
            dialog: false,
            keyword: '',
            status:'',
            selectedFile: null,
            satuan: ['Pax','Botol', 'Sachet'],
            rules: {
                nama: [
                     v => !!v || 'Name is required',
                ],

                harga: [
                    v => !!v || 'harga is required',
                    v => (v && v.length <= 0) || 'Harga tidak boleh minus',
                ],
                stok: [
                    v => !!v || 'stok is required',
                    v => (v && v.length < 0) || 'Input dengan benar',
                ],
                satuan: [
                    v => !!v || 'satuan is required',
                ],
                minimal: [
                    v => !!v || 'minimal is required',
                    v => (v && v.length < 0) || 'Input dengan benar',
                ],

            },
            headers: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Nama',
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
                {
                    text: 'Gambar',
                    value: 'gambar',
                },
                {
                    text: 'Aksi',
                    value: 'null',
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
                deskripsi: '',
            },
            produk : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/produk'
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
            // this.produk.append('gambar', this.upload);
            this.produk.append('gambar', this.selectedFile, this.selectedFile.nama);
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
            this.produk.append('gambar', this.selectedFile, this.selectedFile.nama);
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
            this.form.deskripsi =  item.deskripsi;
            this.form.gambar =  item.gambar;
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
                gambar: '',
                minimal: '',
                deskripsi: '',
                gambar: ''
            }
        },
        // upload() {
        //     this.file_data = $('#image').prop('files')[0];
        //     this.form_data = new FormData();
        //     this.form_data.append('file', this.file_data);
        //     let url = "http://127.0.0.1:5002/API2/index.php/produk";
        //     var self = this
        //         axios
        //             .post(url, this.form_data).then((res) => {
        //                 if (res.data.success) {
        //                     $('#image-display').attr('src', res.data.success)
        //                 }
        //                 if (res.data.error) {
        //                     $('#error').html(res.data.error)
        //                 }
        //             });
        // }
        onFileUpload(event){
            // var fileReader = new FileReader()
            // fileReader.readAsDataURL(e.target.files[0])
            // fileReader.onload = (e) => {
            //     return e.target.result
            //     console.log(e.target.result)
            // }
            this.selectedFile = event.target.files[0]
        },
         previewFiles() {
             this.files = this.$refs.myFiles.files
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
              next()
        }
    }
    else{
      window.location.replace('/home')
    }
    },
}
</script>