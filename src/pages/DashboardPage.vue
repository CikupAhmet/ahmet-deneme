<template>
  <div align="center" class="justify-center " style="background-color: #616161; height: 100%" >
    <div>
      <v-app-bar
        color=""
        dense
        dark
        fixed
        height="75"
      >
        <v-img contain max-height="75" max-width="200" src="@/assets/last_logo-removebg-preview.png"></v-img>

        <v-spacer></v-spacer>

        <span>{{getCompanyName}} </span>
      <v-menu offset-y
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
           <v-btn icon
           
            v-bind="attrs"
            v-on="on"
           >
          <v-badge small
            :value="getNotification"
            color="green"
            overlap
            :content="getNotification"
          >
            <v-icon>
              mdi-bell
            </v-icon>
          </v-badge>
        </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in getFilteredProducts"
            :key="n"
          >
            <v-list-item-title> {{ n.name }} İsimli makineler doluluk oranına ulaşmıştır.</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
        <v-btn icon
               @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <router-view></router-view>
    <!--<v-footer
        dark
        padless
        color="#b30000"
    >
      <v-card

          color="#b30000"
          class="flex"
          flat
          tile
      >
        <v-card-title class="teal">

          <v-spacer></v-spacer>

          <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              dark
              icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>ElectroLink</strong>
        </v-card-text>
      </v-card>
    </v-footer> -->
  </div>
</template>

<script>
import centralAxios from "@/axios/centralAxios";
export default {
  methods:{
    logout(){
      localStorage.removeItem("userAuth");
      this.$router.push("/")
    }
  },
  data: () => ({
    value:5,
    items:[
        { title: 'Click Me' },
      ],
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
  computed: {
    getUserName() {
      return this.$store.getters.getUserName;
    },
    getCompanyName() {
      return this.$store.getters.getCompanyName;
    },
    getNotification(){
      return this.$store.getters.getNotification
    },
    getFilteredProducts(){
      return this.$store.getters.getFilteredProducts
    }
  },
  async created() {
    await centralAxios.get("/getAllProductsByCompanyId", {params:{companyId:this.$store.getters.getCompanyId}})
    .then(response => {
      this.$store.commit("setProducts", response.data)
    }).catch(e => console.log(e))
  }
}
</script>

<style scoped>

*{
  font-family: "Lato",sans-serif;
}

</style>