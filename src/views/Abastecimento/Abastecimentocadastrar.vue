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
                                <v-text-field  label="Placa do veículo" v-model="placaveiculo" name="placa" @blur="carregaveiculo(placaveiculo)"  maxlength="9" :value="placaveiculo" @input="textToUpper('placaveiculo')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Veiculo" v-model="modeloveiculo" name="veiculo"  :value="modeloveiculo" @input="textToUpper('modeloveiculo')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Nº RC" v-model="abastecimento.rcnumero" name="rcnumero"  :value="abastecimento.rcnumeroRules" @input="textToUpper('rcnumeroRules')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Km no Abastecer" v-model="abastecimento.kmatual" :rules="abastecimento.kmatualRules" name="kmatual"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Marcador Combustivel" v-model="abastecimento.marcador" :rules="abastecimento.marcadorRules" name="marcador"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Hora Abastecimento" v-model="abastecimento.horaabast" v-mask="'##:##'" :rules="abastecimento.horaabastRules" name="kmatual"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Quantidade LT" v-model="abastecimento.quantidade" :rules="abastecimento.quantidadeRules" name="quantidade"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Valor UN" v-model="abastecimento.valorun" :rules="abastecimento.valorunRules" name="valorun" @blur="calculavalorcombustivel()" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Valor Total" v-model="abastecimento.valortot" :rules="abastecimento.valortotRules" name="valortot"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="motorista"
                                    item-text="nome" 
                                    item-value="id"
                                    label="Nome do Condutor"
                                    dense
                                    outlined
                                    v-model="abastecimento.motorista"
                                    value = 'Selecione o nome do condutor'
                                    clearable
                                ></v-select>
                            </v-flex>     
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="fornecedor"
                                    item-text="fornecedor" 
                                    item-value="id"
                                    label="Nome do Fornecedor de combustivel"
                                    dense
                                    outlined
                                    v-model="abastecimento.fornecedor"
                                    value = 'Selecione o Fornecedor de combustivel'
                                    clearable
                                ></v-select>
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Obs da RC" v-model="abastecimento.obs" :rules="abastecimento.obsRules" name="obs"  :value="abastecimento.obs" @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            abastecimento: {
              id: 0,
              data: '',
              veiculo: '',
              veiculoRules: [ v => !!v || 'Veiculo é obrigatório!'],
              placa: '',
              placaRules: [ v => !!v || 'Placa é obrigatório!'],
              veiculomodelo: '',
              veiculomodeloRules: [ v => !!v || 'Modelo é obrigatório!'],
              kmatual: '',
              kmatualRules: [ v => !!v || 'KM Atual é obrigatório!'],
              marcador: '',
              marcadorRules: [ v => !!v || 'MarcadorAtual é obrigatório!'],
              horaabast: '',
              horaabastRules: [ v => !!v || 'HS Abastecimento é obrigatório!'],
              motorista: '',
              motoristaRules: [ v => !!v || 'Motorista é obrigatório!'],
              quantidade: '',
              quantidadeRules: [ v => !!v || 'Quantidade é obrigatório!'],
              valorun: '',
              valorunRules: [ v => !!v || 'Valor un é obrigatório!'],
              valortot: '',
              valortotRules: [ v => !!v || 'Valor total é obrigatório!'],
              fornecedor: '',
              fornecedorRules: [ v => !!v || 'Fornecedor total é obrigatório!'],
              obs: '',
              obsRules: [ v => !!v || 'Obs é obrigatório!'],
              rcnumero: '',
              rcnumeroRules: [ v => !!v || 'RC é obrigatório!'],
              situacao: '',         
              visualiza: false
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Abastecimento',
            veiculo: [],
            motorista: [],
            fornecedor: [],
            modeloveiculo: '',
            placaveiculo: ''

        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertabastecimento = process.env.VUE_APP_HOST  + "abastecimento/add/" + key
            
            this.axios.post(urlinsertabastecimento, this.abastecimento)
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
            if(id == 'placaveiculo'){
                this.placaveiculo = this.placaveiculo.toUpperCase()
            }  
            if(id == 'modeloveiculo'){
                this.modeloveiculos = this.modeloveiculo.toUpperCase()
            }     
            if(id == 'obs'){
                this.abastecimento.obs = this.abastecimento.obs.toUpperCase()
            }                
        },
        carregaveiculo(placa){  
            this.isLoading = true; 
            const  urlfveiculo = process.env.VUE_APP_HOST + "veiculoplaca/search/" + placa.trim()

            this.axios.get(urlfveiculo).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.veiculo = response.data 
                    this.abastecimento.veiculo = this.veiculo[0].id
                    this.modeloveiculo = this.veiculo[0].veiculo       
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
        carregamotorista(){  
            this.isLoading = true; 
            const  urlmotorista = process.env.VUE_APP_HOST + "motorista/search/" + '12r'

            this.axios.get(urlmotorista).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.motorista = response.data 
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
        carregafornecedor(){  
            this.isLoading = true; 
            const  urlmotorista = process.env.VUE_APP_HOST + "fornecedor/search/" + '12r'

            this.axios.get(urlmotorista).then((response) => {
                
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
        calculavalorcombustivel(){
           const quantidade = this.abastecimento.quantidade.replace(",", ".") 
           const valorun = this.abastecimento.valorun.replace(",", ".") 
           const total = quantidade * valorun
           if(total == ''){
              return this.abastecimento.valortot = 0 
           } else{
            return this.abastecimento.valortot = total
           }
           
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.abastecimento.id = ''
            this.abastecimento.veiculo = ''
            this.abastecimento.data = ''
            this.abastecimento.placa = ''
            this.abastecimento.veiculomodelo = ''
            this.abastecimento.kmatual = ''
            this.abastecimento.marcador = ''
            this.abastecimento.horaabast = ''
            this.abastecimento.motorista = ''
            this.abastecimento.quantidade = ''
            this.abastecimento.valorun = ''
            this.abastecimento.valortot = ''
            this.abastecimento.fornecedor = ''
            this.abastecimento.rcnumero = ''
            this.abastecimento.situacao = ''          
        },

    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (abastecimento) => {
            localStorage.visualiza = abastecimento.visualiza
            this.dialog = true
            this.alert = true
            console.log(localStorage.visualiza)
            this.novo()
        })
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregacadastro')
        });
    },
    created(){
        this.carregamotorista()
        this.carregafornecedor()
        this.novo()
    }
}
</script>
<style scoped>
</style>