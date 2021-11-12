<template>
    <div>        
        <Manutencao v-show="true"></Manutencao>        
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <v-card rounded>
            <v-alert v-model="alert" type="cyan">
                {{ this.formulario }}
            </v-alert>
            <br>
            <v-data-table :headers="headersitem" :items="gerenciaritem" sort-by="id" class="elevation-1" :search="search" mobile-breakpoint="0"
                hide-default-footer  :page.sync="page"  :items-per-page="itemsPerPage"  @page-count="pageCount = $event"
            >
                <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Itens da Entrada {{itensprojeto}}</v-toolbar-title>    
                    </v-toolbar>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="white">          
                        <v-spacer></v-spacer>  
                        <v-tooltip left color="cyan">
                        <template v-slot:activator="{ on, attrs  }">
                            <v-btn fab dark small class="smf-gradient"  color="red" v-on="on" v-bind="attrs">
                            <!-- opcao para carregar formulario modal e atulizar o GRID-->
                            <v-icon @click="pesquisa(search)">mdi-magnify</v-icon>
                            </v-btn>
                            <v-text-field v-model="search" append-icon="" label="Pesquisar" single-line hide-details></v-text-field>
                            <!--dados de busca -->
                        </template>
                        <span>Pesquisa Referência!</span>
                        </v-tooltip>
                    </v-toolbar>
                </template> 
                <template v-slot:item.situacao="{ item }">
                  <v-chip
                      :color="getColor(item.situacao)"
                      dark
                  >
                  {{ item.situacao }}
                  </v-chip>
                </template>
                <template v-slot:item.osnumero="{ item }">
                  <v-chip
                      :color="getColorOS(item.osnumero)"
                      dark
                  >
                  {{ item.osnumero }}
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                <v-tooltip left color="blue">
                    <template v-slot:activator="{ on, attrs }">
                        <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
                        <v-btn class="smf-gradient" fab dark small color="#4b636e" v-bind="attrs" v-on="on">
                            <!-- opcao para carregar formulario modal e atulizar o GRID-->
                            <v-icon  @click="imprimios(item)">
                                mdi-printer
                            </v-icon>
                        </v-btn>       
                    </template>
                <span>Visualizar / Imprimir OS!</span>
                </v-tooltip>
                </template>     
                <template v-slot:no-data>
                <v-btn id="btngerenciar" color="#00A4AC" @click="initialize()">Reset</v-btn>
                </template>
            </v-data-table>   
            <div class="text-center">
                <v-pagination color="cyan" v-model="page" :length="pagination.total"  circle></v-pagination>
            </div>          
        </v-card>
        <Impressao></Impressao>
    </div>
</template>
<script type="text/javascript">
// @ts-nocheck
import EventBus from '@/main.js'
export default {
    name: 'itens',
    components: {   
       Manutencao: () => import('@/views/Manutencao/Manutencao.vue'),
       Impressao:  () => import('@/views/Manutencao/Manutencaoimpressora.vue'),  
    },
    props: ['nrentrada', 'anoentrada'], 
    watch: {
      Gerenciar(val) {
          val || this.close()
      },
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    data() {
        return {
            search: '',
            AlertaAdd: false,
            editedIndex: -1,
            dialog: false,
            alert: false,
            dialog1: false,
            alert1: false,
            dialog2: false,
            alert2: false,
            dialog3: false,
            alert3: false,
            dialog4: false,
            alert4: false,
            isLoading: false,
            headersitem: [{
                    text: 'ID',
                    align: ' d-none', 
                    sortable: false,
                    value: 'ositem',
                    class: "cyan dark 1 white--text",  color: this.corForm 
                },
                { text: 'Dt Emissão', value: 'data', class: "cyan dark 1 white--text" },
                { text: 'Nº OS', value: 'osnumero', class: "cyan dark 1 white--text" },
                { text: 'Solicitante', value: 'solicitante', class: "cyan dark 1 white--text" },
                { text: 'Fornecedor', value: 'fornecedor', class: "cyan dark 1 white--text" },
                { text: 'Objeto', value: 'objeto', class: "cyan dark 1 white--text" },
                { text: 'Qauntidade', value: 'quant', class: "cyan dark 1 white--text" },
                //{ text: 'Garantia', value: 'garantia', class: "cyan dark 1 white--text" },
                { text: 'Aprovador', value: 'aprovador', class: "cyan dark 1 white--text" },
                { text: 'Dt Aprovação', value: 'dtaprovacao', class: "cyan dark 1 white--text" },
                { text: 'Inicio', value: 'dtinicio', class: "cyan dark 1 white--text" },
                { text: 'Conclusão', value: 'dtconclusao', class: "cyan dark 1 white--text" },
                { text: 'Situacao', value: 'situacao',  class: "cyan dark 1 white--text" },
                { text: 'os', value: 'os',   align: ' d-none',  class: "cyan dark 1 white--text" },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan dark 1 white--text" }
            ],
            lintaitens: [],   
            overlay: false,   
            nomeformulario: 'Data de aprovação da OS',
            nomeformularioconclusao: 'Data de conlusão da OS',
            formulario: 'Data de aprovação da OS',
            msgconfirmar: 'Item excluido com sucesso!',
            msgosbloqueada: 'OS ainda não está aprovada, verifique!',
            msgsucesso: 'OS aprovada com sucesso!',
            os: {
              id: 0,
              dtcadastro: 0,
              dtaprovacao: 0,
              dtaprovacaoRules: [ v => !!v || 'Data Aprovação é obrigatório!'], 
              dtconclusao: 0,
              dtconclusaooRules: [ v => !!v || 'Data Conclusão é obrigatório!'], 
            },
            gerenciaritem: [],
            aprovaos: [],
            btnaprovar: false,
            btnaprovarconclusao: false,
            conclusao: [],
            fullPage: true,
            pageCount: 0,
            itemsPerPage: 10,
            page: 1,
            pagination: {
              current: 1,
              current1: 1,
              total: 0,
              total1: 0
            }, 
        
        }
    },
    methods: {
        exibeitens() {
            const  urldadosmnutmovimento = process.env.VUE_APP_HOST + "manutencaomovimento/ap/" + 12
            this.overlay = true        
            this.axios.get(urldadosmnutmovimento)
            .then(response => {         
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {      
                 this.gerenciaritem = response.data 
                 this.generatepagination()
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
        generatepagination(){            
            this.pagination.total = Math.floor(this.gerenciaritem.length / 10) + 1 
        },
        getColor(situacao) {
            if (situacao == 'Pendente') return 'red'
            else if (situacao == 'Quitada') return 'primary'
            else if (situacao == 'Cancelada') return 'orange'
            else return 'green'           
        },  
        getColorOS(osnumero) {
            if (osnumero != '') return 'indigo'
        },
        fechar(){             
        },
        calculasoma(valor1, valor2){
          const total =  valor1 * valor2
          return total   
        },
        fechaFomulariomsg(){
          this.dialog = false
        },
        imprimios(item){
          this.os.id = item.os
          EventBus.$emit('carregamovimentoprint', this.os)
        },
        novo(){
            this.os.dtcadastro = ''
            this.os.dtaprovacao = ''
            this.os.dtconclusao = ''
        }   

    },
    mounted(){ // gerencia o receber de dados de outro componente
       this.exibeitens()
       this.novo()
    },   
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
    },
    created(){
       this.exibeitens()
       this.novo()
    }
}
</script>
<style scoped>
</style>