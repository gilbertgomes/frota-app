//import EventBus from '@/main.js'
export default {
    name: 'dashboard',
    data: () => ({
        value: 'recent',
        A_L: 100,
        opcao: '',
        tab: null,
        botao: 120,
        visualiza: false,
        cor: 'cyan',
        icone: 'mdi-account-group',
        items: [
            { tab: 'One', content: 'Tab 1 Content', text: 'Sair', bottom: '1', icon: 'mdi-close-thick' },
            { tab: 'Two', content: 'Tab 2 Content', text: 'Cadastros', bottom: '2', icon: 'mdi-clipboard-text-outline' },
            { tab: 'Tree', content: 'Tab 3 Content', text: 'Estoque', bottom: '3', icon: 'mdi-tune-vertical-variant' },
            { tab: 'Four', content: 'Tab 4 Content', text: 'Veiculos', bottom: '4', icon: 'mdi-truck-fast' },
            { tab: 'Five', content: 'Tab 5 Content', text: 'Rotas', bottom: '5', icon: 'mdi-vanity-light' },
            { tab: 'Six', content: 'Tab 6 Content', text: 'OS / OC', bottom: '6', icon: 'mdi-file-replace-outline' },
            { tab: 'Seven', content: 'Tab 7 Content', text: 'Financeiro', bottom: '7', icon: 'mdi-cash-refund' },           
            { tab: 'Eight', content: 'Tab 8 Content', text: 'Estatisticas', bottom: '8', icon: 'mdi-chart-bar-stacked' },
            { tab: 'Nine', content: 'Tab 9 Content', text: 'Relatórios', bottom: '9', icon: 'mdi-printer' },
        ],
    }),
    methods: {
        acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/login");
            } else if (botao == '2') {
                this.$router.push("/cadastroapoio")
            } else if (botao == '3') {
                this.$router.push("/estoqueapoio")
            } else if (botao == '4') {
                this.$router.push("/veiculoapoio")
            } else if (botao == '5') {
                this.$router.push("/rotaapoio")
            } else if (botao == '6') {
                this.$router.push("/os")  
            } else if (botao == '7') {                
                this.$router.push("/financeiroapoio")              
            }  else if (botao == '8') {
                this.$router.push("/estatistica")
            }  else if (botao == '9') {
                this.$router.push("/relatorioapoio")
            }
        },
    },
    mounted() {

    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {}

}