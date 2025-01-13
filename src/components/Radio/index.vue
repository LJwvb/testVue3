<template>
  <div>
    <div class="title-row" @click.self="selectedField = ''">
      <span class="serial-number">
        <span v-if="modelValue.required" class="required-star">*</span>
        {{ modelValue.index + 1 }}
      </span>
      <div class="field-content" @click="selectedField = 'title'">
        <template v-if="selectedField === 'title'">
          <ElInput v-model="title" placeholder="标题" class="seamless-input" @click.stop />
        </template>
        <template v-else>
          <span class="field-text">{{ title || '标题' }}</span>
        </template>
      </div>
      <ElCheckbox v-model="required">必填</ElCheckbox>
    </div>
    <div class="desc-row field-content" @click="selectedField = 'description'">
      <template v-if="selectedField === 'description'">
        <ElInput v-model="description" placeholder="说明" class="seamless-input" @click.stop />
      </template>
      <template v-else>
        <span class="field-text">{{ description || '说明' }}</span>
      </template>
    </div>
    <div v-for="(option, index) in options" :key="index" class="option-row">
      <div class="radio-wrapper">
        <ElRadio :model-value="option.checked" :label="true" @click.stop>
          <template v-if="editingOptionIndex === index">
            <ElInput
              ref="inputRef"
              v-model="option.label"
              size="small"
              class="option-label-input seamless-input"
              @click.stop
              @blur="finishEdit(index)"
              @focus="onFocus(index)"
            />
          </template>
          <template v-else>
            <span @click.stop="startEdit(index, option)">{{ option.label }}</span>
          </template>
        </ElRadio>
      </div>
    </div>
    <ElButton @click="addOption">增加选项</ElButton>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineProps, defineEmits, nextTick } from 'vue'

interface RadioOption {
  label: string
  checked: boolean
}

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      title: '标题',
      description: '说明',
      required: true, // 修改为默认必填
      index: 0, // 添加索引属性
      options: [
        { label: '选项1', checked: false },
        { label: '选项2', checked: false },
      ],
    }),
  },
})

const emit = defineEmits(['update:modelValue'])

const title = ref(props.modelValue?.title ?? '标题')
const description = ref(props.modelValue?.description ?? '说明')
const required = ref(props.modelValue?.required ?? true) // 修改默认值
const options = ref<RadioOption[]>(
  props.modelValue?.options ?? [
    { label: '选项1', checked: false },
    { label: '选项2', checked: false },
  ],
)

const selectedField = ref('')
const editingOptionIndex = ref<number | null>(null)
// let isEditing = false

const inputRef = ref<HTMLInputElement | null>(null)
const originalLabel = ref('')

const startEdit = (index: number, option: any) => {
  editingOptionIndex.value = index
  originalLabel.value = option.label
  // isEditing = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const onFocus = (index: number) => {
  // isEditing = true
  editingOptionIndex.value = index
}

// const handleRadioChange = (option: RadioOption, index: number) => {
//   if (!isEditing) {
//     // 重置所有选项的选中状态
//     options.value.forEach((opt) => (opt.checked = false))
//     // 设置当前选项为选中状态
//     option.checked = true
//   }
// }

const finishEdit = (index: number) => {
  const option = options.value[index]
  if (!option.label.trim()) {
    option.label = originalLabel.value
  }
  editingOptionIndex.value = null
  // isEditing = false
}

// 使用 watchEffect 统一处理所有数据的变化
watchEffect(() => {
  emit('update:modelValue', {
    title: title.value,
    description: description.value,
    required: required.value,
    options: options.value,
  })
})

const addOption = () => {
  options.value.push({
    label: `选项${options.value.length + 1}`,
    checked: false,
  })
}
</script>

<style scoped>
.option-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.serial-number {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 1.2em;
  margin-right: 10px;
  min-width: 25px;
  text-align: right;
  padding-right: 5px;
}

.required-star {
  color: #f56c6c;
  margin-right: 2px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex: 1;
}

.option-label-input {
  width: 120px;
}

.option-row :deep(.el-radio__label) {
  display: flex;
  align-items: center;
  min-width: 120px;
  cursor: text;
}

.field-content {
  flex: 1;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  min-height: 32px;
  display: flex;
  align-items: center;
}

.field-content:hover {
  background-color: #f5f7fa;
}

.seamless-input {
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }
}
:deep(.el-input__inner) {
  height: 32px;
  line-height: 32px;
  color: #606266;
}

.field-text {
  color: #606266;
  line-height: 32px;
  display: block;
}

.radio-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
}
</style>
