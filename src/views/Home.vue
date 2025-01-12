<template>
  <div>
    <h1 @click="handleClick">{{ name }}</h1>
    {{ a }}
    <ElButton type="primary">Primary</ElButton>
    <ElForm>
      <ElFormItem label="活动名称">
        <ElInput v-model="name" placeholder="请输入活动名称"></ElInput>
      </ElFormItem>
      <ElCheckbox v-model="test">Vue3</ElCheckbox>
      <ElRadio v-model="test" label="Vue3">
        Vue3
      </ElRadio>
      <ElRadio v-model="test" label="React">
        React
      </ElRadio>
    </ElForm>
  </div>
</template>
<script setup lang="ts" name="HomePageComponent">
import { testPost } from '@/api/testApi'

const name = ref('Hello World')
const router = useRouter()
const test = ref('Vue3')
const a = computed(() => {
  return name.value + test.value
})
const handleClick = () => {
  name.value = 'Hello Vue3'
  testPost({
    name: 'test',
    a: 1,
    b: NaN,
    z: Infinity,
    c: undefined,
    d: null,
    e: {},
    f: [],
    g: '',
    h: 0,
    i: true,
    j: false,
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error(err.message)
      router.push({
        path: 'test',
      })
      ElNotification({
        title: 'Success',
        message: 'This is a success message',
        type: 'success',
      })
    })
}
onMounted(() => {
  console.log('mounted')
})
watch(name, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
</script>
<style lang="scss" scoped></style>
