<template>
<div>
        <v-container grid-list-md mb-0>
          <v-parallax src="https://kouvee.modifierisme.com/upload/web/back.png" height="550">
           <v-card class="pa-md-10 mx-lg-auto" max-width="400px">
             <v-img :src="'https://kouvee.modifierisme.com/upload/logo.jpg'" aspect-ratio="2.5" contain class="ml-n2"></v-img>
             <v-img src="https://kouvee.modifierisme.com/upload/web/Kouvee.png" max-width="500" max-height="500" class="ml-8"></v-img>
               <h2 class="text-center">Halaman Login</h2>
                <v-layout>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="username" label="Username*" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                       <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rule.password"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password*"
                                hint="At least 5 characters"
                                counter
                                @click:append="show1 = !show1"
                                outlined
                                class="mt-n10"
                            ></v-text-field>
                    </v-col>
                </v-row>
             </v-layout>
            <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="resetform()" >CANCEL</v-btn>
                    <v-btn color="#DEB887" class="pa-md-2"  dense @click="login()" >LOGIN</v-btn>
            </v-card-actions>
               
           </v-card> 

           <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="7000">
                     {{ text }}
            <v-btn dark text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            </v-parallax>
        </v-container>
        
    <!-- </v-card> -->
</div>
</template>
<script>
  export default {
    data () {
      return {
        snackbar: false,
        color: null,
        text: "",
        load: false,
        show1: false,
        password: '',
        username: '',
        peran: '',
        user: [],
        pegawai: new FormData(),
        rule: {
              password: [
                    v => !!v || 'Password is required',
                    v => v.length >= 5 || 'Min 5 characters',
                ],
          }
      }
    },
    methods: {
    login() {
      var url = this.$apiUrl + "/Login";
      this.pegawai.append("username", this.username);
      this.pegawai.append("password", this.password);

      this.$http.post(url, this.pegawai).then(response => {
        if (response.data.token) {
          this.user = response.data
          localStorage.setItem("token", response.data.token);
          // localStorage.setItem("pegawai", response.data.pegawai);
          localStorage.setItem("username", response.data.pegawai.username);
          localStorage.setItem("password", response.data.pegawai.password);
          localStorage.setItem("nama", response.data.pegawai.nama);
          localStorage.setItem("peran", response.data.pegawai.peran);
          localStorage.setItem("tgl_lahir", response.data.pegawai.tgl_lahir);
          localStorage.setItem("alamat", response.data.pegawai.alamat);
          localStorage.setItem("no_telp", response.data.pegawai.no_telp);
          localStorage.setItem("id_pegawai", response.data.pegawai.id_pegawai);
          
          this.snackbar = true;
          this.color = "green";
          this.text = "Berhasil Login";

          if(response.data.pegawai.peran == "Kasir"){
            this.$router.push({ name: "homeKasir" });
          }else if(response.data.pegawai.peran == "Customer Service"){
            this.$router.push({ name: "homeCS" });
          }else if(response.data.pegawai.peran == "Owner"){
            this.$router.push({ name: "homeMaster" });
          }
        } else {
          this.snackbar = true;
          this.text = "Invalid Username or Password!";
          this.color = "red";
          this.load = false;
        }
      });
    },
    resetform(){
      this.username= '',
      this.password=''
    }
  },
  mounted(){
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
    }
  }
</script>