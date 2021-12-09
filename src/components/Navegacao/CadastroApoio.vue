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
    name: 'CadastroApoio',
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
                { bottom: '1', color: 'purple', text: 'Catalogo', textitem: 'Produto', icon: 'mdi-clipboard-edit-outline' },
                //{ bottom: '2', color: 'pink', text: 'Catalogo', textitem: 'Preventivo', icon: 'mdi-tools' },
                { bottom: '3', color: 'blue', text: 'Cliente', textitem: '.', icon: 'mdi-account-details' },
                { bottom: '4', color: 'green', text: 'Fabricante', textitem: '.',icon: 'mdi-factory' },
                { bottom: '5', color: '#607d8b', text: 'Forma', textitem: 'Pagamento',icon: 'mdi-cash-check' },
                { bottom: '6', color: 'cyan', text: 'Fornecedor',  textitem: '.',  icon: 'mdi-truck-fast-outline' }, 
                { bottom: '7', color: 'lime', text: 'Local',  textitem: 'Manutençao',  icon: 'mdi-hammer-screwdriver' },   
                { bottom: '8', color: 'deep black', text: 'Situação',  textitem: 'Status',  icon: 'mdi-check-outline' },   
                { bottom: '9', color: 'brown', text: 'Situação',  textitem: 'Motorista',  icon: 'mdi-account-question-outline' },    
                { bottom: '10', color: 'lime', text: 'Tipo',  textitem: 'Produto',  icon: 'mdi-cart' },  
                { bottom: '11', color: 'teal', text: 'Tipo',  textitem: 'Motorista',  icon: 'mdi-camera-front-variant' },     
                { bottom: '12', color: 'orange', text: 'Tipo',  textitem: 'DespRec',  icon: 'mdi-chart-bar' },    
                { bottom: '13', color: 'indigo', text: 'Tipo',  textitem: 'Financeiro',  icon: 'mdi-book-open-page-variant' }, 
                { bottom: '14', color: 'red', text: 'Tipo',  textitem: 'Manutenção',  icon: 'mdi-wrench-outline' },  
                { bottom: '15', color: 'grey', text: 'Tipo',  textitem: 'Rota',  icon: 'mdi-road-variant' },  
                { bottom: '16', color: '#004d40', text: 'Tipo',  textitem: 'Veículo',  icon: 'mdi-car-lifted-pickup' },  
                { bottom: '17', color: '#40c4ff', text: 'Tipo',  textitem: 'Unidade',  icon: 'mdi-collapse-all-outline' },  
                { bottom: '18', color: '#8c7b75', text: 'Tipo',  textitem: 'Referencia',  icon: 'mdi-cog-refresh-outline' },      
            ],
        }
    },
    methods: {
         acessabotao(botao) {
             
            if (botao == '1') {
                this.$router.push("/catalogoproduto");
            } else if (botao == '2') {
                this.$router.push("/catalogopreventivo")
            } else if (botao == '3') {
                this.$router.push("/cliente")
            } else if (botao == '4') {
                this.$router.push("/fabricante")
            } else if (botao == '5') {
                this.$router.push("/formapagamento")
            } else if (botao == '6') {
                this.$router.push("/fornecedor")
            } else if (botao == '7') {
                this.$router.push("/local")
            } else if (botao == '8') {
                this.$router.push("/situacao")
            } else if (botao == '9') {
                this.$router.push("/situacaomotorista")
            } else if (botao == '10') {
                this.$router.push("/tipoproduto")
            } else if (botao == '11') {
                this.$router.push("/tipomotorista")
            } else if (botao == '12') {
                this.$router.push("/tiporecdesp")
            } else if (botao == '13') {
                this.$router.push("/tipofinanceiro")
            } else if (botao == '14') {
                this.$router.push("/tipomanutencao")
            } else if (botao == '15') {
                this.$router.push("/tiporota")
            } else if (botao == '16') {
                this.$router.push("/tipoveiculo")
            } else if (botao == '17') {
                this.$router.push("/unidade")
            } else if (botao == '18') {
                this.$router.push("/referencia")
            }      
            
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