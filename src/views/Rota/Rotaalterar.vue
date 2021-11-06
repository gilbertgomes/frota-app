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
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="motorista"
                                    item-text="nome" 
                                    item-value="id"
                                    label="Nome do Motorista"
                                    dense
                                    outlined
                                    v-model="rota.motorista"
                                    value = 'Selecione o Motorista da ROTA'
                                    clearable
                                ></v-select>
                            </v-flex> 
                            <v-flex xs12 sm6 md6>
                                <v-select
                                    :items="veiculo"
                                    item-text="placa" 
                                    item-value="id"
                                    label="Placa veiculo"
                                    dense
                                    outlined
                                    v-model="rota.veiculo"
                                    value = 'Selecione o Veiculo'
                                    clearable
                                ></v-select>
                            </v-flex> 
                             <v-flex xs12 sm612 md12>
                                <v-text-field  label="Obs" v-model="rota.obs" :rules="rota.obsRules" name="obs" :value="rota.obs" @input="textToUpper('obs')"   clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            cadastrar: [],
            rota: {
              id: 0,
              data: '',
              motorista: '',
              motoristaid: '',
              motoristaRules: [ v => !!v || 'Motorista é obrigatório!'],
              veiculo: '',
              veiculoid: '',
              veiculoRules: [ v => !!v || 'Veiculo é obrigatório!'],
              kminicio: '',
              kminicioRules: [ v => !!v || 'KM Inicio é obrigatório!'],
              obs: '',
              obsRules: [ v => !!v || 'Obs é obrigatório!'],
              situacao: '',         
              visualiza: false
            },
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Rota'
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdaterota = process.env.VUE_APP_HOST  + "rota/alt/" + key
            
            this.axios.post(urlupdaterota, this.rota)
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
        carregaveiculo(){  
            this.isLoading = true; 
            const  urlfveiculo = process.env.VUE_APP_HOST + "veiculo/search/" +1

            this.axios.get(urlfveiculo).then((response) => {
                
                let respostaurl = response.status
                
                if (respostaurl <= 201){// caso o response execute o post salvando os dados             
                    this.veiculo = response.data      
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
                this.rota.obs = this.rota.obs.toUpperCase()
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
        EventBus.$on('carregaalteracao', (rota) => {
            localStorage.visualiza = rota.visualiza
            localStorage.id         = rota.id
            localStorage.veiculoid = rota.veiculo
            localStorage.motoristaid = rota.motorista
            this.rota.id = localStorage.id
            this.rota.motorista = localStorage.motorista
            this.rota.veiculo =  localStorage.veiculo

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
        this.carregamotorista()
        this.carregaveiculo()
    }
}
</script>
<style scoped>
</style>