<template>
	<div>
		<Header />
		<h1 style="padding-top: 3%; color:black; text-shadow: 1px 1px 2px blue; font-weight: bold;">Restaurante System</h1>
		<!--<div class="table-responsive" style="width:100%;">
			<table class="table table-hover table-bordered">
				<thead>
					<tr>
					<th>Numero</th>
					<th>Nombre</th>
					<th>Estado</th>
					<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="pedido in pedidos" :key="pedido.idPedido" :value="pedido.idPedido">
						<td>{{pedido.idPedido}}</td>
						<td>{{pedido.nombre}}</td>
						<td>{{pedido.idEstado}}</td>
						<td><button class="btn btn-primary" v-on:click="finalizarPreparacion(pedido.idPedido)">Finalizar Preparacion</button></td>
					</tr>
				</tbody>
			</table>
		</div>-->
		<div class="table-responsive" style="width:100%; margin-top: 2%;">
			<table class="table table-hover table-bordered">
				<thead>
					<tr>
					<th>Numero</th>
					<th>Nombre</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="pedido in pedidos" :key="pedido.idPedido" :value="pedido.idPedido">
						<td>{{pedido.idPedido}}</td>
						<td>{{pedido.nombre}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div>
			<button class="btn btn-primary" v-on:click="abirDetalles()" style="margin-top: 2%;">Finalizar Preparacion de Pedido</button>
		</div>
		

		<Footer />
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import axios from 'axios';

export default {
	name:"ListPedido",
	components: {
		Header,
		Footer
	},
	data() {
		return {
			pedidos: []
		}
	},
	methods: {
		
		finalizarPreparacion(idPedido){
			
            localStorage.idPedido = idPedido;
			this.$router.push("/list_detalle_pedido");
		},
		abirDetalles(){
			this.$router.push("/list_detalle_pedido");
		},
		getPedidos() {
			axios.post("http://localhost/pedidos_backend/pedido/list_pedidos")
			.then((res) => {
				if (res.data.valid == true) {
					if (res.data.count != 0) {
						this.pedidos = res.data.pedido;
					} else {
						this.makeToast("No se puede llenar la tabla","No hay datos registrados para llenar la tabla","info");
						this.params.data.push(["", "", "", "", ""]);
					}
				} else {
				this.makeToast("No se puede llenar la tabla","No hay datos registrados para llenar la tabla","info");
				this.params.data.push(["", "", "", "", ""]);
				}
			})
		},
        makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            appendToast: true
            })
        }
	},
	mounted () {
      this.getPedidos()
    }
}
</script>