<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        class="brown darken-3"
        dark
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
            <v-list>
                <v-list-item link to ="home">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list-item link to ="/listProduk">
                            <v-list-item-icon>
                            <v-icon>mdi-paw</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Produk</v-list-item-title>
                            
                        </v-list-item>

                        <v-list-item link to ="listLayanan">
                            <v-list-item-icon>
                             <v-icon>mdi-needle</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Layanan</v-list-item-title>
                            
            </v-list-item>
               
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block color="green darken-3" link to="/login">Login Account</v-btn>
            </div>
        </template>
        </v-navigation-drawer>

        <v-app-bar
            dark
            app
            fixed
            clipped-left
            height="70px"
            color="brown darken-2">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            
            <VSpacer />

            <!-- <v-tab link to="/home">Home</v-tab>
            <v-tab link to="/listProduk">Produk</v-tab>
            <v-tab link to="/listLayanan">Layanan</v-tab> -->

             <v-divider
                class="mx-4"
                vertical
                ></v-divider>
            <v-toolbar-title
                style="font-size: 21px;"
                class="white--text ml-2"
            >
                Kouvee Pet Shop
            </v-toolbar-title>
            
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
