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
                                    :items="dadostipofinanceiro"
                                    item-text="tipofinanceiro" 
                                    item-value="id"
                                    label="Tipo Financeiro"
                                    dense
                                    outlined
                                    v-model="financeiro.tipofinanceiro"
                                    value = 'Selecione o Tipo Financeiro para lançamento'        
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="dadosrecdesp"
                                    item-text="tipodr" 
                                    item-value="id"
                                    label="Tipo Receita / Despesa"
                                    dense
                                    outlined
                                    v-model="financeiro.tipord"
                                    value = 'Selecione o Tipo Receita ou Despesa para lançamento'        
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Nº Documento/Nf" v-model="financeiro.documento" :rules="financeiro.documentoRules" name="documento" :value="financeiro.documento"  @input="textToUpper('documento')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Quantidde" v-model="financeiro.quant" :rules="financeiro.quantRules" name="quant" :value="financeiro.quant"  @input="textToUpper('quant')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Valor Un" v-model="financeiro.valorun" :rules="financeiro.valorunRules" name="valorun" :value="financeiro.valorun"  @input="textToUpper('valorun')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Valor Total" v-model="financeiro.valortot" :rules="financeiro.valortotRules" name="valortot" :value="financeiro.valortot"  @input="textToUpper('valortot')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <label>Data Vencimento: </label>
                                <input v-model="financeiro.vencimento"  name="vencimento" type="date" id="birthday" >
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <label>Data Pagamento: </label>
                                <input v-model="financeiro.datapag"  name="datapag" type="date" id="birthday" >
                            </v-flex> 
                            <v-flex xs12 sm12 md12>
                                <v-text-field  label="Valor Pagamento" v-model="financeiro.valorpagrec" :rules="financeiro.valorpagrecRules" name="valorpagrec" :value="financeiro.valorpagrec"  @input="textToUpper('valorpagrec')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            financeiro: {
              id: 0,
              tipofinanceiro: '',
              documento: '',
              documentoRules: [ v => !!v || 'Documento é obrigatório!'], 
              quant: '',
              quantRules: [ v => !!v || 'Quantidade é obrigatório!'],        
              valorun: '',
              valorunRules: [ v => !!v || 'Valor Un é obrigatório!'],  
              valortot: '',
              valortotRules: [ v => !!v || 'Valor total é obrigatório!'],  
              vencimento: '',
              datapag: '',
              datapagRules: [ v => !!v || 'Data Pagamento é obrigatório!'],   
              valorpagrec: '',
              valorpagrecRules: [ v => !!v || 'Valor é obrigatório!'],  
              tipord: '',
              tipordRules: [ v => !!v || 'Tipo receita / despesa é obrigatório!'],        
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Financeiro',
            dadosrecdesp: [],
            dadostipofinanceiro: []
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertfinanceiro = process.env.VUE_APP_HOST  + "financeiro/add/" + key
            
            this.axios.post(urlinsertfinanceiro, this.financeiro)
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
        buscaTiporecdesp() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urldadostipodesprec = process.env.VUE_APP_HOST + "recedesp/search/" + key

            this.axios.get(urldadostipodesprec)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.dadosrecdesp = response.data   
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
        buscaTipofinanceiro() {
            const  key = 'frota2021house'
            this.overlay = true
            const  urltipfinceiro  = process.env.VUE_APP_HOST + "tipofinanceiro/search/" + key

            this.axios.get(urltipfinceiro)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.dadostipofinanceiro = response.data   
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
            if(id == 'quant'){
                this.financeiro.quant = this.financeiro.quant.replace(",", ".") 
            } else if(id == 'valorun'){
                this.financeiro.valorun = this.financeiro.valorun.replace(",", ".") 
                this.financeiro.valortot = this.financeiro.quant  *  this.financeiro.valorun
                this.financeiro.valortot = this.financeiro.valortot.replace(",", ".") 
            } else if(id == 'valorpagrec'){
                this.financeiro.valorpagrec = this.financeiro.valorpagrec.replace(",", ".") 
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
        EventBus.$on('carregacadastro', (financeiro) => {
            localStorage.visualiza = financeiro.visualiza
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
        this.buscaTipofinanceiro()
        this.buscaTiporecdesp()
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
        this.novo()
    },
    created(){
        this.novo()
        this.buscaTiporecdesp()
        this.buscaTipofinanceiro()
    }
}
</script>
<style scoped>
</style>