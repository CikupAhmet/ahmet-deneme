import Vue from "vue";  
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        company:{},
        userAuth:"",
        userName:"",
        products:[],
        notification:0,
        filteredProduts:[]
    },
    getters:{
        getCompanyName(state){
            return state.company.companyName;
        },
        getCompanyId(state){
            return state.company.id;
        },
        getUserAuth(){
            return localStorage.getItem("userAuth")
        },
        getUserName() {
            return localStorage.getItem("userName")
        },
        getProducts(state) {
            return state.products
        },        
        getNotification(state){
            state.notification = state.products.filter(item => item.warm > 80).length
            return state.notification
        },
        getFilteredProducts(state){
            state.filteredProduts = state.products.filter(item => item.warm > 80)
            return state.filteredProduts
        }
    },
    mutations:{
        setCompany(state, company){
            state.company = company;
        },
        saveUserInfoToLocalStorage(state, userInfo){
            localStorage.setItem("userName", userInfo.name);
            localStorage.setItem("userPassword", userInfo.password);
            localStorage.setItem("userAuth", userInfo.name);
        },
        setProducts(state, products) {
            this.state.products = products;
        }
    }
});

