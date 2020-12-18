<template>
	<div>
		<Header />
			<div class="table-responsive" style="width:100%; margin-top: 2%; color:blue; font-size: 30px;">
			<table class="table table-hover table-bordered" >
				<thead style = "background-image: radial-gradient(circle at -20.44% 43.84%, #c4e1ff 0, #0091ff 50%, #004edc 100%);">
					<tr>
					<th>Numero/s Mesa/s</th>
					<th> Cantidad De Productos Listos Para Servir</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="detallepedido in detallepedidos" :key="detallepedido.idDetallePedido" :value="detallepedido.idDetallePedido">
						<td>{{detallepedido.mesas}}</td>
						<td>{{detallepedido.cantidadProductos}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

import axios from 'axios';


export default {
	name:"Monitor",
	components: {
		
	},
	data:function() {
		return {
			form:{"idPedido":""},
			"detallepedidos": [],
			
		}
	},
	methods: {
        makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            appendToast: true
            })
        },

		getDetallePedido(){
			this.form.idPedido = localStorage.getItem("idPedido");
			axios.post("http://localhost/pedidos_backend/pedido/list_detalle_pedido", this.form)
			.then((res) => {
			if (res.data.valid == true) {
				if (res.data.count != 0) {
				this.detallepedidos = res.data.detallepedido;
				} else {
				this.makeToast("No se puede llenar la tabla","No hay datos registrados para llenar la tabla","info");
				this.params.data.push(["", "", "", "", ""]);
				}
			} else {
				this.makeToast("No se puede llenar la tabla","No hay datos registrados para llenar la tabla","info");
				this.params.data.push(["", "", "", "", ""]);
			}
			})
      	}
    },

	mounted () {
      this.getDetallePedido()
    }
}
</script>