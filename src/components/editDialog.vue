<!-- 
<template>
  <h3 class="centered-form">Update your details</h3>

  <div class="container">
    <form @submit.prevent="signUp" class="centered-form">
      <div class="form-row">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder="Name"
            v-model="editedName"
            required
          />
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            disabled
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
            v-model="editedEmail"
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
            v-model="editedPhone"
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
            v-model="editedAddress"
          />
        </div>
        <div class="form-group">
          <label for="inputCity">City</label>
          <input
            type="text"
            v-model="editedCity"
            class="form-control"
            id="inputCity"
          />
        </div>
        <div class="form-group">
          <label for="inputState">State</label>
          <select id="inputState" v-model="editedState" class="form-control">
            <option value="" selected disabled>Choose...</option>
            <option v-for="state in indianStates" :key="state">
              {{ state }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="inputZip">Zip</label>
          <input
            type="text"
            class="form-control"
            v-model="editedZip"
            id="inputZip"
          />
        </div>
      </div>
      <button type="submit" @click="saveChanges" class="btn btn-primary">
        update details
      </button>
      <button type="button" @click="cancelChanges" class="btn btn-primary">
        Cancel
      </button>
    </form>
  </div>
</template> -->

<template>
  <div class="update-details-form">
    <h3 class="form-title">Update Your Details</h3>

    <form @submit.prevent="saveChanges" class="form">
      <div class="form-group">
        <label for="inputName">Name</label>
        <input
          type="text"
          class="form-control"
          id="inputName"
          placeholder="Name"
          v-model="editedName"
          required
        />
      </div>

      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input
          disabled
          type="email"
          class="form-control"
          id="inputEmail"
          placeholder="Email"
          v-model="editedEmail"
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
          v-model="editedPhone"
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
          v-model="editedAddress"
        />
      </div>
      <div class="form-group">
        <label for="inputZip">Zip</label>
        <input
          type="text"
          class="form-control"
          v-model="editedZip"
          id="inputZip"
          @blur="fetchPincode"
        />
      </div>

      <div class="form-group">
        <label for="inputCity">City</label>
        <input
          type="text"
          v-model="editedCity"
          class="form-control"
          id="inputCity"
        />
      </div>

      <div class="form-group">
        <label for="inputState">State</label>
        <input
          disabled
          type="text"
          v-model="editedState"
          class="form-control"
          id="inputState"
        />
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-primary">Update Details</button>
        <button type="button" @click="cancelChanges" class="btn btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["email"],
  data() {
    return {
      editedName: "",
      editedEmail: this.email,
      editedPhone: "",
      editedAddress: "",
      editedCity: "",
      editedZip: "",
      editedState: "",
      showEditDialog: true,
    };
  },
  methods: {
    async saveChanges() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        let data = {
          name: this.editedName,
          email: this.editedEmail,
          phone: this.editedPhone,
          address: this.editedAddress,
          city: this.editedCity,
          state: this.editedState,
          zip: this.editedZip,
        };
        console.log(data);
        const updatedData = await axios.put(
          "http://localhost:3000/update",
          data,
          { headers }
        );
        console.log(updatedData);
      } catch (err) {
        console.log(err);
      }

      this.$emit("changes-saved");
    },
    cancelChanges() {
      this.$emit("changes-saved");
    },
    async fetchPincode() {
      const pincode = this.editedZip;
      console.log(pincode);
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      // console.log(response.data[0].PostOffice[0].District);
      // console.log(response.data[0].PostOffice[0].State);
      this.editedCity = response.data[0].PostOffice[0].District;
      this.editedState = response.data[0].PostOffice[0].State;
      console.log("output", pincode);
    },
  },
};
</script>

<style scoped>
.update-details-form {
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
