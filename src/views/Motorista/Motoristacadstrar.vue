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
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Nome do Motorista" v-model="motorista.motorista" :rules="motorista.motoristaRules" name="motorista" :value="motorista.motorista"  @input="textToUpper('motorista')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Data Nascimento" v-model="motorista.nascimento" maxlength="10" :rules="motorista.kmRules" v-mask="'##/##/####'" name="nascimento" :value="motorista.contato"  @input="textToUpper('contato')" clearable placeholder="Dense & Rounded" filled rounded dense >                          
                                </v-text-field>    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Idade"   v-model="motorista.idade" :rules="motorista.idadeRules" name="idade"    clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                             <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Endereco"   v-model="motorista.endereco"   :rules="motorista.enderecoRules" name="endereco"   :value="motorista.endereco"  @input="textToUpper('endereco')"  clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Bairro"   v-model="motorista.bairro"   :rules="motorista.beirroRules" name="bairro"   :value="motorista.bairro"  @input="textToUpper('bairro')"  clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex>
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="RG"   v-model="motorista.rg"   :rules="motorista.rgRules" name="rg"    clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="CPF"   v-model="motorista.cpf"   :rules="motorista.cpfRules" name="cpf"  clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipocnh"
                                    item-text="" 
                                    item-value=""
                                    label="Categoria CNH"
                                    dense
                                    outlined
                                    v-model="motorista.cnhcategoria"
                                    value = 'Selecione o Tipo de Categoria CNH!'
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="CNH"   v-model="motorista.cnh"   :rules="motorista.cnhRules" name="cnh"    clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Validade CNH"   v-model="motorista.cnhvalidade"   :rules="motorista.cnhvalidadeRules" v-mask="'##/##/####'" name="cnhvalidade"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Email"   v-model="motorista.email"   :rules="motorista.email" name="email"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex>  
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="CEL / TEL"   v-model="motorista.telcel"   :rules="motorista.telcelRules" name="Tel / CEL"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="sexo"
                                    item-text="" 
                                    item-value=""
                                    label="Sexo"
                                    dense
                                    outlined
                                    v-model="motorista.sexo"
                                    value = 'Selecione o Sexo do Condutor!'
                                    clearable
                                ></v-select>
                            </v-flex>     
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="estadocivil"
                                    item-text="" 
                                    item-value=""
                                    label="Estado CIvil"
                                    dense
                                    outlined
                                    v-model="motorista.estadocivil"
                                    value = 'Selecione o Estado Civil do Condutor!'
                                    clearable
                                ></v-select>
                            </v-flex>                       
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="tipocondutor"
                                    item-text="tipocondutor" 
                                    item-value="id"
                                    label="Tipo Condutor"
                                    dense
                                    outlined
                                    v-model="motorista.tipocondutor"
                                    value = 'Selecione o Tipo Condutor'
                                    clearable
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Contrato"   v-model="motorista.contrato"   :rules="motorista.contratoRules" name="contrato"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                                                        <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Data Admissão"   v-model="motorista.admissao"   :rules="motorista.admissaoRules" v-mask="'##/##/####'"  name="admissao"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
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
            motorista: {
              id: 0,
              motorista: '',
              motoristaRules: [ v => !!v || 'Nome do Motorista é obrigatório!'], 
              nascimento: '',
              nascimentoRules: [ v => !!v || 'Nascimento é obrigatório!'], 
              idade: '',
              idadeRules: [ v => !!v || 'Idade é obrigatório!'], 
              endereco: '',
              enderecoRules: [ v => !!v || 'Endereço é obrigatório!'], 
              bairro: '',
              bairroRules: [ v => !!v || 'Bairro é obrigatório!'], 
              rg: '',
              rgRules: [ v => !!v || 'RG é obrigatório!'], 
              cpf: '',
              cpfRules: [ v => !!v || 'CPF é obrigatório!'], 
              cnh: '',
              cnhRules: [ v => !!v || 'CNH é obrigatório!'], 
              cnhcategoria: 0,
              cnhcategoriaRules: [ v => !!v || 'Categoria é obrigatório!'], 
              cnhvalidade: '',
              cnhvalidadeRules: [ v => !!v || 'CNH validade é obrigatório!'], 
              email: '',
              emailRules: [ v => !!v || 'Email é obrigatório!'], 
              telcel: '',
              telcelRules: [ v => !!v || 'Tel / Cel é obrigatório!'], 
              sexo: '',
              sexoRules: [ v => !!v || 'Sexo é obrigatório!'], 
              estadocivil: '',
              estadocivilRules: [ v => !!v || 'Estado Civil é obrigatório!'], 
              tiposangueneo: '',
              tiposangueneoRules: [ v => !!v || 'Tipo Sangue é obrigatório!'], 
              obs: '',
              obsRules: [ v => !!v || 'Obs é obrigatório!'], 
              tipocondutor: '',
              tipocondutorRules: [ v => !!v || 'Tipo Condutor é obrigatório!'], 
              contrato: '',
              contratoRules: [ v => !!v || 'Contrato é obrigatório!'], 
              admissao: '',
              admissaoRules: [ v => !!v || 'Adminissão é obrigatório!'], 
              demissao: '',
              demissaoRules: [ v => !!v || 'Demissão é obrigatório!'], 
              foto: '',  
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Motorista',
            tipocnh: [ '1 - A',  '2 - B', '3 - AB', '4 - C', '5 - D'],   
            sexo: [ 'F',  'M'],   
            estadocivil: [ 'SOLTEIRO(A)',  'CASADO(A)', 'UNIÂO ESTAVEL', ],   
            tipocondutor: [] 
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertmotorista = process.env.VUE_APP_HOST  + "motorista/add/" + key
            
            this.axios.post(urlinsertmotorista, this.motorista)
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
       carregaTipoCondutor(){  
            this.isLoading = true; 
            const  urltipocondutor = process.env.VUE_APP_HOST + "tipocondutor/search/" + '1'

            this.axios.get(urltipocondutor).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.tipocondutor = response.data 
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
            if(id == 'motorista'){
                this.motorista.motorista = this.motorista.motorista.toUpperCase()
            } else if (id == 'endereco'){
                 this.motorista.endereco = this.motorista.endereco.toUpperCase()
            } else if (id == 'bairro'){
                 this.motorista.bairro = this.motorista.bairro.toUpperCase()
            } else if (id == 'cnh'){
                 this.motorista.cnh = this.motorista.cnh.toUpperCase()
            } else if (id == 'sexo'){
                 this.motorista.sexo = this.motorista.sexo.toUpperCase()
            } else if (id == 'obs'){
                 this.motorista.obs = this.motorista.obs.toUpperCase()
            }                                          
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){
            this.motorista.motorista = ''
            this.motorista.nascimento = ''
            this.motorista.idade = ''
            this.motorista.endereco = ''
            this.motorista.bairro = ''
            this.motorista.rg = ''
            this.motorista.cpf = ''
            this.motorista.cnh = ''
            this.motorista.cnhcategoria = ''
            this.motorista.cnhvalidade = ''
            this.motorista.email = ''
            this.motorista.telcel = ''
            this.motorista.sexo = ''
            this.motorista.estadocivil = ''
            this.motorista.tiposangueneo = ''
            this.motorista.obs = ''
            this.motorista.contrato = ''
            this.motorista.admissao = ''
            this.motorista.foto = ''
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregacadastro', (motorista) => {
            localStorage.visualiza = motorista.visualiza
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
        this.carregaTipoCondutor()
        this.novo()
    }
}
</script>
<style scoped>
</style>