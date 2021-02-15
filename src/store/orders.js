import Axios from "axios";
import Vue from "vue";

// const ORDERS_URL = "http://localhost:3500/orders";
const ORDERS_URL = "https://murmuring-stream-71719.herokuapp.com/api/orders";
export default {
    namespaced: true,
    state: {
        orders:[]
    },
    mutations: {
        setOrders(state, data) {
            state.orders = data;
        },
        changeOrderShipped(state, order) {
            Vue.set(order, "shipped",
            order.shipped == null || !order.shipped ? true : false);
        }
    },
    actions: {
    async storeOrder(context, order) {
        order.cartLines = context.rootState.cart.lines;
        return (await Axios.post(ORDERS_URL, order)).data.id;
        }
    },
    async getOrders(context) {
        context.commit("setOrders",
            (await context.rootGetters.authenticatedAxios.get(ORDERS_URL)).data);
        },
    async updateOrder(context, order) {
        context.commit("changeOrderShipped", order);
        await context.rootGetters.authenticatedAxios
        .put(`${ORDERS_URL}/${order.id}`, order);
    }
}