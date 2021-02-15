import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../components/store";
import ShoppingCart from "../components/shoppingCart";
import Checkout from "../components/checkout";
import OrderThanks from "../components/orderThanks";

const Authentication = () =>
 import(/* webpackChunkName: "admin" */ "../components/admin/authentication");
const Admin = () =>
 import(/* webpackChunkName: "admin" */ "../components/admin/admin");
const ProductAdmin = () =>
 import(/* webpackChunkName: "admin" */ "../components/admin/productAdmin");
const OrderAdmin = () =>
 import(/* webpackChunkName: "admin" */ "../components/admin/orderAdmin");
const ProductEditor = () =>
 import(/* webpackChunkName: "admin" */ "../components/admin/productEditor");

import dataStore from "../store";
Vue.use(VueRouter);
export default new VueRouter({
    mode: "history",
    routes: [
    { path: "/", component: Store },
    { path: "/cart", component: ShoppingCart },
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