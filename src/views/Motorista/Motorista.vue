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
              <v-icon  @click="inserehistorico(item)">
                  mdi-format-align-justify
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
  <Historico></Historico>
 </v-card>
</template>
<script>
// @ts-nocheck
import EventBus from '@/main.js'
export default {
    components: {   
        Dashboard: () => import('@/components/Dashboard/Dashboard.vue'),   
        Cadastrar: () => import('@/views/Motorista/Motoristacadstrar.vue'),
        Alterar:   () => import('@/views/Motorista/Motoristaalterar.vue'),
        Historico: () => import('@/views/Motorista/Motoristahistorico.vue'),
    },
    name: 'Motosrista',
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
            nomeformulario: 'Motorista',
            overlay: false, 
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
            this.overlay = true
            const  urldadosmotorista = process.env.VUE_APP_HOST + "motorista/search/" + key

            this.axios.get(urldadosmotorista)
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
            this.overlay = true
            const  urldadosmotorista = process.env.VUE_APP_HOST + "motorista/search/" + key

            this.axios.get(urldadosmotorista)
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
            this.motorista.id = item.id
            this.motorista.motorista = item.nome
            this.motorista.visualiza = true
            this.motorista.nascimento = item.nascimento
            this.motorista.idade = item.idade
            this.motorista.sexo = item.sexo
            this.motorista.endereco = item.endereco
            this.motorista.bairro = item.bairro
            this.motorista.rg = item.rg
            this.motorista.cpf = item.cpf
            this.motorista.cnh = item.cnh
            this.motorista.categoria = item.categoria
            this.motorista.telcel = item.telcel
            this.motorista.tipocondutor = item.tipocondutor
            this.motorista.admissao = item.admmissao
            EventBus.$emit('carregaalteracao', this.motorista)
            this.initialize()
        },
        inserehistorico(item) {
            this.motorista.id = item.id
            this.motorista.motorista = item.nome
            EventBus.$emit('carregahistorico', this.motorista)
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
            this.atualiza() 
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