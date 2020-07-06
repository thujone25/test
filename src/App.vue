<template>
  <div id="app">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/Header';

export default {
  components: {
    AppHeader
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  line-height: 1.4em;
  font-family: inherit;
  color: inherit;
  text-decoration: none;
}
*:focus {
  outline: none;
}
*[hidden] {
  display: none;
}
html, body {
  direction: ltr;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333333;
}
u {
  text-decoration: underline;
}
*::-moz-focus-inner {
  border: 0;
}
button {
  font-size: inherit;
  font-family: inherit;
  background-color: transparent;
  border: 0;
  cursor: pointer;
}
a:focus {
  color: inherit;
  text-decoration: none;
}
a:focus,
button:focus {
  outline: 0;
}
input:not([type=checkbox]):not([type=radio]),
textarea {
  -webkit-appearance: none;
  -webkit-border-radius: 0;
  border-radius: 0;
}
#app {
  flex-grow: 1;
  padding-top: 50px;
  background-color: #fafbfc;
}
</style>
