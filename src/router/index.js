import Vue from 'vue'
import VueRouter from 'vue-router'
import ListPedido from '../views/ListPedido.vue';
import ListDetallePedido from '../views/ListDetallePedido.vue';
import Monitor from '../views/Monitor.vue';


Vue.use(VueRouter)

const routes = [{
        path: '/list_pedidos',
        name: 'ListPedido',
        component: ListPedido
    },
    {
        path: '/list_detalle_pedido',
        name: 'ListDetallePedido',
        component: ListDetallePedido
    },
    {
        path: '/monitor',
        name: 'Monitor',
        component: Monitor
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router