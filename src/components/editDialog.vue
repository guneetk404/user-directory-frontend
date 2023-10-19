<template>
  <div class="card-body">
    <form @submit.prevent="saveChanges">
      <h6 class="heading-small text-muted mb-4">Edit Information</h6>
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group focused">
              <label class="form-control-label" for="input-first-name"
                >First name</label
              >
              <input
                type="text"
                id="input-first-name"
                class="form-control form-control-alternative"
                placeholder="First name"
                v-model="editedName"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group focused">
              <label class="form-control-label" for="input-last-name"
                >Last name</label
              >
              <input
                type="text"
                id="input-last-name"
                class="form-control form-control-alternative"
                placeholder="Last name"
                v-model="editedName"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group focused">
              <label class="form-control-label" for="input-phone">Phone</label>
              <input
                type="text"
                id="input-phone"
                class="form-control form-control-alternative"
                placeholder="Username"
                v-model="editedPhone"
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label" for="input-email"
                >Email address</label
              >
              <input
                disabled
                type="email"
                id="input-email"
                class="form-control form-control-alternative"
                v-model="editedEmail"
                placeholder="jesse@example.com"
              />
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4" />
      <!-- Address -->
      <h6 class="heading-small text-muted mb-4">Contact information</h6>
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group focused">
              <label class="form-control-label" for="input-address"
                >Address</label
              >
              <input
                id="input-address"
                class="form-control form-control-alternative"
                placeholder="Home Address"
                type="text"
                v-model="editedAddress"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <div class="form-group focused">
              <label class="form-control-label" for="input-city">City</label>
              <input
                type="text"
                id="input-city"
                v-model="editedCity"
                class="form-control form-control-alternative"
                placeholder="City"
              />
            </div>
            // console.log(req.tokendata);
          </div>
          <div class="col-lg-4">
            <div class="form-group focused">
              <label class="form-control-label" for="input-State">State</label>
              <input
                type="text"
                v-model="editedState"
                id="input-State"
                class="form-control form-control-alternative"
                placeholder="State"
              />
            </div>
          </div>
          <div class="col-lg-4">
            <div class="form-group">
              <label class="form-control-label" for="input-country"
                >Postal code</label
              >
              <input
                type="number"
                id="input-postal-code"
                class="form-control form-control-alternative"
                placeholder="Postal code"
                v-model="editedZip"
                @blur="fetchPincode"
              />
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group focused">
            <label class="form-control-label" for="input-picture"
              >Upload Picture</label
            >
            <input
              id="input-picture"
              class="form-control form-control-alternative"
              @change="handleProfilePicture"
              type="file"
            />
            <button @click="onUpload" class="btn form-buttons btn-primary">
              Upload
            </button>
          </div>
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn btn-primary">Update Details</button>
          <button
            type="button"
            @click="cancelChanges"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
      <hr class="my-4" />
      <!-- Description -->
      <h6 class="heading-small text-muted mb-4">About me</h6>
      <div class="pl-lg-4">
        <div class="form-group focused">
          <label>About Me</label>
          <textarea
            rows="4"
            class="form-control form-control-alternative"
            placeholder="A few words about you ..."
          ></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { toast } from "vue3-toastify";

export default {
  props: ["email", "name", "address", "city", "state", "phone", "zip"],
  data() {
    return {
      editedName: this.name,
      editedEmail: this.email,
      editedPhone: this.phone,
      editedAddress: this.address,
      editedCity: this.city,
      editedZip: this.zip,
      editedState: this.state,
      showEditDialog: true,
      selectedProfilePicture: null,
    };
  },
  methods: {
    handleProfilePicture(event) {
      this.selectedProfilePicture = event.target.files[0];
    },
    onUpload() {
      const formData = new FormData();
      formData.append(
        "myFile",
        this.selectedProfilePicture,
        this.selectedProfilePicture.name
      );
      console.log(this.selectedProfilePicture);
      console.log(formData);
      // axios.post("", formData);
    },
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
        // console.log(data);
        const updatedData = await axios.put(
          "http://localhost:3000/update",
          data,
          { headers }
        );
        if (updatedData.data.success) {
          await router.push("/profile");
          toast.success("updated Successfully");
          this.$emit("changes-saved", updatedData.data);
        }
      } catch (err) {
        console.log(err);
      }
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
