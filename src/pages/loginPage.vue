<template>
  <div class="login-container">
    <h2>Sign In</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="btnlogin">
        <button type="submit" class="login-button">Login</button>
      </div>
    </form>
    <h3>Sign in using Google Account</h3>
    <GoogleLogin :callback="handleGoogleLogin" class="google-login" />
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
      const user = decodeCredential(response.credential);
      const accessToken = response.credential;
      const clientId = response.clientId;
      // console.log(response)
      console.log(user);
      const profileURl = user.picture;

      // console.log("Google Access Token:", accessToken);
      // console.log("client id:", clientId)

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
        // console.log(loginData);
        if (loginData.data.success) {
          localStorage.setItem("token", loginData.data.token);
          localStorage.setItem("email", loginData.data.email);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("picture",profileURl)
          
          await router.push("/");
          toast.success("Successfully Logged in:)", { autoclose: 5000 });
          // console.log(loginData.data);
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
.login-container {
  margin-top: 50px;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  margin-bottom: 20px;
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
  border-radius: 3px;
}
.login-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.btnlogin {
  display: flex;
  align-items: center;
  justify-content: center;
}

button.login-button:hover {
  background-color: #0056b3;
}

h3 {
  font-size: 18px;
}

.google-login {
  margin-top: 20px;
}
</style>
