<template>
 <v-card> 
    <Dashboard></Dashboard>
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
    <template v-slot:item.situacao="{ item }">
        <v-chip
            :color="getColor(item.situacao)"
            dark
        >
        {{ item.situacao }}
        </v-chip>
    </template>
    <template v-slot:item.rotareferencia="{ item }">
        <v-chip
            color="indigo"
            dark
        >
        {{ item.rotareferencia }}
        </v-chip>
    </template>
    <template v-slot:item.placa="{ item }">
        <v-chip
            color="red"
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
              <v-icon  @click="carregaimpressao(item)">
                  mdi-printer
              </v-icon>
          </v-btn>
          <v-btn class="smf-gradient" fab dark small color="red" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="carregaexclusao(item)">
                  mdi-bus-clock
              </v-icon>
          </v-btn>   
          <v-btn class="smf-gradient" fab dark small color="teal" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="insereitem(item)">
                 mdi-car-traction-control
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
  <Alterar></Alterar>
  <CadastarItem></CadastarItem>
  <listaitem></listaitem>
  <Impressao></Impressao>
 

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
        Cadastrar:    () => import('@/views/Rota/Rotacadastrar.vue'),
        Alterar:      () => import('@/views/Rota/Rotaalterar.vue'),
        CadastarItem: () => import('@/views/Rota/Rotaitem.vue'), 
        Impressao:    () => import('@/views/Rota/Rotaimpressao.vue'),  
        Listaitem:    () => import('@/views/Rota/Rotalistaitem.vue'),     
    },
    name: 'Entrada',
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
                { text: 'Nº Contrato', value: 'contrato', class: "cyan dark 1 white--text" },
                { text: 'Rota/referencia', value: 'rotareferencia', class: "cyan dark 1 white--text" },
                { text: 'Km inicio', value: 'kminicio', class: "cyan dark 1 white--text" },
                { text: 'Hora inicio', value: 'horainicio', class: "cyan dark 1 white--text" },
                { text: 'Placa', value: 'placa', class: "cyan dark 1 white--text" },
                { text: 'Veiculo', value: 'veiculo', class: "cyan dark 1 white--text" },
                { text: 'Motorista', value: 'motorista', class: "cyan dark 1 white--text" },
                { text: 'Cliente', value: 'cliente', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Situação', value: 'situacao', class: "cyan dark 1 white--text" },            
                { text: 'motoristaid', value: 'motoristaid', align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'veiculoid', value: 'veiculoid', align: ' d-none',  class: "cyan dark 1 white--text" },
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
            rota: {
              id: 0,
              placa: '',
              veiculo: '',
              kminicio: 0,
              motorista: '',              
              visualiza: false
            },
            dialog: false,
            alert: false,
            dialog1: false,
            alert1: false,
            nomeformulario: 'Rota de tranpsorte', 
            msgconfirmar: 'Deseja Excluir esta ROTA?',
            msgaexclusao: 'Exclusão execultada com Sucessso!',
            itensprojeto: 0 ,
            exibe: true,
            overlay: false, 
   
        }
    },
    methods: {
        carregaForm() {
            this.rota.visualiza = true
            EventBus.$emit('carregacadastro', this.rota)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadosrota = process.env.VUE_APP_HOST + "rota/search/" + key

            this.axios.get(urldadosrota)
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
        atualiza() {
            const  key = 'frota2021house'
            const  urldadosrota = process.env.VUE_APP_HOST + "rota/search/" + key

            this.axios.get(urldadosrota)
            .then(response => {           
    
              if (response == undefined) {
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciar = response.data   
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
        getColor (situacao) {
            if (situacao == 'Pendente') return 'red'
            else if (situacao == 'Andamento') return 'teal'
            else if (situacao == 'Quitada') return 'primary'
            else if (situacao == 'Cancelada') return 'orange'
            else return 'green'           
        },
        getColorplaca(placa) {
            if (placa == 'placa') return 'red'
        },
        alteraritem(item) {
            this.rota.id = item.id
            localStorage.rota = item.id         
            this.rota.placa = item.placa
            this.rota.veiculo = item.veiculo
            this.rota.motorista = item.motorista
            this.rota.obs = item.obs
            EventBus.$emit('carregaalteracao', this.rota)
            this.initialize()
        },
        insereitem(item) {
            this.rota.id = item.id
            this.rota.kminicio = item.kminicio
            localStorage.rota = item.id
            this.rota.visualiza = true  
            EventBus.$emit('carregaitem', this.rota)
        },
        carregaexclusao(item){
            this.rota.id = item.id
            this.rota.visualiza = true  
            EventBus.$emit('carregaexclusao', this.rota)
        },
        carregaimpressao(item){
            //this.rota.id = item.id
           // this.rota.visualiza = true  
           // EventBus.$emit('carregaimpressao', this.rota)
            //this.exibe = false
            this.$router.push("/rotaimpressao/"+item.id+"")
        }
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    mounted() { // gerencia o receber de dados de outro componente
      this.exibe = localStorage.exibe
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
            }
            this.atualiza() 
            this.value += 10  
        }, 5000)
    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {
        localStorage.exibe = true
        this.exibe = localStorage.exibe    
        this.initialize()
        this.generatepagination()
     }
}
</script>