<template>
    <div>
        <v-dialog  v-model="dialog" height="500px" max-width="900px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert" type="cyan">
                            Cadastro {{this.nomeFormulario}} da Entrada Nº {{this.entradaitem.entrada}} 
                        </v-alert>
                    </div>
                    <v-card-text>                     
                        <v-row>  
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="tipoproduto"
                                    item-text="tipoproduto" 
                                    item-value="id"
                                    label="Tipo Produto"
                                    dense
                                    outlined
                                    v-model="entradaitem.tipoproduto"
                                    value = 'Selecione o Tipo Produto para cadastrar'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Descrição do Produto" v-model="entradaitem.descricaoproduto"  @click="carregapesquisaproduto()" :rules="entradaitem.descricaoproduto" name="descricaoproduto" :value="entradaitem.descricaoproduto"  @input="textToUpper('descricaoproduto')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Unidade do Produto" v-model="entradaitem.descunidade" @click="carregapesquisaunidade()" :rules="entradaitem.qdeRules" name="qde" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Referencia do Produto" v-model="entradaitem.descreferencia" @click="carregapesquisareferencia()" :rules="entradaitem.referenciaRules" name="descreferencia" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                           <v-flex xs12 sm64 md4>
                                <v-text-field  label="Quantidade do Produto" v-model="entradaitem.qde" :rules="entradaitem.qdeRules"   name="qde" :value="entradaitem.qde"  @input="somentenumero('qde')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Valor Unitário" v-model="entradaitem.valorun" :rules="entradaitem.valorunRules"   name="valorun"  :value="entradaitem.valorun"  @input="somentenumero('valorun')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Valor Venda" v-model="entradaitem.valorvenda" :rules="entradaitem.valorvendatRules"  name="valorvenda"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Valor Total" v-model="entradaitem.valortot" :rules="entradaitem.valortotRules"  name="valortot"   :value="entradaitem.valortot"  @input="somentenumero('valortot')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Quantidade Minima" v-model="entradaitem.minimo" :rules="entradaitem.qdeminimaRules"  name="minimo"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Data Vencimento" v-model="entradaitem.dtvecimento" :rules="entradaitem.dtvecimentoRules" name="dtvecimento"  v-mask="'##/##/####'" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Observação" v-model="entradaitem.obs" :rules="entradaitem.obstRules" name="obs" :value="entradaitem.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>                            
                        </v-row>
                    </v-card-text>
                    <div class="text-center"> 
                        <v-btn
                            width="200"
                            height="45"
                            rounded
                            large
                            color="red"
                            class="smf-gradient"
                            dark
                            @click.prevent="fechaFomulario()"
                        >
                        <v-icon dark>mdi-cancel</v-icon>
                        Cancelar
                        </v-btn>
                        <v-btn
                            width="200"
                            height="45"
                            rounded
                            large
                            color="cyan"
                            class="smf-gradient"
                            dark
                            @click.prevent="insert()"
                        >
                        <v-icon dark>mdi-content-save-settings-outline</v-icon>
                        Salvar
                        </v-btn>
                        <v-divider></v-divider>
                    </div>   
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog1" max-width="500px" persistent :retain-focus="false">
        <v-card>
            <v-card-text> 
                <div class="text-center">  
                    <v-alert v-model="alert1" type="success">
                        {{ this.msgadd }}
                    </v-alert>
                </div>
                <div class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsg()" >
                        <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
                        Fechar
                    </v-btn>    
                </div>
            </v-card-text>
        </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog3" height="500" max-width="700px" persistent :retain-focus="false">
            <v-card height="600" depressed>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert3" type="cyan">
                           Selecione a Descrição do Produto! 
                        </v-alert>
                    </div>
                    <v-data-table 
                        dense  
                        :headers="headersproduto" 
                        :items="produto"  
                        class="elevation-1" 
                        mobile-breakpoint="0"
                        hide-default-footer
                        :page.sync="page"     
                        :search="search"                 
                    >    
                        <template v-slot:top>
                            <v-toolbar flat color="white">          
                                <v-spacer></v-spacer>  
                                <v-tooltip left color="cyan">
                                <template v-slot:activator="{ on, attrs  }">
                                    <v-btn fab dark small class="smf-gradient"  color="red" v-on="on" v-bind="attrs">
                                    <!-- opcao para carregar formulario modal e atulizar o GRID-->
                                    <v-icon @click="pesquisa(search, 1)">mdi-plus-thick</v-icon>
                                    </v-btn>
                                    <v-text-field v-model="search" append-icon="" label="Pesquisar" single-line hide-details></v-text-field>
                                    <!--dados de busca -->
                                </template>
                                <span>Pesquisa {{nomeformulario}}!</span>
                                </v-tooltip>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-tooltip left :color="corForm">
                                <template v-slot:activator="{ on, attrs }">
                                    <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
                                    <v-btn class="smf-gradient" fab dark small color="cyan" v-bind="attrs" v-on="on">
                                        <!-- opcao para carregar formulario modal e atulizar o GRID-->
                                        <v-icon  @click="pegaitemproduto(item)" small>
                                           mdi-arrow-collapse-down
                                        </v-icon>
                                    </v-btn>  
                                </template>
                                <span class="custom-loader">
                                'Linha da Descrição do Produto selecionado!'
                                </span>
                            </v-tooltip>
                        </template>
                    </v-data-table>
                    <div class="text-center">
                        <v-spacer></v-spacer>
                        <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fecharform()" >
                            <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
                            Fechar
                        </v-btn>    
                    </div>   
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog4" height="500" max-width="700px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert4" type="cyan">
                           Selecione o TIPO de UNIDADE! 
                        </v-alert>
                    </div>
                    <v-data-table 
                        dense  
                        :headers="headersunidade" 
                        :items="unidade"  
                        class="elevation-1" 
                        mobile-breakpoint="0"
                        hide-default-footer
                        :page.sync="page"  
                        :search="search"                                              
                    >    
                        <template v-slot:top>
                            <v-toolbar flat color="white">          
                                <v-spacer></v-spacer>  
                                <v-tooltip left color="cyan">
                                <template v-slot:activator="{ on, attrs  }">
                                    <v-btn fab dark small class="smf-gradient"  color="red" v-on="on" v-bind="attrs">
                                    <!-- opcao para carregar formulario modal e atulizar o GRID-->
                                    <v-icon @click="pesquisa(search)">mdi-plus-thick</v-icon>
                                    </v-btn>
                                    <v-text-field v-model="search" append-icon="" label="Pesquisar" single-line hide-details></v-text-field>
                                    <!--dados de busca -->
                                </template>
                                <span>Pesquisa Unidade!</span>
                                </v-tooltip>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-tooltip left color="cyan">
                                <template v-slot:activator="{ on, attrs }">
                                    <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
                                    <v-btn class="smf-gradient" fab dark small color="blue" v-bind="attrs" v-on="on">
                                        <!-- opcao para carregar formulario modal e atulizar o GRID-->
                                        <v-icon  @click="pegaitemunidade(item)"  small>
                                           mdi-arrow-collapse-down
                                        </v-icon>
                                    </v-btn>  
                                </template>
                                <span class="custom-loader">
                                'Linha da Unidade selecionado!'
                                </span>
                            </v-tooltip>
                        </template>
                    </v-data-table>  
                 </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog5" height="500" max-width="700px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert5" type="cyan">
                           Selecione a referencia! 
                        </v-alert>
                    </div>
                    <v-data-table 
                        dense  
                        :headers="headersreferencia" 
                        :items="referencia"  
                        class="elevation-1" 
                        mobile-breakpoint="0"
                        hide-default-footer
                        :page.sync="page"     
                        :search="search"                     
                    >    
                        <template v-slot:top>
                            <v-toolbar flat color="white">          
                                <v-spacer></v-spacer>  
                                <v-tooltip left color="cyan">
                                <template v-slot:activator="{ on, attrs  }">
                                    <v-btn fab dark small class="smf-gradient"  color="red" v-on="on" v-bind="attrs">
                                    <!-- opcao para carregar formulario modal e atulizar o GRID-->
                                    <v-icon @click="pesquisa(search)">mdi-plus-thick</v-icon>
                                    </v-btn>
                                    <v-text-field v-model="search" append-icon="" label="Pesquisar" single-line hide-details></v-text-field>
                                    <!--dados de busca -->
                                </template>
                                <span>Pesquisa Referência!</span>
                                </v-tooltip>
                            </v-toolbar>
                        </template>                    
                        <template v-slot:item.actions="{ item }">
                            <v-tooltip left :color="corForm">
                                <template v-slot:activator="{ on, attrs }">
                                    <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
                                    <v-btn class="smf-gradient" fab dark small color="blue" v-bind="attrs" v-on="on">
                                        <!-- opcao para carregar formulario modal e atulizar o GRID-->
                                        <v-icon  @click="pegaitemreferencia(item)" small>
                                           mdi-arrow-collapse-down
                                        </v-icon>
                                    </v-btn>  
                                </template>
                                <span class="custom-loader">
                                'Linha da Referencia selecionado!'
                                </span>
                            </v-tooltip>
                        </template>
                    </v-data-table>   
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog  v-model="dialog6" max-width="500px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert6" type="success">
                            {{ this.msgconfirmar }}
                        </v-alert>
                    </div>
                    <div class="text-center">
                        <v-spacer></v-spacer>
                        <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fechaFomulariomsg()" >
                            <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
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
import EventBus from '@/main.js'
export default {
    name: 'Cadastrar',
    components: {        
    },
    data() {
        return {
            search: '',
            AlertaAdd: false,
            editedIndex: -1,
            dialog: false,
            alert: false,
            dialog1: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            alert1: false,
            alert3: false,
            alert4: false,
            alert5: false,
            isLoading: false,
            fullPage:   true,  
            page: 0,
            cadastrar: [],
            entradaitem: {
              id: 0,
              entrada: '',
              tipoproduto: '',
              tipoprodutoRules: [ v => !!v || 'Tipo de Produto é obrigatório!'],   
              produto: '',
              produtoRules: [ v => !!v || 'Produto é obrigatório!'],   
              descricaoproduto: '',
              dsescricaoprodutoRules: [ v => !!v || 'Produto é obrigatório!'],     
              qde: '',
              qdeRules: [ v => !!v || 'Quantidade é obrigatório!'],    
              un: '',
              unRules: [ v => !!v || 'Unidade é obrigatório!'],    
              valorun: '',
              valorunRules: [ v => !!v || 'Valor Unitário é obrigatório!'],        
              valortot: '',
              valortotRules: [ v => !!v || 'Valor Total é obrigatório!'],  
              valorvenda: '',
              valorvendatRules: [ v => !!v || 'Valor Venda é obrigatório!'],  
              minimo: '0',
              qdeminimaRules: [ v => !!v || 'Quantidade minima é obrigatório!'],  
              dtvecimento: '',
              dtvecimentoRules: [ v => !!v || 'Data vencimento é obrigatório!'], 
              obs: 'NC',
              obstRules: [ v => !!v || 'Observação é obrigatório!'],  
              unidade: '',
              descunidade: '',
              descunidadeRules: [ v => !!v || 'Unidade é obrigatório!'], 
              referencia: '',
              descreferencia: '',   
              referenciaRules: [ v => !!v || 'Referência é obrigatório!'],                 
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Entrada de Itens',
            tipoproduto: [],
            produto: [],
            headersproduto: [    
                { text: 'ID', value: 'id', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Produto', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'produto' },
                //{ text: 'Un', align: 'center', divider: true,  class: "teal darken white--text",  value: 'un' },
                //{ text: 'Ref', align: 'center', divider: true,  class: "teal darken white--text",  value: 'ref' },
                { text: 'Detalhes', align: 'center', value: 'actions', sortable: false, class: "cyan darken white--text" }
            ],
            unidade: [],
            headersunidade: [    
                { text: 'ID', value: 'id', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Unidade', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'unidade' },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan darken white--text" }
            ],
            referencia: [],   
            headersreferencia: [    
                { text: 'ID', value: 'id', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Referencia', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'referencia' },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan darken white--text" }
            ], 
            nomeformulario: 'Descrição de Produto'            
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertentradaitem = process.env.VUE_APP_HOST  + "entradaitem/add/" + key
            
            this.axios.post(urlinsertentradaitem, this.entradaitem)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.cadastrar = response.data   
                 console.log(response.data )
                 this.isLoading = false
                 this.msgsucesso()
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              alert(error);
            })
            this.fechaFomulario()
        },
        carregaTipoProduto(){  
            this.isLoading = true; 
            const  urlforncedor = process.env.VUE_APP_HOST + "tipoproduto/search/" + '1'

            this.axios.get(urlforncedor).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.tipoproduto = response.data 
                    this.isLoading = false; 

                } else {// caso o response retrone algum erro ao tentar salvar os dados 
                    this.alert = true
                    this.menssagemform = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'            
                    this.mostraMenssagem(); // fecha o formulario de dados detalhado
                }
                this.isLoading = false;  
            }).catch((error) => {
                this.isLoading = false;
                this.erro = error.message;
            });        
        },
        carregaProduto(){  
            this.isLoading = true; 
            const  urlfproduto = process.env.VUE_APP_HOST + "produto/view/" + '1'

            this.axios.get(urlfproduto).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.produto = response.data 
                    this.isLoading = false; 

                } else {// caso o response retrone algum erro ao tentar salvar os dados 
                    this.alert = true
                    this.menssagemform = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'            
                    this.mostraMenssagem(); // fecha o formulario de dados detalhado
                }
                this.isLoading = false;  
            }).catch((error) => {
                this.isLoading = false;
                this.erro = error.message;
            });        
        },
        carregaUnudade(){  
            this.isLoading = true; 
            const  urlunidade= process.env.VUE_APP_HOST + "unidade/search/" + '1'

            this.axios.get(urlunidade).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.unidade = response.data 
                    this.isLoading = false; 

                } else {// caso o response retrone algum erro ao tentar salvar os dados 
                    this.alert = true
                    this.menssagemform = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'            
                    this.mostraMenssagem(); // fecha o formulario de dados detalhado
                }
                this.isLoading = false;  
            }).catch((error) => {
                this.isLoading = false;
                this.erro = error.message;
            });        
        },
        carregaReferencia(){  
            this.isLoading = true; 
            const  urlreferencia = process.env.VUE_APP_HOST + "referencia/search/" + '1'

            this.axios.get(urlreferencia).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.referencia = response.data 
                    this.isLoading = false; 

                } else {// caso o response retrone algum erro ao tentar salvar os dados 
                    this.alert = true
                    this.menssagemform = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'            
                    this.mostraMenssagem(); // fecha o formulario de dados detalhado
                }
                this.isLoading = false;  
            }).catch((error) => {
                this.isLoading = false;
                this.erro = error.message;
            });        
        },
        fechaFomulario(){
            this.dialog = false
            this.alert = false
        },
        msgsucesso(){
            this.dialog1 = true
            this.alert1 = true
        },
        textToUpper(id) {
            if(id == 'fabricante'){
                this.entradaitem.obs = this.entradaitem.obs.toUpperCase()
            }                
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        carregapesquisaproduto(){           
            this.dialog3 = true
            this.alert3  = true
        },
        pegaitemproduto(item){
            this.entradaitem.produto = item.id
            this.entradaitem.descricaoproduto = item.produto  
            this.alert3  = false 
            this.dialog3 = false               
        },
        carregapesquisaunidade(){           
            this.dialog4 = true
            this.alert4  = true
        },
        pegaitemunidade(item){     
            this.entradaitem.unidade = item.id
            this.entradaitem.descunidade = item.unidade  
            this.alert4  = false 
            this.dialog4 = false               
        },
        carregapesquisareferencia(){           
            this.dialog5 = true
            this.alert5  = true
        },
        pegaitemreferencia(item){     
            this.entradaitem.referencia = item.id
            this.entradaitem.descreferencia = item.referencia  
            this.alert5 = false 
            this.dialog5 = false               
        },
        fechar(){             
        },
        somentenumero(campo){
            if (campo == 'qde'){
                
                this.entradaitem.qde = this.entradaitem.qde.replace(",", ".")
            } else if (campo == 'valorun'){
                this.entradaitem.valorun =  this.entradaitem.valorun.replace(",", ".") 
                this.entradaitem.valortot =  this.calculasoma(this.entradaitem.qde, this.entradaitem.valorun )
            } else if (campo == 'valortot'){
                this.entradaitem.valortot = this.entradaitem.valortot.replace(",", ".") 
            }
        },
        calculasoma(valor1, valor2){
          const total =  valor1 * valor2
          return total   
        },
        novo(){
            this.entradaitem.entrada = ''
            this.entradaitem.tipoproduto = ''
            this.entradaitem.produto = ''
            this.entradaitem.descricaoproduto = ''
            this.entradaitem.qde = ''
            this.entradaitem.un = ''
            this.entradaitem.valorun = ''
            this.entradaitem.valortot = ''
            this.entradaitem.valorvenda = ''
            this.entradaitem.minimo = ''
            this.entradaitem.dtvecimento = ''
            this.entradaitem.obs = ''
            this.entradaitem.unidade = ''
            this.entradaitem.descunidade = ''
            this.entradaitem.referencia = ''
            this.entradaitem.descreferencia = ''
        },
        fecharform(){
            this.dialog3 = false
            this.alert3 = false
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaitem', (entrada) => {
            localStorage.visualiza = entrada.visualiza
            localStorage.entrada = entrada.id
            this.entradaitem.entrada = localStorage.entrada
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
        this.carregaTipoProduto()
        this.carregaProduto()
        this.novo()
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaitem')
        });
    },
    created(){
        this.carregaTipoProduto()
        this.carregaProduto()
        this.carregaUnudade()
        this.carregaReferencia()
        this.novo()
    }
}
</script>
<style scoped>
</style>