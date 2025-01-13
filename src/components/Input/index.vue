<template>
  <div @click.self="selectedField = ''">
    <div class="title-row">
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
    <ElInput v-model="value" type="textarea" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      title: '标题',
      description: '请输入',
      value: '',
      required: true, // 修改为默认必填
      index: 0, // 添加索引属性
    }),
  },
})

const emit = defineEmits(['update:modelValue'])

const title = ref(props.modelValue?.title ?? '标题')
const description = ref(props.modelValue?.description ?? '请输入')
const value = ref(props.modelValue?.value ?? '')
const required = ref(props.modelValue?.required ?? true) // 修改默认值
const selectedField = ref('')

watchEffect(() => {
  emit('update:modelValue', {
    title: title.value,
    description: description.value,
    value: value.value,
    required: required.value,
  })
})
</script>

<style scoped>
.el-input {
  /* margin-bottom: 10px; */
}

.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex: 1;
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

.desc-row {
  margin-bottom: 10px;
}

.field-content {
  flex: 1;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
}

.field-content:hover {
  background-color: #f5f7fa;
}

.field-text {
  color: #606266;
  min-height: 32px;
  line-height: 32px;
  display: block;
}

.seamless-input {
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
  }
  :deep(.el-input__inner) {
    height: 32px;
    line-height: 32px;
    color: #606266;
  }
}
</style>
