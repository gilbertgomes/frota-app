<template>
  <div>
      <v-dialog  v-model="dialog" height="900px" max-width="900px" persistent :retain-focus="false">
        <v-card height="650px" width="900px">
          <br>
          <v-card-text>                     
            <v-row> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Nº Ordem Serviço" v-model="ositem.osnumero" name="os" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data Emissão" v-model="ositem.dtemissao" name="dtemissao"    clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Documento" v-model="ositem.solicitante"  name="solicitante"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Valor" v-model="ositem.fornecedor"  name="fornecedor" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Aprovador" v-model="ositem.aprovador" name="aprovador"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data Aprovação" v-model="ositem.dtaprovacao" name="dtaprovacao"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm12 md12>
                    <v-text-field  label="Obs" v-model="ositem.obs" name="obs"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data Conclusão" v-model="ositem.dtconclusão" name="dtconclusão"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Situação" v-model="ositem.situacao" name="situacao"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            ositem: {
              id: 0,
              os: 0,
              osnumero: '',
              dtemissao: '',
              solicitante: '',
              fornecedor: '',
              aprovador: '',
              dtaprovacao: '',
              dtconclusão: '',
              obs: '',
              situacao: '',
              visualiza: false,
            },
            headersitens: [    
                { text: 'ID', value: 'ositem', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Tipo OS', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'tipoitem' },
                { text: 'Serviço / peças', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'objeto' },
                { text: 'Quantidade', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'quant' },
                { text: 'R$ Valor Un', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'varun' },
                { text: 'R$ Total', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'valortot' },
                { text: 'Dt Inicio', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'dtinicio' },
                { text: 'Garantia', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'garantia' },   
                { text: 'Situação', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'situacao' }, 
                      
            ],
            lintaitens: [],         
        }
    },
    methods: {
          gerapdf(id) {         
            const  urllistaitem = process.env.VUE_APP_HOST  + "ositem/search/" + id
            
            this.axios.get(urllistaitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.lintaitens = response.data  
                 this.ositem.osnumero = this.lintaitens[0].osnumero
                 this.ositem.dtemissao = this.lintaitens[0].dtemissao
                 this.ositem.solicitante = this.lintaitens[0].solicitante
                 this.ositem.fornecedor = this.lintaitens[0].fornecedor
                 this.ositem.aprovador = this.lintaitens[0].aprovador
                 this.ositem.dtaprovacao = this.lintaitens[0].dtaprovacao
                 this.ositem.dtconclusão = this.lintaitens[0].dtconclusao
                 this.ositem.obs = this.lintaitens[0].obs
                 this.ositem.situacao = this.lintaitens[0].situacao
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
        EventBus.$on('carregaimpressaoos', (os) => {
            localStorage.os = os.id
            this.gerapdf(localStorage.os)    
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