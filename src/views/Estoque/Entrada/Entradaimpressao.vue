<template>
  <div>
      <v-dialog  v-model="dialog" height="900px" max-width="900px" persistent :retain-focus="false">
        <v-card height="650px" width="900px">
          <br>
          <v-card-text>                     
            <v-row>   
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Nº Ordem Entrada" v-model="entradaitem.entrada" name="entrada" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Data Entrada" v-model="entradaitem.dtentrada" name="dtentrada"    clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Fornecedor" v-model="entradaitem.fornecedor"  name="fornecedor"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Nº Documento" v-model="entradaitem.documento"  name="documento" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>  
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Valor Documento" v-model="entradaitem.valordocumento"  name="valordocumento" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex> 
                <v-flex xs12 sm6 md6>
                    <v-text-field  label="Nº OC" v-model="entradaitem.oc"  name="oc" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                </v-flex>    
                <v-flex xs12 sm12 md12>
                    <v-text-field  label="Observações" v-model="entradaitem.obs" name="obs"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
    props: ['nrentrada', 'anoentrada'], 
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
            entradaitem: {
              id: 0,
              entrada: '',
              dtentrada: '',
              fornecedor: '',
              documento: 0,
              valordocumento: 0,
              oc: 0,           
              tipoproduto: '',
              produto: '',
              descricaoproduto: '',
              qde: '',
              un: '',
              valorun: '',
              valortot: '',
              valorvenda: '',
              minimo: '0',
              dtvecimento: '',
              obs: 'NC',
              unidade: '',
              referencia: '',
              visualiza: false,
            },
            headersitens: [    
                { text: 'ID', value: 'id', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Produto', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'produto' },
                { text: 'Unidade', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'un' },
                { text: 'Referencia', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'referencia' },
                { text: 'Qauntidade', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'quant' },
                { text: 'R$ Un', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'valorun' },
                { text: 'R$Total', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'valortot' },
                { text: 'Minimo', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'quantminimo' },
                { text: 'Vencimento', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'vencimento' },
                { text: 'Situação', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'situacao' },
                //{ text: 'Un', align: 'center', divider: true,  class: "teal darken white--text",  value: 'un' },
                //{ text: 'Ref', align: 'center', divider: true,  class: "teal darken white--text",  value: 'ref' },         
            ],
            lintaitens: [],         
        }
    },
    methods: {
          gerapdf(id) {         
            const  urllistaitem = process.env.VUE_APP_HOST  + "pdfentradas/rel/" + id
            
            this.axios.get(urllistaitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.lintaitens = response.data  
                 this.entradaitem.entrada        = this.lintaitens[0].entrada
                 this.entradaitem.dtentrada      = this.lintaitens[0].dataentrada
                 this.entradaitem.fornecedor     = this.lintaitens[0].fornecedor
                 this.entradaitem.documento      = this.lintaitens[0].documento
                 this.entradaitem.valordocumento = this.lintaitens[0].valortotdocumento
                 this.entradaitem.oc             = this.lintaitens[0].oc
                 this.entradaitem.obs            = this.lintaitens[0].obs
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
        EventBus.$on('carregaimpressao', (entrada) => {
            localStorage.entradaid = entrada.id
            this.gerapdf(localStorage.entradaid)    
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