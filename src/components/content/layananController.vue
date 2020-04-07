<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Layanan</h2>
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
                            Tambah Layanan
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
                    :items="layanans"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_layanan">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.layanan }} {{item.jenis}} {{item.ukuran}}</td>
                            <td>{{ item.harga }}</td>
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
                                @click="delData(item.id_layanan)"
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
                    <span class="headline">Data layanan</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nama*" v-model="form.nama" :rules="rules.nama" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <!-- <v-select  v-model="selectedJenis" :items="jenisHewan" item-value="id_jenis_hewan" item-text="nama" label="Jenis_Hewan*" :rules="rules.selected" required>
                                <option v-for="jenis in jenisHewan" :key="jenis.id_jenis_hewan">{{ jenis.nama }}</option>
                            </v-select> -->
                            <v-select
                                v-model="selectedJenis"
                                :items="jenisHewan"
                                menu-props="auto"
                                hide-details
                                item-value="id_jenis_hewan" 
                                item-text="nama" 
                                :rules="rules.selected"
                                label="Jenis Ukuran*"
                                single-line
                                v-on:change="changeRoute(`${selectedJenis.src}`)"
                                ></v-select>
                            </v-col>
                        <v-col cols="12">
                            <v-select  v-model="selectedUkuran" :items="ukuranHewan" item-value="id_ukuran_hewan" item-text="nama" label="Ukuran_Hewan*" :rules="rules.selected" required>
                                <option v-for="ukuran in ukuranHewan" :key="ukuran.id_ukuran_hewan">{{ selectedJenis.nama }}</option>
                            </v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Harga*" v-model="form.harga" :rules="rules.harga" required type="number"></v-text-field>
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
            selectedUkuran: 0,
            selectedJenis: 0,
            ukuranHewan: [{
                id_ukuran_hewan: 0,
                nama: ''
            }],
            jenisHewan: [],
            headers: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Nama',
                    value: 'namaLayanan',
                },
                {
                    text: 'Harga',
                    value: 'harga',
                },
                {
                    text: 'Aksi',
                    value: 'null',
                },
            ],
            rules: {
                nama: [
                     v => !!v || 'Name is required',
                ],

                harga: [
                    v => !!v || 'Harga is required',
                    v => v>0 || 'Harga tidak boleh minus',
                ],
                selected: [
                    v => !!v || 'Required',
                ],

            },
            layanans: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama: '',
                harga:''
            },
            layanan : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        changeRoute(a) {
        //this.$router.push({path: a })
        console.log(a)
      },
        loadUkuranHewan(){
             var uri = this.$apiUrl + '/ukuranhewan'
            this.$http.get(uri).then( (response) =>{
                this.ukuranHewan=response.data
            })
            
        },
        loadJenisHewan(){
             var uri = this.$apiUrl + '/jenishewan'
            this.$http.get(uri).then( (response) =>{
                this.jenisHewan=response.data
            })
            
        },
        getData(){
            var uri = this.$apiUrl + '/layanan'
            this.$http.get(uri).then( (response) =>{
                this.layanans=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
        },
        sendData(){
            this.layanan.append('nama', this.form.nama);
            this.layanan.append('harga', this.form.harga);
            this.layanan.append('id_ukuran_hewan', this.selectedUkuran);
            this.layanan.append('id_jenis_hewan', this.selectedJenis);
            var uri =this.$apiUrl + '/layanan'
            this.load = true
            this.$http.post(uri, this.layanan).then( (response) =>{
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
            this.layanan.append('nama', this.form.nama);
            this.layanan.append('harga', this.form.harga);
            this.layanan.append('id_ukuran_hewan', this.selectedUkuran);
            this.layanan.append('id_jenis_hewan', this.selectedJenis);
            var uri = this.$apiUrl + '/layanan/' + this.updatedId;
            this.load = true
            this.$http.post(uri, this.layanan).then( (response) =>{
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
            this.form.nama = item.layanan;
            this.form.harga = item.harga;
            this.selectedUkuran = item.ukuran;
            this.selectedJenis = item.jenis;
            this.updatedId = item.id_layanan;
        },
        delData(deleteId){
            var uri = this.$apiUrl + '/layanan/' + deleteId;
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
                jenis: '',
                ukuran: '',
                selectedUkuran: '',
                selectedJenis: ''
            }
        }
    },
    mounted(){
        this.getData();
        this.loadUkuranHewan();
        this.loadJenisHewan();
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