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
              <v-icon  @click="imprimisaida(item)">
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
  <listaitem></listaitem>  
  <Impressao></Impressao>
  <v-dialog  v-model="dialog" max-width="500px" persistent :retain-focus="false">
    <v-card>
        <v-card-text> 
            <div class="text-center">  
                <v-alert v-model="alert" type="success">
                    {{ this.msgconfirmar }}
                </v-alert>
            </div>
            <div class="text-center">
                <v-spacer></v-spacer>
                <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsgconfirmar()" >
                    <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
                    Não Excluir
                </v-btn>    
                <v-btn width="160" rounded  color="red"  class="smf-gradient" dark @click="excluiritens()" >
                    <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
                    Excluir
                </v-btn> 
            </div>
        </v-card-text>
    </v-card>
  </v-dialog>
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
        Dashboard:     () => import('@/components/Dashboard/Dashboard.vue'),   
        Cadastrar:     () => import('@/views/Estoque/Saida/Saidacadastrar.vue'),
        Alterar:       () => import('@/views/Estoque/Saida/Saidaalterar.vue'),
        CadastarItem:  () => import('@/views/Estoque/Saida/Saidaitem.vue'),    
        listaitem:     () => import('@/views/Estoque/Saida/Saidalistaitem.vue'), 
        Impressao:     () => import('@/views/Estoque/Saida/SaidaImpressao.vue'), 
    },
    name: 'Saida',
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
                { text: 'Nº Documento', value: 'documento', class: "cyan dark 1 white--text" },
                { text: 'Valor', value: 'valor', class: "cyan dark 1 white--text" },
                { text: 'Destino', value: 'destino', class: "cyan dark 1 white--text" },              
                { text: 'Obs', value: 'obs', class: "cyan dark 1 white--text" },
                { text: 'Situção', value: 'situacao', class: "cyan dark 1 white--text" },
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
            saida: {
              id: 0,
              data: '',
              documento: '',
              destino: '',
              valor: '',
              obs: '',
              visualiza: false
            },
            saidaitem: {
              id: 0,
              saida: 0,
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
            nomeformulario: 'Saída Produto', 
            msgconfirmar: 'Deseja Excluir este Item desta Saida?',
            msgaexclusao: 'Exclusão execultada com Sucessso!',
            itensprojeto: 0 ,
            exibe: false,
            nrsaida: 0,
            overlay: false,          
        }
    },
    methods: {
        carregaForm() {
            this.atualiza.visualiza = true
            EventBus.$emit('carregacadastro', this.saida)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadossaida = process.env.VUE_APP_HOST + "saida/search/" + key

            this.axios.get(urldadossaida)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.gerenciar = response.data   
                 this.overlay = true
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
            const  urldadossaida = process.env.VUE_APP_HOST + "saida/search/" + key

            this.axios.get(urldadossaida)
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
            this.saida.id = item.id
            localStorage.saida = item.id         
            this.saida.documento = item.documento
            this.saida.valor = item.valor
            this.saida.destino = item.destino
            this.saida.obs = item.obs
            this.saida.situacao = item.situacao
            this.saida.visualiza = true
            localStorage.saida = item.id
            EventBus.$emit('carregaalteracao', this.saida)
            this.initialize()
        },
        insereitem(item) {
            this.saida.id = item.id
            localStorage.saida = item.id
            this.saida.documento = item.documento
            this.saida.destino = item.destino
            this.saida.valor = item.valor
            this.saida.obs = item.obs
            this.saida.situacao = item.situacao
            this.saida.visualiza = true
            EventBus.$emit('carregaitem', this.saida)
            this.initialize()
        },
        fechaFomulariomsgconfirmar(){
          this.dialog = false
          this.alert = false
        },
        confirmaexclusao(){
          this.dialog1 = true
          this.alert1 = true
        },
        fechamsgexcluir(){
          this.dialog1 = false
          this.alert1 = false
          this.exibeitens(localStorage.saida)
        },
        imprimisaida(item){
          this.saida.id = item.id
          EventBus.$emit('carregaimpressaosaida', this.saida)
        },
        exibelista(item) {
            this.saida.id = item.id
            localStorage.saida = item.id
            this.saida.documento = item.documento
            this.saida.destino = item.destino
            this.saida.valor = item.valor
            this.saida.obs = item.obs
            this.saida.situacao = item.situacao
            this.saida.visualiza = true            
            EventBus.$emit('carregalista', this.saida)
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
        this.generatepagination()
     }
}
</script>