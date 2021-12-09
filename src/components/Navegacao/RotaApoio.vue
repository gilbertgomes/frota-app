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
                { bottom: '1', color: '#b71c1c', text: 'Motorista', textitem: 'Transporte', icon: 'mdi-card-account-mail-outline' }, 
                { bottom: '2', color: '#b71c1c', text: 'Cliente', textitem: 'Transporte', icon: 'mdi-account-details' }, 
                { bottom: '3', color: '#79b700', text: 'Rota', textitem: 'Transporte', icon: 'mdi-vector-polyline-plus' }, 
                { bottom: '4', color: '#b71c1c', text: 'ponto', textitem: 'Rota', icon: 'mdi-highway' },               
                { bottom: '5', color: '#b71c1c', text: 'Escala', textitem: '.', icon: 'mdi-transit-transfer' },    
            ],
        }
    },
    methods: {
         acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/motorista");
            } else if (botao == '2') {
                this.$router.push("/cliente")
            } else if (botao == '3') {
                this.$router.push("/rota")
            } else if (botao == '4') {
                this.$router.push("/funerariaveiculo")
            } else if (botao == '4') {
                this.$router.push("/funerariaveiculo")
            } else if (botao == '4') {
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