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
export default {
    name: 'RotaApoio',
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
                { bottom: '1', color: '#f57f17', text: 'Abastecimento', textitem: 'Veiculos', icon: 'mdi-water-pump' }, 
                { bottom: '2', color: '#f57f17', text: 'Manuteção', textitem: 'Veiculos', icon: 'mdi-screwdriver' },               
                { bottom: '3', color: '#f57f17', text: 'OS', textitem: '.', icon: 'mdi-file-document-edit-outline' },    
                { bottom: '4', color: '#f57f17', text: 'OC', textitem: '.', icon: 'mdi-file-cog' },    
                { bottom: '5', color: '#f57f17', text: 'Estoque', textitem: '.', icon: 'mdi-chart-box-outline' },  
                { bottom: '6', color: '#f57f17', text: 'Rotas', textitem: '.', icon: 'mdi-bus-stop' },  
            ],
        }
    },
    methods: {
         acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/rota");
            } else if (botao == '2') {
                this.$router.push("/funeraria")
            } else if (botao == '3') {
                this.$router.push("/funerariaFuncionario")
            } else if (botao == '4') {
                this.$router.push("/funerariaveiculo")
            } 
        },
        alterarItem() { //          
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
    },
    created() {}
}
</script>

<style>
</style>