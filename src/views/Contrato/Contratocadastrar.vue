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
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="dadoscliente"
                                    item-text="cliente" 
                                    item-value="id"
                                    label="Cliente"
                                    dense
                                    outlined
                                    v-model="contrato.cliente"
                                    value = 'Selecione o Cliente!'        
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field  label="Objeto" v-model="contrato.objeto" :rules="contrato.objetoRules" name="objeto" :value="contrato.objeto"  @input="textToUpper('objeto')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm3 md3>
                                <label>Data Assinatura: </label>
                                <input v-model="contrato.dtassinatura"  name="dtassinatura" type="date" id="birthday" >
                            </v-flex> 
                            <v-flex xs12 sm3 md3>
                                <label>Data Inicio: </label>
                                <input v-model="contrato.dtinicio"  name="dtinicio" type="date" id="birthday" >
                            </v-flex> 
                            <v-flex xs12 sm3 md3>
                                <label>Data Fim: </label>
                                <input v-model="contrato.dtfim"  name="dtfim" type="date" id="birthday" >
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Prazo" v-model="contrato.prazo" :rules="contrato.prazoRules" name="prazo" :value="contrato.prazo"  @input="textToUpper('prazo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Valor Contrato" v-model="contrato.valorcontrato" :rules="contrato.prazoRules" name="valorcontrato" :value="contrato.valorcontrato"  @input="textToUpper('valorcontrato')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Valor Mês" v-model="contrato.valormes" :rules="contrato.prazoRules" name="valormes" :value="contrato.valormes"  @input="textToUpper('valormes')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Valor Saldo" v-model="contrato.valorsaldo" :rules="contrato.prazoRules" name="valorsaldo" :value="contrato.valorsaldo"  @input="textToUpper('valorsaldo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Obs" v-model="contrato.obs" :rules="contrato.obsRules" name="obs" :value="contrato.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Contrato',
            dadoscliente: [],

        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertcontrato = process.env.VUE_APP_HOST  + "contrato/add/" + key
            
            this.axios.post(urlinsertcontrato, this.contrato)
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
        buscacliente() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadoscliente = process.env.VUE_APP_HOST + "cliente/search/" + key

            this.axios.get(urldadoscliente)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.dadoscliente = response.data   
                 this.overlay = false
                return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              alert(error);
            })
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
            } else if (id == 'obs'){
                 this.contrato.obs = this.contrato.obs.toUpperCase()
            }                       
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.fabricante.fabricante = ''
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (contrato) => {
            localStorage.visualiza = contrato.visualiza
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
        this.buscacliente()
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
        this.novo()
    },
    created(){
        this.novo()
        this.buscacliente()
    }
}
</script>
<style scoped>
</style>