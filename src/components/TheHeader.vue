<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">login</router-link></li>
      <li><router-link to="/signup">Sign Up</router-link></li>
    </ul>
  </nav>
</template>

<script></script>

<style scoped>
/* Add your CSS styling for the navbar here */
nav {
  background-color: #333;
  color: white;
  padding: 10px;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}

li {
  margin-right: 10px;
  text-decoration: none;
  text-decoration-line: none;
}
a {
  text-decoration: none;
  color: beige;
}
router-link {
  color: white;
  text-decoration: none;
}
</style>
