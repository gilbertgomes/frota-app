<template>
  <div>
      <v-dialog  v-model="dialog" height="900px" max-width="900px" persistent :retain-focus="false">
        <v-card height="700px" width="900px">
          <br>
          <v-card-text>                     
            <v-row> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Nº Ordem Compra" v-model="ocitem.numerooc" name="oc" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data Emissão" v-model="ocitem.dtemissao" name="dtemissao"    clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Setor" v-model="ocitem.setor"  name="setor"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Solicitiante" v-model="ocitem.solicitante"  name="solicitante" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Contabil/Fonte" v-model="ocitem.contabil" name="contabil"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Prazo" v-model="ocitem.prazo" name="prazo"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm12 md12>
                    <v-text-field  label="Aprovador" v-model="ocitem.aprovador" name="aprovador"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data Aprovação" v-model="ocitem.dtaprovacao" name="dtaprovacao"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Fornecedor" v-model="ocitem.fornecedor" name="fornecedor"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>   
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Obs" v-model="ocitem.obs" name="obs"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>   
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Situação" v-model="ocitem.situacao" name="situacao"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
    props: ['nroc', 'anooc'], 
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
            ocitem: {
              id: 0,
              oc: 0,
              dtemissao: '',
              numerooc: '',
              setor: '',
              solicitante: '',
              contabil: '',
              prazo: '',
              aprovador: '', 
              dtaprovacao: '',
              fornecedor: '',
              obs: '',
              situacao: '',
              visualiza: false,
            },
            headersitens: [    
                { text: 'ID', value: 'itemid', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Tipo OC', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'tipocompra' },
                { text: 'Serviço / Peças', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'objeto' },
                { text: 'Quantidade', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'qde' },
                { text: 'R$ Valor Un', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'valoun' },
                { text: 'R$ Total', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'valortot' },
                { text: 'Aplicação', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'aplicacao' },
                { text: 'Motivo', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'motivo' },   
                                     
            ],
            lintaitens: [],         
        }
    },
    methods: {
          gerapdf(id) {         
            const  urllistaitem = process.env.VUE_APP_HOST  + "ocitem/printer/" + id
            
            this.axios.get(urllistaitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.lintaitens = response.data  
                 this.ocitem.numerooc = this.lintaitens[0].numerooc
                 this.ocitem.dtemissao = this.lintaitens[0].data
                 this.ocitem.setor = this.lintaitens[0].setor
                 this.ocitem.solicitante = this.lintaitens[0].solicitante
                 this.ocitem.contabil = this.lintaitens[0].contabil
                 this.ocitem.prazo = this.lintaitens[0].prazo
                 this.ocitem.aprovador = this.lintaitens[0].aprovador
                 this.ocitem.dtaprovacao = this.lintaitens[0].dtaprovacao
                 this.ocitem.fornecedor = this.lintaitens[0].fornecedor
                 this.ocitem.obs = this.lintaitens[0].obs
                 this.ocitem.situacao = this.lintaitens[0].situacao
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
        EventBus.$on('carregaimpressaoos', (oc) => {
            localStorage.oc = oc.id
            this.gerapdf(localStorage.oc)    
            this.dialog = true
        })
    },   
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaimpressaoos')
        });
    },
    created(){
      this.gerapdf(localStorage.entradaid )
    }
}
</script>
<style scoped>
</style>