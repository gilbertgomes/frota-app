<template>
<div>    
    <v-card  height="140">
        <img src='@/assets/logofrota.jpg' width="100%" height="140"  class="img-fluid">  
    </v-card>
    <v-card>
      <v-responsive> 
        <v-tabs
          dark
          :background-color=this.cor
          class="smf-gradient"
          show-arrows
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          height="80px"
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
      </v-responsive>
    </v-card>     
</div>
</template>
<script type="text/javascript" src="./Dashboard.js"></script>
