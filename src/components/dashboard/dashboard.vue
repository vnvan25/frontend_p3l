<template>
    <div>
        <v-app-bar
            dark
            app
            fixed
            clipped-left
            height="50px"
            color="white">
            <v-app-bar-nav-icon style="color: #DEB887" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title
                    style="font-size: 23px;"
                    class="brown--text font-weight-black ml-2"
                >
                    Kouvee Pet Shop
                </v-toolbar-title>

                <v-spacer></v-spacer>
            
            
            <v-avatar color="#DEB887" size="34" class="ml-12">
                <span class="white--text subtitle-1">{{name}}</span>
            </v-avatar>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-y
            >
            <template v-slot:activator="{ on }">
                <v-btn text color="black" class="mr-12" v-on="on">Hello, {{nama}}</v-btn>
            </template>
            <v-card>
                <v-list>
                <v-list-item>
                    <v-list-item-avatar>
                        <h3 class="black--text subtitle-1">{{name}}</h3>  
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>{{nama}}</v-list-item-title>
                    <v-list-item-subtitle class="mt-1">Posisi : {{peran}}</v-list-item-subtitle>
                    </v-list-item-content>
                    
                    <!-- <v-list-item-action> -->
                    <v-btn
                        :class="fav ? 'red--text' : ''"
                        icon
                        @click="menu = false"
                        class="mr-n4 mt-n12"
                    >
                        <v-icon>mdi-36px mdi-close</v-icon>
                    </v-btn>
                    <!-- </v-list-item-action> -->
                </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                <v-list-item>
                    <v-list-item-icon><v-icon>mdi-cake</v-icon></v-list-item-icon>
                    <v-list-item-title>{{tgl_lahir}}</v-list-item-title>
                </v-list-item>

                <v-list-item class="mt-n5">
                    <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
                    <v-list-item-title>{{alamat}}</v-list-item-title>
                </v-list-item>

                <v-list-item class="mt-n5">
                    <v-list-item-icon><v-icon>mdi-phone-classic</v-icon></v-list-item-icon>
                    <v-list-item-title>{{no_telp}}</v-list-item-title>
                </v-list-item>
                </v-list>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text @click="logout()">Logout</v-btn>
                <v-btn color="#DEB887" text  @click="dialog = true">Edit Password</v-btn>
                </v-card-actions>
            </v-card>
            </v-menu>

            </v-app-bar>

        <div>
        <v-navigation-drawer
        v-model="drawer"
        color="#DEB887"
        app
        clipped
        fixed
        temporary
        >
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Kouvee Pet Shop
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Welcome to our shop
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list color="#DEB887">
                <v-list-item link to ="homeMaster">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-group
                >
                <template v-slot:activator>
                    <v-list-item-icon>
                            <v-icon>mdi-database-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Data master</v-list-item-title>
                </template>
                        <v-list-item link to ="produk">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Produk</v-list-item-title>
                        </v-list-item>

                        <v-list-item link to ="layanan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Layanan</v-list-item-title>
                        </v-list-item>

                        <v-list-item link to ="supplier">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Supplier</v-list-item-title>
                        </v-list-item>

                        <v-list-item link to ="pegawai">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Pegawai</v-list-item-title>
                        </v-list-item>

                        <v-list-item link to ="datacustomer">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Customer</v-list-item-title>
                        </v-list-item>

                        <v-list-item link to ="datahewan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Hewan</v-list-item-title>
                        </v-list-item>

                        <v-list-item link to ="jenisHewan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Jenis Hewan</v-list-item-title>
                        </v-list-item>

                        <v-list-item link to ="ukuranHewan">
                            <v-list-item-icon>
                                <v-icon></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Ukuran Hewan</v-list-item-title>
                        </v-list-item>
                </v-list-group>

                 <v-list-group
                >
                <template v-slot:activator>
                    <v-list-item-icon>
                            <v-icon>mdi-cart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Pengadaan</v-list-item-title>
                </template>
                <v-list-item link to ="/daftarStokHabis">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>List Stok Habis</v-list-item-title>
                </v-list-item>
                <v-list-item link to ="/addPengadaan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Tambah Pengadaan</v-list-item-title>
                </v-list-item>
                <v-list-item link to ="/historyPengadaan">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>History Pengadaan</v-list-item-title>
                </v-list-item>
                 </v-list-group>

                <v-list-item link to ="laporanLayout">
                    <v-list-item-icon>
                        <v-icon>mdi-file-chart</v-icon>
                    </v-list-item-icon>
                <v-list-item-title>Laporan Data</v-list-item-title>
                </v-list-item>

                <v-list-group
                >
                <template v-slot:activator>
                    <v-list-item-icon>
                            <v-icon>mdi-file-document</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Log Aktifitas</v-list-item-title>
                </template>
                <v-list-item link to ="dataMasterLog">
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Data Master Log</v-list-item-title>
                </v-list-item>
                <v-list-item link to ="transaksilog" >
                    <v-list-item-icon>
                        <v-icon></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Transaksi Log</v-list-item-title>
                </v-list-item>
                 </v-list-group>
                 
            </v-list>
        </v-navigation-drawer>
        </div>
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
        
        <VContent>
            <router-view />
        </VContent>
    </div>      
</template>

<script>
export default {
    data(){
        return{
            drawer: null,
            nama:  localStorage.getItem("nama"),
            peran: localStorage.getItem("peran"),
            tgl_lahir: localStorage.getItem("tgl_lahir"),
            alamat: localStorage.getItem("alamat"),
            no_telp: localStorage.getItem("no_telp"),
            fav: true,
            menu: false,
            message: false,
            hints: true,
            name: '',
            items: [
                {title: 'Produk', icon: 'mdi-cart'},
                {title: 'Layanan', icon: 'mdi-barcode'}
            ],
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings'],
            ],
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
    methods: {
        data(){
            this.name = this.nama.substring(0,2);
            this.name = this.name.toUpperCase();
        },
        logout(){
            localStorage.clear();
            this.$router.push({ name: "home" });
        },
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
        this.data();
    },
}
</script>
