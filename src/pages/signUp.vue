<template>
  <form @submit.prevent="signUp">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Name</label>
        <input
          type="text"
          class="form-control"
          id="inputName4"
          placeholder="Name"
          v-model="name"
          required
        />
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail4">Email</label>
        <input
          type="email"
          class="form-control"
          id="inputEmail4"
          placeholder="Email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword4">Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword4"
          placeholder="Password"
          v-model="password"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <label for="inputAddress">phone</label>
      <input
        type="number"
        class="form-control"
        id="inputAddress"
        placeholder="Contact Number"
        v-model="phone"
        required
      />
    </div>
    <div class="form-group">
      <label for="inputAddress">image</label>
      <input
        type="file"
        class="form-control"
        id="inputAddress"
        placeholder="Profile Image"
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

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCity">City</label>
        <input type="text" v-model="city" class="form-control" id="inputCity" />
      </div>
      <div class="form-group col-md-4">
        <label for="inputState">State</label>
        <select id="inputState" v-model="state" class="form-control">
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="inputZip">Zip</label>
        <input type="text" class="form-control" v-model="zip" id="inputZip" />
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
</template>

<script>
// import axios from 'axios';
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
    };
  },
  methods:{
    signUp(){
      let data = {
          email: this.email,
          password: this.password,
        };
      console.log(data)
    }
  }
};
</script>

<style></style>
