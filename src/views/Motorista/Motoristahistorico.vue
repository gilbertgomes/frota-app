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
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Descrição da Situação" v-model="motoristahistorico.descritivosituacao"  :rules="motoristahistorico.descritivosituacaoRules" name="descritivosituacao" :value="motoristahistorico.descritivosituacao"  @input="textToUpper('descritivosituacao')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Obs sobre a situação descrita" v-model="motoristahistorico.obs" :rules="motoristahistorico.obsRules" name="obs" :value="motoristahistorico.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
        <v-dialog  v-model="dialog2" max-width="500px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert2" type="success">
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
            dialog2: false,
            alert1: false,
            alert2: false,
            isLoading: false,
            fullPage:   true,  
            page: 0,
            cadastrar: [],
            motoristahistorico: {
              id: 0,
              motorista: '',
              descritivosituacao: '',
              descritivosituacaoRules: [ v => !!v || 'Descrição é obrigatório!'],   
              obs: '',
              obsRules: [ v => !!v || 'Obs é obrigatório!'],              
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeformulario: 'Historico do Condutor'            
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertmotoristahistorico = process.env.VUE_APP_HOST  + "motoristahistorico/add/" + key
            
            this.axios.post(urlinsertmotoristahistorico, this.motoristahistorico)
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
        fechaFomulario(){
            this.dialog = false
            this.alert = false
        },
        msgsucesso(){
            this.dialog1 = true
            this.alert1 = true
        },
        fechaFomulariomsg(){
            this.dialog1 = false
            this.alert1 = false
        },
        textToUpper(id) {
            if(id == 'descritivosituacao'){
                this.motoristahistorico.descritivosituacao = this.motoristahistorico.descritivosituacao.toUpperCase()
            } else  if(id == 'obs'){
                this.motoristahistorico.obs = this.motoristahistorico.obs.toUpperCase()
            }             
        },        
        pegaitemreferencia(item){     
            this.entradaitem.referencia = item.id
            this.entradaitem.descreferencia = item.referencia  
            this.alert5 = false 
            this.dialog5 = false               
        },
        fechar(){             
        },
        calculasoma(valor1, valor2){
          const total =  valor1 * valor2
          return total   
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregahistorico', (motorista) => {
            localStorage.visualiza = motorista.visualiza
            localStorage.motorista = motorista.id
            this.motoristahistorico.motorista = localStorage.motorista
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
        this.carregaTipoProduto()
        this.carregaProduto()
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
    },
    created(){
        this.carregaTipoProduto()
        this.carregaProduto()
        this.carregaUnudade()
        this.carregaReferencia()
    }
}
</script>
<style scoped>
</style>