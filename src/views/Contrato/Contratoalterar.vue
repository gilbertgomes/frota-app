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
                                <v-text-field   label="Objeto Contrato" v-model="contrato.objeto" :rules="contrato.documentoRules" name="objeto" :value="contrato.objeto"  @input="textToUpper('objeto')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  readonly label="Data Assinatura" v-model="contrato.dtassinatura"  v-mask="'##/##/####'" :rules="contrato.valortotRules" name="dtassinatura" :value="contrato.dtassinatura"  @input="textToUpper('dtassinatura')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  readonly label="Data Inicio" v-model="contrato.dtinicio"  v-mask="'##/##/####'" :rules="contrato.valortotRules" name="dtassinatura" :value="contrato.dtinicio"  @input="textToUpper('dtinicio')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field label="Data Fim" v-model="contrato.dtfim"  v-mask="'##/##/####'" :rules="contrato.valortotRules" name="dtfim" :value="contrato.dtfim"  @input="textToUpper('dtfim')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Prazo" v-model="contrato.prazo" :rules="contrato.valorpagrecRules" name="prazo" :value="contrato.prazo"  @input="textToUpper('prazo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Valor Contrato" v-model="contrato.valorcontrato" :rules="contrato.valorpagrecRules" name="valorcontrato" :value="contrato.valorcontrato"  @input="textToUpper('valorcontrato')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            contrato: {
              id: 0,
              objeto: '',
              objetoRules: [ v => !!v || 'Objeto é obrigatório!'], 
              cliente: '',
              clienteRules: [ v => !!v || 'Cliente é obrigatório!'],        
              dtassinatura: '',
              dtassinaturaRules: [ v => !!v || 'Assinatura Un é obrigatório!'],  
              dtinicio: '',
              dtinicioRules: [ v => !!v || 'Data Inicio total é obrigatório!'],  
              dtfim: '',
              dtfimRules: [ v => !!v || 'Data Fim é obrigatório!'],   
              prazo: '',
              prazoRules: [ v => !!v || 'Prazo é obrigatório!'],  
              valorcontrato: '',
              valormes: '',
              valorsaldo: '',
              obs: '',
              obsRules: [ v => !!v || 'Obs é obrigatório!'],        
              visualiza: false,
            },
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Contrato'
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdatecontrato = process.env.VUE_APP_HOST  + "contrato/alt/" + key
            
            this.axios.post(urlupdatecontrato, this.contrato)
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
            if(id == 'objeto'){
                this.contrato.objeto = this.contrato.objeto.toUpperCase()
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
        EventBus.$on('carregaalteracao', (contrato) => {
            localStorage.visualiza = contrato.visualiza
            localStorage.id = contrato.id
            localStorage.objeto = contrato.objeto
            localStorage.dtassinatura = contrato.dtassinatura
            localStorage.dtinicio = contrato.dtinicio
            localStorage.valorcontrato = contrato.valorcontrato
            localStorage.valormes = contrato.valormes

            this.contrato.id = localStorage.id
            this.contrato.objeto = localStorage.objeto
            this.contrato.dtassinatura = localStorage.dtassinatura
            this.contrato.dtinicio = localStorage.dtinicio
            this.contrato.valorcontrato = localStorage.valorcontrato
            this.contrato.valormes = localStorage.valormes

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
    }
}
</script>
<style scoped>
</style>