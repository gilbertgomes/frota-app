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
                                <v-text-field  label="Placa do veículo" v-model="abastecimento.placaveiculo" name="placa" @blur="carregaveiculo(placaveiculo)"  length="9" :value="abastecimento.placaveiculo" @input="textToUpper('placaveiculo')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Veiculo" v-model="abastecimento.modeloveiculo" name="veiculo"  :value="modeloveiculo" @input="textToUpper('modeloveiculo')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
                                <v-text-field  label="Hora Abastecimento" v-model="abastecimento.horabast" :rules="abastecimento.horaabastRules" name="kmatual"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Obs" v-model="abastecimento.obs" name="obs"  :value="abastecimento.obs" @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Motorista" v-model="abastecimento.motorista"  name="motorista"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex> 
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Fornecedor" v-model="abastecimento.fornecedor" name="fornecedor"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
                        {{ this.msgaalt }}
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
              horabast: '',
              horabastRules: [ v => !!v || 'HS Abastecimento é obrigatório!'],
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
            msgaalt: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Abastecimento'
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdateabastecimento = process.env.VUE_APP_HOST  + "abastecimento/alt/" + key
            
            this.axios.post(urlupdateabastecimento, this.abastecimento)
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
            if(id == 'obs'){
                this.abastecimento.obs = this.abastecimento.obs.toUpperCase()
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
        EventBus.$on('carregaalteracao', (abastecimento) => {
            localStorage.visualiza = abastecimento.visualiza
            localStorage.id = abastecimento.id
            localStorage.placa = abastecimento.placa
            localStorage.veiculo = abastecimento.modelo
            localStorage.kmatual = abastecimento.kmatual
            localStorage.marcador = abastecimento.marcador
            localStorage.horabast = abastecimento.horabast
            localStorage.motorista = abastecimento.motorista
            localStorage.quantidade = abastecimento.quantidade
            localStorage.valorun = abastecimento.valorun
            localStorage.valortot = abastecimento.valortot
            localStorage.fornecedor = abastecimento.fornecedor
            localStorage.obs = abastecimento.obs
            localStorage.rcnumero = abastecimento.rcnumero
            
            this.abastecimento.id  = localStorage.id
            this.abastecimento.placa = localStorage.placa
            this.abastecimento.veiculomodelo = localStorage.veiculo
            this.abastecimento.kmatual = localStorage.kmatual
            this.abastecimento.marcador = localStorage.marcador
            this.abastecimento.horabast = localStorage.horabast
            this.abastecimento.quantidade = localStorage.quantidade
            this.abastecimento.valorun = localStorage.valorun
            this.abastecimento.valortot = localStorage.valortot
            this.abastecimento.rcnumero = localStorage.rcnumero
            this.abastecimento.motorista = localStorage.motorista
            this.abastecimento.fornecedor = localStorage.fornecedor
            this.abastecimento.obs = localStorage.obs

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