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
            saida: {
              id: 0,
              documento: '',
              documentoRules: [ v => !!v || 'Numero do documento é obrigatório!'], 
              valor: '',
              valortotRules: [ v => !!v || 'Valor NF é obrigatório!'], 
              destino: '',
              destinoRules: [ v => !!v || 'Destino é obrigatório!'], 
              situacao: 3,              
              obs: '',
              obseRules: [ v => !!v || 'Obs é obrigatório!'], 
              visualiza: false,
            },
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Saida',
            situacao: [ '3 - Quitada',  '4 - Pendente', '5 - Cancelada'],         
            page: 0
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdatsaida = process.env.VUE_APP_HOST  + "saida/alt/" + key
            if(this.situacao != ''){
               this.saida.situacao = this.situacao  
            }
            this.saida.valor =  this.saida.valor.replace('.', '');    
            this.axios.post(urlupdatsaida, this.saida)
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
        carregasituacao(){
            this.situacao = [ '3 - Quitada',  '4 - Pendente', '5 - Cancelada']
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
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaalteracao', (saida) => {
            localStorage.id = saida.id
            localStorage.documento = saida.documento
            localStorage.destino = saida.destino
            localStorage.valor = saida.valor
            localStorage.obs = saida.obs
            localStorage.situacao = saida.situacao

            this.saida.id = localStorage.id
            this.saida.documento = localStorage.documento
            this.saida.destino = localStorage.destino
            this.saida.valor = localStorage.valor
            this.saida.obs = localStorage.obs
            this.saida.situacao = localStorage.situacao
           
            this.carregasituacao()
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
        this.carregafornecedor()
  
    }
}
</script>
<style scoped>
</style>