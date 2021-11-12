<template>
    <div>
        <v-dialog  v-model="dialog" height="990px" max-width="1000px" persistent :retain-focus="false">
            <v-overlay :value="overlay">
                <v-progress-circular
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </v-overlay>
            <v-card height="900px" width="990px" rounded>
            <v-alert v-model="alert" type="cyan">
                {{ this.formulario }}
            </v-alert>
            <br>
            <v-data-table :headers="headersitem" :items="gerenciaritem" sort-by="id" class="elevation-1" :search="search" mobile-breakpoint="0"
                hide-default-footer  :page.sync="page"  :items-per-page="itemsPerPage"  @page-count="pageCount = $event"
            >
                <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Itens da Entrada {{itensprojeto}}</v-toolbar-title>    
                    </v-toolbar>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="white">          
                        <v-spacer></v-spacer>  
                        <v-tooltip left color="cyan">
                        <template v-slot:activator="{ on, attrs  }">
                            <v-btn fab dark small class="smf-gradient"  color="red" v-on="on" v-bind="attrs">
                            <!-- opcao para carregar formulario modal e atulizar o GRID-->
                            <v-icon @click="pesquisa(search)">mdi-magnify</v-icon>
                            </v-btn>
                            <v-text-field v-model="search" append-icon="" label="Pesquisar" single-line hide-details></v-text-field>
                            <!--dados de busca -->
                        </template>
                        <span>Pesquisa Referência!</span>
                        </v-tooltip>
                    </v-toolbar>
                </template> 
                <template v-slot:item.actions="{ item }">
                <v-tooltip left color="blue">
                    <template v-slot:activator="{ on, attrs }">
                    <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
                    <v-btn class="smf-gradient" fab dark small color="#00A4AC" v-bind="attrs" v-on="on">
                        <!-- opcao para carregar formulario modal e atulizar o GRID-->
                        <v-icon  @click="excluiritens(item)">
                            mdi-delete-forever-outline
                        </v-icon>
                    </v-btn>          
                    </template>
                <span>Exclui dados do ITEM selecionado!</span>
                </v-tooltip>
                </template>     
                <template v-slot:no-data>
                <v-btn id="btngerenciar" color="#00A4AC" @click="initialize()">Reset</v-btn>
                </template>
            </v-data-table>
            <br>
            <div class="text-center">
                <v-spacer></v-spacer>
                <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsg()" >
                    <v-icon dark>mdi-close-outline</v-icon>
                    Fechar
                </v-btn>   
            </div>
            </v-card>
        </v-dialog>        
        <v-dialog  v-model="dialog1" max-width="500px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert1" type="success">
                            {{ this.msgconfirmar }}
                        </v-alert>
                    </div>
                    <div class="text-center">
                        <v-spacer></v-spacer>
                        <v-btn width="160" rounded  color="red"  class="smf-gradient" dark @click="fecharexcluir()" >
                            <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
                            fechar
                        </v-btn> 
                    </div>
                </v-card-text>
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
      },
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    data() {
        return {
            search: '',
            AlertaAdd: false,
            editedIndex: -1,
            dialog: false,
            alert: false,
            dialog1: false,
            alert1: false,
            alert2: false,
            isLoading: false,
            fullPage:   true,  
            pageCount: 0,
            itemsPerPage: 10,
            page: 0,
            headersitem: [{
                    text: 'ID',
                    align: ' d-none', 
                    sortable: false,
                    value: 'itemid',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Tipo Compra', value: 'tipocompra', class: "cyan dark 1 white--text" },
                { text: 'Fornecedor', value: 'fornecedor', class: "cyan dark 1 white--text" },
                { text: 'Objeto', value: 'objeto', class: "cyan dark 1 white--text" },
                { text: 'Qauntidade', value: 'qde', class: "cyan dark 1 white--text" },
                { text: 'Valor un', value: 'varun', class: "cyan dark 1 white--text" },
                { text: 'Valor Total', value: 'valortot', class: "cyan dark 1 white--text" },
                { text: 'Aplicação', value: 'aplicacao', class: "cyan dark 1 white--text" },
                { text: 'Motivo', value: 'motivo', class: "cyan dark 1 white--text" },
                { text: 'Situacao', value: 'situacao', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan dark 1 white--text" }
            ],
            lintaitens: [],   
            overlay: false,   
            formulario: 'Lista de Itens da OC',
            msgconfirmar: 'Item excluido com sucesso!',
            ocitem: {
              id: 0,
              solicitante: 0,
              ocnumero: 0,
              fornecedor: 0,   
              aprovador: 0,
              dtaprovacao: 0,
              situacao: 0
            },
            gerenciaritem: [],
            excluiritem: [],
        
        }
    },
    methods: {
        exibeitens(item) {
            const  urldadosocitem = process.env.VUE_APP_HOST + "ocitem/list/" + item
            this.overlay = true
            this.itensprojeto = item.id
            this.axios.get(urldadosocitem)
            .then(response => {         
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {            
                 this.overlay = false; 
                 this.gerenciaritem = response.data 
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              alert(error);
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
        },
        excluiritens(item) {
            const  urldadoexcluiritem = process.env.VUE_APP_HOST + "ocitem/del/" + item.itemid
            this.ocitem.id = item.itemid
            this.overlay = true
            this.axios.post(urldadoexcluiritem, this.ocitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.excluiritem = response.data   
                 this.overlay = false    
                 this.confirmaexclusao()                        
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              alert(error);
            })
        },
        confirmaexclusao(){       
          this.dialog1 = true
          this.alert1  = true
        },
        fecharexcluir(){
          this.dialog1 = false
          this.alert1  = false
          this.dialog  = false
          this.alert   = false
        },
     
        
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregalista', (oc) => {
            localStorage.oc = oc.id
            this.exibeitens(oc.id)
            this.dialog = true
            this.alert  = true
        })
    },   
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregalista')
        });
    },
    created(){
       this.exibeitens(localStorage.entrada)
    }
}
</script>
<style scoped>
</style>