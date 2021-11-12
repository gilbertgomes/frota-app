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
          <v-btn class="smf-gradient" fab dark small color="red" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="insereacessorio(item)">
                  mdi-car-outline
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
  <VeiculoAcessorio></VeiculoAcessorio>
 </v-card>
</template>
<script>
// @ts-nocheck
import EventBus from '@/main.js'
export default {
    components: {   
        Dashboard: () => import('@/components/Dashboard/Dashboard.vue'),   
        Cadastrar: () => import('@/views/Veiculo/Veiculocadastrar.vue'),
        Alterar:   () => import('@/views/Veiculo/Veiculoalterar.vue'),
        VeiculoAcessorio: () => import('@/views/Veiculo/Veiculoacessoriocadastrar.vue'),
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
                { text: 'Veiculo', value: 'veiculo', class: "cyan dark 1 white--text" },
                { text: 'Modelo', value: 'modelo', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'Ano', align: ' d-none',  value: 'ano', class: "cyan dark 1 white--text" },
                { text: 'Fabricante', value: 'fabricante', class: "cyan dark 1 white--text" },
                { text: 'Tipo Veículo', align: ' d-none',  value: 'tipoveiculo', class: "cyan dark 1 white--text" },
                { text: 'Origem', value: 'origemveiculo', class: "cyan dark 1 white--text" },
                { text: 'Chassis', value: 'chassis', class: "cyan dark 1 white--text" },
                { text: 'Km Inicial', value: 'kminicial', class: "cyan dark 1 white--text" },
                { text: 'Seguro Veiculo', value: 'seguro', class: "cyan dark 1 white--text" },
                { text: 'Acessórios', align: ' d-none',  value: 'acessorio', class: "cyan dark 1 white--text" },
                { text: 'Tipo Combustivel', value: 'tipocombustivel', class: "cyan dark 1 white--text" },
                { text: 'Licenciamento', value: 'lecenciamento', class: "cyan dark 1 white--text" },
                { text: 'Final Placa', value: 'finalplaca', class: "cyan dark 1 white--text" },
                { text: 'Obs', value: 'obs', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'fabricanteid', align: ' d-none', value: 'fabricanteid', class: "cyan dark 1 white--text" },
                { text: 'tipoveiculoid', align: ' d-none',  value: 'tipoveiculoid', class: "cyan dark 1 white--text" },
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
            veiculo: {
              id: 0,
              placa: '',
              visualiza: false
            },
            nomeformulario: 'Veiculo',
            overlay: false, 
        }
    },
    methods: {
        carregaForm() {
            this.veiculo.visualiza = true
            EventBus.$emit('carregacadastro', this.veiculo)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadosveiculo = process.env.VUE_APP_HOST + "veiculo/search/" + key

            this.axios.get(urldadosveiculo)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciar = response.data   
                 this.overlay = false 
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
            this.veiculo.id = item.id
            this.veiculo.placa = item.placa
            this.veiculo.veiculo = item.veiculo
            this.veiculo.modelo = item.modelo
            this.veiculo.ano = item.ano
            this.veiculo.chassis = item.chassis
            this.veiculo.kminicial = item.kminicial
            this.veiculo.acessorio = item.acessorio
            this.veiculo.visualiza = true
            EventBus.$emit('carregaalteracao', this.veiculo)
            this.initialize()
        },
        insereacessorio(item) {
            this.veiculo.id = item.id
            this.veiculo.placa = item.placa
            this.veiculo.veiculo = item.veiculo
            this.veiculo.modelo = item.modelo
            this.veiculo.visualiza = true
            EventBus.$emit('carregaitem', this.veiculo)
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
            this.initialize() 
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