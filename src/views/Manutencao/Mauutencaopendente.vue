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
                    <v-btn class="smf-gradient" fab dark small color="#78002e" v-bind="attrs" v-on="on">
                        <!-- opcao para carregar formulario modal e atulizar o GRID-->
                        <v-icon  @click="carregaaprovacao(item)">
                           mdi-check-all
                        </v-icon>
                    </v-btn>    
                    <v-btn class="smf-gradient" fab dark small color="#005005" v-bind="attrs" v-on="on">
                        <!-- opcao para carregar formulario modal e atulizar o GRID-->
                        <v-icon  @click="carregaconclusao(item)">
                           mdi-update
                        </v-icon>
                    </v-btn>         
                    </template>
                <span>Aprovar / Concluir OS!</span>
                </v-tooltip>
                </template>     
                <template v-slot:no-data>
                <v-btn id="btngerenciar" color="#00A4AC" @click="initialize()">Reset</v-btn>
                </template>
            </v-data-table>            
        </v-card>
        <v-dialog  v-model="dialog" max-width="500px" persistent :retain-focus="false">
          <v-card>
              <v-card-text> 
                  <div class="text-center">  
                      <v-alert v-model="alert" type="success">
                          {{ this.nomeformulario }}
                      </v-alert>
                  </div>
                  <v-card-text> 
                      <v-flex xs12 sm612 md12>
                        <label>Informe Data Aprovação da OS: </label>
                        <input v-model="os.dtaprovacao" :rules="os.dtaprovacaooRules"  @change="habilitaaprovar()" type="date" id="birthday" name="dtaprovacao">
                      </v-flex>    
                  </v-card-text>             
                  <div class="text-center">                  
                    <v-spacer></v-spacer>
                    <v-btn v-show="this.btnaprovar" width="160" rounded  color="red"  class="smf-gradient" dark @click="aprovaros()" >
                        <v-icon>
                           mdi-check
                        </v-icon>
                        Aprovar OS
                    </v-btn>  
                    <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulario()" >
                        <v-icon>
                           mdi-close
                        </v-icon>
                        Fechar
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
                          {{ this.msgosbloqueada }}
                      </v-alert>
                  </div>                
                  <div class="text-center">                  
                       <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsgconclusao()" >
                        <v-icon>
                           mdi-close
                        </v-icon>
                        Fechar
                    </v-btn>    
                  </div>
              </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog2" max-width="500px" persistent :retain-focus="false">
          <v-card>
              <v-card-text> 
                  <div class="text-center">  
                      <v-alert v-model="alert2" type="success">
                          {{ this.nomeformularioconclusao }}
                      </v-alert>
                  </div>
                  <v-card-text> 
                      <v-flex xs12 sm612 md12>
                        <label>Informe Data Concluão da OS: </label>
                        <input v-model="os.dtconclusao" :rules="os.dtconclusaooRules"  @change="habilitarconclusao()" type="date" id="birthday" name="dtaprovação">
                      </v-flex>    
                  </v-card-text>             
                  <div class="text-center">                  
                    <v-spacer></v-spacer>
                    <v-btn v-show="this.btnaprovarconclusao" width="160" rounded  color="red"  class="smf-gradient" dark @click="conclusaoos()" >
                        <v-icon>
                           mdi-check
                        </v-icon>
                        Fechar OS
                    </v-btn>  
                    <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomularioconclusao()" >
                        <v-icon>
                           mdi-close
                        </v-icon>
                        Fechar
                    </v-btn>    
                  </div>
              </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog3" max-width="500px" persistent :retain-focus="false">
          <v-card>
              <v-card-text> 
                  <div class="text-center">  
                      <v-alert v-model="alert3" type="success">
                          {{ this.msgsucesso }}
                      </v-alert>
                  </div>                
                  <div class="text-center">                  
                       <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsgsucesso()" >
                        <v-icon>
                           mdi-close
                        </v-icon>
                        Fechar
                    </v-btn>    
                  </div>
              </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog4" max-width="500px" persistent :retain-focus="false">
          <v-card>
              <v-card-text> 
                  <div class="text-center">  
                      <v-alert v-model="alert4" type="success">
                          {{ this.msgsucesso }}
                      </v-alert>
                  </div>                
                  <div class="text-center">                  
                       <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsgsconclusao()" >
                        <v-icon>
                           mdi-close
                        </v-icon>
                        Fechar
                    </v-btn>    
                  </div>
              </v-card-text>
          </v-card>
        </v-dialog>
    </div>
</template>
<script type="text/javascript">
// @ts-nocheck
//import EventBus from '@/main.js'
export default {
    name: 'itens',
    components: {   
       Manutencao: () => import('@/views/Manutencao/Manutencao.vue'),
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
            fullPage:   true,  
            pageCount: 0,
            itemsPerPage: 10,
            page: 0,
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
            conclusao: []
        
        }
    },
    methods: {
        exibeitens() {
            const  urldadosmnutpendente = process.env.VUE_APP_HOST + "manutpendente/search/" + 12
            this.overlay = true        
            this.axios.get(urldadosmnutpendente)
            .then(response => {         
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {            
                 this.overlay = false; 
                 this.gerenciaritem = response.data 
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
        fechar(){             
        },
        calculasoma(valor1, valor2){
          const total =  valor1 * valor2
          return total   
        },
        fechaFomulariomsg(){
          this.dialog = false
        },
        aprovaros() {
            const  key = 'id90'
            const  urldaprovaros = process.env.VUE_APP_HOST + "osaprovacao/ap/" + key
            this.overlay = true
            this.axios.post(urldaprovaros, this.os)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.aprovaos = response.data                       
                 this.habilitamsgsucesso()  
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
        conclusaoos(){
            const  key = 'id90'
            const  urldaprovaros = process.env.VUE_APP_HOST + "osconclusao/ap/" + key
            this.overlay = true
            this.axios.post(urldaprovaros, this.os)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.conclusao = response.data   
                 this.overlay = false   
                 this.habilitamsgsucessoconclusao()    
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
        confirmaexclusao(){       
          this.dialog1 = true
          this.alert1  = true
        },
        fecharexcluir(){
          this.dialog1 = false
          this.alert1  = false
          this.dialog  = false
          this.alert   = false
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
        carregaaprovacao(item){
          this.os.id = item.os
          this.os.dtcadastro = item.data
          this.btnaprovar = false  
          console.log(this.os.dtcadastro)
          this.dialog = true
          this.alert = true
        }, 
        carregaconclusao(item){
          this.os.id = item.os
          this.os.dtcadastro = item.data
          if(item.dtaprovacao == null){
            this.dialog1 = true
            this.alert1 = true
          } else if (item.dtaprovacao != null){
            this.dialog2 = true
            this.alert2 = true
          }
        }, 
        habilitaaprovar(){// verifica se a data do cadstro e menor que a data de aprovação
            this.nomeformulario = 'Data de aprovação da OS - Ok'
            this.btnaprovar = true    
        },
        habilitarconclusao(){// verifica se a data do cadstro e menor que a data de aprovação
            this.nomeformularioconclusao = 'Data de conlusão da OS - Ok'
            this.btnaprovarconclusao = true    
        },
        habilitamsgsucesso(){
          this.dialog = false
          this.alert = false
          this.dialog3 = true
          this.alert3 = true
        },
        habilitamsgsucessoconclusao(){
          this.dialog2 = false
          this.alert2 = false
          this.dialog4 = true
          this.alert4 = true
          this.msgsucesso = 'OS fechada e Conluída com sucesso!'
        },
        fechaFomulario(){
          this.dialog = false
          this.alert = false
        },
        fechaFomularioconclusao(){
          this.dialog2 = false
          this.alert2 = false
        },
        fechaFomulariomsgsucesso(){
          this.dialog3 = false
          this.alert3 = false
          this.exibeitens()
        },   
        fechaFomulariomsgsconclusao(){
          this.dialog4 = false
          this.alert4 = false
          this.exibeitens()
        },    
    },
    mounted(){ // gerencia o receber de dados de outro componente
       this.exibeitens()
    },   
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
    },
    created(){
       this.exibeitens()
    }
}
</script>
<style scoped>
</style>