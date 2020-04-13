<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Data Hewan</h2>
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
                            Tambah Hewan
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
                    :items="hewans"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_hewan">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.tgl_lahir }}</td>
                            <td>{{ item.ukuran_hewan }}</td>
                            <td>{{ item.jenis_hewan }}</td>
                            <td>{{ item.customer }}</td>
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
                                @click="delData(item.id_hewan)"
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
                    <span class="headline">Data hewan</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nama*" v-model="form.nama" :rules="rules.nama"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-date-picker label="Tanggal_Lahir*" v-model="form.tgl_lahir" :rules="rules.tgl" required></v-date-picker>
                        </v-col>
                        <v-col cols="12">
                            <!-- <v-select :items="ukuran_hewan" v-model="form.ukuran_hewan" required label="Ukuran_Hewan*"></v-select> -->
                            <v-select  v-model="selectedUkuran" :items="ukuranHewan" item-value="id_ukuran_hewan" item-text="nama" label="Ukuran_Hewan*" :hint="ukuranHint" :rules="rules.selected" required>
                                <option v-for="ukuran in ukuranHewan" :key="ukuran.id_ukuran_hewan">{{ ukuran.nama }}</option>
                            </v-select>
                        </v-col>
                        <v-col cols="12">
                            <!-- <v-select :items="jenis_hewan" v-model="form.jenis_hewan" required label="Jenis_Hewan*"></v-select> -->
                            <v-select  v-model="selectedJenis" :items="jenisHewan" item-value="id_jenis_hewan" item-text="nama" label="Jenis_Hewan*" :hint="jenis" :rules="rules.selected" required>
                                <option v-for="jenis in jenisHewan" :key="jenis.id_jenis_hewan">{{ jenis.nama }}</option>
                            </v-select>
                        </v-col>
                        <v-col cols="12">
                            <!-- <v-text-field label="Customer*" v-model="form.customer" required></v-text-field> -->
                            <v-select v-model="selectedCst" :items="cstHewan" item-value="id_customer" item-text="nama" label="Customer*" :hint="pemilik" :rules="rules.selected" required>
                                <option v-for="cst in cstHewan" :key="cst.id_customer">{{ cst.nama }}</option>
                            </v-select>
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
            selectedCst: 0,
            ukuranHewan: [{
                id_ukuran_hewan: 0,
                nama: ''
            }],
            jenisHewan: [],
            cstHewan: [],
            ukuran: '',
            pemilik: '',
            // ukuran_hewan: ['Small', 'Extra Large', 'Medium'],
            // jenis_hewan: ['Anjing', 'Kucing', 'Kambing'],
            rules: {
                nama: [
                     v => !!v || 'Name is required',
                ],

                tgl: [
                    v => !!v || 'Tanggal is required',
                ],
                selected: [
                    v => !!v || 'Required',
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
                    text: 'Tanggal_Lahir',
                    value: 'tgl_lahir',
                },
                {
                    text: 'Ukuran_Hewan',
                    value: 'ukuran_hewan',
                },
                {
                    text: 'Jenis_Hewan',
                    value: 'jenis_hewan',
                },
                {
                    text: 'Customer',
                    value: 'customer',
                },
                {
                    text: 'Aksi',
                    value: 'null',
                },
            ],
            hewans: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                nama: '',
                tgl_lahir: '',
                ukuran_hewan: '',
                jenis_hewan: '',
                customer: ''
            },
            hewan : new FormData,
            // hewan: {},
            typeInput: 'new',
            errors : '',
            updatedId : '',
            ukuranHint: '',
            jenis: '',
        }
    },
    methods:{
        // loadUkuranHewan(){
        //     var uri = this.$apiUrl + '/ukuranHewan'
            
        //     this.$http.get(uri).then( (response) =>{
        //         let ukurans = response.data;
        //         ukurans.forEach( ukurans => 
        //             this.ukuranHewan.push( ukurans.nama))
        //         console.log(this.ukuranHewan)
        //     })
        //     console.log(this.ukuranHewan)
        // },
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
        loadCustomer(){
             var uri = this.$apiUrl + '/customer'
            this.$http.get(uri).then( (response) =>{
                this.cstHewan=response.data
            })
            
        },
        getData(){
            var uri = this.$apiUrl + '/hewan'
            this.$http.get(uri).then( (response) =>{
                this.hewans=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
        },
        sendData(){
            this.hewan.append('nama', this.form.nama);
            this.hewan.append('tgl_lahir', this.form.tgl_lahir);
            this.hewan.append('id_ukuran_hewan', this.selectedUkuran);
            this.hewan.append('id_jenis_hewan', this.selectedJenis);
            this.hewan.append('id_customer', this.selectedCst);
            // this.hewan = {
            //     nama: this.form.nama,
            //     tgl_lahir: this.form.tgl_lahir,
            //     'id_ukuran_hewan': this.selectedUkuran,
            //     'id_jenis_hewan': this.selectedJenis,
            //     'id_customer': this.selectedCst,
            // }
            
            var uri =this.$apiUrl + '/hewan'
            this.load = true
            this.$http.post(uri, this.hewan)
            .then(response =>{
                this.snackbar = true;
                this.color = 'green';
                this.text = response.data.message;
                console.log(response.data.message)
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
            this.hewan.append('nama', this.form.nama);
            this.hewan.append('tgl_lahir', this.form.tgl_lahir);
            this.hewan.append('id_ukuran_hewan', this.selectedUkuran);
            this.hewan.append('id_jenis_hewan', this.selectedJenis);
            this.hewan.append('id_customer', this.selectedCst);
            var uri = this.$apiUrl + '/hewan/' + this.updatedId;
            this.load = true
            this.$http.post(uri, this.hewan).then( (response) =>{
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
            this.selectedUkuran = item.ukuran_hewan;
            this.selectedJenis = item.jenis_hewan;
            this.ukuranHint = item.ukuran_hewan;
            this.jenis = item.jenis_hewan;
            this.pemilik = item.customer;
            this.selectedCst = item.customer;
            this.updatedId = item.id_hewan;
        },
        delData(deleteId){
            var uri = this.$apiUrl + '/hewan/' + deleteId;
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
                tgl_lahir: '',
                ukuran_hewan: '',
                jenis_hewan: '',
                customer: '',
                selectedUkuran: 0,
                selectedJenis: 0,
                selectedCst: 0
            }
        }
    },
    mounted(){
        this.getData();
        this.loadUkuranHewan();
        this.loadJenisHewan();
        this.loadCustomer();
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