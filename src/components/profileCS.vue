<template>
<div>
    <!-- <v-card> -->
        <v-container grid-list-md mb-0>
            <h1 class="text-center">PROFILE ACCOUNT</h1>
            <br>
        <v-card class="pa-md-4 mx-lg-auto" max-width="600">
            <v-card-title> Selamat Datang! {{ this.nama }} </v-card-title>
            <v-btn class="ma-2" outlined color="indigo" block>{{this.nama}}</v-btn>
            <v-btn class="ma-2" outlined color="indigo" block>{{this.tgl}}</v-btn>
            <v-btn class="ma-2" outlined color="indigo" block>{{this.peran}}</v-btn>
            <v-flex class="text-right">
            <v-btn dark color="cyan" @click="dialog = true">
                <v-icon dark>mdi-pencil</v-icon> Edit Password
            </v-btn>
            </v-flex>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Edit Password</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                                <v-text-field
                                v-model="pass.old"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rules.old"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password Lama*"
                                hint="At least 5 characters"
                                counter
                                @click:append="show1 = !show1"
                            ></v-text-field>
                                <v-text-field
                                v-model="pass.new"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rules.new"
                                :type="show2 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password Baru*"
                                hint="At least 5 characters"
                                counter
                                @click:append="show2 = !show2"
                            ></v-text-field>
                                <v-text-field
                                v-model="pass.confirm"
                                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rules.confirm"
                                :type="show3 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Konfirmasi Password*"
                                hint="At least 5 characters"
                                counter
                                @click:append="show3 = !show3"
                            ></v-text-field>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false; resetForm()">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="isValidated()">Save</v-btn>
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
</div>
</template>
<script>
  export default {
    data () {
      return {
        show1: false,
        show2: false,
        show3: false,
        dialog: false,
        snackbar: false,
        color: null,
        text: '',
        load: false,
          nama: localStorage.getItem("nama"),
          tgl: localStorage.getItem("tgl_lahir"),
          peran: localStorage.getItem("peran"),
          username : localStorage.getItem("username"),
          password : new FormData(),
          pass: {
              old:'',
              new:'',
              confirm: '',
          },
          rules: {
                old: [
                    v => !!v || 'Password is required',
                    v => v.length >= 5 || 'Min 5 characters',
                ],
                new: [
                    v => !!v || 'Password is required',
                    v => v.length >= 5 || 'Min 5 characters',
                ],
                confirm: [
                    v => !!v || 'Password is required',
                    v => v.length >= 5 || 'Min 5 characters',
                ],
            },
      }
    },
    methods:{
        isValidated(){
            if(this.pass.old != localStorage.getItem("password") && this.pass.confirm != this.pass.new){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Semua data yang anda masukkan salah";

                this.load = false;
                this.resetForm();
            }else if(this.pass.old != localStorage.getItem("password")){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Password Lama anda tidak benar";

                this.load = false;
                this.resetForm();
            }else if(this.pass.confirm != this.pass.new){
                this.snackbar = true;
                this.color = 'red';
                this.text = "Password Baru dan Password Konfirmasi tidak cocok";

                this.load = false;
                this.resetForm();
            }else{
            this.password.append('id_pegawai', localStorage.getItem("id_pegawai"));
            this.password.append('password', this.pass.confirm);
            var uri =this.$apiUrl + '/pegawai/changePassword'
            this.load = true
            this.$http.post(uri, this.password).then( (response) =>{
               this.snackbar = true;
                this.color = 'Green';
                this.text = "Ubah Password Berhasil!";
                localStorage.setItem("password", this.pass.confirm);
                this.load = false;
                this.dialog = false;
                this.resetForm();
            }).catch(error =>{
                this.errors = error
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
                this.load = false;
            })
            }
        },
        resetForm(){
            this.pass = {
                old: '',
                new:'',
                confirm: '',
            }
        }
    },
    mounted(){
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
    }
  }
</script>