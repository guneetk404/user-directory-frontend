<!-- <template>
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
            placeholder="Kh Road argusoft ..."
            v-model="address"
          />
        </div>
        <div class="form-group">
          <label for="inputZip">Zip</label>
          <input
            type="text"
            class="form-control"
            v-model="zip"
            id="inputZip"
            @blur="fetchPincode"
          />
        </div>
        <div class="form-group">
          <label for="inputCity">City</label>
          <input
          disabled
            type="text"
            v-model="city"
            class="form-control"
            id="inputCity"
          />
        </div>
        <div class="form-group">
          <label for="inputState">State</label>
          <input
          disabled
          type="text"
          v-model="state"
          class="form-control"
          id="inputState"
        />
        </div>
        
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
</template> -->
<template>
  <div class="signup-details-form">
    <h3 class="form-title">Register Here </h3>

    <form @submit.prevent="signUp" class="form">
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
      <div class="form-group">
        <label for="inputEmail">Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          placeholder="password"
          v-model="password"
          required
        />
      </div>
        <div class="form-group">
          <label for="inputEmail">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPasswordc"
            placeholder="Re-enter password"
            v-model="confirmPassword"
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
        <label for="inputZip">Zip</label>
        <input
          type="text"
          class="form-control"
          v-model="zip"
          id="inputZip"
          @blur="fetchPincode"
        />
      </div>

      <div class="form-group">
        <label for="inputCity">City</label>
        <input disabled  type="text" v-model="city" class="form-control" id="inputCity" />
      </div>

      <div class="form-group">
        <label for="inputState">State</label>
        <input
          disabled
          type="text"
          v-model="state"
          class="form-control"
          id="inputState"
        />
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </div>
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
      name: "",
      email: "",
      password: "",
      confirmPassword:"",
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
          confirmPassword:this.confirmPassword,
          phone: this.phone,
          image: this.image,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
        };
        if(this.password==this.confirmPassword){
          const signUpData = await axios.post(
            "http://localhost:3000/signup",
            data
            );
            if (signUpData.data.success) {
              await router.push("/login");
              toast.success("Successfully Signed Up ", { autoclose: 5000 });
            } else {
              toast.error(signUpData.data.message);
            }
          }
          else{
            toast.error("password and confirm password is not same")
          }
      } catch (err) {
        console.log("error", err);
        console.log("hhhh");
        toast.error("Sorry unable to Sign up ", { autoclose: 5000 });
      }
    },
    async fetchPincode() {
      try{
      const pincode = this.zip;
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      if(response.data[0].PostOffice){

        console.log(response.data[0].PostOffice[0].District);
        console.log(response.data[0].PostOffice[0].State);
        this.city = response.data[0].PostOffice[0].District;
        this.state = response.data[0].PostOffice[0].State;
        console.log(this.city);
        console.log(this.state);
        console.log("output", pincode);
      }
      else{
        toast.error("No Pincode Found", { autoclose: 5000 });

      }
    }
    catch(err){
      console.log(err);
    }
  },
  },
};
</script>

<style scoped>
.signup-details-form {
  text-align: center;
  padding: 20px;
}

.form-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  max-width: 500px;
  margin: 0 auto;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-row {
  display: flex;
}

.form-group.col-md-6 {
  flex: 0 0 calc(50% - 10px);
  margin-right: 20px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
