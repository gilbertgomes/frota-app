<template>
    <div>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate  size="64" button color="red" :width="9">
        </v-progress-circular>
       </v-overlay>
        <v-dialog  v-model="dialog" height="500px" max-width="900px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert" type="cyan">
                            Cadastro {{this.nomeFormulario}}
                        </v-alert>
                    </div>
                    <v-card-text>                     
                        <v-row>  
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="fornecedor"
                                    item-text="fornecedor" 
                                    item-value="id"
                                    label="Fornecedor"
                                    dense
                                    outlined
                                    v-model="entrada.fornecedor"
                                    value = 'Selecione o Fornecedor'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipooc"
                                    item-text="" 
                                    item-value=""
                                    label="Tipo de OC"
                                    dense
                                    outlined
                                    v-model="entrada.octipo"
                                    value = 'Selecione o tipo de OC'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm10 md10>
                                <v-text-field  label="Nº OC" v-model="entrada.oc" name="documento" :value="entrada.oc" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs6 sm1 md1>
                                <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    color="primary"
                                    @click="localizaoc()"
                                >
                                    <v-icon dark>
                                        mdi-magnify
                                    </v-icon>
                                </v-btn>                            
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Nº NF/Doc Fornecedor" v-model="entrada.documento" :rules="entrada.documentoRules" name="documento" :value="entrada.documento"  @input="textToUpper('documento')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Valor Documento" v-model="entrada.valortot" :rules="entrada.valortotRules" name="valortot" :value="entrada.valortot"  @input="textToUpper('valortot')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm12 md12>
                                <v-text-field  label="Observações" v-model="entrada.obs" :rules="entrada.obseRules" name="obs" :value="entrada.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
        <v-dialog  v-model="dialog2" height="600" max-width="700px" persistent :retain-focus="false">
            <v-card height="300" depressed>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert2" type="cyan">
                            Selecione a OC de suporte a ENTRADA NFe
                        </v-alert>
                    </div>
                    <v-data-table 
                        dense  
                        :headers="headersoc" 
                        :items="oc"  
                        class="elevation-1" 
                        mobile-breakpoint="0"
                        hide-default-footer
                        :page.sync="page"                        
                    >    
                        <template v-slot:item.actions="{ item }">
                            <v-tooltip left :color="corForm">
                                <template v-slot:activator="{ on, attrs }">
                                    <!--opção de chamar o formulario de detalhe dos dados da linha selecionada -->
                                    <v-btn class="smf-gradient" fab dark small color="blue" v-bind="attrs" v-on="on">
                                        <!-- opcao para carregar formulario modal e atulizar o GRID-->
                                        <v-icon  @click="pegaoc(item)" small>
                                            mdi-arrow-collapse-down
                                        </v-icon>
                                    </v-btn>  
                                </template>
                                <span class="custom-loader">
                                'Linha da OC selecionado!'
                                </span>
                            </v-tooltip>
                        </template>
                    </v-data-table>   
                </v-card-text>
                <div class="text-center">
                    <v-spacer></v-spacer>
                    <v-btn width="160" rounded  color="cyan"  class="smf-gradient" dark @click="fecharform()" >
                        <v-icon dark><mdi-check-lie></mdi-check-lie></v-icon>
                        Fechar
                    </v-btn>    
                </div>
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
            alert1: false,
            dialog2: false,
            alert2: false,
            isLoading: false,
            fullPage:   true,  
            cadastrar: [],
            entrada: {
              id: 0,
              documento: '',
              documentoRules: [ v => !!v || 'Numero do documento é obrigatório!'], 
              valortot: '',
              valortotRules: [ v => !!v || 'Valor NF é obrigatório!'], 
              fornecedor: '',
              fornecedoreRules: [ v => !!v || 'Fornecedor é obrigatório!'], 
              situacao: '',              
              obs: '',
              obseRules: [ v => !!v || 'Obs é obrigatório!'],    
              oc: 0,      
              octipo: '', 
              ocano: 2021,
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Entrada Produto',
            tipooc: [ '1 - OC AUTOMATICA',  '2 - OC GERADA'],
            page: 0,
            oc: [],
            headersoc: [    
                { text: 'ID', value: 'id', align: ' d-none', class: "cyan dark 1 white--text" },       
                { text: 'Data', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'data' },
                { text: 'Nº OC', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'numerooc' },
                { text: 'Solicitante', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'solicitante' },
                { text: 'Setor', align: 'center', divider: true,  class: "cyan darken white--text",  value: 'setor' },
                { text: 'Ação', align: 'center', value: 'actions', sortable: false, class: "cyan darken white--text" }
            ], 
            overlay: false,  
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            this.entrada.valortot =  this.entrada.valortot.replace('.', '');
            this.entrada.ocano = '2021'
            const  urlinsertentrada = process.env.VUE_APP_HOST  + "entrada/add/" + key
            
            this.axios.post(urlinsertentrada, this.entrada)
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
                 this.novo()
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
        carregafornecedor(){  
            this.isLoading = true; 
            const  urlforncedor = process.env.VUE_APP_HOST + "fornecedor/search/" + '1'

            this.axios.get(urlforncedor).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.fornecedor = response.data 
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
        localizaoc(){  
            const  urloc = process.env.VUE_APP_HOST + "oc/search/" + '1'
          
            this.axios.get(urloc).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.oc = response.data   
                    this.dialog2 = true
                    this.alert2  = true
                } else {// caso o response retrone algum erro ao tentar salvar os dados 
                    this.menssagemform = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'            
                    this.mostraMenssagem(); // fecha o formulario de dados detalhado
                    this.overlay = false;
                }
                this.isLoading = false;  
            }).catch((error) => {
                this.erro = error.message;
            });        
        },
        pegaoc(id){
            this.entrada.oc = id.numerooc
            this.dialog2 = false
            this.alert2 = false      
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
            if(id == 'documento'){
                this.entrada.documento = this.entrada.documento.toUpperCase()
            } else if(id == 'obs'){
                this.entrada.obs = this.entrada.obs.toUpperCase()
            }              
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.entrada.documento = ''
            this.entrada.valortot = ''
            this.entrada.fornecedor = ''
            this.entrada.situacao = ''
            this.entrada.obs = ''
            this.entrada.oc = ''
            this.entrada.octipo = ''
            this.entrada.ocano = ''
        },
        fecharform(){
            this.dialog2 = false
            this.alert2  = false
        }
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (entrada) => {
            localStorage.visualiza = entrada.visualiza
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
        this.novo()
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
    },
    created(){
        this.carregafornecedor()
        this.novo()
    }
}
</script>
<style scoped>
</style>