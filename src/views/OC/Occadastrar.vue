<template>
    <div>
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
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Setor Solicitante" v-model="oc.setor" :rules="oc.setorRules" name="setor" :value="oc.setor"  @input="textToUpper('setor')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="solicitante"
                                    item-text="solicitante" 
                                    item-value="id"
                                    label="Solicitante"
                                    dense
                                    outlined
                                    v-model="oc.solicitante"
                                    value = 'Selecione o Solicitante'
                                    clearable
                                ></v-select>
                            </v-flex>         
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Fonte pagadora" v-model="oc.fontepagadora" :rules="oc.fontepagadoraRules" name="fontepagadora"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Prazo" v-model="oc.prazo" :rules="oc.praxzoRules" name="prazo"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="aprovador"
                                    item-text="aprovador" 
                                    item-value="id"
                                    label="Aprovador da OS"
                                    dense
                                    outlined
                                    v-model="oc.aprovador"
                                    value = 'Selecione o Aprovador da OS'
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Obs" v-model="oc.obs" :rules="oc.obsRules" name="obs"  :value="oc.obs"  @input="textToUpper('obs')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="prioridade"
                                    item-text="" 
                                    item-value=""
                                    label="Prioridade da OC"
                                    dense
                                    outlined
                                    v-model="oc.prioridade"
                                    value = 'Selecione a Prioridade da OC'
                                    clearable
                                ></v-select>
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
            isLoading: false,
            fullPage:   true,  
            cadastrar: [],
            oc: {
              id: 0,
              setor: '',
              setorRules: [ v => !!v || 'Setor é obrigatório!'],
              solicitante: '',
              solicitanteRules: [ v => !!v || 'Solicitante é obrigatório!'],
              fontepagadora: '',
              fontepagadoraRules: [ v => !!v || 'Fonte Pagadora é obrigatório!'],
              prazo: '',
              praxzoRules: [ v => !!v || 'Prazo é obrigatório!'],
              aprovador: '',
              aprovadorRules: [ v => !!v || 'aprovador é obrigatório!'],
              obs: '',
              obsRules: [ v => !!v || 'aprovador é obrigatório!'],
              prioridade: '',
              prioridadeles: [ v => !!v || 'aproPrioridadevador é obrigatório!'],
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Cadastrar OC',
            solicitante: [],
            aprovador: [],
            prioridade: [ '1 - NORMAL',  '2 - ALTA',  '3 - URGÊNCIA'],
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertoc = process.env.VUE_APP_HOST  + "oc/add/" + key
            
            this.axios.post(urlinsertoc, this.oc)
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
        carregasolicitante(){  
            this.isLoading = true; 
            const  urlsolicitante = process.env.VUE_APP_HOST + "solicitante/search/" + '1'

            this.axios.get(urlsolicitante).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.solicitante = response.data 
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
        carregaaprovador(){  
            this.isLoading = true; 
            const  urlaprovador = process.env.VUE_APP_HOST + "aprovador/search/" + '1'

            this.axios.get(urlaprovador).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.aprovador = response.data 
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
            if(id == 'setor'){
                this.oc.setor = this.oc.setor.toUpperCase()
            }                
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.oc.setor = ''
            this.fontepagadora= ''
            this.prazo= ''
            this.obs= ''
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (oc) => {
            localStorage.visualiza = oc.visualiza
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
        this.novo()
    },
    created(){
        this.novo()
        this.carregasolicitante()
        this.carregaaprovador()
    }
}
</script>
<style scoped>
</style>