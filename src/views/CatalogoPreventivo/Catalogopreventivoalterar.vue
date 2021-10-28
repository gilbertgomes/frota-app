<template>
    <div>
        <v-dialog  v-model="dialog" height="500px" max-width="900px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert" type="cyan">
                            Alteração de Tipos para Manutenção Preventiva
                        </v-alert>
                    </div>
                    <v-card-text>                     
                        <v-row>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Tipo Manutenção Preventiva" v-model="mpreventiva.catalogo" :rules="mpreventiva.catalogoRules" name="catalogo" :value="mpreventiva.catalogo"  @input="textToUpper('catalogo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Km de Troca ou Reparo" v-model="mpreventiva.km" maxlength="9" :rules="mpreventiva.kmRules" name="km" :value="mpreventiva.km"  @input="textToUpper('km')" clearable placeholder="Dense & Rounded" filled rounded dense >                          
                                </v-text-field>    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Periodo Troca ou Reparo - Dias / Meses"   v-model="mpreventiva.troca" maxlength="4"  :rules="mpreventiva.trocaRules" name="troca" :value="mpreventiva.troca"  @input="textToUpper('troca')"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
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
                        Descrição do Produto gerado com sucesso!
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
            mpreventiva: {
              id: 0,
              catalogo: '',
              catalogoRules: [ v => !!v || 'Tipo da Manutenção é obrigatório!'], 
              km: '',
              kmRules: [ v => !!v || 'Previsão de Kilometragem é obrigatório!'], 
              troca: '',
              trocaRules: [ v => !!v || 'Periodo de troca é obrigatório!'], 
              visualiza: false
            }
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlinsertcatalogo = process.env.VUE_APP_HOST  + "catalogopreventivo/alt/" + key
            
            this.axios.post(urlinsertcatalogo, this.mpreventiva)
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
            if(id == 'catalogo'){
                this.mpreventiva.catalogo = this.mpreventiva.catalogo.toUpperCase()
            } else if (id == 'km'){
                 this.mpreventiva.km = this.produto.km.toUpperCase()
            } else if (id == 'troca'){
                 this.mpreventiva.troca = this.produto.troca.toUpperCase()
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
        EventBus.$on('carregaalteracao', (mpreventiva) => {
            localStorage.visualiza = mpreventiva.visualiza

            localStorage.id = mpreventiva.id
            localStorage.catalogo = mpreventiva.catalogo
            localStorage.km = mpreventiva.km
            localStorage.troca = mpreventiva.troca

            this.mpreventiva.id = localStorage.id 
            this.mpreventiva.catalogo = localStorage.catalogo 
            this.mpreventiva.km = localStorage.km
            this.mpreventiva.troca = localStorage.troca
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
    },
    created(){
    }
}
</script>
<style scoped>
</style>