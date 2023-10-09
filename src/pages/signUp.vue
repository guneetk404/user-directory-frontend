<template>
  <div class="container">
    <h2 class="centered-form">Sign up</h2>

    <form @submit.prevent="signUp" class="centered-form">
      <div class="form-row">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="Name"
            v-model="name"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputPhone">Phone</label>
          <input
            type="number"
            class="form-control"
            id="inputPhone"
            placeholder="Contact Number"
            v-model="phone"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            v-model="address"
          />
        </div>
        <div class="form-group">
          <label for="inputCity">City</label>
          <input
            type="text"
            v-model="city"
            class="form-control"
            id="inputCity"
          />
        </div>
        <div class="form-group">
          <label for="inputState">State</label>
          <select id="inputState" v-model="state" class="form-control">
            <option value="" selected disabled>Choose...</option>
            <option v-for="state in indianStates" :key="state">
              {{ state }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputZip">Zip</label>
          <input type="text" class="form-control" v-model="zip" id="inputZip" />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      indianStates: [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
      ],
      name: "",
      email: "",
      password: "",
      phone: null,
      image: "",
      address: "",
      city: "",
      state: "",
      zip: null,
    };
  },
  methods: {
    async signUp() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone,
          image: this.image,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
        };
        const signUpData = await axios.post(
          "http://localhost:3000/signup",
          data
        );
        if (signUpData.data.success) {
          await router.push("/login");
          toast.success("Successfully Signed Up ", { autoclose: 5000 });
        }else{
          toast.error(signUpData.data.message);
        }
      } catch (err) {
        console.log("error", err);
        console.log("hhhh");
        toast.error("Sorry unable to Sign up ", { autoclose: 5000 });
      }
    },
  },
};
</script>

<style scoped>
/* Center the form using Flexbox */
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh; /* Adjust the height as needed for vertical centering */
}

.centered-form {
  width: 100%;
  max-width: 600px; /* Adjust the maximum width as needed */
}

/* Rest of your styles */
</style>
