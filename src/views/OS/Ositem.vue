<template>
    <div>
        <v-dialog  v-model="dialog" height="500px" max-width="900px" persistent :retain-focus="false">
            <v-card>
                <v-card-text> 
                    <div class="text-center">  
                        <v-alert v-model="alert" type="cyan">
                            Cadastro {{this.nomeFormulario}} da OS Nº {{this.ositem.id}} 
                        </v-alert>
                    </div>
                    <v-card-text>                     
                        <v-row>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field   background-color="amber lighten-4"  color="orange orange-darken-4" label="Nº OS" v-model="ositem.osnumero"  readonly  name="quant" :value="ositem.quant"  @input="somentenumero('quant')"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipoitemos"
                                    item-text="" 
                                    item-value=""
                                    label="Tipo do Item da OS"
                                    dense
                                    outlined
                                    v-model="ositem.tipoitem"
                                    value = 'Selecione o Tipo de Serviço / Peças caso seja necessário!'
                                    @change="montacategoria(ositem.tipoitem)"
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm12 md12>
                                <v-select
                                    :items="categoria"
                                    item-text="pecaserv" 
                                    item-value="id"
                                    label="Categoria de peças / Serviços"
                                    dense
                                    outlined
                                    v-model="ositem.categoria"
                                    value = 'Selecione o Tipo de Serviço / Peças caso seja necessário!'
                                    clearable
                                ></v-select>
                            </v-flex> 
                           <v-flex xs12 sm64 md4>
                                <v-text-field  label="Quantidade" v-model="ositem.quant" :rules="ositem.quantRules"   name="quant" :value="ositem.quant"  @input="somentenumero('quant')"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Valor Unitário" v-model="ositem.valorun" :rules="ositem.valorunRules"   name="valorun"  @blur="calculavalor(ositem.quant, ositem.valorun)"   :value="ositem.valorun"  @input="somentenumero('valorun')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm64 md4>
                                <v-text-field  label="Valor Total" v-model="ositem.valortot" :rules="ositem.valortotRules"  name="valortot"   :value="ositem.valortot"  @input="somentenumero('valortot')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Previsão Data Inicio" v-model="ositem.inicio" :rules="ositem.inicioRules"  name="inicio"  v-mask="'##/##/####'"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Prazo/meses" v-model="ositem.prazo" :rules="ositem.prazoRules" name="prazo"  maxlength="3" :value="ositem.prazo"  @input="textToUpper('prazo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Garantia" v-model="ositem.garantia" :rules="ositem.garantiaRules" name="garantia" :value="ositem.garantia"  @input="textToUpper('garantia')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Obs" v-model="ositem.obs" :rules="ositem.obstRules" name="obs" :value="ositem.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            ositem: {
              id: 0,
              os: '',
              osnumero: 0,
              tipoitem: '',
              tipoitemRules: [ v => !!v || 'tipo Item é obrigatório!'],   
              categoria: '',
              objeto: '0',
              objetoRules: [ v => !!v || 'Objeto / Descrição do item é obrigatório!'],   
              quant: '',
              quantRules: [ v => !!v || 'Quantidade é obrigatório!'],     
              valorun: '',
              valorunRules: [ v => !!v || 'Valor un é obrigatório!'],   
              valortot: '', 
              valortotRules: [ v => !!v || 'Valor Total é obrigatório!'],   
              inicio: '',
              inicioRules: [ v => !!v || 'Previsão de inicio é obrigatório!'],        
              prazo: '',
              prazoRules: [ v => !!v || 'Prazo é obrigatório!'],  
              garantia: '',
              garantiaRules: [ v => !!v || 'Garantia é obrigatório!'],  
              tipoprazo: '',
              tipoprazoRules: [ v => !!v || 'Observação é obrigatório!'],  
              obs: '',
              obsRules: [ v => !!v || 'Obs é obrigatório!'], 
              situacao: 1,              
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Itens de OS',
            tipoproduto: [],
            msgconfirmar: 'Deseja excluir ese item',
            tipoitemos: [ '1 - Peça',  '2 - Serviço'],  
            categoria: []     
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlositem = process.env.VUE_APP_HOST  + "ositem/add/" + key
            
            this.axios.post(urlositem, this.ositem)
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
        montacategoria(id){  
            const  urloc = process.env.VUE_APP_HOST + "categoriacombo/search/" + id          
            this.axios.get(urloc).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.categoria = response.data   
                } else {// caso o response retrone algum erro ao tentar salvar os dados 
                    this.menssagemform = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'            
                    this.mostraMenssagem(); // fecha o formulario de dados detalhado
                    this.overlay = false;
                }
                this.isLoading = false;  
            }).catch((error) => {
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
            if(id == 'objeto'){
                this.ositem.objeto = this.ositem.objeto.toUpperCase()
            } else if(id == 'obs'){
                this.ositem.obs = this.ositem.obs.toUpperCase()
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
            if (campo == 'quant'){                
                this.ositem.quant = this.ositem.quant.replace(",", ".")
            } else if (campo == 'valorun'){
                this.ositem.valorun =  this.ositem.valorun.replace(",", ".") 
                this.ositem.valortot =  this.calculasoma(this.ositem.quant, this.ositem.valorun )
            } else if (campo == 'valortot'){
                this.ositem.valortot = this.ositem.valortot.replace(",", ".") 
            }
        },
        calculasoma(valor1, valor2){
          const total =  valor1 * valor2
          return total   
        },
        novo(){
            this.ositem.tipoitem = ''
            this.ositem.objeto = ''
            this.ositem.quant = ''
            this.ositem.valorun = ''
            this.ositem.valortot = ''
            this.ositem.inicio = ''
            this.ositem.prazo = ''
            this.ositem.garantia = ''
            this.ositem.veiculo = ''
            this.ositem.tipoprazo = ''
            this.ositem.situacao = ''
        }
    },
    calculavalor(var1, var2){
        this.ositem.valortot = var1 * var2
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaitemos', (os) => {
            localStorage.visualiza = os.visualiza
            localStorage.os = os.id
            localStorage.osnumero = os.numero
            this.ositem.osnumero = localStorage.osnumero
            this.ositem.os = localStorage.os
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
    }
}
</script>
<style scoped>
</style>