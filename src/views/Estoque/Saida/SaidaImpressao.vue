<template>
  <div>
      <v-dialog  v-model="dialog" height="900px" max-width="950px" persistent :retain-focus="false">
        <v-card height="650px" width="950px">
          <br>
          <v-card-text>                     
            <v-row> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data" v-model="saidaitem.data" name="data" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Documento" v-model="saidaitem.documento" name="documento"    clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Valor" v-model="saidaitem.valor"  name="valor"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Destino" v-model="saidaitem.destino"  name="destino" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Obs" v-model="saidaitem.obs"  name="obs" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Situação" v-model="saidaitem.situacao" name="situacao"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
    props: ['nros', 'anoos'], 
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
            saidaitem: {
              id: 0,
              data: 0,
              documento: '',
              valor: '',
              destino: '',
              obs: '',
              situacao: '',
              visualiza: false,
            },
            headersitens: [{
                    text: 'ID',                    
                    sortable: false,
                    value: 'id',
                    align: ' d-none', 
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Produto', value: 'produto', class: "cyan dark 1 white--text" },
                { text: 'Un', value: 'UN', class: "cyan dark 1 white--text" },
                { text: 'Referencia', value: 'referencia', class: "cyan dark 1 white--text" },
                { text: 'Quantidade', value: 'quant', class: "cyan dark 1 white--text" },
                { text: 'Valor Un', value: 'valorun', class: "cyan dark 1 white--text" },
                { text: 'Valor Tot', value: 'valortot', class: "cyan dark 1 white--text" },
                { text: 'Valor Venda', value: 'valorvenda', class: "cyan dark 1 white--text" },
                { text: 'Destino', value: 'destino', class: "cyan dark 1 white--text" },
                { text: 'Situção', value: 'situacao', class: "cyan dark 1 white--text" },
            ],
            lintaitens: [],         
        }
    },
    methods: {
          gerapdf(id) {         
            const  urllistaitem = process.env.VUE_APP_HOST  + "saidaitem/pdf/" + id
            
            this.axios.get(urllistaitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.lintaitens = response.data  
                 this.saidaitem.data = this.lintaitens[0].data
                 this.saidaitem.documento = this.lintaitens[0].documento
                 this.saidaitem.valor = this.lintaitens[0].valor
                 this.saidaitem.destino = this.lintaitens[0].destino
                 this.saidaitem.situacao = this.lintaitens[0].situacao
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
        EventBus.$on('carregaimpressaosaida', (saida) => {
            localStorage.saida = saida.id
            this.gerapdf(localStorage.saida)    
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