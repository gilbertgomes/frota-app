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
    name: 'EstoqueApoio',
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
                //{ bottom: '1', color: 'blue', text: 'Catalogo', textitem: 'Produto', icon: 'mdi-clipboard-edit-outline' },
                //{ bottom: '2', color: 'blue', text: 'Tipo', textitem: 'Unidade', icon: 'mdi-collapse-all-outline' },
                //{ bottom: '3', color: 'blue', text: 'Tipo', textitem: 'Referência', icon: 'mdi-cog-refresh-outline' },
                //{ bottom: '4', color: 'blue', text: 'Fornecedor', textitem: '.', icon: 'mdi-truck-fast-outline' },
                { bottom: '5', color: '#c41c00', text: 'Entrada', textitem: 'Produto', icon: 'mdi-align-vertical-top' },
                { bottom: '6', color: '#b8cc00', text: 'Saída', textitem: 'Produto', icon: 'mdi-align-vertical-bottom' },
                { bottom: '7', color: 'blue', text: 'Saldo', textitem: '.', icon: 'mdi-chart-line' }, 
            ],
        }
    },
    methods: {
         acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/catalogoproduto");
            } else if (botao == '2') {
                this.$router.push("/unidade")
            } else if (botao == '3') {
                this.$router.push("/referencia")
            } else if (botao == '4') {
                this.$router.push("/fornecedor")
            } else if (botao == '5') {
                this.$router.push("/entrada")
            } else if (botao == '6') {
                this.$router.push("/saida")
            } else if (botao == '7') {
                this.$router.push("/saldo")
            } else if (botao == '8') {
                this.$router.push("/saldo")
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