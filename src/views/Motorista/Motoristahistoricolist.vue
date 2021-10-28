<template>
 <v-card>
    <Dashboard v-show="true"></Dashboard>

    <v-data-table :headers="headers" :items="gerenciar" sort-by="produto" class="elevation-1" :search="search" mobile-breakpoint="0"
     hide-default-footer  :page.sync="page"  :items-per-page="itemsPerPage"  @page-count="pageCount = $event"
    >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title> {{nomeformulario}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>  
        <v-tooltip left color="cyan">
          <template v-slot:activator="{ on, attrs  }">
            <v-btn fab dark small class="smf-gradient"  color="red" v-on="on" v-bind="attrs">
             <!-- opcao para carregar formulario modal e atulizar o GRID-->
             <v-icon @click="pesquisa(search, 1)">mdi-magnify</v-icon>
            </v-btn>
            <v-text-field v-model="search" append-icon="" label="Pesquisar" single-line hide-details></v-text-field>
             <!--dados de busca -->
          </template>
          <span>Pesquisa {{nomeformulario}}!</span>
        </v-tooltip>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-tooltip left color="blue">
        <template v-slot:activator="{ on, attrs }">
          <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
          <v-btn class="smf-gradient" fab dark small color="red" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="exibeitens(item)">
                  mdi-clipboard-list-outline
              </v-icon>
          </v-btn>
        </template>
      <span>Carrega dados {{nomeformulario}} selecionado para possivel alteração/projeto!</span>
      </v-tooltip>
    </template>     
    <template v-slot:no-data>
      <v-btn id="btngerenciar" color="cyan" @click="initialize()">Reset</v-btn>
    </template>
  </v-data-table> 
  <div class="text-center">
    <v-pagination color="cyan" v-model="page" :length="pagination.total"  circle></v-pagination>
  </div> 
      <v-dialog  v-model="dialog" max-width="800px" persistent :retain-focus="false">
        <v-card>
            <v-card-text> 
                <div class="text-center">  
                    <v-alert v-model="alert" type="success">
                        {{ this.msghistorico }}
                    </v-alert>
                </div>
                <v-data-table
                  :headers="headershistorico"
                  :items="gerenciaritem"
                  :items-per-page="5"
                  class="elevation1"
                  hide-default-footer
                ></v-data-table>
                <div class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsg()" >
                        <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
                        Fechar
                    </v-btn>    
                </div>
            </v-card-text>
        </v-card>
      </v-dialog>
 </v-card>
</template>
<script>
// @ts-nocheck
import EventBus from '@/main.js'
export default {
    components: {   
        Dashboard: () => import('@/components/Dashboard/Dashboard.vue'),   
    },
    name: 'Motosrista',
    data() {
        return {
            search: '',
            corForm: 'cyan',
            isLoading: false,
            dialog: false,
            alert: false,
            fullPage: true,
            visualiza: true,
            editedIndex: -1,
            headers: [{
                    text: 'ID',
                    align: ' d-none',
                    sortable: false,
                    value: 'id',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Motorista', value: 'nome', class: "cyan dark 1 white--text" },
                { text: 'Nascimento', value: 'nascimento', class: "cyan dark 1 white--text" },
                { text: 'Idade', value: 'idade', class: "cyan dark 1 white--text" },
                { text: 'Sexo', value: 'sexo', class: "cyan dark 1 white--text" },
                { text: 'RG', value: 'rg', class: "cyan dark 1 white--text" },
                { text: 'CPF', value: 'cpf', class: "cyan dark 1 white--text" },
                { text: 'CNH', value: 'cnh', class: "cyan dark 1 white--text" },
                { text: 'Categoria', value: 'categoria', class: "cyan dark 1 white--text" },
                //{ text: 'Validade', value: 'validade', class: "cyan dark 1 white--text" },
                //{ text: 'Tipo Sangueneo', value: 'tiposangueneo ', class: "cyan dark 1 white--text" },
                { text: 'Cel/Tel', value: 'telcel', class: "cyan dark 1 white--text" },
                { text: 'Tipo', value: 'tipocondutor', class: "cyan dark 1 white--text" },
                { text: 'Endereco', value: 'endereco', class: "cyan dark 1 white--text" },
                { text: 'Bairro', value: 'bairro', class: "cyan dark 1 white--text" },
                { text: 'Contrato', value: 'contrato', class: "cyan dark 1 white--text" },
                { text: 'Admissão', value: 'admmissao', class: "cyan dark 1 white--text" },
                //{ text: 'Imagem', value: 'caminhoimg', align: ' d-none', class: "cyan dark 1 white--text" },
                { text: 'Detalhes', align: 'center', value: 'actions', sortable: false, class: "cyan dark 1 white--text" }
            ],
            headershistorico: [{
                    text: 'ID',
                    align: ' d-none',
                    sortable: false,
                    value: 'id',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Hitorico', value: 'descricaomotorista', class: "cyan dark 1 white--text" },
                { text: 'Obs', value: 'obs', class: "cyan dark 1 white--text" },
                { text: 'Situação', value: 'situacaocondutor', class: "cyan dark 1 white--text" },    
            ],
            gerenciarCampos: [],
            gerenciar: [],
            pageCount: 0,
            itemsPerPage: 10,
            page: 1,
            pagination: {
              current: 1,
              current1: 1,
              total: 0,
              total1: 0
            }, 
            motorista: {
              id: 0,
              motorista: '',
              nascimento: '',
              idade: '',
              sexo: '',
              endereco: '',
              bairro: '',
              rg: '',
              cpf: '',
              cnh: '',
              categoria: '',
              telcel: '',
              tipocondutor: '',
              admissao: '',
              visualiza: false
            },
            nomeformulario: 'Histórico de Motorista',
            msghistorico: 'Histórico de Motorista',
            lista: []
        }
    },
    methods: {
        carregaForm() {
            this.motorista.visualiza = true
            EventBus.$emit('carregacadastro', this.motorista)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            const  urldadosmotorista = process.env.VUE_APP_HOST + "motorista/search/" + key

            this.axios.get(urldadosmotorista)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciar = response.data   
                 this.isLoading = false; 
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
        generatepagination(){            
            this.pagination.total = Math.floor(this.gerenciar.length / 10) + 1 
        },
        alteraritem(item) {
            this.motorista.id = item.id
        },
       listhistorico(){

  
       },
       exibeitens(item) {
            const  urldadosmotoristahistorico = process.env.VUE_APP_HOST + "motoristahistorico/list/" + item.id
            this.overlay = true
            this.itensprojeto = item.id
            this.axios.get(urldadosmotoristahistorico)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                  this.gerenciaritem = response.data   
                  this.carregahistorico()
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
      carregahistorico(){
        this.dialog = true
        this.alert = true
      },
      fechaFomulariomsg(){
        this.dialog = false
        this.alert = false
      }
    },
    mounted() { // gerencia o receber de dados de outro componente
    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {
        this.initialize()
        this.generatepagination()
     }
}
</script>