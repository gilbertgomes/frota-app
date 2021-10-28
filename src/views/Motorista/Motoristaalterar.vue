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
                                <v-text-field   label="Categoria CNH"   v-model="motorista.cnhcategoria"   :rules="motorista.cnhRules" name="cnhcategoria"    clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
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
                                <v-text-field   label="Sexo"   v-model="motorista.sexo"   :rules="motorista.sexoRules" name="sexo"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Estado Civil"   v-model="motorista.estadocivil"   :rules="motorista.estadocivilRules" name="estadocivil"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
                            </v-flex> 
                            <v-flex xs12 sm6 md6>  
                                <v-text-field   label="Tipo Condutor"   v-model="motorista.tipocondutor"   :rules="motorista.tipocondutor" name="tipocondutor"   clearable placeholder="Dense & Rounded" filled  rounded dense></v-text-field>                                    
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
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Motorista'
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlupdatemotorista = process.env.VUE_APP_HOST  + "motorista/alt/" + key
            
            this.axios.post(urlupdatemotorista, this.motorista)
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
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaalteracao', (motorista) => {
            localStorage.id = motorista.id
            localStorage.motorista = motorista.motorista
            localStorage.nascimento = motorista.nascimento
            localStorage.idade = motorista.idade
            localStorage.sexo = motorista.sexo
            localStorage.endereco = motorista.endereco
            localStorage.bairro = motorista.bairro
            localStorage.rg = motorista.rg
            localStorage.cpf = motorista.cpf
            localStorage.cnh = motorista.cnh
            localStorage.categoria = motorista.categoria
            localStorage.telcel = motorista.telcel
            localStorage.tipocondutor = motorista.tipocondutor
            localStorage.admissao = motorista.admmissao

            this.motorista.id = localStorage.id
            this.motorista.motorista = localStorage.motorista 
            this.motorista.nascimento = localStorage.nascimento
            this.motorista.idade = localStorage.idade
            this.motorista.endereco = localStorage.endereco
            this.motorista.bairro = localStorage.bairro
            this.motorista.rg = localStorage.rg
            this.motorista.cpf = localStorage.cpf
            this.motorista.cnh = localStorage.cnh
            this.motorista.cnhcategoria = localStorage.categoria
            this.motorista.telcel = localStorage.telcel
            this.motorista.sexo = localStorage.sexo
            this.motorista.admissao = localStorage.admmissao    
            this.dialog = true
            this.alert = true
            console.log(localStorage.motorista)
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