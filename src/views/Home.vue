<template>
  <div>
    <h1 @click="handleClick">{{ name }}</h1>

    <img src="../assets/images/image1.jpeg" alt="Vue logo" @click="handleGo" />
  </div>
</template>
<script setup lang="ts" name="HomePageComponent">
const name = ref('Hello World')
const router = useRouter()
const handleClick = () => {
  name.value = 'Hello Vue 3.0'
}
const handleGo = () => {
  router.push('/demo')
}
</script>
<style lang="scss" scoped></style>
