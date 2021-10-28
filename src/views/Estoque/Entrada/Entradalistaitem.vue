<template>
    <div>
        <v-dialog  v-model="dialog" height="900px" max-width="900px" persistent :retain-focus="false">
            <v-overlay :value="overlay">
                <v-progress-circular
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </v-overlay>
            <v-card height="500px" width="900px" rounded>
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
                    align: 'center', 
                    sortable: false,
                    value: 'id',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Produto', value: 'produto', class: "cyan dark 1 white--text" },
                { text: 'Un', value: 'un', class: "cyan dark 1 white--text" },
                { text: 'Referencia', value: 'referencia', class: "cyan dark 1 white--text" },
                { text: 'Quantidade', value: 'quant', class: "cyan dark 1 white--text" },
                { text: 'Valor Un', value: 'valorun', class: "cyan dark 1 white--text" },
                { text: 'Valor Tot', value: 'valortot', class: "cyan dark 1 white--text" },
                { text: 'Quant Minimo', value: 'quantminimo', class: "cyan dark 1 white--text" },
                { text: 'Vencimento', value: 'vencimento', class: "cyan dark 1 white--text" },
                { text: 'Situção', value: 'situacao', class: "cyan dark 1 white--text" },
                { text: 'produid', value: 'produtoid', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'unidadeid', value: 'unidadeid', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'referenciaid', value: 'referenciaid', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'entradaid', value: 'entrada', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan dark 1 white--text" }
            ],
            lintaitens: [],   
            overlay: false,   
            formulario: 'Lista de Itens da Entrada',
            msgconfirmar: 'Item excluido com sucesso!',
            item: {
              id: 0,
              entrada: 0,
              produto: 0,
              qde: 0,   
              qdeminima: 0,
              unidade: 0,
              referencia: 0
            },
            gerenciaritem: [],
            excluiritem: []
        }
    },
    methods: {
        exibeitens(item) {
            const  urldadosentradaitem = process.env.VUE_APP_HOST + "listaentradaitem/search/" + item
            this.overlay = true
            this.itensprojeto = item.id
            this.axios.get(urldadosentradaitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciaritem = response.data   
                 this.overlay = false; 
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
            const  key = 'id90'
            const  urldadoexcluiritem = process.env.VUE_APP_HOST + "entradaitem/del/" + key
            this.item.id         = item.id
            this.item.entrada    = item.entrada
            this.item.produto    = item.produtoid
            this.item.qde        = item.quant   
            this.item.qdeminima  = item.quantminimo   
            this.item.unidade    = item.unidadeid
            this.item.referencia = item.referenciaid  
            this.overlay = true
            this.axios.post(urldadoexcluiritem, this.item)
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
        EventBus.$on('carregalista', (entrada) => {
            localStorage.entradaid = entrada.id
            this.exibeitens(entrada.id)
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