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
            <v-alert v-model="alert" type="light blue">
                {{ this.formulario }}
            </v-alert>
            <br>
            <v-data-table :headers="headersitem" :items="gerenciaritem" sort-by="id" class="elevation-1" :search="search" mobile-breakpoint="0"
                hide-default-footer  :page.sync="page"  :items-per-page="itemsPerPage"  @page-count="pageCount = $event"
            >
                <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Itens da NFe {{itensprojeto}}</v-toolbar-title>    
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
                <template v-slot:item.localpercurso="{ item }">
                    <v-chip
                        color="red"
                        dark
                    >
                    {{ item.localpercurso }}
                    </v-chip>
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
                    class: "light blue white--text",  color: this.corForm 
                },
                { text: 'data', align: 'center', divider: true,  class: "light blue  white--text",  value: 'data' },
                { text: 'Hora', align: 'center', divider: true,  class: "light blue  white--text",  value: 'horapontorota' },
                { text: 'Local Rota', align: 'center', divider: true,  class: "light blue  white--text",  value: 'localpercurso' },
                { text: 'Objeto Transporte', align: 'center', divider: true,  class: "light blue  white--text",  value: 'objetotransporte' },
                { text: 'Km Ponto Rota', align: 'center', divider: true,  class: "light blue  white--text",  value: 'kmponto' },
                { text: 'Obs', align: 'center', divider: true,  class: "light blue  white--text",  value: 'obs' },
                { text: 'Situação', align: 'center', divider: true,  class: "light blue white--text",  value: 'situacao' },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "light blue white--text" }
            ],
            lintaitens: [],   
            overlay: false,   
            formulario: 'Itens da Rota',
            msgconfirmar: 'Item excluido com sucesso!',
            item: {
              id: 0,
              movimento: 0,
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
            const  urldadosrotaitem = process.env.VUE_APP_HOST + "listarotaitem/search/" + item
            this.overlay = true
            this.itensprojeto = item.id
            this.axios.get(urldadosrotaitem)
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
            const  urldadoexcluiritem = process.env.VUE_APP_HOST + "rotaitem/del/" + item.id  
            
            this.overlay = true
            this.axios.get(urldadoexcluiritem)
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
        getColorlocal(localpercurso){
             if (localpercurso == 'localpercurso') return 'teal'
        }
     
        
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaexclusao', (rota) => {
            localStorage.id = rota.id
            this.exibeitens(rota.id)
            this.dialog = true
            this.alert  = true
        })
    },   
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaexclusao')
        });
    },
    created(){
       this.exibeitens(localStorage.id)
    }
}
</script>
<style scoped>
</style>