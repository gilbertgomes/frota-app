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
                { bottom: '3', color: '#ca5d90', text: 'Categoria', textitem: 'Peça / Serviço', icon: 'mdi-pipe-wrench' },               
                { bottom: '4', color: '#ca5d90', text: 'Solicitante', textitem: '.', icon: 'mdi-gesture-tap-button' },  
                { bottom: '5', color: '#ca5d90', text: 'Tipo', textitem: 'Manutenção', icon: 'mdi-wrench-outline' },  
                { bottom: '6', color: '#ca5d90', text: 'Fornecedor', textitem: '.', icon: 'mdi-truck-fast-outline' },
                { bottom: '7', color: '#ca5d90', text: 'Local', textitem: 'Manutenção', icon: 'mdi-hammer-screwdriver' },        
                { bottom: '8', color: '#4a0072', text: 'Ordem', textitem: 'Serviço', icon: 'mdi-format-page-break' },   
                { bottom: '9', color: '#00600f', text: 'Ordem', textitem: 'Compra', icon: 'mdi-calculator' },       
            ],
        }
    },
    methods: {
         acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/aprovador");
            } else if (botao == '2') {
                this.$router.push("/tipoos")
            } else if (botao == '3') {
                this.$router.push("/categoriaps")
            } else if (botao == '4') {
                this.$router.push("/solicitante")
            } else if (botao == '5') {
                this.$router.push("/tipomanutencao")
            } else if (botao == '6') {
                this.$router.push("/fornecedor")
            } else if (botao == '7') {
                this.$router.push("/local")
            } else if (botao == '8') {
                this.$router.push("/osserv")
            } else if (botao == '9') {
                this.$router.push("/oc")
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