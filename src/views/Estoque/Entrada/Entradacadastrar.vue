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
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Nº OC" v-model="entrada.oc" name="documento" :value="entrada.oc" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Nº NF/Doc Fornecedor" v-model="entrada.documento" :rules="entrada.documentoRules" name="documento" :value="entrada.documento"  @input="textToUpper('documento')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Valor Documento" v-model="entrada.valortot" :rules="entrada.valortotRules" name="valortot" :value="entrada.valortot"  @input="textToUpper('valortot')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm6 md6>
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
            page: 0
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            this.entrada.valortot =  this.entrada.valortot.replace('.', '');
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
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (entrada) => {
            localStorage.visualiza = entrada.visualiza
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
    },
    created(){
        this.carregafornecedor()
    }
}
</script>
<style scoped>
</style>