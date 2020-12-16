<template>
  <div>
    <Header />
    <h4 style="padding-top: 15px;">¡ Detalle del pedido !</h4>
    <div class="form-group row" style="padding-top: 15px; width: 100%;">
        <div class="col-4">
        </div>
        <div class="col-4">
        </div>
        <div class="col-1">
        </div>
        <div class="col-3">
            <button type="button" class="btn btn-success" v-on:click="finalizarElaboracion()" style="width: 90%;">Finalizar Elaboración</button>
        </div>
    </div> 
    <div class="table-responsive" style="width:100%;">
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
            to : "cGOrtlJwPWQ:APA91bH6DpNbjyDn76_DOuq56G7YqNyUooUOtZvGIr7mCdEmJEj58KcdBTrAR1zOCm50Igo6L7yOY7iiZjHHJNZvdzE0nWpUuphbGXcQ2e6itsTN6sLka27_sw2tx8XoBRZgC0HL2-cB",
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
      },
      finalizarElaboracion() {
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
                this.makeToast("Notificado",res.msg,"info");
                this.getDetallePedido()
              })
            })
            return response;
          } catch (error) {
            console.error(error);
          }
        })
        this.detallepedido_checkbox = []
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
      this.getDetallePedido()
    },
}
</script>