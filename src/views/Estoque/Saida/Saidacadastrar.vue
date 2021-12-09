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
                                <v-text-field  label="Nº documento" v-model="saida.documento" name="documento" :value="saida.documento" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Valor Documento" v-model="saida.valor" :rules="saida.valorRules" name="valor" :value="saida.valor"  @input="textToUpper('valor')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Destino" v-model="saida.destino" :rules="saida.destinoRules" name="destino" :value="saida.destino"  @input="textToUpper('destino')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Observações" v-model="saida.obs" :rules="saida.obseRules" name="obs" :value="saida.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            saida: {
              id: 0,
              documento: '',
              documentoRules: [ v => !!v || 'Numero do documento é obrigatório!'], 
              valor: '',
              valortotRules: [ v => !!v || 'Valor NF é obrigatório!'], 
              destino: '',
              destinoRules: [ v => !!v || 'Destino é obrigatório!'], 
              situacao: '1',              
              obs: '',
              obseRules: [ v => !!v || 'Obs é obrigatório!'], 
              visualiza: false,
            },
            msgadd: 'Saida execultado com sucesso0',
            nomeFormulario: 'Saida Produto',
            tipooc: [ '1 - OC AUTOMATICA',  '2 - OC GERADA'],
            page: 0
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            this.saida.valor =  this.saida.valor.replace('.', '');
            this.saida.situacao = 2
            const  urlinsertsaida = process.env.VUE_APP_HOST  + "saida/add/" + key
            
            this.axios.post(urlinsertsaida, this.saida)
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
                this.saida.documento = this.saida.documento.toUpperCase()
            } else if(id == 'destino'){
                this.saida.destino = this.saida.destino.toUpperCase()
            } else if(id == 'obs'){
                this.saida.obs = this.saida.obs.toUpperCase()
            }                
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.saida.documento = ''
            this.saida.valor = ''
            this.saida.destino = ''
            this.saida.situacao = ''
            this.saida.obs = ''
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
        this.novo()
    },
    created(){
        this.carregafornecedor()
        this.novo()
    }
}
</script>
<style scoped>
</style>