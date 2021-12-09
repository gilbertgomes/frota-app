<template>
  <v-app>   
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {  
          loader: null,    
        }
    },
    methods: {
      verificalogin(){
        if(localStorage.user  === ''){
          this.$router.push({ path: '/login' })          
        } else {
          this.$router.push({ path: '/dashboard' })
        }     
      },
      verificatela(){
        window.addEventListener("beforeunload", function (e) {
          let confirmationMessage = "teste";
          (e || window.event).returnValue = confirmationMessage; //Gecko + IE
          return confirmationMessage;                            //Webkit, Safari, Chrome
        })
      }
      
    },
    mounted() {
      this.verificatela()
    },
    created() {
        document.title = this.$appName; 
        this.verificalogin()        
    },
};   
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

