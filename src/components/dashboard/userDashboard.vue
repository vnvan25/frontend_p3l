<template>
    <div>
        <v-app-bar
            dark
            app
            fixed
            clipped-left
            height="60px"
            color="white">

            <v-toolbar-title
                style="font-size: 23px;"
                class="brown--text  font-weight-black ml-2"
            >
                Kouvee Pet Shop
            </v-toolbar-title>

            <VSpacer />
            <v-btn text color="black" link to="home">Home</v-btn>
            <v-btn text color="black" link to="listProduk">Produk</v-btn>
            <v-btn text color="black" link to="listLayanan">Layanan</v-btn>
            <v-btn color="#DEB887" class="ml-5 mr-5 black--text" rounded link to="login">Login Admin</v-btn>
            
        </v-app-bar>

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
            items: [
                {title: 'Produk', icon: 'mdi-cart'},
                {title: 'Layanan', icon: 'mdi-barcode'}
            ],
            admins: [
                ['Management', 'people_outline'],
                ['Settings', 'settings'],
            ],

        }
    },
    
}
</script>
