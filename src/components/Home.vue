<template>
<div>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>

    <v-card>
        <v-container>
            <h1 class="display-2 text-center mb-4">Selamat Datang di Kouvee Pet Shop</h1>
            <h3 class="text-center font-weight-thin mb-4">Kami senang melayani berbagai kebutuhan anda dan hewan peliharaan anda</h3>
            <p class="text-center">Kouvee Pet Shop adalah salah satu pet shop terbesar dan terpercaya di kota D.I Yogyakarta
                <br>Siap melayani anda dengan berbagai penawaran produk dan berbagai macam layanan perawatan hewan peliharaan kesayangan anda
                <br>Alamat : Jalan Moses Gatotkaca No.22 Yogyakarta 55281
                <br>Telepon : (0274) 357735
                <br>Website : http://www.sayanghewan.com
                <br>
                <br>Jam Operasional
                    <br>Minggu Libur
                    <br>Senin 10am - 9pm
                    <br>Selasa 10am - 9pm
                    <br>Rabu 10am - 9pm
                    <br>Kamis 10am - 9pm
                    <br>Jumat 10am - 9pm
                    <br>Sabtu 10am - 9pm
            </p>

            <v-col cols="12">
                <!-- kolom card -->
                <v-row row="6">
                    <v-card
                            class="mx-auto"
                            max-width="400"
                        >
                            <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://5.imimg.com/data5/FA/MM/DE/ANDROID-46184468/images-2019-09-08t203011-003-jpeg-500x500.jpeg"
                            >
                            </v-img>
                            <v-card-title>Produk Kouvee Pet Shop</v-card-title>

                            <v-card-text class="text--primary">
                            <div>Menyediakan semua kebutuhan peliharaan anda dengan berbagai produk pilihan</div>

                            <div>Tersedia makanan, aksesoris, perlengkapan gromming, dan produk berkualitas lainnya</div>
                            </v-card-text>

                            <v-card-actions>
                            <v-btn
                                color="orange"
                                text
                                link to ="/listProduk"
                            >
                                Lihat Semua >>
                            </v-btn>

                            </v-card-actions>
                        </v-card>

                        <v-card
                            class="mx-auto"
                            max-width="400"
                        >
                            <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://petable.care/wp-content/uploads/2016/03/unnamed3-2-1-1140x642.jpg"
                            >
                            
                            </v-img>
                            <v-card-title>Layanan Kouvee Pet Shop</v-card-title>

                            <v-card-text class="text--primary">
                            <div>Menawarkan berbagai macam jasa untuk memanjakan hewan peliharaan anda</div>

                            <div>Menyediakan jasa penitipan, gromming, dan perawatan lainnya</div>
                            </v-card-text>

                            <v-card-actions>
                            <v-btn
                                color="orange"
                                text
                                link to ="/listLayanan"
                            >
                                Lihat Semua >>
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                </v-row>
            </v-col>
            <v-spacer></v-spacer>
            <br>
            <h1 class="display-2 text-center mb-4">Staff Kouvee Pet Shop</h1>
            <br>
            <v-row>
                <!-- card 1 -->
                    <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-img
                            src="https://cdn.dribbble.com/users/269922/screenshots/1008644/files.jpg"
                            height="200px"
                            ></v-img>

                            <v-card-title>
                            Bathara Febrian Laras
                            </v-card-title>

                            <v-card-subtitle>
                            170709381
                            </v-card-subtitle>
                        </v-card>

                        <!-- card 2 -->
                         <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-img
                            src="https://cdn.dribbble.com/users/269922/screenshots/1008644/files.jpg"
                            height="200px"
                            ></v-img>

                            <v-card-title>
                            Mathias Sebastian
                            </v-card-title>

                            <v-card-subtitle>
                            170709403
                            </v-card-subtitle>
                        </v-card>
            </v-row>
            <v-row>
            <br>
            </v-row>
            <v-row 
             class="mb-6"
            no-gutters>
            <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-img
                            src="https://icons.iconarchive.com/icons/danleech/simple/512/android-icon.png"
                            height="200px"
                            ></v-img>

                            <v-card-title>
                            Vanessa Angela Amei
                            </v-card-title>

                            <v-card-subtitle>
                            170709141
                            </v-card-subtitle>
                        </v-card>
                 <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-img
                            src="https://icons.iconarchive.com/icons/danleech/simple/512/android-icon.png"
                            height="200px"
                            ></v-img>

                            <v-card-title>
                             Natte Vagonting Omang
                            </v-card-title>

                            <v-card-subtitle>
                            170709248
                            </v-card-subtitle>
                        </v-card>
            </v-row>
            <v-row>
                <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-img
                            src="https://www.secretorange.co.uk/media/TagImage/c-sharp.png"
                            height="200px"
                            ></v-img>

                            <v-card-title>
                            Ruben Cahyadi
                            </v-card-title>

                            <v-card-subtitle>
                           170709550
                            </v-card-subtitle>
                        </v-card>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://www.radiopetlady.com/wp-content/uploads/bfi_thumb/RPLN-Dogs-and-Cats-6s5vrhb4qouxhsoksc2w5wtwm0tsiwvbgyrdl32jru4.jpg',
          },
          {
            src: 'https://files.qatarliving.com/2016/01/26/wallpaper-animal-pet-puppy-awesome-481_0.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://www.kobchicago.org/wp-content/uploads/2019/10/pets-meaning.jpg',
          },
        ],
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