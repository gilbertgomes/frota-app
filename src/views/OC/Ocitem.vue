<template>
    <div>
        <v-dialog  v-model="dialog" height="500px" max-width="900px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert" type="cyan">
                            Cadastro {{this.nomeFormulario}} da OS Nº {{this.ocitem.id}} 
                        </v-alert>
                    </div>
                    <v-card-text>                     
                        <v-row>  
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="fornecedor"
                                    item-text="fornecedor" 
                                    item-value="id"
                                    label="Fornecedor"
                                    dense
                                    outlined
                                    v-model="ocitem.fornecedor"
                                    value = 'Selecione o Fornecedor'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipoitemoc"
                                    item-text="" 
                                    item-value=""
                                    label="Tipo do Item da OC"
                                    dense
                                    outlined
                                    v-model="ocitem.tipocompra"
                                    value = 'Selecione o Tipo de Serviço / Peças caso seja necessário!'
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm12 md12>   
                                <v-textarea
                                    name="input-7-1"
                                    filled
                                    label="Objeto Serviço / Peça"
                                    auto-grow                                    
                                    v-model="ocitem.objetocompra" 
                                    :rules="ocitem.objetocompraRules" 
                                    :value="ocitem.objetocompra"  
                                    @input="textToUpper('objetocompra')" 
                                ></v-textarea> 
                            </v-flex>
                           <v-flex xs12 sm64 md4>
                                <v-text-field  label="Quantidade" v-model="ocitem.qde" :rules="ocitem.qdeRules"   name="qde" :value="ocitem.qde"  @input="somentenumero('qde')"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Valor Unitário" v-model="ocitem.valorun" :rules="ocitem.valorunRules"   name="valorun"  @blur="calculavalor(ocitem.qde, ocitem.valorun)"   :value="ocitem.valorun"  @input="somentenumero('valorun')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Valor Total" v-model="ocitem.valortot" :rules="ocitem.valortotRules"  name="valortot"   :value="ocitem.valortot"  @input="somentenumero('valortot')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Aplicação" v-model="ocitem.aplicacao" :rules="ocitem.aplicacaoRules"  name="aplicacao"  :value="ocitem.aplicacao"  @input="textToUpper('aplicacao')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Motivo" v-model="ocitem.motivo" :rules="ocitem.motivoRules" name="motivo" :value="ocitem.motivo"  @input="textToUpper('motivo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Obs" v-model="ocitem.obs" :rules="ocitem.obstRules" name="obs" :value="ocitem.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            dialog3: false,
            dialog4: false,
            dialog5: false,
            dialog6: false,
            alert1: false,
            alert3: false,
            alert4: false,
            alert5: false,
            alert6: false,
            isLoading: false,
            fullPage:   true,  
            page: 0,
            cadastrar: [],
            ocitem: {
              id: 0,
              oc: '',
              fornecedor: '',
              tipocompra: '',
              tipocompraRules: [ v => !!v || 'tipo Compra é obrigatório!'],   
              objetocompra: '',
              objetocompraRules: [ v => !!v || 'Objeto / Descrição do item é obrigatório!'],   
              qde: '',
              qdeRules: [ v => !!v || 'Quantidade é obrigatório!'],     
              valorun: '',
              valorunRules: [ v => !!v || 'Valor un é obrigatório!'],   
              valortot: '', 
              valortotRules: [ v => !!v || 'Valor Total é obrigatório!'],   
              aplicacao: '',
              aplicacaoRules: [ v => !!v || 'Aplicação é obrigatório!'],  
              motivo: '',
              motivoRules: [ v => !!v || 'Motivo é obrigatório!'],  
              obs: '',
              obsRules: [ v => !!v || 'Observação é obrigatório!'],  
              situacao: 1,              
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Itens de OC',
            tipoproduto: [],
            msgconfirmar: 'Deseja excluir ese item',
            tipoitemoc: [ '1 - Peça',  '2 - Serviço'],   
            fornecedor: [],    
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlocitem = process.env.VUE_APP_HOST  + "ocitem/add/" + key
            
            this.axios.post(urlocitem, this.ocitem)
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
        carregafornecedor(){  
            this.isLoading = true; 
            const  urlforncedor = process.env.VUE_APP_HOST + "fornecedor/search/" + '1'

            this.axios.get(urlforncedor).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.fornecedor = response.data 
                    this.isLoading = false; 

                } else {// caso o response retrone algum erro ao tentar salvar os dados 
                    this.alert = true
                    this.menssagemform = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'            
                    this.mostraMenssagem(); // fecha o formulario de dados detalhado
                }
                this.isLoading = false;  
            }).catch((error) => {
                this.isLoading = false;
                this.erro = error.message;
            });        
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
            if(id == 'objetocompra'){
                this.ocitem.objetocompra = this.ocitem.objetocompra.toUpperCase()
            } else if(id == 'aplicacao'){
                this.ocitem.aplicacao = this.ocitem.aplicacao.toUpperCase()
            } else if(id == 'motivo'){
                this.ocitem.motivo = this.ocitem.motivo.toUpperCase()
            }  else if(id == 'obs'){
                this.ocitem.obs = this.ocitem.obs.toUpperCase()
            }                
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        carregapesquisaproduto(){           
            this.dialog3 = true
            this.alert3  = true
        },
        carregapesquisaunidade(){           
            this.dialog4 = true
            this.alert4  = true
        },
        fechar(){             
        },
        somentenumero(campo){
            if (campo == 'qde'){                
                this.ocitem.qde = this.ocitem.qde.replace(",", ".")
            } else if (campo == 'valorun'){
                this.ocitem.valorun =  this.ocitem.valorun.replace(",", ".") 
                this.ocitem.valortot =  this.calculasoma(this.ocitem.qde, this.ocitem.valorun )
            } else if (campo == 'valortot'){
                this.ocitem.valortot = this.ocitem.valortot.replace(",", ".") 
            }
        },
        calculasoma(valor1, valor2){
          const total =  valor1 * valor2
          return total   
        },
        novo(){
            this.ocitem.objetocompra = ''
            this.ocitem.qde = ''
            this.ocitem.valorun = ''
            this.ocitem.valortot = ''
            this.ocitem.aplicacao = ''
            this.ocitem.motivo = ''
            this.ocitem.obs = ''
        }
    },
    calculavalor(var1, var2){
        this.ocitem.valortot = var1 * var2
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaitemoc', (oc) => {
            localStorage.visualiza = oc.visualiza
            localStorage.oc = oc.id
            this.ocitem.oc = localStorage.oc
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
        this.novo()
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaitem')
        });
    },
    created(){
        this.novo()
        this.carregafornecedor()
    }
}
</script>
<style scoped>
</style>