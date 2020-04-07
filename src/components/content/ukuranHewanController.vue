<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Ukuran Hewan</h2>
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
                            Tambah Ukuran Hewan
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search"
                        hide-details
                    ></v-text-field>
                    </v-flex>
                </v-layout>

                <v-data-table
                    :headers="headers"
                    :items="types"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_ukuran_hewan">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama }}</td>
                            <td>
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
                                @click="delData(item.id_ukuran_hewan)"
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
                    <span class="headline">Data Jenis Hewan</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nama*" v-model="form.nama" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false; resetForm()">Close</v-btn>
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
                    text: 'Aksi',
                    value: 'null',
                },
            ],
            types: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama: '',
                tgl_lahir: '',
                alamat: '',
                no_telp: ''
            },
            ukuranHewan : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/ukuranhewan'
            this.$http.get(uri).then( (response) =>{
                this.types=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
        },
        // getData(){
        // axios.get('http://localhost:5002/API2/index.php').then(res => {
        // this.types = res.data //respon dari rest api dimasukan ke users
        //     }).catch ((err) => {
        //         console.log(err);
        //     })
        //  },
        sendData(){
            this.ukuranHewan.append('nama', this.form.nama);
            var uri =this.$apiUrl + '/ukuranhewan'
            this.load = true
            this.$http.post(uri, this.ukuranHewan).then( (response) =>{
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
            this.ukuranHewan.append('nama', this.form.nama);
            var uri = this.$apiUrl + '/ukuranhewan/' + this.updatedId;
            this.load = true
            this.$http.post(uri, this.ukuranHewan).then( (response) =>{
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
            this.updatedId = item.id_ukuran_hewan;
        },
        delData(deleteId){
            var uri = this.$apiUrl + '/ukuranhewan/' + deleteId;
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
                nama : ''
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
              next()
        }
    }
    else{
      window.location.replace('/home')
    }
    },
}
</script>