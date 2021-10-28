<template>
   <v-app>    
         <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12" height="670" flat>
                    <div>
                      <v-responsive :color=cor>   
                          <img src='@/assets/logo.jpg' alt="Responsive image" height="90px" width="100%" class="img-fluid">  
                      </v-responsive> 
                    </div>
                    <v-card-text>
      
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm12 md12>
                            <v-text-field v-model="usuario.nome" :rules="usuario.nomeRules" label="Nome"  name="nome" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex>   
                          <v-flex xs6 sm6 md6>
                            <v-text-field v-model="usuario.senha" :rules="usuario.senhaRules" label="Senha"  type="password" name="senha" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex> 
                          <v-flex xs6 sm6 md6>
                            <v-text-field v-model="usuario.senha" :rules="usuario.senhaRules" label="Confirme sua Senha"  type="password" name="senha" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex> 
                          <v-flex xs6 sm6 md6>
                            <v-select  v-model="usuario.tipo_doc" :items="itemsdoc" :rules="usuario.tipo_docRules"   label="Tipo Doc" name="tipo_doc"></v-select>
                          </v-flex>   
                          <v-flex xs6 sm6 md6>
                            <v-text-field v-model="usuario.documento"  :rules="usuario.documentoRules" label="Documento"  name="documento" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex> 
                          <v-flex xs6 sm6 md6>
                            <v-text-field v-model="usuario.cel"  :rules="usuario.celRules" v-mask="'(##) ####-####'" label="CEL/TEL"  name="cel" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex>
                          <v-flex xs6 sm6 md6>
                            <v-text-field v-model="usuario.email"  :rules="usuario.emailRules" label="Email"  name="email" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex>
                          <v-flex xs6 sm6 md6>
                            <v-select  v-model="usuario.perfil" :items="itemsperfil" :rules="usuario.perfilRules"   label="Perfil" name="perfil"></v-select>
                          </v-flex> 
                          <v-flex xs6 sm6 md6>
                            <v-text-field v-model="usuario.data_cadastro"  :rules="usuario.data_cadastroRules" v-mask="'##/##/####'" label="Data"  name="data" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex> 
                          <v-flex xs6 sm6 md6>
                            <v-text-field v-model="usuario.lotacao" :rules="usuario.lotacaoRules" label="Lotação"  name="lotacao" value="Input text" class="input-group--focused">
                            </v-text-field>
                          </v-flex>   
                          <v-flex xs6 sm6 md6>
                            <v-select  v-model="usuario.situacao" :items="itemssituacao" :rules="usuario.situacaoRules"   label="Situação" name="situacao"></v-select>
                          </v-flex>
                        </v-layout>
                      </v-container>

                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="center">
                            <v-btn
                                width="150"
                                height="45"
                                rounded
                                large
                                :color=this.cor
                                class="smf-gradient"
                                dark
                                v-bind:disabled="validar"
                                @click.prevent="salvarlogin()"
                                >
                                <v-icon dark>mdi-account-check-outline</v-icon>
                                Cadastrar
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
export default {
    name: 'signup',
    props: {
      source: String,
    },
    components: {
      //'my-captcha': myCaptcha
    },
    data () {
      return {
        usuario: {
            id: 0,
            nome: '',
            nomeRules: [ v => !!v || 'Nome  do Usuário é obrigatório!'], 
            senha: '',
            senhaRules: [ v => !!v || 'Senha do Ué ca do Usuário é obrigatório!'],
            tipo_doc: '',
            tipo_docRules: [ v => !!v || 'Tipo Doc  do Usuário é obrigatório!'],
            documento: '',
            documentoRules: [ v => !!v || 'Nº Documento  do Usuário é obrigatório!'],
            cel: '',
            celRules: [ v => !!v || 'Cel do Usuário é obrigatório!'],
            email: '',
            emailRules: [ v => !!v || 'Email  do Usuário é obrigatório!'],
            perfil: '',
            perfilRules: [ v => !!v || 'Perfil do Usuário ca do Usuário é obrigatório!'],
            data_cadastro: '',
            data_cadastroRules: [ v => !!v || 'Data cadastro do Usuário é obrigatório!'],
            lotacao: '',
            lotacaoRules: [ v => !!v || 'Lotação do Usuário é obrigatório!'],
            situacao:  '', 
            situacaoRules:  [ v => !!v || 'Situação do Usuário é obrigatório!'],
            visualiza: false
        },
        itemsdoc: ['1 - RG', '2 - CPF', '3 - CNH', '4 - CNT', '4 - CTN', '5 - OUTROS'],
        itemsperfil: ['1 - USUÁRIO COMUM', '2 - USUÁRIO COORDENADOR', '3 - DESENVOLVEDOR', '4 - ADM'],
        itemssituacao: ['1 - ATIVO'],
        cor: '#00979E',
        overlay: false,
        visualiza: false, 
        gerenciar: []      
      }
    },
    methods: {
        salvarlogin(){
            const  urlapi   = 'api/'
            const  urlinsertusuario = process.env.VUE_APP_HOST  + urlapi +  "usuario/insert"
            
            this.axios.post(urlinsertusuario, this.usuario)
            .then(response => {           
    
              if (response == undefined) {
                  this.isLoading = false;
                return false;
              }  
              if (response.status <= 201) {
                 this.cadastrar = response.data   
                 console.log(response.data )
                 this.isLoading = false; 
                 this.$router.push("/login");
                 return true;
              } else {
                return false;
              }
            })
            .catch(error => {
              this.isLoading = false;
              alert(error);
            })
        },
    },
    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
    computed: {
      validar: function() {
        return this.cpf == "" || this.senha == "";
      },
    },
};
</script>
<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }
</style>
