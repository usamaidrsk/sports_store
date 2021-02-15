import Vue from "vue";
import VueRouter from "vue-router";
import Checkout from "../components/checkout";
import OrderThanks from "../components/orderThanks";
import Authentication from "../components/admin/authentication";
import Admin from "../components/admin/admin";
import ProductAdmin from "../components/admin/productAdmin";
import OrderAdmin from "../components/admin/orderAdmin";
import ProductEditor from "../components/admin/productEditor";

import dataStore from "../store";
// import Store from "../components/Store";
// import shoppingCart from "../components/shoppingCart";
Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/", component: () => import("../components/store.vue")},
        { path: "/cart", component: () => import("../components/shoppingCart.vue") },
        { path: "/checkout", component: Checkout},
        { path: "/thanks/:id", component: OrderThanks},
        { path: "/login", component: Authentication },
        { path: "/admin", component: Admin,
            beforeEnter(to, from, next) {
                    if (dataStore.state.auth.authenticated) {
                        next();
                    } else {
                        next("/login");
                    }
                },
            children: [
                { path: "products/:op(create|edit)/:id(\\d+)?",
                    component: ProductEditor },
                { path: "products", component: ProductAdmin },
                { path: "orders", component: OrderAdmin },
                { path: "", redirect: "/admin/products"}                    
            ]
        },
        { path: "*", redirect: "/"}
    ]
})
