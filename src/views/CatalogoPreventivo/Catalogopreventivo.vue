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
        <v-toolbar-title>Catalogo Tipos Manutenção Preventiva</v-toolbar-title>
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
          <span>Pesquisa novas Descrições de Manutenção Preventiva!</span>
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
        <span>Carrega novo cadastro para dados da anutenção Preventiva!</span>
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
        </template>
      <span>Carrega dados do Catalogo produto selecionado para possivel alteração/projeto!</span>
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
        Cadastrar: () => import('@/views/CatalogoPreventivo/Catalogopreventivocadastrar.vue'),
        Alterar:   () => import('@/views/CatalogoPreventivo/Catalogopreventivoalterar.vue'),
    },
    name: 'CatalogoPreventivo',
    data() {
        return {
            search: '',
            corForm: 'cyan',
            isLoading: false,
            fullPage: true,
            visualiza: true,
            editedIndex: -1,
            CatalogoProduto: {
                id: 0,
                produto: '',
                visualiza: false
            },
            headers: [{
                    text: 'ID',
                    align: 'center', 
                    sortable: false,
                    value: 'id',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Data', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Tipo Manut. Preventiva', value: 'catalogoprev', class: "cyan dark 1 white--text" },
                { text: 'Previsão KM', value: 'km', class: "cyan dark 1 white--text" },
                { text: 'Previsão Troca', value: 'troca', class: "cyan dark 1 white--text" },                
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
            mpreventiva: {
              id: 0,
              catalogo: '',
              km: '',
              troca: '',
              visualiza: false
            },
            overlay: false, 
        }
    },
    methods: {
        carregaForm() {
            this.mpreventiva.visualiza = true
            EventBus.$emit('carregacadastro', this.mpreventiva)
            this.initialize()
        },
        initialize() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadoscatalogopreventiva = process.env.VUE_APP_HOST + "catalogopreventivo/search/" + key

            this.axios.get(urldadoscatalogopreventiva)
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
            const  urldadoscatalogopreventiva = process.env.VUE_APP_HOST + "catalogopreventivo/search/" + key

            this.axios.get(urldadoscatalogopreventiva)
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
        alteraritem(item) {
            this.mpreventiva.id = item.id
            this.mpreventiva.catalogo = item.catalogoprev
            this.mpreventiva.km = item.km
            this.mpreventiva.troca = item.troca
            this.mpreventiva.visualiza = true
            EventBus.$emit('carregaalteracao', this.mpreventiva)
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
            this.atualiza()         
    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {
        this.initialize()
        this.generatepagination()
     }
}
</script>