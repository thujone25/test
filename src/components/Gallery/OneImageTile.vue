<template>
  <div class="one-gallery-image"></div>
</template>

<style scoped>
.one-gallery-image {
  background-color: #ccc;
  border-radius: 12px;
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
  animation: shine-avatar 1.6s infinite linear;
}
@keyframes shine-avatar {
  0% {
    background-position: -32px;
  }
  40%, 100% {
    background-position: 208px;
  }
}
</style>
