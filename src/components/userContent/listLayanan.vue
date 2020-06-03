<template>
  <v-container fluid>
    <v-container class="justify-center">
        <div class="ml-12">
            <div class="ml-12">
                <div class="ml-12">
                    <div class="ml-12">
                    <v-img src="https://kouvee.modifierisme.com/upload/web/layananWeb.png" max-width="700" max-height="500" class="ml-12"></v-img>
                    </div>
                </div>
            </div>
        </div>
        <h4 class="text-center mt-4">"Di Kouvee Pet Shop, kami memahami bahwa setiap Hewan Peliharaan adalah khusus dan unik 
        <br>dengan kebutuhan dan persyaratan mereka. 
        Adalah tanggung jawab kita untuk membantu dan memungkinkan 
        <br>setiap Pawrent untuk menjaga Hewan kesayangan mereka sehat dan bahagia seumur hidup."</h4>
        <br>
        <h5 class="text-center">Dengan komitmen "one stop service" kami, Kouvee Pet Shop menyediakan layanan multiservice yang lengkap dan menyeluruh. 
            <br>Dengan dukungan profesional yang andal dan berpengalaman, Kouvee Pet Shop adalah rumah kedua yang nyaman untuk Hewan Peliharaan Anda.</h5>
            <br>
    </v-container>
      <v-divider></v-divider>
    <v-data-iterator
      :items="layanans"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-row class="ml-12 mr-12 mb-7 mt-8">
          <v-text-field
            v-model="search"
            append-icon="mdi-search"
            label="Search Layanan"
            hide-details
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer> <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-search"
              label="Sort by"
              class="mr-5"
            ></v-select>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="brown lighten-3"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="brown lighten-3"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-row>
      </template>

      <template v-slot:default="layanans">
        <v-row class="ml-8 mr-8">
          <v-col
            v-for="item in layanans.items"
            :key="item.id_layanan"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
                <v-img
                src="https://kouvee.modifierisme.com/upload/web/back.png"
                height="80px"
                >
                <v-card-title class="headline font-weight-bold">{{ item.layanan }} </v-card-title>
                <v-card-subtitle class="subheading font-weight-bold">{{item.ukuran}}</v-card-subtitle>
                </v-img>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item :class="{ 'blue--text': sortBy === item.harga }">
                    Harga : <v-chip class="font-weight-black mt-2 ml-5 mr-1 mb-2 subtitle-1" color="#DEB887">Rp. {{ item.harga }},-</v-chip>
                </v-list-item>
                  <!-- <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content> -->
                
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-9 ml-12 mr-12" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="#DEB887"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            black--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="#DEB887"
            class="mr-1"
            small
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="#DEB887"
            class="ml-1"
            small
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 4,
        layanans: [],
        jenisHewan: [],
        ukuranHewan: [],
        sortBy: 'layanan',
        keys: [
          'Layanan',
          'Harga',
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.layanans.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.layanans.filter(layanans => layanans !== 'layanan')
      },
    },
    methods: {
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
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
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
              window.location.replace('/homeMaster')
        }
    }
    else{
      next()
    }
    },
  }
</script>