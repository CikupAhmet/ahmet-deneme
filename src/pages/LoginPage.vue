<template>
  <div id="login-page">
    <v-app-bar
        absolute
        color=""
        dark
        fade-img-on-scroll
        height="100px"
    >

      <v-img contain max-height="75" max-width="200" src="@/assets/last_logo-removebg-preview.png"></v-img>

      <v-spacer></v-spacer>
        <v-tabs right style="margin-right: 50px">
          <v-tab>Hakkımızda</v-tab>

          <v-tab>Ürünlerimiz</v-tab>
        </v-tabs>
    </v-app-bar>
    <v-container fill-height>
      <v-row class="fill-height">
        <v-col cols="8"></v-col>
        <v-col cols="4" class="login-page-side elevation-8"> <!-- Login Form Column -->
          <v-card width="100%" color="transparent" elevation="0">
            <v-form ref="form" id="login-form" class="pa-10">
              <v-row>
                <v-col>
                  <h1>Login</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col class="ptb-0">
                      <v-text-field
                          class="login-form-text-field"
                          v-model="userName"
                          label="Username"
                          outlined
                          dense
                          :error-messages="getErrors('userName', $v.userName)"
                          @blur="$v.userName.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="ptb-0">
                      <v-text-field
                          class="login-form-text-field"
                          label="Password"
                          v-model="userPassword"
                          outlined
                          dense
                          :type="passwordInputType"
                          :append-icon="showPasswordChecker ? 'mdi-eye-off': 'mdi-eye'"
                          @click:append="clickPasswordAppendIcon()"
                          :error-messages="getErrors('userPassword', $v.userPassword)"
                          @blur="$v.userPassword.$touch()"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="ptb-0">
                      <v-checkbox class="ma-0 ptb-0" label="Remember Me" v-model="rememberMe">
                      </v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col align="end" class="ptb-0">
                      <v-btn color="info" @click="login()">
                        <v-icon :class="{ 'reload-animation' : isLogin }" >{{ isLogin ? 'mdi-refresh' : 'mdi-account'  }}</v-icon>
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
        <v-alert transition="slide-x-reverse-transition"
                 v-model="dialog"
                 :type="isLoginSuccess.status ? 'success' : 'error'"
                 id="fail-alert"
        >
          {{ isLoginSuccess.message }}
        </v-alert>
      </v-row>
    </v-container>
    <v-footer
        padless
        dark
    >
      <v-row
          justify="center"
          no-gutters
      >
        <v-btn
            color="white"
            text
            rounded
            class="my-2"
        >
          Hakkımızda
        </v-btn>
        <v-btn
            color="white"
            text
            rounded
            class="my-2"
        >
          Ürünlerimiz
        </v-btn>
        <v-btn
            color="white"
            text
            rounded
            class="my-2"
        >
          İletişim
        </v-btn>
        <v-col
            class="py-2 text-center white--text"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import centralAxios from "@/axios/centralAxios";
import { required } from "vuelidate/lib/validators" 

export default {
  created() {
    if (localStorage.getItem("userName") && localStorage.getItem("userPassword")) {
      this.userName = localStorage.getItem("userName");
      this.userPassword = localStorage.getItem("userPassword")
    }
  },
  data: () => ({
    showPasswordChecker: false,
    passwordInputType: "password",
    userName: "",
    userPassword: "",
    rememberMe: "",
    dialog: false,
    isLogin: false,
    isLoginSuccess: {
      status:false,
      message:""
    }
  }),
  methods: {
    clickPasswordAppendIcon() {
      this.showPasswordChecker = !this.showPasswordChecker
      if (this.showPasswordChecker)
        this.passwordInputType = 'text'
      else
        this.passwordInputType = "password"
    },
    async login() {
      this.$v.$touch()
      if (this.$v.$invalid){
        console.log("Invalid Form")
        return
      }
      this.isLogin = true;
      await centralAxios.get("/getAccount", {
        params: {...this.getUser}
      }).then(userResponse => {
        if (userResponse.status === 200) {
          this.dialog = true
          if (this.rememberMe) {
            this.$store.commit("saveUserInfoToLocalStorage", this.getUser);
          }
          this.$store.commit("setCompany", userResponse.data.company)
          this.isLoginSuccess.message = "Success Login"
          this.isLoginSuccess.status = true;
          console.log("Success Login -- Redirect User")
          setTimeout(() => {
            this.isLogin = false;
            this.$router.push("/dashboard")
          }, 3000)
        }
      }).catch(e => {
        console.log(e)
        this.isLoginSuccess.message = "Failed Login"
        this.isLoginSuccess.status = false;
        this.dialog = true
        setTimeout(() => this.dialog = false,3000)
      }).finally(() => {
        this.isLogin = false;
      })
    },
    getErrors(name, model) {
      const errors = [];
      if (!model.$dirty) return errors;
      switch (name) {
        case "userName":
          !model.required && errors.push("Username is required");
          break;
        case "userPassword":
          !model.required && errors.push("Password is required");
          break;
        default:
          break;
      }
      return errors;
    }
  },
  validations:{
    userName: { required },
    userPassword: { required }
  },
  computed: {
    getUser() {
      return {name: this.userName, password: this.userPassword}
    }
  }
}
</script>

<style scoped>

#login-page {
  height: 100%;
  background: url("../assets/Factory-Background.jpg") no-repeat;

}

.login-page-side {
  align-items: center;
  display: flex;
  background-color: #FFF;
  border-radius: 7px;
  height: 400px;
  align-self: center;
  max-width: 400px;
}

.ptb-0 {
  padding-bottom: 0 !important;
  padding-top: 0 !important;
}

#fail-alert {
  position: fixed;
  right: -120px;
  top: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  min-width: 300px;
}

.reload-animation{
  animation: reload-animation 1.2s linear infinite;
  transform-origin: center;
  align-self: center;
  align-items: center;
  justify-items: center;
  justify-content: center;
}

@keyframes reload-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.login-form-text-field{
  margin-bottom: 10px;
}

</style>