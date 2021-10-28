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
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Nome do Fornecedor" v-model="fornecedor.fornecedor" :rules="fornecedor.fornecedorRules" name="fornecedor" :value="fornecedor.fornecedor"  @input="textToUpper('fornecedor')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Tel / Cel" v-model="fornecedor.contato" :rules="fornecedor.contatoRules" v-mask="'(##)#####-####'" name="contato" :value="fornecedor.contato"  @input="textToUpper('contato')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Email" v-model="fornecedor.email" :rules="fornecedor.emailRules" name="email" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Endereço" v-model="fornecedor.endereco" :rules="fornecedor.enderecoRules" name="endereco" :value="fornecedor.endereco"  @input="textToUpper('endereco')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            fornecedor: {
              id: 0,
              fornecedor: '',
              fornecedorRules: [ v => !!v || 'Nome do Fornecedor é obrigatório!'],    
              contato: '',
              contatoRules: [ v => !!v || 'Contato do Fornecedor é obrigatório!'],  
              email: '',
              emailRules: [ v => !!v || 'Email do Fornecedor é obrigatório!'],  
              endereco: '',
              enderecoRules: [ v => !!v || 'Endereco do Fornecedor é obrigatório!'],
              visualiza: false,
            },
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Fornecedor'
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlupdatefornecedor = process.env.VUE_APP_HOST  + "fornecedor/alt/" + key
            
            this.axios.post(urlupdatefornecedor, this.fornecedor)
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
            if(id == 'fornecedor'){
                this.fornecedor.fornecedor = this.fornecedor.fornecedor.toUpperCase()
            } else if(id == 'contato'){
                this.fornecedor.contato = this.fornecedor.contato.toUpperCase()
            } else if(id == 'email'){
                this.fornecedor.email = this.fornecedor.email.toUpperCase()
            } else if(id == 'endereco'){
                this.fornecedor.endereco = this.fornecedor.endereco.toUpperCase()
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
        EventBus.$on('carregaalteracao', (fornecedor) => {
            localStorage.visualiza = fornecedor.visualiza
            localStorage.id = fornecedor.id
            localStorage.fornecedor = fornecedor.fornecedor
            localStorage.contato = fornecedor.contato
            localStorage.email = fornecedor.email
            localStorage.endereco = fornecedor.endereco
            this.fornecedor.id = localStorage.id
            this.fornecedor.fornecedor =  localStorage.fornecedor
            this.fornecedor.contato =  localStorage.contato
            this.fornecedor.email =  localStorage.email
            this.fornecedor.endereco =  localStorage.endereco

            this.dialog = true
            this.alert = true
            console.log(localStorage.contato)
        })
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaalteracao')
        });
    },
    created(){
    }
}
</script>
<style scoped>
</style>