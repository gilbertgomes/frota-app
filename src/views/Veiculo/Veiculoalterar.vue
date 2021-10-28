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
            alterar: [],
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
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Veiculo'
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdateveiculo = process.env.VUE_APP_HOST  + "veiculo/alt/" + key
            
            this.axios.post(urlupdateveiculo, this.veiculo)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.alterar = response.data   
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
        }
    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaalteracao', (veiculo) => {
            localStorage.visualiza = veiculo.visualiza
            localStorage.id = veiculo.id
            localStorage.placa = veiculo.placa
            localStorage.veiculo = veiculo.veiculo
            localStorage.modelo = veiculo.modelo
            localStorage.ano = veiculo.ano
            localStorage.chassis = veiculo.chassis
            localStorage.kminicial = veiculo.kminicial
            localStorage.acessorio = veiculo.acessorio
            
            this.veiculo.id = localStorage.id
            this.veiculo.placa = localStorage.placa
            this.veiculo.veiculo = localStorage.veiculo
            this.veiculo.modelo = localStorage.modelo
            this.veiculo.ano = localStorage.ano
            this.veiculo.chassis = localStorage.chassis
            this.veiculo.kminicial = localStorage.kminicial
            this.veiculo.acessorio = localStorage.acessorio
         
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