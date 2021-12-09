<template>
    <div>
        <v-dialog  v-model="dialog" height="500px" max-width="900px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert" type="cyan">
                            Cadastro de descrição de produto
                        </v-alert>
                    </div>
                    <v-card-text>                     
                        <v-row>  
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Produto" v-model="produto.produto" :rules="produto.descricaoRules" name="produto" :value="produto.produto"  @input="textToUpper('produto')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="UN" v-model="produto.un" maxlength="3" :rules="produto.unRules" name="un" :value="produto.un"  @input="textToUpper('un')" clearable placeholder="Dense & Rounded" filled rounded dense >                          
                                </v-text-field>    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Referência"   v-model="produto.ref" :rules="produto.refaRules" name="ref" :value="produto.referencia"  @input="textToUpper('ref')"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm12 md12>
                                <v-text-field  label="Obs"  v-model="produto.obs"  :rules="produto.obsRules"  name="obs" :value="produto.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>     
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
            produto: {
              id: 0,
              produto: '',
              produtoRules: [ v => !!v || 'Produto é obrigatório!'], 
              un: '',
              unRules: [ v => !!v || 'UN é obrigatório!'], 
              ref: '',
              refRules: [ v => !!v || 'UN é obrigatório!'], 
              obs: '',
              obsRules: [ v => !!v || 'Oba é obrigatório!'], 
              visualiza: false
            },
            habilita: false
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertcatalogo = process.env.VUE_APP_HOST  + "produto/add/" + key
            
            this.axios.post(urlinsertcatalogo, this.produto)
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
                 localStorage.atualiza = "S"
                 this.novo()
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
            if(id == 'produto'){
                this.produto.produto = this.produto.produto.toUpperCase()
            } else if (id == 'un'){
                 this.produto.un = this.produto.un.toUpperCase()
            } else if (id == 'ref'){
                 this.produto.ref = this.produto.ref.toUpperCase()
            } else if (id == 'obs'){
                 this.produto.obs = this.produto.obs.toUpperCase()
            }                           
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.produto.produto = ''
            this.produto.un = ''
            this.produto.ref = ''
            this.produto.obs = ''
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (CatalogoProduto) => {
            localStorage.visualiza = CatalogoProduto.visualiza
            localStorage.campo = ''        
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
        this.novo()
    }
}
</script>
<style scoped>
</style>