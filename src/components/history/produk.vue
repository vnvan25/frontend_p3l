<template>
    <v-container fluid class="mt-n8">
        <v-row>
        <v-col>
        <v-card max-width="550">
            <v-container>
                <h2 class="text-md-center">Log Tambah</h2>
                <v-data-table
                    :headers="headers"
                    :items="customers"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_produk">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.create_at }}</td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </v-container>
        </v-card>
        </v-col>
        <v-col>
            <v-card max-width="550">
            <v-container>
                <h2 class="text-md-center">Log Edit</h2>
                <v-data-table
                    :headers="headers1"
                    :items="customers"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_produk">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.updated_at }}</td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </v-container>
        </v-card>
        </v-col>
        <v-col>
        <v-card max-width="550">
            <v-container>
                <h2 class="text-md-center">Log Hapus</h2>
                <v-data-table
                    :headers="headers2"
                    :items="customers"
                    :search="keyword"
                    :loading="load">
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item,index) in items" :key="item.id_produk">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.nama }}</td>
                            <td>{{ item.deleted_at }}</td>
                        </tr>
                    </tbody>
                </template>
                </v-data-table>
            </v-container>
        </v-card>
        </v-col>
        </v-row>
        <v-row>
            
        </v-row>
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
                    text: 'Produk',
                    value: 'nama',
                },
                {
                    text: 'Tgl Tambah',
                    value: 'created_at',
                }
            ],
            headers1: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Produk',
                    value: 'nama',
                },
                {
                    text: 'Tgl Ubah',
                    value: 'updated_at',
                }
            ],
            headers2: [
                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Produk',
                    value: 'nama',
                },
                {
                    text: 'Tgl Hapus',
                    value: 'deleted_at',
                }
            ],
            customers: [],
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
            customer : new FormData,
            typeInput: 'new',
            errors : '',
            updatedId : '',
        }
    },
    methods:{
        getData(){
            var uri = this.$apiUrl + '/produk/data'
            this.$http.get(uri).then( (response) =>{
                this.customers=response.data
                // console.log(response.data.message)
            })
            // console.log(response.getData)
        },
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