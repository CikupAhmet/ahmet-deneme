<template>
    <div align="center" class="justify-center">
        <v-container align="center" fluid>
            <v-row no-gutters align="center" class="d-flex">
                <v-col v-for="i in getProducts" :key="i.name" class="ma-3">
                    <Product-Comp-Vue :product="i">

                    </Product-Comp-Vue>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import ProductCompVue from '@/components/ProductComp.vue'
export default {
    components: {
        ProductCompVue
    },
    computed: {
        getProducts() {
            return this.$store.getters.getProducts;
        }
    },
}
</script>