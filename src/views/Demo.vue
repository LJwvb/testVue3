<template>
  <div>
    <h1>{{ name }}</h1>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <p>API Data: {{ apiData }}</p>
    <button
      @click="increment"
      :class="classNames('btn', { 'btn-primary': count % 2 === 0, 'btn-danger': count % 2 !== 0 })"
    >
      Increment
    </button>
    <button @click="fetchData">Fetch API Data</button>
    <button @click="sendData">Send API Data</button>
    <button @click="setNewName">Set New Name</button>
    <button @click="reset">Reset</button>
    <button @click="updateApiData">Update API Data</button>
  </div>
</template>

<script setup lang="ts" name="DemoPageComponent">
import { useTestStore } from '@/stores/test'
import classNames from 'classnames'

const store = useTestStore()
const name = computed(() => store.name)
const count = computed(() => store.count)
const doubleCount = computed(() => store.doubleCount)
const apiData = computed(() => store.apiData)

const increment = () => {
  store.increment()
}
const setNewName = () => {
  store.setName('New Name')
}
const reset = () => {
  store.$reset()
}

const fetchData = async () => {
  await store.fetchApiData({})
}

const sendData = async () => {
  await store.sendApiData({})
}

const updateApiData = () => {
  store.apiData = {
    name: 'New Name',
    age: 20,
  }
}
onMounted(() => {
  store.sendApiData()
})
</script>
<style scoped>
.btn {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  &.btn-primary {
    background-color: #007bff;
    color: #fff;
  }
  &.btn-danger {
    background-color: #dc3545;
    color: #fff;
  }
}
</style>
