<template>
    <div class="container-fluid" style="max-width: 99vw; min-height: 70vh;">
        <div class="row">
            <div class="col bg-dark text-white">
                <a class="navbar-brand h3">SPORTS STORE</a>
                <cart-summary />
            </div>
        </div>
        <div class="row">
            <div class="col-3 bg-info p-2">
               <category-controls />
               <button 
                    class="btn btn-block btn-warning mt-5"
                    v-on:click="setShowSearch(true)"
                >
                    Search
                </button>
            </div>
            <div class="col-9 bg-success p-2">
                <search />
                <product-list />
            </div>
        </div>
    </div>
</template>

<script>
    import  productList from "./productList";
    import CategoryControls from "./categoryControls";
    import cartSummary from "./cartSummary";
    import { mapMutations } from "vuex";
    import search from "./search";

    export default {
        name: "Store",
        components: {
            CategoryControls,
            productList,
            cartSummary,
            search
        },
        methods: {
            ...mapMutations(["setShowSearch"])
        }
    }
</script>

<style scoped>

</style>