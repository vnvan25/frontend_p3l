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
            <!-- Batas Timelines -->
            <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                    <v-timeline-item
                    color="blue lighten-2"
                    fill-dot
                    right
                    >
                    <v-card>
                        <v-card-title class="blue lighten-2">
                        <v-icon
                            dark
                            size="42"
                            class="mr-4"
                        >
                            mdi-gender-male
                        </v-icon>
                        <h2 class="display-1 white--text font-weight-light">Bathara Febrian Laras</h2>
                        </v-card-title>
                        <v-container>
                        <v-row>
                            <v-col cols="12" md="10">
                            170709141 - Bathara sebagai Web Engineer
                            Mengelola semua kebutuhan pembangunan Website Kouvee Pet Shop
                            </v-col>
                            <v-col
                            class="hidden-sm-and-down text-right"
                            md="2"
                            >
                            <v-icon size="64">mdi-web</v-icon>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                    color="amber lighten-1"
                    fill-dot
                    left
                    small
                    >
                    <v-card>
                        <v-card-title class="amber lighten-1 justify-end">
                        <h2 class="display-1 mr-4 white--text font-weight-light">Mathias Sebastian</h2>
                        <v-icon
                            dark
                            size="42"
                        >mdi-gender-male</v-icon>
                        </v-card-title>
                        <v-container>
                        <v-row>
                            <v-col cols="12" md="8">
                            170709403 -  Mathias sebagai Web Engineer
                            Mengelola semua kebutuhan pembangunan Website Kouvee Pet Shop bersama dengan staff yang lainnya
                            </v-col>
                            <v-col cols="12" md="4">
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                    color="purple lighten-1"
                    fill-dot
                    right
                    >
                    <v-card>
                        <v-card-title class="purple lighten-1">
                        <v-icon
                            class="mr-4"
                            dark
                            size="42"
                        >
                            mdi-gender-male
                        </v-icon>
                        <h2 class="display-1 white--text font-weight-light">Natte Vagonting Omang</h2>
                        </v-card-title>
                        <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            >
                            170709248 - Natte sebagai Mobile Engineer specialist android
                            Bertanggung jawab untuk membangun aplikasi Android untuk Kouvee Pet Shop
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                    color="red lighten-1"
                    fill-dot
                    left
                    small
                    >
                    <v-card>
                        <v-card-title class="red lighten-1 justify-end">
                        <h2 class="display-1 mr-4 white--text font-weight-light">Ruben Cahyadi</h2>
                        <v-icon
                            dark
                            size="42"
                        >
                            mdi-gender-male
                        </v-icon>
                        </v-card-title>
                        <v-container>
                        <v-row>
                            <v-col class="hidden-sm-and-down" md="2">
                            <v-icon size="64">mdi-laptop</v-icon>
                            </v-col>
                            <v-col cols="12" md="10">
                            170709550 - Ruben sebagai Specialist Desktop App
                            Bertanggung jawab untuk membangun aplikasi berbasis desktop untuk mendukung proses transaksi di Kouvee Pet Shop
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                    color="green lighten-1"
                    fill-dot
                    right
                    >
                    <v-card>
                        <v-card-title class="green lighten-1">
                        <v-icon
                            class="mr-4"
                            dark
                            size="42"
                        >
                            mdi-gender-female
                        </v-icon>
                        <h2 class="display-1 white--text font-weight-light">Vanessa Angela Amei</h2>
                        </v-card-title>
                        <v-container>
                        <v-row>
                            <v-col>
                            170709141 - Vanessa sebagai Mobile Engineer specialist android
                            Bertanggung jawab untuk membangun aplikasi Android untuk Kouvee Pet Shop
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card>
                    </v-timeline-item>
                </v-timeline>
            <!-- end of timelines -->
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
  }
</script>