<template>
    <div>
        <v-dialog  v-model="dialog" height="500px" max-width="900px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert" type="cyan">
                            {{this.nomeFormulario}}
                        </v-alert>
                    </div>
                    <v-card-text>                     
                        <v-row>  
                               <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipoos"
                                    item-text="tipoos" 
                                    item-value="id"
                                    label="Tipo de OS"
                                    dense
                                    outlined
                                    v-model="tipoosid"
                                    value = 'Selecione o Tipo OS'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="solicitante"
                                    item-text="solicitante" 
                                    item-value="id"
                                    label="Solicitante"
                                    dense
                                    outlined
                                    v-model="solicitanteid"
                                    value = 'Selecione o Solicitante'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="fornecedor"
                                    item-text="fornecedor" 
                                    item-value="id"
                                    label="Fornecedor"
                                    dense
                                    outlined
                                    v-model="fornecedorid"
                                    value = 'Selecione o Fornecedor'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="local"
                                    item-text="localservico" 
                                    item-value="id"
                                    label="Local de Execução da OS"
                                    dense
                                    outlined
                                    v-model="localid"
                                    value = 'Selecione o Local de Execução da OS'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="aprovador"
                                    item-text="aprovador" 
                                    item-value="id"
                                    label="Aprovador da OS"
                                    dense
                                    outlined
                                    v-model="aprovadorid"
                                    value = 'Selecione o Aprovador da OS'
                                    clearable
                                ></v-select>
                            </v-flex>     
                            <v-flex xs12 sm12 md12>
                                <v-text-field  label="OBS" v-model="os.obs" name="obs" :rules="os.obsRules" :value="os.obs" @input="textToUpper('obs')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="situacao"
                                    item-text="" 
                                    item-value=""
                                    label="Situação"
                                    dense
                                    outlined
                                    v-model="situacao"
                                    value = 'Selecione a Situação caso seja necessário!'
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
                            @click.prevent="update()"
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
    name: 'Alterar',
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
            os: {
              id: 0,
              solicitante: '',
              solicitanteRules: [ v => !!v || 'Solicitante é obrigatório!'], 
              tipoos: '',
              tipoosRules: [ v => !!v || 'Tipo OS é obrigatório!'], 
              fornecedor: '',
              fornecedoreRules: [ v => !!v || 'Fornecedor é obrigatório!'], 
              local: '',
              localRules: [ v => !!v || 'Fornecedor é obrigatório!'], 
              aprovador: '',
              aprovadorRules: [ v => !!v || 'Aprovador é obrigatório!'], 
              obs: '',
              obsRules: [ v => !!v || 'Obs é obrigatório!'], 
              situacao: '',          
              oc: 0,      
              octipo: '', 
              ocano: 2021,
              visualiza: false,
            },
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Entrada',
            situacao: [ '3 - Quitada',  '4 - Pendente', '5 - Cancelada'],
            tipoos: [],
            solicitante: [],
            fornecedor: [],
            local: [],
            aprovador: [],
            page: 0,
            fornecedorid: 0,
            localid: 0,
            solicitanteid: 0,
            aprovadorid: 0,
            tipoosid: 0
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdatos = process.env.VUE_APP_HOST  + "os/alt/" + key
            if(this.situacao != ''){
               this.os.situacao = this.situacao  
            } else if(this.solicitanteid != ''){
                this.os.solicitante = this.solicitanteid
            }  else if(this.fornecedorid != ''){
                this.os.fornecedor = this.fornecedorid
            }             
            this.axios.post(urlupdatos, this.os)
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
        carregatipoos(){  
            this.isLoading = true; 
            const  urltipoos = process.env.VUE_APP_HOST + "tipoos/search/" + '1'

            this.axios.get(urltipoos).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.tipoos = response.data 
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
        carregalocalexecução(){  
            this.isLoading = true; 
            const  urllocal= process.env.VUE_APP_HOST + "localexecucao/search/" + '1'

            this.axios.get(urllocal).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.local = response.data 
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
        carregasituacao(){
            this.situacao = [ '3 - Quitada',  '4 - Pendente', '5 - Cancelada']
        },
        pegavalorid(){
            this.entrada.fornecedor = this.fornecedor
            alert(this.entrada.fornecedor)
        },
        textToUpper(id) {
            if(id == 'fabricante'){
                this.os.obs = this.fabricante.fabricante.toUpperCase()
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
        EventBus.$on('carregaalteracao', (os) => {
            localStorage.id = os.id
            localStorage.fornecdorid = os.fornecdorid
            localStorage.solicitanteid = os.solicitanteid
            localStorage.aprovadorid = os.aprovadorid
            localStorage.solicitante = os.solicitante
            localStorage.fornecedor = os.fornecedor
            localStorage.obs = os.obs

            this.os.id = localStorage.id
            this.os.solicitante = localStorage.solicitanteid
            this.os.fornecedor = localStorage.fornecdorid
            this.os.fornecdorid = localStorage.fornecedorid
            this.os.solicitanteid = localStorage.solicitanteid
            this.os.aprovadorid = localStorage.aprovadorid
            this.os.aprovador = localStorage.aprovadorid
            this.os.obs = localStorage.obs
    
            this.carregatipoos()
            this.carregasolicitante()
            this.carregafornecedor()
            this.carregalocalexecução()
            this.carregaaprovador()
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
            
        })
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaalteracao')
        });
    },
    created(){
        this.carregatipoos()
        this.carregasolicitante()
        this.carregafornecedor()
        this.carregalocalexecução()
        this.carregaaprovador()
  
    }
}
</script>
<style scoped>
</style>