<template>
  <div class="container" v-if="!edit">
    <div class="center1">
      <div class="heading1">All Users</div>
      <button @click="logout" class="btn btn-primary logout">Logout</button>
    </div>

    <div class="row">
      <v-card
        class="user"
        width="344"
        height="140"
        color="indigo"
        :variant="variant"
        v-for="(card, index) in cards"
        :key="index"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">Name: {{ card.name }}</div>
            Email: {{ card.email }}
          </div>
        </v-card-item>
        <div class="view-more-container">
          <v-card-actions>
            <v-btn @click="showUserDetails(index)">View And Edit</v-btn>
            <v-btn @click="deleteUser(index)">Delete</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </div>
  <edit-dialog
    :email="selectedUser.email"
    :name="selectedUser.name"
    :address="selectedUser.address"
    :city="selectedUser.city"
    :phone="selectedUser.phone"
    :zip="selectedUser.zip"
    :state="selectedUser.state"
    v-if="edit"
    @changes-saved="closeEditDialog"
  />
</template>

<script>
import router from "@/router";
import axios from "axios";
import editDialog from "../components/editDialog";

export default {
  data() {
    return {
      cards: [
        {},
        // Add more user data objects here
      ],
      dialog: false,
      selectedUser: null,
      edit: false,
    };
  },
  components: {
    editDialog,
  },
  methods: {
    showUserDetails(index) {
      this.selectedUser = this.cards[index];
      this.dialog = true;
      this.edit = true;
    },
    async deleteUser(index) {
      this.selectedUser = this.cards[index];
      // console.log(this.selectedUser)
      try {
        const token = localStorage.getItem("token");
        // console.log(token);
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const email = this.selectedUser.email;
        const response = await axios.delete(
          `http://localhost:3000/delete/${email}`,
          {
            headers,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    closeUserDetails() {
      this.dialog = false;
    },
    closeEditDialog() {
      this.edit = false;
    },
    logout() {
      console.log(localStorage.getItem("loggedIn"))
      localStorage.clear();
      router.push('/login')
      this.isLoggedIn = false; 
    },
  },
  async mounted() {
    try {
      //       const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // console.log(email);
      const response = await axios.get(`http://localhost:3000/allusers`, {
        headers,
      });
      this.cards = response.data;
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.center1 {
  display: flex !important;
  justify-content: space-between !important;
  align-items:center !important;
  height: 80px !important; /* Adjust the height as needed for vertical centering */
}

.heading1 {
  font-size: 24px !important;
  font-weight: bold !important;
  margin: 20px 0 !important;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.user {
  width: calc(33.33% - 20px); /* Adjust the width as needed */
  margin-bottom: 20px;
  border-radius: 10px; /* Add rounded corners to cards */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow to cards */
  background-color: #f5f5f5; /* Set card background color */
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;
}

.user:hover {
  transform: scale(1.05); /* Add hover effect to cards */
}

.view-more-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px; /* Adjust the height as needed */
}
.v-card-actions .v-btn {
  margin-bottom: 10px;
}
</style>
