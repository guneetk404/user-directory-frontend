<template>
  <h2>Home page</h2>
  <p>name:{{ name }}</p>
  <p>email:{{ email }}</p>
  <p>phone:{{ phone }}</p>
  <p>address:{{ address }}</p>
  <p>city:{{ city }}</p>
  <p>zip:{{ zip }}</p>
  <p>state:{{ state }}</p>
</template>

<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
import router from "@/router";


export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      phone: null,
      image: "",
      address: "",
      city: "",
      state: "",
      zip: null,
      token: localStorage.getItem("token"),
      tokenExpiry: null,
      timeRemaining: null,
      logoutTimer: null,
    };
  },
  methods: {
    tokenTime() {
      const decodedToken = jwtDecode(this.token);
      this.tokenExpiry = new Date(decodedToken.exp * 1000);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      this.timeRemaining = this.tokenExpiry - currentTimestamp;
      console.log(this.timeRemaining)
    },
    async autoLogout() {
      if (this.timeRemaining > 0) {
        this.logoutTimer = setTimeout(() => {
          localStorage.removeItem('token')
          router.push('/login');
        }, this.timeRemaining * 1000)
      }
    }
  },
  created() { 
    this.tokenTime();
    // this.autoLogout();
  },
  async mounted() {
    try {
      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // console.log(email);
      const response = await axios.get(`http://localhost:3000/user/${email}`, {
        headers,
      });
      console.log(response.data.success);
      this.name = response.data.body.name;
      this.email = response.data.body.email;
      this.phone = response.data.body.phone;
      this.address = response.data.body.address;
      this.state = response.data.body.state;
      this.zip = response.data.body.zip;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
