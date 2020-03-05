<script>
export default {
  name: "App"
};
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* vueitfy still has issues overriding the default font... */
@import url("https://fonts.googleapis.com/css?family=Spartan:300,400&display=swap");
@font-face {
  font-family: "Spartan", sans-serif;
  src: url("https://fonts.googleapis.com/css?family=Spartan:300,400&display=swap");
}
</style>
