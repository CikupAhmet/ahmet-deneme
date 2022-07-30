<template>
    <v-container>
        <div style="margin-top:100px">
            <v-data-table :headers="headers" :items="getProducts" :items-per-page="10" class="elevation-1">
                <template v-slot:[`item.warm`]="{ item }">
                    <v-progress-linear striped height="25" :value="item.warm" :color="calculatedColor(item.warm)">{{item.warm}}</v-progress-linear>
                </template>
                <template v-slot:[`item.status`]="{ item }">
                    <v-checkbox v-model="item.status" disabled :color="calculatedStatus(item.status)"></v-checkbox>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
            headers: [
                {
                    text: 'Makine İsmi',
                    align: 'start',
                    value: 'name',
                    color: 'red'
                },
                { text: 'Firma İsim', value: 'company.companyName' },
                { text: 'Makine Durum', value: 'status' },
                { text: 'Doluluk', value: 'warm' },
            ],
            products: []
        }
    },
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
        }
    },
    computed: {
        getProducts() {
            return this.$store.getters.getProducts;
        }
    },
    mounted() {

        setInterval(() => {
            console.log("Deneme");
        }, 2000)
    }
}
</script>