import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Dashboard/Dashboard.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
        import ( /* webpackChunkName: "login" */ '@/views/Login/Login.vue')
  },
  {
    path: '/cadastroapoio',
    name: 'Cadastroapoio',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Navegacao/CadastroApoio.vue')
  },
  {
    path: '/estoqueapoio',
    name: 'Estoqueapoio',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Navegacao/EstoqueApoio.vue')
  },
  {
    path: '/veiculoapoio',
    name: 'Veiculoapoio',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Navegacao/VeiculoApoio.vue')
  },
  {
    path: '/rotaapoio',
    name: 'Rotaapoio',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Navegacao/RotaApoio.vue')
  },
  {
    path: '/financeiroapoio',
    name: 'Financeiroapoio',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Navegacao/FinaceiroApoio.vue')
  },
  {
    path: '/relatorioapoio',
    name: 'Relatorioapoio',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Navegacao/RelatorioApoio.vue')
  },
  {
    path: '/catalogoproduto',
    name: 'Catalogoproduto',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/CatalogoProduto/Catalogoproduto.vue')
  },
  {
    path: '/os',
    name: 'Os',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/components/Navegacao/Os.vue')
  },
  {
    path: '/catalogopreventivo',
    name: 'Catalogopreventivo',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/CatalogoPreventivo/Catalogopreventivo.vue')
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Cliente/Cliente.vue')
  },
  {
    path: '/fabricante',
    name: 'Fabricante',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Fabricante/Fabricante.vue')
  },
  {
    path: '/formapagamento',
    name: 'Formapagamento',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/FormaPagamento/Formapagamento.vue')
  },
  {
    path: '/fornecedor',
    name: 'Fornecedor',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Fornecedor/Fornecedor.vue')
  },
  {
    path: '/local',
    name: 'Local',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/LocalServico/Localservico.vue')
  },
  {
    path: '/situacao',
    name: 'Situacao',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/SituacaoStatus/Situacao.vue')
  },
  {
    path: '/situacaomotorista',
    name: 'Situacaomotorista',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/SituacaoMotorista/Situacaomotorista.vue')
  },
  {
    path: '/tipoproduto',
    name: 'Tipoproduto',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoProduto/Tipoproduto.vue')
  },
  {
    path: '/tipomotorista',
    name: 'Tipomotorista',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoMotorista/Tipomotorista.vue')
  },
  {
    path: '/tiporecdesp',
    name: 'Tiporecdesp',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoReceitaDesp/Tiporeceitadespesa.vue')
  },
  {
    path: '/tipofinanceiro',
    name: 'Tipofinanceiro',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoFinanceiro/Tipofinanceiro.vue')
  },
  {
    path: '/tipomanutencao',
    name: 'Tipomanutencao',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoManutencao/Tipomanutencao.vue')
  },
  {
    path: '/tiporota',
    name: 'Tiporota',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoRota/Tiporota.vue')
  },
  {
    path: '/tipoveiculo',
    name: 'Tipoveiculo',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoVeiculo/Tipoveiculo.vue')
  },
  {
    path: '/entrada',
    name: 'Entrada',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Estoque/Entrada/Entrada.vue')
  },
  {
    path: '/unidade',
    name: 'Unidade',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Unidade/Unidade.vue')
  },
  {
    path: '/referencia',
    name: 'Referencia',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Referencia/Referencia.vue')
  },
  {
    path: '/saida',
    name: 'Saida',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Estoque/Saida/Saida.vue')
  },
  {
    path: '/saldo',
    name: 'Saldo',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Estoque/Saldo/Saldo.vue')
  },
  {
    path: '/saldohistorico',
    name: 'Saldohistorico',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Estoque/Saldo/Saldohistorico.vue')
  },
  {
    path: '/veiculo',
    name: 'Veiculo',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Veiculo/Veiculo.vue')
  },
  {
    path: '/osserv',
    name: 'Osserv',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/OS/Os.vue')
  },
  {
    path: '/manutencao',
    name: 'Manutencao',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Manutencao/Manutencao.vue')
  },
  {
    path: '/manutencaopendente',
    name: 'Manutencaopendente',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Manutencao/Mauutencaopendente.vue')
  },
  {
    path: '/manutencaoquitada',
    name: 'Manutencaoquitada',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Manutencao/Manutencaoquitada.vue')
  },
  {
    path: '/manutencaomovimento',
    name: 'Manutencaomovimento',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Manutencao/Manutencaomoviemnto.vue')
  },
  {
    path: '/motorista',
    name: 'Motorista',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Motorista/Motorista.vue')
  },
  {
    path: '/motoristahistorico',
    name: 'Motoristahistorico',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Motorista/Motoristahistoricolist.vue')
  },
  {
    path: '/abastecimento',
    name: 'Abastecimento',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Abastecimento/Abastecimento.vue')
  },
  {
    path: '/rota',
    name: 'Rota',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Rota/Rota.vue')
  },
  {
    path: '/acessorio',
    name: 'Acessorio',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Acessorio/Acessorio.vue')
  },
  {
    path: '/rotaimpressao/:id',
    name: 'Rotaimpressao',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Rota/Rotaimprimir.vue')
  },
  {
    path: '/aprovador',
    name: 'Aprovador',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Aprovador/Aprovador.vue')
  },
  {
    path: '/tipoos',
    name: 'Tipoos',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/TipoOs/Tipoos.vue')
  },
  {
    path: '/solicitante',
    name: 'Solicitante',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Solicitante/Solicitante.vue')
  },
  {
    path: '/oc',
    name: 'Oc',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/OC/Oc.vue')
  },
  {
    path: '/financeiro',
    name: 'Financeiro',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Financeiro/Financeiro.vue')
  },
  {
    path: '/contrato',
    name: 'Contrato',
    component: () =>
        import ( /* webpackChunkName: "Dashboard" */ '@/views/Contrato/Contrato.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
