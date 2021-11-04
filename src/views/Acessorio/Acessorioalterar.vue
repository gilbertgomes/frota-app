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
                                <v-text-field  label="Placa" v-model="acessorio.placa"  name="placa" :value="acessorio.placa"  @input="textToUpper('placa')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm66 md6>
                                <v-text-field  label="Veículo" v-model="acessorio.carro" name="carro" :value="acessorio.carro"  @input="textToUpper('carro')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="Acessório do veiculo" v-model="acessorio.acessorio" :rules="acessorio.acessorioRules" name="acessorio" :value="acessorio.acessorio"  @input="textToUpper('acessorio')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>    
                            <v-flex xs12 sm612 md12>
                                <v-text-field  label="obs" v-model="acessorio.obs" :rules="acessorio.obsRules" name="obs" :value="acessorio.obs"  @input="textToUpper('obs')" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            acessorio: {
              id: 0,
              placa: '',
              carro: '',
              veiculo: '',
              acessorio: '',
              acessorioRules: [ v => !!v || 'Descrição do Acessório é obrigatório!'],    
              obs: '',
              obsRules: [ v => !!v || 'Obs = do Acessório é obrigatório!'],                 
              visualiza: false,
            },
            msgadd: 'Alteração execultada com sucesso!',
            nomeFormulario: 'Alterar Acessório'
        }
    },
    methods: {
        update() {
            const  key = 'frota2021house'
            const  urlupdateacessorio = process.env.VUE_APP_HOST  + "acessorio/alt/" + key
            
            this.axios.post(urlupdateacessorio, this.acessorio)
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
            if(id == 'placa'){
                this.acessorio.placa = this.acessorio.placa.toUpperCase()
            } else if(id == 'carro'){
                this.acessorio.carro = this.acessorio.carro.toUpperCase()
            } else if(id == 'acessorio'){
                this.acessorio.acessorio = this.acessorio.acessorio.toUpperCase()
            } else if(id == 'obs'){
                this.acessorio.obs = this.acessorio.obs.toUpperCase()
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
        EventBus.$on('carregaalteracao', (acessorio) => {
            localStorage.visualiza = acessorio.visualiza
            localStorage.id = acessorio.id
            localStorage.placa = acessorio.placa
            localStorage.carro = acessorio.veiculo
            localStorage.acessorio = acessorio.acessorio
            localStorage.obs = acessorio.obs
            this.acessorio.id = localStorage.id
            this.acessorio.placa = localStorage.placa
            this.acessorio.carro = localStorage.carro
            this.acessorio.acessorio = localStorage.acessorio
            this.acessorio.obs = localStorage.obs
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