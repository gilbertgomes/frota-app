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
     
      <template>
        <v-tooltip right color="#00A4AC">
          <template v-slot:activator="{ on, attrs }">
            <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
            <v-btn  @click="carregaForm()" class="mx-2" color="red" dark  fab fixed left  v-bind="attrs" v-on="on">
                <!-- opcao para carregar formulario modal e atulizar o GRID-->
                <v-icon >
                    mdi-plus-thick
                </v-icon>
            </v-btn>
          </template>
        <span>Carrega novo cadastro para {{nomeformulario}}  !</span>
        </v-tooltip>
      </template>
      <v-spacer></v-spacer> 
    </template>
    <template v-slot:item.situacao="{ item }">
        <v-chip
            :color="getColor(item.situacao)"
            dark
        >
        {{ item.situacao }}
        </v-chip>
    </template>
    <template v-slot:item.placa="{ item }">
        <v-chip
            :color="getColorplaca(item.placa)"
            dark
        >
        {{ item.placa }}
        </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip left color="blue">
        <template v-slot:activator="{ on, attrs }">
          <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
          <v-btn class="smf-gradient" fab dark small color="#0077c2" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="alteraritem(item)">
                  mdi-pencil
              </v-icon>
          </v-btn>
          <v-btn class="smf-gradient" fab dark small color="#790e8b" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="imprimientrada(item)">
                  mdi-printer
              </v-icon>
          </v-btn>
          <v-btn class="smf-gradient" fab dark small color="red" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="exibelista(item)">
                  mdi-collapse-all-outline
              </v-icon>
          </v-btn>   
          <v-btn class="smf-gradient" fab dark small color="#ffc107" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="insereitem(item)">
                  mdi-text-box-plus-outline
              </v-icon>
          </v-btn>       
          <v-btn v-show="false" class="smf-gradient" fab dark small color="#ffc107" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="exibeitens(item)">
                  mdi-file-document-multiple-outline
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
  <Cadastrar></Cadastrar>
  <CadastarItem></CadastarItem>
  <Alterar></Alterar>

  <v-dialog  v-model="dialog1" max-width="500px" persistent :retain-focus="false">
    <v-card>
        <v-card-text> 
            <div class="text-center">  
                <v-alert v-model="alert1" type="success">
                    {{ this.msgaexclusao }}
                </v-alert>
            </div>
            <div class="text-center">
                <v-spacer></v-spacer>
                <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechamsgexcluir()" >
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
        Dashboard:    () => import('@/components/Dashboard/Dashboard.vue'),   
        Cadastrar:    () => import('@/views/OC/Occadstrar.vue'),
        Alterar:      () => import('@/views/OC/Ocalterar.vue'),
        //CadastarItem: () => import('@/views/OC/Ositem.vue'), 
        //Impressao:    () => import('@/views/OC/Osimpressao.vue'),  
        //listaitem:    () => import('@/views/OC/Oslistaitem.vue'),     
    },
    name: 'OC',
    data() {
        return {
            search: '',
            corForm: 'cyan',
            isLoading: false,            
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
                { text: 'Nº OC', value: 'numerooc', class: "cyan dark 1 white--text" },                
                { text: 'Solicitante', value: 'solicitante', class: "cyan dark 1 white--text" },
                { text: 'Setor', value: 'setor', class: "cyan dark 1 white--text" },
                { text: 'FontePag', value: 'fontepagadora', align: ' d-none', class: "cyan dark 1 white--text" },
                { text: 'Prazo', value: 'prazo', class: "cyan dark 1 white--text" },                
                { text: 'Aprovador', value: 'aprovador', class: "cyan dark 1 white--text" },
                { text: 'Dt Aprovação', value: 'dtaprovacao', class: "cyan dark 1 white--text" },
                { text: 'obs', value: 'obs', class: "cyan dark 1 white--text" },
                { text: 'Prioridade', value: 'prioridade', class: "cyan dark 1 white--text" },
                { text: 'Obs', value: 'obs', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'Situação', value: 'situacao', class: "cyan dark 1 white--text" },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan dark 1 white--text" }
            ],            
            gerenciarCampos: [],
            gerenciar: [],
            gerenciaritem: [],
            exibiitem: [],
            atulizaitem: [],
            pageCount: 0,
            itemsPerPage: 10,
            page: 1,
            pagination: {
              current: 1,
              current1: 1,
              total: 0,
              total1: 0
            }, 
            oc: {
              id: 0,
              setor: '',
              solicitante: '',
              fontepagadora: '',
              prazo: '',
              aprovador: '',
              obs: '',
              prioridade: '',
              visualiza: false
            },
            dialog: false,
            alert: false,
            dialog1: false,
            alert1: false,
            nomeformulario: 'Ordem Compra', 
            msgaexclusao: 'Exclusão execultada com Sucessso!',
            itensprojeto: 0 ,
            exibe: false,
            nrentrada: 0         
        }
    },
    methods: {
        carregaForm() {
            this.oc.visualiza = true
            EventBus.$emit('carregacadastro', this.oc)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            const  urldadosoc = process.env.VUE_APP_HOST + "oc/search/" + key

            this.axios.get(urldadosoc)
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
        getColor(situacao) {
            if (situacao == 'Pendente') return 'red'
            else if (situacao == 'Quitada') return 'primary'
            else if (situacao == 'Cancelada') return 'orange'
            else return 'green'           
        },
        getColorplaca(placa) {
            if (placa != '') return '#7da453'
        },
        alteraritem(item) {
            this.oc.id = item.id
            localStorage.oc = item.id         
            this.oc.local = item.local
            this.oc.fornecdor = item.fornecedor
            this.oc.tipoos = item.tipoos
            this.oc.solicitante = item.solicitante
            this.oc.fornecdorid = item.fornecedorid
            this.oc.solicitanteid = item.solicitanteid
            this.oc.aprovadorid = item.aprovadorid
            this.oc.obs = item.obs
            this.oc.visualiza = true
            localStorage.id = item.id
            EventBus.$emit('carregaalteracao', this.oc)
            this.initialize()
        },
        insereitem(item) {
            this.oc.id = item.id
            localStorage.oc = item.id  
            EventBus.$emit('carregaitemos', this.oc)
            //this.initialize()
        },
        imprimientrada(item){
          this.oc.id = item.id
          EventBus.$emit('carregaimpressaoos', this.oc)
        },
        exibelista(item) {
            this.oc.id = item.id
            localStorage.oc = item.id              
            EventBus.$emit('carregalista', this.oc)
        },
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