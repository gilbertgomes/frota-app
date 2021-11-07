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
                                <v-text-field  label="Solicitante" v-model="solicitante.solicitante" :rules="solicitante.solicitanteRules" name="solicitante" :value="solicitante.solicitante"  @input="textToUpper('solicitante')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Email" v-model="solicitante.email" :rules="solicitante.emailRules" name="email" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Setor" v-model="solicitante.setor" :rules="solicitante.setorRules" name="cargo" :value="solicitante.setor"  @input="textToUpper('setor')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Contato" v-model="solicitante.contato" :rules="solicitante.contatoRules" name="contato" :value="solicitante.contato"  @input="textToUpper('contato')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            solicitante  : {
              id: 0,
              solicitante: '',
              solicitanteRules: [ v => !!v || 'Solicitante é obrigatório!'], 
              setor: '',
              setorRules: [ v => !!v || 'Setor é obrigatório!'], 
              email: '',
              emailRules: [ v => !!v || 'Email é obrigatório!'], 
              contato: '',
              contatoRules: [ v => !!v || 'Contato é obrigatório!'], 
              visualiza: false
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Solicitante'
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertsolicitante = process.env.VUE_APP_HOST  + "solicitante/add/" + key
            
            this.axios.post(urlinsertsolicitante, this.solicitante)
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
        textToUpper(id) {
            if(id == 'solicitante'){
                this.solicitante.solicitante = this.solicitante.solicitante.toUpperCase()
            } else  if(id == 'setor'){
                this.solicitante.setor = this.solicitante.setor.toUpperCase()
            } else  if(id == 'contato'){
                this.solicitante.contato = this.solicitante.contato.toUpperCase()
            }               
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.solicitante.solicitante = ''
            this.solicitante.setor = ''
            this.solicitante.contato = ''
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (solicitante) => {
            localStorage.visualiza = solicitante.visualiza
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
    }
}
</script>
<style scoped>
</style>