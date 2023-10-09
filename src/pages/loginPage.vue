<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <h3>Sign in using google Account</h3>
    <GoogleLogin :callback="handleGoogleLogin" prompt />
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";
import router from "@/router";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data() {
    return {
      username: "",
      password: "",
      gmail: "",
    };
  },
  methods: {
    async handleGoogleLogin(response) {
      // Decode the Google login credential to access the access token
      const user = decodeCredential(response.credential);

      const accessToken = response.credential;
      const clientId = response.clientId;
      // console.log(response)
      console.log(user);
      console.log("Google Access Token:", accessToken);

      const data = {
        email: user.email,
        accessToken: accessToken,
        clientId: clientId,
      };
      try {
        const loginData = await axios.post(
          "http://localhost:3000/google-login",
          {
            data,
          }
        );

        if (loginData.data.success) {
          localStorage.setItem("token", loginData.data.token);
          localStorage.setItem("email", loginData.data.email);
          localStorage.setItem("loggedIn", "true");
          await router.push("/");
          toast.success("Successfully Logged in:)", { autoclose: 5000 });
          console.log(loginData.data);
        }
      } catch (error) {
        toast.error("Google Login Failed", { autoclose: 5000 });
        console.error(error);
      }
    },

    async login() {
      try {
        // console.log("inside login");
        let data = {
          email: this.username,
          password: this.password,
        };
        const loginData = await axios.post("http://localhost:3000/login", data);
        // console.log(loginData.data.success);
        if (loginData.data.success) {
          console.log("login", loginData);
          localStorage.setItem("token", loginData.data.token);
          localStorage.setItem("email", loginData.data.email);
          localStorage.setItem("loggedIn", "true");
          await router.push("/");
          toast.success("Successfully Logged in:)", { autoclose: 5000 });
          console.log(loginData.data);
        }
      } catch (error) {
        toast.error("Wrong Id or Password", { autoclose: 5000 });

        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your CSS styling for the login form here */
h2 {
  text-align: center;
}

form {
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
