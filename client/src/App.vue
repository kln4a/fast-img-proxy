<script setup>
import { getImageUrl } from './utils/image';
</script>

<template>
  <h1>Imgproxy &amp; Cache API</h1>
  <div class="images">
    <figure>
      <img :src="getImageUrl({ src: '1.jpeg' })" alt="">
      <figcaption>First image</figcaption>
    </figure>
    <figure>
      <img :src="getImageUrl({ src: '2-min.jpeg', width: 320 })" alt="">
      <figcaption>Second image with custom width</figcaption>
    </figure>
    <figure>
      <img :src="getImageUrl({ src: '5.jpg' })" alt="">
      <figcaption>Fallback image</figcaption>
    </figure>
  </div>
</template>

<style scoped>
</style>
