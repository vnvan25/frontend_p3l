<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Pegawai</h2>
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
                            Tambah Pegawai
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
                    :items="pegawais"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_pegawai">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.tgl_lahir }}</td>
                            <td>{{ item.alamat }}</td>
                            <td>{{ item.peran }}</td>
                            <td>{{ item.no_telp }}</td>
                            <td>{{ item.username }}</td>
                            <td>{{ item.password }}</td>
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
                                @click="delData(item.id_pegawai)"
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
                    <span class="headline">Data Pegawai</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nama*" v-model="form.nama" :rules="rule.nama"  required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-date-picker label="Tanggal_Lahir*" v-model="form.tgl_lahir" :rules="rule.tgl" required></v-date-picker>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Alamat*" v-model="form.alamat" :rules="rule.alamat" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="peran" v-model="form.peran" required label="Peran*" :rules="rule.peran"></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="No_Telp*" v-model="form.no_telp" :rules="rule.telp" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Username*" v-model="form.username" :rules="rule.username" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                v-model="form.password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rule.password"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password*"
                                hint="At least 5 characters"
                                counter
                                @click:append="show1 = !show1"
                            ></v-text-field>
                            <!-- <v-text-field label="Password*" v-model="form.password" :rules="rule.password" required></v-text-field> -->
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
            peran: ['Owner','Customer Service', 'Kasir'],
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
                    text: 'Tanggal_Lahir',
                    value: 'tgl_lahir',
                },
                {
                    text: 'Alamat',
                    value: 'alamat',
                },
                {
                    text: 'Peran',
                    value: 'peran',
                },
                {
                    text: 'No_Telp',
                    value: 'no_telp',
                },
                {
                    text: 'Username',
                    value: 'username',
                },
                {
                    text: 'Password',
                    value: 'password',
                },
                {
                    text: 'Aksi',
                    value: 'null',
                },
            ],
            pegawais: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama: '',
                tgl_lahir: '',
                alamat: '',
                peran: '',
                no_telp: '',
                username: '',
                password: ''
            },
            pegawai : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
            show1: false,
            rule: {
                nama: [
                     v => !!v || 'Name is required',
                ],

                tgl: [
                    v => !!v || 'Tanggal is required',
                ],
                alamat: [
                    v => !!v || 'Alamat is required',
                ],
                peran: [
                    v => !!v || 'Peran is required',
                ],
                telp: [
                    v => !!v || 'phone is required',
                    v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) || 'Nomor Telepon diawali dengan 0 atau + dan panjang minimal 11 Angka',
                ],
                username: [
                    v => !!v || 'Username is required',
                ],
                password: [
                    v => !!v || 'Password is required',
                    v => v.length >= 5 || 'Min 5 characters',
                ],

            },
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/pegawai'
            this.$http.get(uri).then( (response) =>{
                this.pegawais=response.data
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
            this.pegawai.append('nama', this.form.nama);
            this.pegawai.append('tgl_lahir', this.form.tgl_lahir);
            this.pegawai.append('alamat', this.form.alamat);
            this.pegawai.append('peran', this.form.peran);
            this.pegawai.append('no_telp', this.form.no_telp);
            this.pegawai.append('username', this.form.username);
            this.pegawai.append('password', this.form.password);
            var uri =this.$apiUrl + '/pegawai'
            this.load = true
            this.$http.post(uri, this.pegawai).then( (response) =>{
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
            this.pegawai.append('nama', this.form.nama);
            this.pegawai.append('tgl_lahir', this.form.tgl_lahir);
            this.pegawai.append('alamat', this.form.alamat);
            this.pegawai.append('peran', this.form.peran);
            this.pegawai.append('no_telp', this.form.no_telp);
            this.pegawai.append('username', this.form.username);
            this.pegawai.append('password', this.form.password);
            var uri = this.$apiUrl + '/pegawai/' + this.updatedId;
            this.load = true
            this.$http.post(uri, this.pegawai).then( (response) =>{
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
            this.form.tgl_lahir = item.tgl_lahir;
            this.form.alamat = item.alamat;
            this.form.peran = item.peran;
            this.form.no_telp = item.no_telp;
            this.form.username = item.username;
            this.form.password = item.password;
            this.updatedId = item.id_pegawai;
        },
        delData(deleteId){
            var uri = this.$apiUrl + '/pegawai/' + deleteId;
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
                tgl_lahir :'',
                alamat: '',
                peran: '',
                no_telp: '',
                username: '',
                password: '',
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