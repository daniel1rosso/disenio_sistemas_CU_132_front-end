<template>
  <div>
    <Header />
    <h1 style="padding-top: 3%; color:black; text-shadow: 1px 1px 2px blue; font-weight: bold;">Detalles de Pedidos</h1>
    <div style= " margin-top: 3%;"> 
      <button type="button" class="btn btn-primary"  v-on:click="getDetallePedidoFechaEspera()" style="width: 20%; background-color: green;">Ordenar por Mayor Tiempo de Espera</button>
      <button type="button" class="btn btn-primary"  v-on:click="getDetallePedidoMesa()" style="width: 20%; margin-left: 2%; background-color: green;">Ordenar por Nro de Mesa</button>
      <button type="button" class="btn btn-primary"  v-on:click="getDetallePedidoSeccion()" style="width: 20%;margin-left: 2%; background-color: green;">Ordenar por seccion</button>
      <button type="button" class="btn btn-primary"  v-on:click="getDetallePedidoMozo()" style="width: 20%;margin-left: 2%; background-color: green;">Ordenar por Nombre de Mozo</button>
    </div>
    <div class="table-responsive" style="width:100%; margin-top: 3%;">
			<table class="table table-hover table-bordered">
				<thead>
					<tr>
					<th></th>
					<th>Producto</th>
					<th>Menu</th>
          <th>Cantidad</th>
          <th>Num. Mesa</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="detallepedido in detallepedidos" :key="detallepedido.idDetallePedido" :value="detallepedido.idDetallePedido">
						<td><input type="checkbox" id="detallepedido_checkbox" v-model="detallepedido_checkbox" :key="detallepedido.idDetallePedido" :value="detallepedido.idDetallePedido"></td>
            <td>{{detallepedido.producto}}</td>
            <td>{{detallepedido.menu}}</td>
            <td>{{detallepedido.cantidad}}</td>
            <td>{{detallepedido.mesa}}</td>
					</tr>
				</tbody>
			</table>
		</div>
    <div class="form-group row" style="padding-top: 5%; width: 100%;">
        <div class="col-4">
        </div>
        <div class="col-4">
            <button type="button" class="btn btn-primary" v-on:click="finalizarElaboracion()" style="width: 50%;">Finalizar Elaboración</button>
            <button class="btn btn-secondary" v-on:click="abrirPedido()" style= "margin-left: 2%; width: 30%; ">Cancelar</button>
        </div>
        <div class="col-4">
        </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import axios from 'axios';

const jsonApiHeader = {
  "Content-Type": "application/json; charset=UTF-8",
  "Authorization": "key=AAAAhUGFNLA:APA91bGBgyp78eCkVOd0TOgQZkiASlaANDCz98wSCKb5dEv12JdpV4hZQW0jU_Q13-O7NFr46d-MKb0IiCHjEPA9q7bjSRwcoLE8iMxHexW3cWUafjo409Jzq5gmNwJ9tAGYHd5ljFkc",
};

export default {
    name:"ListDetallePedido",
    data:function(){
        return {
          form:{
            "idPedido" : "",
            "detallepedido_checkbox" : []
          },
          detallepedidos: [],
          detallepedido_checkbox: [],
          alertMsg : "",
          fcmUrl : "https://fcm.googleapis.com/fcm/send",
          fcmJson :{
            to : "eU-2U42spFs:APA91bFUAtH0df3Dq1JmIPiEFQR_S6nfD_pRiGHbhmh7yDNFQ1Elzjd_gcLkoMtTQs2DYdExrkEK7HjtevW5nlQvzrZkQH9ToiEYRkfuj8F7GCmrJzC3vjONTbdm9dtDpK-ZUjSrDOwF",  //cambiar el token
            content_available : true,
            notification : {
              title : "Listo para Servir",
              body : "",
              click_action : "FCM_PLUGIN_ACTIVITY",
              sound : "default",
              priority : "priority",
            },
            data : {
              app_notification : "1",
              term : "48",
              activity_date : "2018-08-16 15:30:00",
              msg_type : "1",
              student_id : "1111",
              college_code : "edrdemo",
              notification_from_firebase : "1",
              avatar_img_url : "0",
            }
          }
        }
    },
    components:{
        Header,
        Footer
    },
    methods:{
      abrirPedido(){
        this.$router.push("/list_pedidos");
      },
      getDetallePedidoMozo(){
        //this.form.idPedido = localStorage.getItem("idPedido");
       axios.post("http://localhost/pedidos_backend/pedido/list_detalle_pedido_mozo")
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
      },
      getDetallePedidoSeccion(){
        //this.form.idPedido = localStorage.getItem("idPedido");
       axios.post("http://localhost/pedidos_backend/pedido/list_detalle_pedido_seccion")
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
      },
      getDetallePedidoMesa(){
        //this.form.idPedido = localStorage.getItem("idPedido");
       axios.post("http://localhost/pedidos_backend/pedido/list_detalle_pedido_mesa")
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
      },
      getDetallePedidoFechaEspera(){
        //this.form.idPedido = localStorage.getItem("idPedido");
        axios.post("http://localhost/pedidos_backend/pedido/list_detalle_pedido_espera")
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
      },
      getDetallePedido(){
        //this.form.idPedido = localStorage.getItem("idPedido");
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
      },
      finalizarElaboracion() {
//instalar sweetalert2 ->npm install vue-sweetalert2
      this.$swal({
          title: '¿Desea finalizar los pedidos?',
          text: 'No podra volver atras',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this.form.detallepedido_checkbox = this.detallepedido_checkbox.toString();
         axios.post("http://localhost/pedidos_backend/pedido/finalizar_elaboracion_detalle_pedido", this.form)
         .then((res_finish) => {
          this.makeToast("Finalizar Elaboración",res_finish.msg,"info");
          const dataParam = this.fcmJson;
          try {
            this.fcmJson.notification.body = "Listo para servir en las mesas: " + res_finish.data.mesas + " - cantidad de productos: " + res_finish.data.cantidadProductos;
            const response = axios({
              method: 'post',
              url: this.fcmUrl,
              headers: jsonApiHeader,
              data: dataParam
            }).then(() => {
              axios.post("http://localhost/pedidos_backend/pedido/notificado_detalle_pedido", this.form)
              .then((res) => {
                this.$swal('Correcto', 'Se han finalizado los pedidos seleccionados', 'sucess');
                this.makeToast("Notificado",res.msg,"info");
                this.getDetallePedido()
              })
            })
            return response;
          } catch (error) {
            console.error(error);
            this.$swal('Error', 'No se finalizaron pedidos', 'warning')
          }
        })
        this.detallepedido_checkbox = []
        
          } else {
            this.$swal('Cancelado', 'No se finalizaron pedidos', 'info')
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
      },
     ordenarPorSeccion(){
       //this.form.idPedido = localStorage.getItem("idPedido");
        axios.post("http://localhost/pedidos_backend/pedido/list_detalle_pedido2", this.form)
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
     },
     ordenarPorMozo(){},
     ordenarPorNroMesa(){},
     ordenarPorTiempoEspera(){}
    },
    mounted () {
      this.getDetallePedido()
    },
}
</script>