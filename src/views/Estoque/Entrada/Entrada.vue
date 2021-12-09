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
    <template v-slot:item.situacao="{ item }">
        <v-chip
            :color="getColor(item.situacao)"
            dark
        >
        {{ item.situacao }}
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
  <Impressao></Impressao>
  <listaitem></listaitem>  

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
        Cadastrar:    () => import('@/views/Estoque/Entrada/Entradacadastrar.vue'),
        Alterar:      () => import('@/views/Estoque/Entrada/Entradaalterar.vue'),
        CadastarItem: () => import('@/views/Estoque/Entrada/Entradaitem.vue'), 
        Impressao:    () => import('@/views/Estoque/Entrada/Entradaimpressao.vue'),  
        listaitem:    () => import('@/views/Estoque/Entrada/Entradalistaitem.vue'),     
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
                    align: 'center', 
                    sortable: false,
                    value: 'id',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Nº OC', value: 'oc', class: "cyan dark 1 white--text" },
                { text: 'Nº Documento', value: 'documento', class: "cyan dark 1 white--text" },               
                { text: 'Valor NF', value: 'valortot', class: "cyan dark 1 white--text" },
                { text: 'Fornecedor', value: 'fornecedor', class: "cyan dark 1 white--text" },
                { text: 'Obs', value: 'obs', class: "cyan dark 1 white--text" },
                { text: 'Situção', value: 'situacao', class: "cyan dark 1 white--text" },
                { text: 'forid', value: 'forid', align: ' d-none',  class: "cyan dark 1 white--text" },
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
            entrada: {
              id: 0,
              documento: '',
              valortot: '',
              fornecedor: '',
              situacao: '',
              obs: '',
              forid: 0, 
              visualiza: false
            },
            Entradaitem: {
              id: 0,
              entrada: 0,
              produto: 0,
              un: 0,
              referencia: 0,
              qde: 0,
              qdeminima: 0
            },
            dialog: false,
            alert: false,
            dialog1: false,
            alert1: false,
            nomeformulario: 'Entrada Produto', 
            msgconfirmar: 'Deseja Excluir este Item desta ENTRADA?',
            msgaexclusao: 'Exclusão execultada com Sucessso!',
            itensprojeto: 0 ,
            exibe: false,
            nrentrada: 0,
            overlay: false,         
        }
    },
    methods: {
        carregaForm() {
            this.atualiza.visualiza = true
            EventBus.$emit('carregacadastro', this.entrada)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadosentrada = process.env.VUE_APP_HOST + "entrada/search/" + key

            this.axios.get(urldadosentrada)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciar = response.data   
                 this.isLoading = false; 
                 this.generatepagination()
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
            const  urldadosentrada = process.env.VUE_APP_HOST + "entrada/search/" + key

            this.axios.get(urldadosentrada)
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
              this.isLoading = false;
              alert(error);
            })
        },
        generatepagination(){            
            this.pagination.total = Math.floor(this.gerenciar.length / 10) + 1 
        },
        getColor (situacao) {
            if (situacao == 'Pendente') return 'red'
            else if (situacao == 'Quitada') return 'primary'
            else if (situacao == 'Cancelada') return 'orange'
            else return 'green'           
        },
        linstaitens(item, acao){
          if(acao == 1){
            this.exibeitens(item)
            this.gerenciaritem = this.exibiitem 
          } else if(acao == 2){
            this.atualizaitens(item)
            this.gerenciaritem = this.atulizaitem 
          }
        },
        alteraritem(item) {
            this.entrada.id = item.id
            localStorage.entrada = item.id         
            this.entrada.documento = item.documento
            this.entrada.valortot = item.valortot
            this.entrada.obs = item.obs
            this.entrada.situacao = item.situacao
            this.entrada.forid = item.forid
            this.entrada.visualiza = true
            localStorage.entrada = item.id
            EventBus.$emit('carregaalteracao', this.entrada)
            this.initialize()
        },
        insereitem(item) {
            this.entrada.id = item.id
            localStorage.entrada = item.id
            this.entrada.documento = item.documento
            this.entrada.valortot = item.valortot
            this.entrada.obs = item.obs
            this.entrada.situacao = item.situacao
            this.entrada.forid = item.forid
            this.entrada.visualiza = true
            EventBus.$emit('carregaitem', this.entrada)
            this.initialize()
        },
        confirmaExclusao(item){
          this.Entradaitem.id = item.id
          this.Entradaitem.entrada = item.entrada
          this.Entradaitem.produto = item.produtoid
          this.Entradaitem.unidade = item.unidadeid
          this.Entradaitem.referencia = item.referenciaid
          this.Entradaitem.qde = item.quant
          this.Entradaitem.qdeminima = item.quantminimo
          this.Entradaitem.entrada = item.entrada
          localStorage.entrada = item.entrada
          this.dialog = true
          this.alert = true
          console.log(this.Entradaitem)
        },
        imprimientrada(item){
          this.entrada.id = item.id
          EventBus.$emit('carregaimpressao', this.entrada)
        },
        exibelista(item) {
            this.entrada.id = item.id
            localStorage.entrada = item.id
            this.entrada.documento = item.documento
            this.entrada.valortot = item.valortot
            this.entrada.obs = item.obs
            this.entrada.situacao = item.situacao
            this.entrada.visualiza = true            
            EventBus.$emit('carregalista', this.entrada)
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
        }, 6000)  
    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {
        this.initialize()       
    }
}
</script>