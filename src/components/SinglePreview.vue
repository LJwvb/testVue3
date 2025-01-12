<template>
  <div class="single-preview">
    <ElForm>
      <ElFormItem>
        <ElInput v-model="name" placeholder="Please input" />
      </ElFormItem>
      <ElCheckbox v-model="test">Vue3</ElCheckbox>
      <ElRadio v-model="test" label="Vue3"> Vue3 </ElRadio>
      <ElRadio v-model="test" label="React"> React </ElRadio>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
const test = ref('Vue3')
const name = ref('Hello World')
</script>
