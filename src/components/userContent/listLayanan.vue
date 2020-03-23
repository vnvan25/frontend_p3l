<template>
    <v-container>
        <!-- <v-card> -->
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">Layanan Kouvee Pet Shop</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field
                        v-model="keyword"
                        append-icon="mdi-search"
                        label="Search Layanan"
                        hide-details
                    ></v-text-field>
                    </v-flex>
                </v-layout>
                
                <v-data-table
                    :headers="headers"
                    :items="layanans"
                    :search="keyword"
                    :loading="load">
                <template :items="layanas" v-slot:body="{ items }">
                    <tbody>
                <!-- <tr v-for="item in items" :key="item.id_layanan"> -->
                    <v-row>
                    <v-col
                        v-for="item in items"
                        :key="item.id_layanan"
                        cols="16"
                        md="4"
                        >
                    <v-card class="mx-auto" max-width="344" color="brown darken-2" hover>
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-1 text-center">{{ item.namaLayanan }}</v-list-item-title>
                        <v-list-item-subtitle class="text-center">Harga  : {{ item.harga }}</v-list-item-subtitle>
                        <!-- <v-list-item-subtitle class="text-center">Stok : {{ item.stok }} {{ item.satuan }}</v-list-item-subtitle> -->
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
        <!-- </v-card> -->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Detail Data layanan</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
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
                    text: 'Urutkan berdasarkan nama layanan',
                    value: 'namaLayanan',
                },
            ],
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
        loadUkuranHewan(){
             var uri = this.$apiUrl + '/ukuranHewan'
            this.$http.get(uri).then( (response) =>{
                this.ukuranHewan=response.data
            })
            
        },
        loadJenisHewan(){
             var uri = this.$apiUrl + '/jenisHewan'
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
            this.form.nama = item.nama;
            this.form.harga = item.harga;
            this.selectedUkuran = item.ukuran_hewan;
            this.selectedJenis = item.jenis_hewan;
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
                harga: '',
                selectedUkuran: 0,
                selectedJenis: 0
            }
        }
    },
    mounted(){
        this.getData();
        this.loadUkuranHewan();
        this.loadJenisHewan();
    },
}
</script>