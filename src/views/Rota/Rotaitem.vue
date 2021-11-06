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
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Numero da Rota" v-model="rotaitem.rota"    name="rota"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Hora Ponto Rota" v-model="rotaitem.horapontorota"  maxlength="5"  :rules="rotaitem.horapontorotaRules" name="horapontorota"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>   
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Local Ponto Rota" v-model="rotaitem.localpercurso"  :rules="rotaitem.localpercursoRules" name="localpercurso" :value="rotaitem.localpercurso" @input="textToUpper('localpercurso')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>  
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Objeto do transporte" v-model="rotaitem.objetotransporte"   :rules="rotaitem.objetotransporteRules" name="objetotransporte" :value="rotaitem.objetotransporte" @input="textToUpper('objetotransporte')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>      
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Km ponto Rota" v-model="rotaitem.kmponto"   :rules="rotaitem.kmpontoRules" name="kmponto" clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
                            </v-flex>     
                            <v-flex xs12 sm6 md6>
                                <v-text-field  label="Obs do ponto de Rota" v-model="rotaitem.obs"   :rules="rotaitem.obsRules" name="obs" :value="rotaitem.obs" @input="textToUpper('obs')"  clearable placeholder="Dense & Rounded" filled rounded dense></v-text-field>     
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
            rotaitem: {
              id: 0,
              rota: 0,
              horapontorota: '',
              horapontorotaRules: [ v => !!v || 'hora ponto da Rota é obrigatório!'],    
              localpercurso: '',
              localpercursoRules: [ v => !!v || 'Local da Rota é obrigatório!'],         
              objetotransporte: '',
              objetotransporteRules: [ v => !!v || 'Objeto da rota é obrigatório!'],   
              inicio: '',  
              kmponto: '',
              tipotransporte: 0,
              kmpontoRules: [ v => !!v || 'Km do ponto da rota é obrigatório!'],   
              obs: '',
              obsRules: [ v => !!v || 'Obs do ponto da rota é obrigatório!'],   
              visualiza: false,
            },
            msgadd: 'Cadastro execultado com sucesso0',
            nomeFormulario: 'Item da rota'
        }
    },
    methods: {
        insert() {
            const  key = 'frota2021house'
            const  urlinsertrotaitem = process.env.VUE_APP_HOST  + "rotaitem/add/" + key
            this.rotaitem.rota = localStorage.id
            this.axios.post(urlinsertrotaitem, this.rotaitem)
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
        fechaFomulario(){
            this.dialog = false
            this.alert = false
        },
        msgsucesso(){
            this.dialog1 = true
            this.alert1 = true
        },
        textToUpper(id) {
            if(id == 'localpercurso'){
                this.rotaitem.localpercurso = this.rotaitem.localpercurso.toUpperCase()
            } else if(id == 'objetotransporte'){
                this.rotaitem.objetotransporte = this.rotaitem.objetotransporte.toUpperCase()
            } else if(id == 'obs'){
                this.rotaitem.obs = this.rotaitem.obs.toUpperCase()
            }                   
        },
        fechaFomulariomsg(){
            this.dialog  = false
            this.alert   = false
            this.dialog1 = false
            this.alert1  = false
        },
        novo(){        
              this.horapontorota = ''
              this.localpercurso = ''
              this.objetotransporte = ''
              this.inicio = '' 
              this.kmponto = ''
              this.obs = ''
        },
        pegahora(){
            const  dataatual = new Date();    
            this.rotaitem.horapontorota =  dataatual.getHours() + ':' +  dataatual.getMinutes()
        }

    },
    mounted(){ // gerencia o receber de dados de outro componente
        EventBus.$on('carregaitem', (rota) => {
            localStorage.visualiza = rota.visualiza
            localStorage.id = rota.id 
            localStorage.kminicio = rota.kminicio 
            this.rotaitem.rota = localStorage.id
            this.rotaitem.inicio = localStorage.kminicio
            this.pegahora()
            this.dialog = true
            this.alert = true
        })
    },
    beforeDestroy(){ // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaitem')
        });
        this.novo()
    },
    created(){
        this.novo()
    }
}
</script>
<style scoped>
</style>