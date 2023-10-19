<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="Reset Password"
    style="margin-top: 50px"
  >
    <v-container>
      <v-text-field
        v-model="email"
        color="#802f59"
        label="Email"
        :rules="[required]"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-if="showOtpField"
        v-model="newPassword"
        color="#802f59"
        label="newPassword"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-if="showOtpField"
        v-model="confirmPassword"
        color="#802f59"
        label="confirmPassword"
        placeholder="Enter your password again"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-if="showOtpField"
        v-model="otp"
        color="#802f59"
        label="OTP"
        variant="underlined"
      ></v-text-field>

      <v-btn
        class="rbtn btn-primary"
        @click="handleSubmit"
        v-if="!showOtpField"
      >
        Request OTP
      </v-btn>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        @click="validateOtp"
        color="#802f59"
      >
        reset Password

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
import router from "@/router";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  data: () => ({
    email: null,
    newPassword: null,
    confirmPassword: null,
    otp: "",
    showOtpField: false,
  }),

  methods: {
    async handleSubmit() {
      try {
        const response = await axios.put(
          "http://localhost:3000/forget-password",
          { email: this.email }
        );
        if (response.data.success) {
          toast.success("Otp sent successfully");
          this.showOtpField = true;
        } else {
          toast.error("error in sending otp, kindly check email provided");
        }
      } catch (error) {
        toast.error("sorry server not responding");
        console.log(error);
      }
    },
    async validateOtp() {
      try {
        const data = {
          email: this.email,
          password:this.newPassword,
          otp:this.otp
        };
        const response  =  await axios.put("http://localhost:3000/reset-password", data)
        if(response.data.success){
          await router.push("/login")
          toast.success("password changed successfully")
        }
      } catch (error) {
        toast.error("Some error in client side", { autoclose: 2000 });

        console.log("Error validating OTP:", error);
      }
    },
    required(v) {
      return !!v || "Field is required";
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.email.match(emailPattern)) {
        toast.info("Enter a valid email address:)", { autoclose: 2000 });
        this.able = false;
      } else {
        this.able = true;
      }
    },
    validatePassword() {
      if (this.newPassword.length < 6) {
        toast.info("Password must be 6 character long", { autoclose: 2000 });
      }
    },
    validateConfirmPassword() {
      if (!(this.newPassword === this.confirmPassword)) {
        toast.info("Both password field should be same", { autoclose: 2000 });
      }
    },
    // async show(){
    //   this.showOtpField = true;
    // }
  },
};
</script>

<style>
.rbtn {
  margin-left: 80px;
}
</style>
