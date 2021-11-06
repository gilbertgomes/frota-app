<template>
  <div>
      <v-dialog  v-model="dialog" height="900px" max-width="900px" persistent :retain-focus="false">
        <v-card height="650px" width="900px">
          <br>
          <v-card-text>                     
            <v-row>   
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data" v-model="rotaitem.data" name="data" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Hora Inicio" v-model="rotaitem.horainicio" name="horainicio"    clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Rota Ref" v-model="rotaitem.rotareferencia"  name="rotareferencia"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Hora Fim" v-model="rotaitem.horafim"  name="horafim" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Contrato" v-model="rotaitem.contrato"  name="contrato" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Cliente" v-model="rotaitem.cliente"  name="cliente" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>    
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Placa" v-model="rotaitem.placa" name="placa"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Veículo" v-model="rotaitem.veiculo" name="veiculo"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Motorista" v-model="rotaitem.motorista" name="motorista"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Obs" v-model="rotaitem.obs" name="obs"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>                              
            </v-row>
          </v-card-text>
          <v-data-table
            :headers="headersitens"
            :items="lintaitens"
            :items-per-page="5"
            class="elevation1"
            hide-default-footer
          ></v-data-table>
          <br>
          <div class="text-center">
              <v-spacer></v-spacer>
              <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsg()" >
                  <v-icon dark>mdi-close-outline</v-icon>
                  Fechar
              </v-btn>   
              <v-btn width="160" rounded  color="red"  class="smf-gradient" dark @click="fechaFomulariomsg()" >
                  <v-icon dark>mdi-printer</v-icon>
                  Imprimir
              </v-btn>   
          </div>
        </v-card>
      </v-dialog>
  </div>
</template>
<script type="text/javascript">
// @ts-nocheck
import EventBus from '@/main.js'
export default {
    name: 'itens',
    components: {   
   
    },
    props: ['nrrota', 'anorota'], 
    watch: {
      Gerenciar(val) {
          val || this.close()
      }
    },
    data() {
        return {
            search: '',
            AlertaAdd: false,
            editedIndex: -1,
            dialog: false,
            alert: false,
            isLoading: false,
            fullPage:   true,  
            page: 0,
            rotaitem: {
              id: 0,
              data: '',
              contrato: '',
              rotareferencia: '',
              kminicio: 0,
              horainicio: 0,
              horafim: 0,
              obs: 0,           
              cliente: '',
              placa: '',
              veiculo: '',
              motorista: '',          
              visualiza: false,
            },
            headersitens: [    
                { text: 'ID', value: 'id', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'hora Rota', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'horapontorota' },
                { text: 'Local Percurso', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'localpercursorota' },
                { text: 'Transportado(a)', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'objeto' },
                { text: 'Km Ponto Rota', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'kmponto' },
                { text: 'Obs', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'obs' },
                //{ text: 'Un', align: 'center', divider: true,  class: "teal darken white--text",  value: 'un' },
                //{ text: 'Ref', align: 'center', divider: true,  class: "teal darken white--text",  value: 'ref' },         
            ],
            lintaitens: [],         
        }
    },
    methods: {
          gerapdf(id) {         
            const  urllistaitem = process.env.VUE_APP_HOST  + "rotaitem/printer/" + id
            
            this.axios.get(urllistaitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.lintaitens = response.data  
                 this.rotaitem.data = this.lintaitens[0].data
                 this.rotaitem.contrato = this.lintaitens[0].contrato
                 this.rotaitem.rotareferencia = this.lintaitens[0].rotareferencia
                 this.rotaitem.kminicio = this.lintaitens[0].kminicio
                 this.rotaitem.horainicio = this.lintaitens[0].horainicio
                 this.rotaitem.horafim = this.lintaitens[0].horafim
                 this.rotaitem.cliente = this.lintaitens[0].cliente
                 this.rotaitem.placa = this.lintaitens[0].placa
                 this.rotaitem.veiculo = this.lintaitens[0].veiculo
                 this.rotaitem.motorista = this.lintaitens[0].motorista
                 this.rotaitem.obs = this.lintaitens[0].obs
                 console.log(response.data )                    
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              alert(error+ 'treta da feia');
            })       
        }, 
        fechar(){             
        },
        calculasoma(valor1, valor2){
          const total =  valor1 * valor2
          return total   
        },
        fechaFomulariomsg(){
          this.dialog = false
        }
        
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaimpressao', (rota) => {
            localStorage.rota = rota.id
            this.gerapdf(localStorage.rota)    
            this.dialog = true
        })
    },   
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaimpressao')
        });
    },
    created(){
      this.gerapdf(localStorage.entradaid )
    }
}
</script>
<style scoped>
</style>