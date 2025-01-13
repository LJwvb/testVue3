<template>
  <div class="container">
    <div class="component-area">
      <h2>组件区</h2>
      <div
        v-for="(label, type) in componentTypes"
        :key="type"
        class="component-item"
        draggable="true"
        @dragstart="onDragStart($event, type)"
        @click="addComponent(type)"
      >
        {{ label }}
      </div>
    </div>
    <div class="operation-area" @dragover.prevent @drop="onDrop">
      <h2>操作区</h2>
      <div
        v-for="(item, index) in droppedItems"
        :key="index"
        class="operation-item"
        :class="{ selected: selectedIndex === index }"
        @click="selectItem(index)"
      >
        <component
          :is="getComponent(item)"
          v-model="formData[index]"
          @update:modelValue="handleComponentDataChange(index, $event)"
        />
        <div v-show="selectedIndex === index" class="action-overlay">
          <ElButton @click="copyItem(index)" class="action-button" type="primary" size="small">
            复制
          </ElButton>
          <ElButton @click="removeItem(index)" class="action-button" type="danger" size="small">
            删除
          </ElButton>
          <ElButton
            v-if="index !== 0"
            @click="moveUp(index)"
            class="action-button"
            type="warning"
            size="small"
          >
            上移
          </ElButton>
          <ElButton
            v-if="index !== droppedItems.length - 1"
            @click="moveDown(index)"
            class="action-button"
            type="warning"
            size="small"
          >
            下移
          </ElButton>
        </div>
      </div>
    </div>

    <!-- 添加预览区域 -->
    <div class="preview-area">
      <h2>数据结构</h2>
      <div class="preview-content">
        <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="TestPageComponent">
import { ref, watchEffect } from 'vue'
import { ElButton } from 'element-plus'
import BaseRadio from '@/components/Radio/index.vue'
import BaseInput from '@/components/Input/index.vue'
import BaseCheckBox from '@/components/CheckBox/index.vue'

interface FormItemData {
  type: string
  title: string
  description: string
  value?: string
  options?: Array<any>
  [key: string]: any
}

const componentTypes = {
  radio: '单选',
  checkbox: '多选',
  input: '文本框',
} as const

type ComponentType = keyof typeof componentTypes

const droppedItems = ref<ComponentType[]>([])
const selectedIndex = ref<number | null>(null)
const formData = ref<FormItemData[]>([])

const onDragStart = (event: DragEvent, type: ComponentType) => {
  event.dataTransfer?.setData('text/plain', type)
}

const onDrop = (event: DragEvent) => {
  const data = event.dataTransfer?.getData('text/plain')
  if (data) {
    addComponent(data as ComponentType)
  }
}

const addComponent = (type: ComponentType) => {
  const index = droppedItems.value.length
  droppedItems.value.push(type)
  formData.value.push({
    type,
    title: '标题',
    description: '说明',
    required: true,
    index, // 添加索引
  })
  selectedIndex.value = index
}

const getComponent = (type: ComponentType) => {
  switch (type) {
    case 'radio':
      return BaseRadio
    case 'checkbox':
      return BaseCheckBox
    case 'input':
      return BaseInput
    default:
      return {
        template: '<div>未知组件</div>',
      }
  }
}

const handleComponentDataChange = (index: number, newData: any) => {
  formData.value[index] = {
    ...formData.value[index],
    ...newData,
    type: droppedItems.value[index],
    index, // 保持索引
  }
}

const removeItem = (index: number) => {
  droppedItems.value.splice(index, 1)
  formData.value.splice(index, 1)
  selectedIndex.value = null
}

const copyItem = (index: number) => {
  droppedItems.value.splice(index + 1, 0, droppedItems.value[index])
  formData.value.splice(index + 1, 0, JSON.parse(JSON.stringify(formData.value[index])))
  selectedIndex.value = index + 1 // 高亮复制的组件
}

const selectItem = (index: number) => {
  selectedIndex.value = index
}

const moveUp = (index: number) => {
  if (index > 0) {
    // 保存要移动的组件数据
    const currentItem = droppedItems.value[index]

    // 删除当前位置的数据
    droppedItems.value.splice(index, 1)

    // 在目标位置插入数据
    droppedItems.value.splice(index - 1, 0, currentItem)

    // 更新选中状态为目标位置
    selectedIndex.value = index - 1

    // 交换formData中的数据
    ;[formData.value[index], formData.value[index - 1]] = [
      formData.value[index - 1],
      formData.value[index],
    ]
  }
}

const moveDown = (index: number) => {
  if (index < droppedItems.value.length - 1) {
    // 保存要移动的组件数据
    const currentItem = droppedItems.value[index]

    // 删除当前位置的数据
    droppedItems.value.splice(index, 1)

    // 在目标位置插入数据
    droppedItems.value.splice(index + 1, 0, currentItem)

    // 更新选中状态为目标位置
    selectedIndex.value = index + 1

    // 交换formData中的数据
    ;[formData.value[index], formData.value[index + 1]] = [
      formData.value[index + 1],
      formData.value[index],
    ]
  }
}

watchEffect(() => {})
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  padding: 20px;
}

.component-area,
.operation-area {
  flex: 1;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.component-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff;
  text-align: center;
}

.operation-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  padding-bottom: 60px;
  overflow: hidden;
}

.operation-item.selected {
  border-color: #1890ff;
}

.remove-button {
  position: absolute;
  top: 5px;
  right: 5px;
}

.copy-button {
  position: absolute;
  top: 5px;
  right: 60px;
}

.serial-number {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  margin-right: 5px;
}

.required-star {
  color: #f56c6c;
  margin-right: 2px;
}

.action-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 5px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.action-button {
  flex: 1;
  min-width: 60px;
}

.preview-button {
  margin-top: 20px;
  width: 100%;
}

.preview-area {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.preview-content {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #eee;
  overflow-x: auto;
}

.preview-content pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>
