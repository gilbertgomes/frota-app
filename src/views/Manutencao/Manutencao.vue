<template>
    <div>
        <Dashboard v-show="true"></Dashboard>
        <v-card>
            <v-tabs
                dark
                :background-color=this.cor
                class="smf-gradient"
                show-arrows
                height="75px"
                rounded
                centered
            >
            <v-tabs-slider rounded :color=cor class="smf-gradient"></v-tabs-slider>

                <v-tab
                v-for="item in items"
                :key="item.tab"
                rounded
                >
                <v-btn rouded elevation="2" small class="smf-gradient" :color=cor :width=botao :height=botao dark @click="acessabotao(item.bottom)">
                    <v-card :color=cor elevation="0"> 
                    <span class="custom-loader">
                        <v-icon  large>{{item.icon}}</v-icon>
                    </span> 
                    <br>   
                    <span class="custom-loader">
                        {{item.text}} 
                    </span>
                    <br> 
                    <br>
                    <span class="custom-loader">
                        {{item.textitem}} 
                    </span>
                    </v-card>  
                </v-btn>
                </v-tab>
            </v-tabs>
        </v-card>  
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'Manutencao',
    components: {   
        Dashboard: () => import('@/components/Dashboard/Dashboard.vue'),
    },
    data: () => ({
        value: 'recent',
        A_L: 50,
        opcao: '',
        tab: null,
        botao: 100,
        visualiza: false,
        cor: '#8c7b75',
        icone: 'mdi-account-group',
        items: [
            { tab: 'One', content: 'Tab 1 Content', text:  'Pendente', bottom: '1', icon: 'mdi-tools' },
            { tab: 'Two', content: 'Tab 2 Content', text:  'Concluida', bottom: '2', icon: 'mdi-thumb-up' },
            { tab: 'Tree', content: 'Tab 3 Content', text: 'Movimento', bottom: '3', icon: 'mdi-train-car' },            
        ],
    }),
    methods: {
        acessabotao(botao) {
            if (botao == '1') {
                this.$router.push("/manutencaopendente");
            } else if (botao == '2') {
                this.$router.push("/manutencaoquitada")
            } else if (botao == '3') {
                this.$router.push("/manutencaomovimento")
            } 
        },
    },
    mounted() {

    },
    beforeDestroy() { // gerencia o DESTROY do event do componenente
    },
    created() {}

}
</script>
<style scoped>
</style>