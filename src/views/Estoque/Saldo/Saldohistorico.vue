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
            <v-text-field v-model="search" append-icon="" label="Pesquisar saldo de produtos por:" single-line hide-details></v-text-field>
             <!--dados de busca -->
          </template>
          <span>Pesquisa {{nomeformulario}}!</span>
        </v-tooltip>
      </v-toolbar>
      <v-spacer></v-spacer> 
    </template>
    <template v-slot:item.saldoatual="{ item }">
        <v-chip
            :color="getColorsaldo(item.saldoatual)"
            dark
        >
        {{ item.saldoatual }}
        </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip left color="blue">
        <template v-slot:activator="{ on, attrs }">
          <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
          <v-btn class="smf-gradient" fab dark small color="#00A4AC" v-bind="attrs" v-on="on">
              <!-- opcao para carregar formulario modal e atulizar o GRID-->
              <v-icon  @click="alteraritem(item)">
                  mdi-chart-multiple
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
                    align: 'center', 
                    sortable: false,
                    value: 'id',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Produto', value: 'produto', class: "cyan dark 1 white--text" },
                { text: 'Un', value: 'un', class: "cyan dark 1 white--text" },
                { text: 'Referencia', value: 'referencia', class: "cyan dark 1 white--text" },
                { text: 'Entradas', value: 'entrada', class: "cyan dark 1 white--text" },
                { text: 'Saidas', value: 'saida', class: "cyan dark 1 white--text" },
                { text: 'Saldo Anterior', value: 'saldoanterior', class: "cyan dark 1 white--text" },
                { text: 'Saldo Atual', value: 'saldoatual', class: "cyan dark 1 white--text" },
                { text: 'Obs', value: 'obs', class: "cyan dark 1 white--text" },
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
            nomeformulario: 'Saldo Histórico de Produtos',
            overlay: false, 
        }
    },
    methods: {
        initialize() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadossaldohistorico = process.env.VUE_APP_HOST + "saldohistorico/search/" + key

            this.axios.get(urldadossaldohistorico)
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
            this.tipofinanceiro.id = item.id
            this.tipofinanceiro.tipofinanceiro = item.tipofinanceiro
            this.tipofinanceiro.visualiza = true
            EventBus.$emit('carregaalteracao', this.tipofinanceiro)
            this.initialize()
        },
        getColorsaldo(saldoatual) {
            if (saldoatual > 10) return 'primary'
            else if (saldoatual <= 10) return 'red dark'
            else if (saldoatual <= 5) return 'red'
            else return 'red'           
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
    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {
        this.initialize()
        this.generatepagination()
     }
}
</script>