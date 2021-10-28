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
    name: 'VeiculoApoio',
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
                { bottom: '1', color: 'green', text: 'Veiculo', textitem: '.', icon: 'mdi-car-estate' },
                { bottom: '2', color: 'green', text: 'Ordem', textitem: 'Serviço', icon: 'mdi-clipboard-flow-outline' },
                { bottom: '3', color: 'green', text: 'Manuteção', textitem: 'Veiculo', icon: 'mdi-wrench-outline' },
                { bottom: '4', color: 'green', text: 'Motorista', textitem: '.', icon: 'mdi-card-account-mail-outline' }, 
                { bottom: '5', color: 'green', text: 'Motorista', textitem: 'Historico', icon: 'mdi-account-details-outline' },
                { bottom: '6', color: 'green', text: 'Abastecimento', textitem: 'Veiculo', icon: 'mdi-truck-check-outline' },  
                { bottom: '7', color: 'green', text: 'Tacografo', textitem: 'Veiculo', icon: 'mdi-bus-articulated-front' },               
            ],
        }
    },
    methods: {
         acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/veiculo");
            } else if (botao == '2') {
                this.$router.push("/osserv")
            } else if (botao == '3') {
                this.$router.push("/manutencao")
            } else if (botao == '4') {
                this.$router.push("/motorista")
            } else if (botao == '5') {
                this.$router.push("/motoristahistorico")
            } else if (botao == '6') {
                this.$router.push("/abastecimento")
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