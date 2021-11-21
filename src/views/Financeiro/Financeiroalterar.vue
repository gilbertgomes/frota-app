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
                                <v-text-field  readonly label="Nº Documento/Nf" v-model="financeiro.documento" :rules="financeiro.documentoRules" name="documento" :value="financeiro.documento"  @input="textToUpper('documento')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-text-field  readonly label="Quantidde" v-model="financeiro.quant" :rules="financeiro.quantRules" name="quant" :value="financeiro.quant"  @input="textToUpper('quant')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm66 md6>
                                <v-text-field readonly label="Valor Un" v-model="financeiro.valorun" :rules="financeiro.valorunRules" name="valorun" :value="financeiro.valorun"  @input="textToUpper('valorun')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  readonly label="Valor Total" v-model="financeiro.valortot" :rules="financeiro.valortotRules" name="valortot" :value="financeiro.valortot"  @input="textToUpper('valortot')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  readonly label="Data Pagamento" v-model="financeiro.datapag"  v-mask="'##/##/####'" :rules="financeiro.valortotRules" name="datapag" :value="financeiro.datapag"  @input="textToUpper('datapag')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
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
              datapag: '',
              datapagRules: [ v => !!v || 'Data Pagamento é obrigatório!'],   
              valorpagrec: '',
              valorpagrecRules: [ v => !!v || 'Valor é obrigatório!'],  
              tipord: '',
              tipordRules: [ v => !!v || 'Tipo receita / despesa é obrigatório!'],        
              visualiza: false,
            },
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Financeiro'
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdatefinanceiro = process.env.VUE_APP_HOST  + "financeiro/alt/" + key
            
            this.axios.post(urlupdatefinanceiro, this.financeiro)
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
            if(id == 'financeiro'){
                this.financeiro.documento = this.financeiro.documento.toUpperCase()
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
        EventBus.$on('carregaalteracao', (financeiro) => {
            localStorage.visualiza = financeiro.visualiza
            localStorage.id = financeiro.id
            localStorage.documento = financeiro.documento
            localStorage.valorun = financeiro.valorun
            localStorage.valortot = financeiro.valortot
            localStorage.dtpag = financeiro.dtpag
            localStorage.valorrecpag = financeiro.valorrecpag
   
            this.financeiro.id = localStorage.id
            this.financeiro.documento = localStorage.documento
            this.financeiro.valorun = localStorage.valorun
            this.financeiro.valortot = localStorage.valortot
            this.financeiro.dtpag = localStorage.dtpag
            this.financeiro.valorrecpag = localStorage.valorrecpag
            this.financeiro.visualiza = true

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