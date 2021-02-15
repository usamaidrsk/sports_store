<template>
    <!--store /-->
    <router-view />
    <!--shoppingCart /-->
    
</template>

<script>

    import { mapActions } from "vuex";
    export default {
        name: 'app',
        components: { 
            // Store,
            // shoppingCart 
            },
        methods: {
            ...mapActions({
                getData: "getData",
                initializeCart: "cart/initializeCart"
            })
        },
        created() {
            this.getData();
            this.initializeCart(this.$store);
        }
    }
</script>