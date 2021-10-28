<template>
    <div>
        <Dashboard v-show="true"></Dashboard>
        <br>
        <v-row class="text-center" justify="center">
            <v-flex xs6 sm42 md2 v-for="item in items"  :key="item.bottom">
                <v-btn
                    class="mx-0"
                    fab
                    dark   
                    large
                    :color=item.color
                    elevation="5"
                    @click="acessabotao(item.bottom)"
                >
                <v-icon dark large>
                    {{item.icon}}
                </v-icon>
                </v-btn>
                <br>       
                <span class="custom-loader">
                    {{item.text}}
                </span>   
                <br>
                <span class="custom-loader">
                    {{item.textitem}}
                </span> 
            </v-flex>  
        </v-row>
    </div>
</template>

<script type="text/javascript">
import EventBus from '@/main.js'
export default {
    name: 'OS',
    components: {   
        Dashboard: () => import('@/components/Dashboard/Dashboard.vue'),
    },
    data() {
        return {
            Alterar: '',
            editedIndex: -1,
            dialog: false,
            usuario: {
                id: 0,
                nome: '',
                nomeRules: [v => !!v || 'Nome  do Usuário é obrigatório!'],
                senha: '',
                senhaRules: [v => !!v || 'Senha do Ué ca do Usuário é obrigatório!'],
                visualiza: false
            },
            itemsperfil: ['1 - USUÁRIO COMUM', '2 - USUÁRIO COORDENADOR', '3 - DESENVOLVEDOR', '4 - ADM'],
            itemssituacao: ['1 - ATIVO', '2 -INATIVO'],
            alterar: [],
            items: [
                { bottom: '1', color: '#ca5d90', text: 'Aprovador', textitem: 'Autorização', icon: 'mdi-air-filter' }, 
                { bottom: '2', color: '#ca5d90', text: 'Tipo', textitem: 'OS', icon: 'mdi-file-swap-outline' }, 
                { bottom: '3', color: '#ca5d90', text: 'Tipo', textitem: 'Prazo', icon: 'mdi-av-timer' },               
                { bottom: '4', color: '#ca5d90', text: 'Solicitante', textitem: '.', icon: 'mdi-gesture-tap-button' },           
                { bottom: '5', color: '#ca5d90', text: 'Ordem', textitem: 'Serviço', icon: 'mdi-format-page-break' },   
                { bottom: '6', color: '#ca5d90', text: 'Ordem', textitem: 'Compra', icon: 'mdi-calculator' },       
            ],
        }
    },
    methods: {
         acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/funerariaCad");
            } else if (botao == '2') {
                this.$router.push("/funeraria")
            } else if (botao == '3') {
                this.$router.push("/funerariaFuncionario")
            } else if (botao == '4') {
                this.$router.push("/funerariaveiculo")
            } else if (botao == '5') {
                this.$router.push("/funerariaveiculo")
            } 
        },
        alterarItem() { //
            const urlupdateusuario = process.env.VUE_APP_HOST + "usuario/alter"

            this.axios.post(urlupdateusuario, this.usuario)
                .then(response => {

                    if (response == undefined) {
                        this.isLoading = false;
                        return false;
                    }
                    if (response.status <= 201) {
                        this.alterar = response.data
                        this.isLoading = false;
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
        fechaFomulario() {
            this.dialog = false
        }
    },
    computed: {
  
    },
    mounted() { // gerencia o receber de dados de outro componente
   
    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
        this.$once("hook:beforeDestroy", () => {
            EventBus.$off('carregaalteracao')
        });
    },
    created() {}
}
</script>

<style>
</style>