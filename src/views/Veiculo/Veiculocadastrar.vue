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
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Placa Veiculo" v-model="veiculo.placa" :rules="veiculo.placaRules"  maxlength="8" name="placa" :value="veiculo.placa"  @input="textToUpper('placa')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>                           
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Veiculo" v-model="veiculo.veiculo" :rules="veiculo.veiculoRules"   name="veiculo" :value="veiculo.veiculo"  @input="textToUpper('veiculo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Modelo" v-model="veiculo.modelo" :rules="veiculo.modeloRules"   name="modelo" :value="veiculo.modelo"  @input="textToUpper('modelo')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Ano" v-model="veiculo.ano" :rules="veiculo.anoRules"  maxlength="4" name="ano" :value="veiculo.ano"  @input="textToUpper('ano')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Chassis" v-model="veiculo.chassis" :rules="veiculo.chassisRules"   name="chassis" :value="veiculo.chassis"  @input="textToUpper('chassis')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                             <v-flex xs12 sm66 md6>
                                <v-text-field  label="DUT" v-model="veiculo.dut" :rules="veiculo.dutRules"   name="dut" :value="veiculo.dut"  @input="textToUpper('dut')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                             <v-flex xs12 sm66 md6>
                                <v-text-field  label="CRV" v-model="veiculo.crv" :rules="veiculo.crvRules"   name="crv" :value="veiculo.crv"  @input="textToUpper('crv')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Km inicial" v-model="veiculo.kminicial" :rules="veiculo.kminicialRules"  name="kminicial" :value="veiculo.kminicial"  @input="textToUpper('kminicial')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>                               
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Acessorios" v-model="veiculo.acessorio" :rules="veiculo.acessorioRules"   name="acessorio" :value="veiculo.veiculo"  @input="textToUpper('acessorio')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Final Placa" v-model="veiculo.finalplaca" :rules="veiculo.finalplacaRules"  maxlength="2" name="finalplaca" :value="veiculo.veiculo"  @input="textToUpper('finalplaca')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Obs" v-model="veiculo.obs" :rules="veiculo.obsRules"  name="obs" :value="veiculo.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="temseguro"
                                    item-text="" 
                                    item-value=""
                                    label="Possui seguro?"
                                    dense
                                    outlined
                                    v-model="veiculo.seguro"
                                    value = 'Selecione se possui seguro ou não!'
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="temlicenciamento"
                                    item-text="" 
                                    item-value=""
                                    label="Possui Licenciamento?"
                                    dense
                                    outlined
                                    v-model="veiculo.licenciamento"
                                    value = 'Selecione se possui Licenciamento ou não!'
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipocombustivel"
                                    item-text="" 
                                    item-value=""
                                    label="Tipo de Combustivel do Veículo"
                                    dense
                                    outlined
                                    v-model="veiculo.tipocombustivel"
                                    value = 'Selecione o Tipo de Combustivel do Veículo'
                                    clearable
                                ></v-select>
                            </v-flex>    
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipofrota"
                                    item-text="" 
                                    item-value=""
                                    label="Origem do Veiculo"
                                    dense
                                    outlined
                                    v-model="veiculo.origemveiculo"
                                    value = 'Selecione a Origem de Veículo'
                                    clearable
                                ></v-select>
                            </v-flex>    
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipoveiculo"
                                    item-text="tipoveiculo" 
                                    item-value="id"
                                    label="Tipo Veículo"
                                    dense
                                    outlined
                                    v-model="veiculo.tipoveiculo"
                                    value = 'Selecione o tipo de veiculo'
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="fabricante"
                                    item-text="fabricante" 
                                    item-value="id"
                                    label="Fabricante"
                                    dense
                                    outlined
                                    v-model="veiculo.fabricante"
                                    value = 'Selecione o Fabricante'
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
            veiculo: {
              id: 0,
              placa: '',
              placaRules: [ v => !!v || 'Placa do veiculo é obrigatório!'],              
              veiculo: '',
              veiculoRules: [ v => !!v || 'Veiculo é obrigatório!'],   
              modelo: '',
              modeloRules: [ v => !!v || 'Modelo do veiculo é obrigatório!'],   
              ano: '',
              anoRules: [ v => !!v || 'Ano do veiculo é obrigatório!'], 
              chassis: '',
              tipocombustivel: 0,
              chassisRules: [ v => !!v || 'chassis do veiculo é obrigatório!'], 
              kminicial: '',
              kminicialRules: [ v => !!v || 'Km inicial do veiculo é obrigatório!'], 
              seguro: '',
              seguroRules: [ v => !!v || 'Seguro do veiculo é obrigatório!'], 
              acessorio: '',
              acessorioRules: [ v => !!v || 'Acessorios do veiculo é obrigatório!'], 
              licenciamento: '',
              licenciamentoRules: [ v => !!v || 'Licenciamento do veiculo é obrigatório!'], 
              finalplaca: '',
              finalplacaRules: [ v => !!v || 'Final Placa do veiculo é obrigatório!'], 
              origemveiculo: '',
              origemveiculoRules: [ v => !!v || 'Origem do veiculo é obrigatório!'], 
              dut: '',
              dutRules: [ v => !!v || 'DUT do veiculo é obrigatório!'], 
              crv: '',
              crvRules: [ v => !!v || 'CRV do veiculo é obrigatório!'], 
              obs: '',
              obsRules: [ v => !!v || 'Obs do veiculo é obrigatório!'], 
              situacao: '',
              situacaoRules: [ v => !!v || 'SItuação do veiculo é obrigatório!'], 
              fabricante: '',
              fabricanteRules: [ v => !!v || 'Fabricante do veiculo é obrigatório!'], 
              tipoveiculo: '',
              tipoveiculoRules: [ v => !!v || 'Fabricante do veiculo é obrigatório!'], 
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Veiculo',
            tipofrota: [ '1 - Frota Propria',  '2 - Frota locada', '3 - Frota Permuta'],
            tipocombustivel: [ '1 - Gasolina',  '2 - Alcool/Etanol', '3 - Diesel', '4 - Gas'],
            temlicenciamento: ['1 - SIM',  '2 - NÃO'],
            temseguro: ['1 - SIM',  '2 - NÃO'],            
            tipoveiculo: [],
            fabricante: [],
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertveiculo = process.env.VUE_APP_HOST  + "veiculo/add/" + key
            
            this.axios.post(urlinsertveiculo, this.veiculo)
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
        carregatipoveiculo(){  
            this.isLoading = true; 
            const  urltipoveiculo = process.env.VUE_APP_HOST + "tipoveiculo/search/" + '1'

            this.axios.get(urltipoveiculo).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.tipoveiculo = response.data 
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
        carregafabricante(){  
            this.isLoading = true; 
            const  urlfabricante = process.env.VUE_APP_HOST + "fabricante/search/" + '1'

            this.axios.get(urlfabricante).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.fabricante = response.data 
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
            if(id == 'placa'){
                this.veiculo.placa = this.veiculo.placa.toUpperCase()
            } else if(id == 'veiculo'){
                this.veiculo.veiculo = this.veiculo.veiculo.toUpperCase()
            } else if(id == 'modelo'){
                this.veiculo.modelo = this.veiculo.modelo.toUpperCase()
            } else if(id == 'ano'){
                this.veiculo.ano = this.veiculo.ano.toUpperCase()
            } else if(id == 'chassis'){
                this.veiculo.chassis = this.veiculo.chassis.toUpperCase()
            } else if(id == 'acessorio'){
                this.veiculo.acessorio = this.veiculo.acessorio.toUpperCase()
            } else if(id == 'obs'){
                this.veiculo.obs = this.veiculo.obs.toUpperCase()
            }                      
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.veiculo.placa = ''
            this.veiculo.veiculo = ''
            this.veiculo.modelo = ''
            this.veiculo.ano = ''
            this.veiculo.chassis = ''
            this.veiculo.kminicial = ''
            this.veiculo.seguro = ''
            this.veiculo.acessorio = ''
            this.veiculo.licenciamento = ''
            this.veiculo.finalplaca = ''
            this.veiculo.origemveiculo = ''
            this.veiculo.dut = ''
            this.veiculo.crv = ''
            this.veiculo.obs = ''
            this.veiculo.fabricante = ''
            this.veiculo.tipoveiculo = ''
        }           
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (veiculo) => {
            localStorage.visualiza = veiculo.visualiza
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
        })
        this.novo()
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
    },
    created(){
        this.carregatipoveiculo()
        this.carregafabricante()
        this.novo()
    }
}
</script>
<style scoped>
</style>