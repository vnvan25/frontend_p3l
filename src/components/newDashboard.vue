<template>
<v-container fluid>
  <v-row justify="space-around">
    <v-col cols="5" class="mt-12">
       <h1 class="display-3 font-weight-black text-center mt-12" style="color: #DEB887">Data Master</h1>   
    </v-col>
    <v-col cols="5">
        <v-row justify="space-around">
        <v-col cols="2" class="mt-12">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#FFE4C4" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-cow</v-icon>
            </v-avatar>
            </template>
              <span>Hewan</span>
            </v-tooltip>
            
            
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#D2B48C" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-cube-outline</v-icon>
            </v-avatar>
            </template>
              <span>Supplier</span>
            </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-12">
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#FFF8DC" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-ruler</v-icon>
            </v-avatar>
            </template>
              <span>Ukuran hewan</span>
            </v-tooltip>
            
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#FFDAB9" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-ambulance</v-icon>
            </v-avatar>
            </template>
              <span>Layanan</span>
            </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-12">
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#F5DEB3" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-paw</v-icon>
            </v-avatar>
            </template>
              <span>Jenis Hewan</span>
            </v-tooltip>
            
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="brown" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-food-variant</v-icon>
            </v-avatar>
            </template>
              <span>Produk</span>
            </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-12">
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#DEB887" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-human-male-female</v-icon>
            </v-avatar>
            </template>
              <span>Customer</span>
            </v-tooltip>
            
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#FFDEAD" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-account-key</v-icon>
            </v-avatar>
            </template>
              <span>Pegawai</span>
            </v-tooltip>
        </v-col>
        </v-row>
    </v-col>
  </v-row>
  <v-divider class="ml-12 mr-12"></v-divider>
  <v-row justify="space-around">
    <v-col cols="4">
        <v-row justify="space-around">
        <v-col cols="2" class="mt-9">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#FAEBD7" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-minus-box-outline</v-icon>
            </v-avatar>
            </template>
              <span>Stok Habis</span>
            </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-9">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#FFFACD" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-cart-plus</v-icon>
            </v-avatar>
            </template>
              <span>Tambah Pengadaan</span>
            </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-9">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
            <v-avatar color="#FFE4B5" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-history</v-icon>
            </v-avatar>
            </template>
              <span>History</span>
            </v-tooltip>
        </v-col>
        </v-row>
    </v-col>
    <v-col cols="5">
        <h1 class="display-3 font-weight-black text-center mt-12" style="color: #DEB887">Pengadaan Produk</h1>   
    </v-col>
  </v-row>

  <v-divider class="ml-12 mr-12 mt-12"></v-divider>
  <v-row justify="space-around">
    <v-col cols="5" class="mt-12">
        <h1 class="display-3 font-weight-black text-center mt-12" style="color: #DEB887">Laporan Toko</h1> 
    </v-col>
    <v-col cols="5">
          <v-row justify="space-around">
        <v-col cols="2" class="mt-12">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                color="red"
                content="Bulanan"
                overlap
              >
            <v-avatar color="brown lighten-5" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-decimal-increase</v-icon>
            </v-avatar>
              </v-badge>
            </template>
              <span>Pendapatan Bulanan</span>
            </v-tooltip>
            
            
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                color="red"
                content="Tahunan"
                overlap
              >
            <v-avatar color="#D2B48C" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-decimal-increase</v-icon>
            </v-avatar>
              </v-badge>
            </template>
              <span>Pendapatan Tahunan</span>
            </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-12">
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                color="red"
                content="Bulanan"
                overlap
              >
            <v-avatar color="#FFF8DC" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-cube-send</v-icon>
            </v-avatar>
              </v-badge>
            </template>
              <span>Pengadaan Bulanan</span>
            </v-tooltip>
            
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                color="red"
                content="Tahunan"
                overlap
              >
            <v-avatar color="#FFDAB9" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-cube-send</v-icon>
            </v-avatar>
              </v-badge>
            </template>
              <span>Pengadaan Tahunan</span>
            </v-tooltip>
        </v-col>
        <v-col cols="2" class="mt-12">
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                bordered
                color="error"
                icon="mdi-star-outline"
                overlap
                
              >
            <v-avatar color="brown lighten-2" size="62" class="mb-5">
                  <v-icon v-on="on">mdi-48px mdi-food-variant</v-icon>
            </v-avatar>
              </v-badge>
            </template>
              <span>Produk Terlaris</span>
            </v-tooltip>
            
           <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-badge
                bordered
                color="error"
                icon="mdi-star-outline"
                overlap
                
              >
            <v-avatar color="brown lighten-3" size="62" class="mb-5">
                  <v-icon v-on="on"> mdi-48px mdi-ambulance</v-icon>
            </v-avatar>
              </v-badge>
            </template>
              <span>Layanan Terlaris</span>
            </v-tooltip>
        </v-col>
        </v-row>
    </v-col>
  </v-row>
</v-container>
</template>