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
                { bottom: '1', color: '#b0003a', text: 'Veiculo', textitem: '.', icon: 'mdi-car-estate' },
                { bottom: '2', color: 'green', text: 'Tipo', textitem: 'Veiculo', icon: 'mdi-car-lifted-pickup' },
                { bottom: '3', color: 'green', text: 'Fabricante', textitem: '.', icon: 'mdi-factory' },
                { bottom: '4', color: 'green', text: 'Acessório', textitem: 'Veículo', icon: 'mdi-bus-alert' },
                { bottom: '5', color: 'green', text: 'Categoria', textitem: 'Peça / Serviço', icon: 'mdi-pipe-wrench' },     
                { bottom: '6', color: '#5c007a', text: 'Ordem', textitem: 'Serviço', icon: 'mdi-clipboard-flow-outline' },
                { bottom: '7', color: 'green', text: 'Manuteção', textitem: 'Veiculo', icon: 'mdi-wrench-outline' },
                { bottom: '8', color: 'green', text: 'Tipo', textitem: 'Motorista', icon: 'mdi-camera-front-variant' }, 
                { bottom: '9', color: '#0081cb', text: 'Motorista', textitem: '', icon: 'mdi-card-account-mail-outline' }, 
                { bottom: '10', color: 'green', text: 'Motorista', textitem: 'Historico', icon: 'mdi-account-details-outline' },
                { bottom: '11', color: 'green', text: 'Abastecimento', textitem: 'Veiculo', icon: 'mdi-truck-check-outline' },  
               //{ bottom: '10', color: 'green', text: 'Tacografo', textitem: 'Veiculo', icon: 'mdi-bus-articulated-front' },  
               
            ],
        }
    },
    methods: {
         acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/veiculo");
            } else if (botao == '2') {
                this.$router.push("/tipoveiculo")
            } else if (botao == '3') {                
                this.$router.push("/fabricante")
            } else if (botao == '4') {
                this.$router.push("/acessorio")
            } else if (botao == '5') {
                this.$router.push("/categoriaps")
            } else if (botao == '6') {
                this.$router.push("/osserv")
            } else if (botao == '7') {
                this.$router.push("/manutencao")
            } else if (botao == '8') {
                this.$router.push("/tipomotorista")
            } else if (botao == '9') {
                this.$router.push("/motorista")
            } else if (botao == '10') {
                this.$router.push("/motoristahistorico")
            } else if (botao == '11') {
                this.$router.push("/abastecimento")
            } else if (botao == '12') {
                this.$router.push("/categoriaps")
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