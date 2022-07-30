<template>
    <div class="product-card" style="margin-top: 75px;">
        <v-card class=" pb-4 pt-4" v-bind:style="{backgroundColor : cardColor}">
            <v-card-title class="card-title">{{product.name}}</v-card-title>
            <v-img height="200" src="@/assets/cihaz3.png" class="pa-3"></v-img>
          <br>
          <v-divider class="mx-4"></v-divider>
              <div class="machine-info">
                <v-row>
                  <v-col cols="6">
                    <v-subheader class="black--text">Makina Tipi</v-subheader>
                  </v-col>
                  <v-col cols="6">
                    <v-subheader>2022</v-subheader>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-subheader class="black--text">Üretim Yılı</v-subheader>
                  </v-col>
                  <v-col cols="6">
                    <v-subheader>2022</v-subheader>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-subheader class="black--text">Seri No</v-subheader>
                  </v-col>
                  <v-col cols="6">
                    <v-subheader>2158796</v-subheader>
                  </v-col>
                </v-row>
              </div>

            <v-divider class="mx-4"></v-divider>

            <v-row align="center" class="ma-3">
                <h4>Doluluk Oranı</h4>
                <v-progress-linear striped height="25" :value="product.warm" :color="calculatedColor(product.warm)" >
                    {{ product.warm }}</v-progress-linear>

            </v-row>
            <v-row align="center" class="ma-3">
                <v-btn class="white--text" style="width: 100%" :color="calculatedStatus(product.status)" @click="onClick()">
                    {{getProductStatus(product.status)}}
                </v-btn>
            </v-row>

        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
      clicked:true,
      cardColor: "red"
    }),
    methods: {
        calculatedColor(carb) {
            if (carb > 80) {
                return "red"
            } else if (carb > 50) {
                return "blue"
            } else {
                return "green"
            }
        },
        calculatedStatus(status) {
            if (status) {
                console.log(status)
                return "green"
            } else {
                return "red"
            }
        },
        getProductsWithTimer() {
        },
        getProductStatus(status){
            return status ? 'Çalışıyor' : 'Durdu'
        },
        onClick() {
            if(this.cardColor === "red") {
              this.cardColor="aliceblue"
            } else {
              this.cardColor = "red"
            }
        }
    },
    props: {
        product: {
            type: Object,
            required: false
        }
    },
    mounted(){
      this.onClick()
    }
}
</script>

<style scoped>
.product-card {
  max-width: 225px !important;
}

.machine-info {
  background-color: aliceblue;
  color:black;
}

*{
  font-family: "Lato", sans-serif;
}

.card-title {
  text-align: center;
}
</style>