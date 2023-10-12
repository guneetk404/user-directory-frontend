<template>
  <nav>
    <ul>
      <li><router-link v-if="isLoggedIn" to="/">Home</router-link></li>
      <li><router-link to="/login">login</router-link></li>
      <li><router-link to="/signup">Sign Up</router-link></li>
      <li><router-link to="/login" @click="logout">logout</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
 created(){
  this.autoLogout(); 
 },
  data() {
    return {
      isLoggedIn: localStorage.getItem("loggedIn")  // Convert to a boolean
    };
  },
  methods: {
    logout() {
      console.log(localStorage.getItem("loggedIn"))
      localStorage.clear();
      this.isLoggedIn = false; 
    },
    autoLogout(){
      const curr =  Date.now()
      // const token = localStorage.getItem('token')
      // const tokenexpiry = btoa("token")
      // console.log(tokenexpiry);
      console.log(curr)
    }
   
},
  watch: {
    isLoggedIn(newVal,oldVal){
      console.log("in watchers")
      console.log(newVal,oldVal)
    }
    },
 
};
</script>

<style scoped>
/* Add your CSS styling for the navbar here */
nav {
  background-color: #333;
  color: white;
  padding: 10px;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}

li {
  margin-right: 10px;
  text-decoration: none;
  text-decoration-line: none;
}
a {
  text-decoration: none;
  color: beige;
}
router-link {
  color: white;
  text-decoration: none;
}
</style>
