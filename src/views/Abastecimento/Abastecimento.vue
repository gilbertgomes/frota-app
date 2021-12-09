<template>
 <v-card>
    <Dashboard v-show="true"></Dashboard>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate  size="64" button color="red" :width="9">
      </v-progress-circular>
    </v-overlay>

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

    <template v-slot:item.actions="{ item }">
      <v-tooltip left color="blue">
        <template v-slot:activator="{ on, attrs }">
          <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
          <v-btn class="smf-gradient" fab dark small color="#00A4AC" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="alteraritem(item)">
                  mdi-pencil
              </v-icon>
          </v-btn>
          <v-btn class="smf-gradient" fab dark small color="#883997" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="alteraritem(item)">
                  mdi-printer
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
  <Alterar></Alterar>
 </v-card>
</template>
<script>
// @ts-nocheck
import EventBus from '@/main.js'
export default {
    components: {   
        Dashboard: () => import('@/components/Dashboard/Dashboard.vue'),   
        Cadastrar: () => import('@/views/Abastecimento/Abastecimentocadastrar.vue'),
        Alterar:   () => import('@/views/Abastecimento/Abastecimentoalterar.vue'),
    },
    name: 'Fabricante',
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
                { text: 'Placa', value: 'placa', class: "cyan dark 1 white--text" },
                { text: 'Veiculo', value: 'modelo', class: "cyan dark 1 white--text" },
                { text: 'Km Atual', value: 'kmatual', class: "cyan dark 1 white--text" },
                { text: 'Marcador', value: 'tanqueatual', class: "cyan dark 1 white--text" },
                { text: 'Hs Abast.', value: 'horabast', class: "cyan dark 1 white--text" },
                { text: 'Nº RC', value: 'rcnumero', class: "cyan dark 1 white--text" },
                //{ text: 'Ano RC', value: 'rcano', class: "cyan dark 1 white--text" },
                { text: 'Quantidade', value: 'quant', class: "cyan dark 1 white--text" },
                { text: 'Valor Un', value: 'valorun', class: "cyan dark 1 white--text" },
                { text: 'Valor Tot', value: 'valortot', class: "cyan dark 1 white--text" },
                { text: 'Motorista', value: 'motorista', class: "cyan dark 1 white--text" },
                { text: 'Fornecedor', value: 'fornecedor', class: "cyan dark 1 white--text" },
                //{ text: 'Obs', value: 'obs', class: "cyan dark 1 white--text" },
                { text: 'Situacao', value: 'situacao', class: "cyan dark 1 white--text" },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan dark 1 white--text" }
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
            abastecimento: {
              id: 0,
              data: '',
              veiculo: '',
              placa: '',
              kmatual: '',
              marcador: '',
              horabast: '',
              motorista: '',
              quantidade: '',
              valorun: '',
              valortot: '',
              fornecedor: '',
              obs: '',
              rcnumero: '',
              situacao: '',         
              visualiza: false
            },
            nomeformulario: 'Abastecimento Veículo',
            overlay: false, 
        }
    },
    methods: {
        carregaForm() {
            this.abastecimento.visualiza = true
            EventBus.$emit('carregacadastro', this.abastecimento)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadosabastecimentoe = process.env.VUE_APP_HOST + "abastecimento/search/" + key

            this.axios.get(urldadosabastecimentoe)
            .then(response => {           
    
              if (response == undefined) {
                  this.overlay = false 
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciar = response.data       
                 this.generatepagination()               
                  this.overlay = false 
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              this.overlay = false 
              alert(error);
            })
        },
        atualiza() {
            const  key = 'frota2021house'
            const  urldadosabastecimentoe = process.env.VUE_APP_HOST + "abastecimento/search/" + key

            this.axios.get(urldadosabastecimentoe)
            .then(response => {           
    
              if (response == undefined) {
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciar = response.data 
                 this.generatepagination()                  
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              alert(error);
            })
        },
        generatepagination(){            
            this.pagination.total = Math.floor(this.gerenciar.length / 10) + 1 
        },
        alteraritem(item) {
            this.abastecimento.id = item.id
            this.abastecimento.placa = item.placa
            this.abastecimento.visualiza = true
            this.abastecimento.veiculo = item.modelo
            this.abastecimento.kmatual = item.kmatual
            this.abastecimento.marcador = item.tanqueatual
            this.abastecimento.horabast = item.horabast
            this.abastecimento.motorista = item.motorista
            this.abastecimento.quantidade = item.quant
            this.abastecimento.valorun = item.valorun
            this.abastecimento.valortot = item.valortot
            this.abastecimento.fornecedor = item.fornecedor
            this.abastecimento.obs = item.obs
            this.abastecimento.rcnumero = item.rcnumero
            EventBus.$emit('carregaalteracao', this.abastecimento)
            this.initialize()
        },
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    mounted() { // gerencia o receber de dados de outro componente
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
            }
            //this.atualiza() 
            this.value += 10  
        }, 5000)   
    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {
        this.initialize()
        this.generatepagination()
     }
}
</script>