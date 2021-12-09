<template>
   <v-app>    
         <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12" height="570" flat>
                    <div>
                      <v-responsive :color=cor>   
                          <img src='@/assets/logofrota.jpg' alt="Responsive image" height="100px" width="100%" class="img-fluid">  
                      </v-responsive> 
                    </div>
                    <v-flex xs12 sm12 md12>
                        <v-alert
                            dense
                            text
                            icon="mdi-truck-delivery"
                            color="teal"
                            >
                            <strong>Gerencimento Frota Veículos</strong>
                        </v-alert>
                    </v-flex>
                    <v-alert :value="alert" color="red"  type="error" icon="mdi-cloud-alert">{{textalert}}<span></span></v-alert>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                v-model="nome"
                                :rules="usuarioRules"
                                maxlength="14"
                                label="Usuário"
                                name="usuario"
                                prepend-icon="mdi-account"
                                type="text"
                            ></v-text-field>
                            <v-text-field
                                v-model="senha"
                                :rules="senhaRules"
                                id="password"
                                label="Senha"
                                name="senha"
                                prepend-icon="mdi-lock"
                                type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <span :color=this.cor>Informe o resultado</span>
                    <v-card-text>
                      <v-row justify="center">                      
                        <my-captcha required="true" :callSuccess="captchaOk" resolve="text" color="teal"></my-captcha>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="center">
                            <v-btn
                                v-model="btn_entrar"
                                v-show="this.visualiza"
                                width="150"
                                height="45"
                                rounded
                                large
                                :color=this.cor
                                class="smf-gradient"
                                dark
                                @click.prevent="login()"
                                >
                                <v-icon dark>mdi-account-check-outline</v-icon>
                                Entrar
                            </v-btn>                            
                            <v-btn
                                v-model="btn_registrar"
                                v-show="false"
                                width="150"
                                height="45"
                                rounded
                                large
                                :color=this.cor
                                class="smf-gradient"
                                dark
                                @click.prevent="registrar()"
                                >
                                <v-icon dark>mdi-account-question-outline</v-icon>
                                Registrar
                            </v-btn>
                        </v-row>                        
                    </v-card-actions>
                    <v-overlay :value="overlay">
                      <v-progress-circular indeterminate  size="64" button color="red" :width="9">
                      </v-progress-circular>
                    </v-overlay>
                  </v-card>
                </v-flex>
            </v-layout>
         </v-container>
   </v-app>
</template>

<script>
//import sha256 from "js-sha256";
import myCaptcha from 'vue-captcha'
export default {
    name: 'Login',
    props: {
      source: String,
    },
    components: {
      'my-captcha': myCaptcha
    },
    data () {
      return {
        nome: '', 
        nomeRules: '', 
        usuario: '',
        usuarioRules: [ v => !!v || 'Nome  do Usuário é obrigatório!'], 
        senha: '', 
        senhaRules: [ v => !!v || 'Senha do Usuário é obrigatório!'], 
        corBotao: '', 
        isLoading: false,
        fullPage:   true,  
        user: {
          usuario: '',
          senha: ''
        },
        cor: 'cyan',
        overlay: false, 
        gerenciar: [],
        btndis: true,
        btn_entrar: false,
        btn_registrar: false,
        visualiza: false,
        alert: false,
        textalert: '',
        erro: '',

      }
    },
    methods: {
        login() {
          if(this.nome == 'ADM' && this.senha == '123')
          {
            this.$router.push("/dashboard");
            localStorage.user = this.nome
            localStorage.senha = this.senha 
          } else {
            this.nome = ''
            this.senha = ''
            window.localStorage.clear(); 
            this.textalert = 'Erro de autenticação de usuario ou senha, verique!'
            this.alert = true
            location.reload() 
          }
          /*
          this.overlay = true; 
          const  urllogin = process.env.VUE_APP_HOST_LOGIN + "usuario/chek/1" // api de autenticação
          this.user.usuario  = this.nome
          this.user.senha = this.senha

          this.axios.post(urllogin, this.user).then((response) => {
            
            let respostaurl = response.status
            
            if (respostaurl <= 201){//caso o response execute o post salvando os dados                 
              this.gerenciar = response.data  
                console.log(this.gerenciar)
                if(this.gerenciar.token == '0'){//caso o response retorne algum erro ao tentar autenticar  user e senha
                  this.erro = 'S' 
                  this.textalert = 'Erro de autenticação de usuario ou senha, verique!'
                  this.alert = true
                  location.reload()  
                } else if(this.gerenciar.token != '0'){ //processo de autenticação correto
                    this.erro = 'N'         
                    this.gerenciar = response.data 
                    this.$router.push("/dashboard");
                    this.overlay = false
                }         
            } else {// caso o response retrone algum erro ao tentar salvar os dados 
              this.textalert = 'Ocorreu algum erro nos dados deste Pedido, verifique com o adm do sistema!'
              this.alert = true 
            }
            this.isLoading = false;  
          }).catch((error) => {
            this.overlay = false
            this.erro = error.message;
            console.log('erroooo: '+this.erro)
          });        
          */
        },
        registrar(){
           this.$router.push({ path: '/signup' })
        },
        captchaOk () {
          if(this.nome != '' || this.senha != '' ){
            this.visualiza = true
          }else{
            this.textalert = 'Campos usuário ou senha em branco, verifique!'
            this.alert = true 
            location.reload()         
          }
        },
        captchaBtn () {
          this.btndis = false
        },
        clicked () {
          alert('button active.!')
        },
        vericaErro(){
          if(this.erro != 'N'){
           alert('teste')
          }
        }

    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
};
</script>
<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
  .form {
    margin: 10px;
  }
  .row {
    margin: 10px;
  }
  .button {
    margin-top: 5px;
    background-color: #1D9D74;
    border: 1px solid transparent;
    border-radius: 3px;
    border-color: #dbdbdb;
    text-align: center;
    font-size: 1em;
    height: 2.25em;
    line-height: 1.5;
    color: white;
    cursor: pointer;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
  }
  .button[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
</style>
