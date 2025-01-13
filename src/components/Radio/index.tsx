import { defineComponent, ref, watchEffect } from 'vue'
import { ElInput, ElRadio, ElButton } from 'element-plus'
import type { PropType } from 'vue'
import styles from './index.module.css' // 修改样式引入

interface RadioOption {
  label: string
  text: string
}

interface RadioModelValue {
  title: string
  description: string
  value: string
  options: RadioOption[]
}

export default defineComponent({
  name: 'BaseRadio',
  props: {
    modelValue: {
      type: Object as PropType<RadioModelValue>,
      required: true,
      default: () => ({
        title: '标题',
        description: '说明',
        value: '',
        options: [
          { label: '选项1', text: '' },
          { label: '选项2', text: '' },
        ],
      }),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const title = ref(props.modelValue?.title ?? '标题')
    const description = ref(props.modelValue?.description ?? '说明')
    const value = ref(props.modelValue?.value ?? '')
    const options = ref(
      props.modelValue?.options ?? [
        { label: '选项1', text: '' },
        { label: '选项2', text: '' },
      ],
    )

    watchEffect(() => {
      emit('update:modelValue', {
        title: title.value,
        description: description.value,
        value: value.value,
        options: options.value,
      })
    })

    const addOption = () => {
      options.value.push({ label: `选项${options.value.length + 1}`, text: '' })
    }

    return () => (
      <div class={styles.container}>
        <ElInput class={styles.input} v-model={title.value} placeholder="标题" />
        <ElInput class={styles.input} v-model={description.value} placeholder="说明" />
        {options.value.map((option, index) => (
          <div class={styles.optionRow} key={index}>
            <ElRadio v-model={value.value} label={option.label}>
              {option.label}
            </ElRadio>
            <ElInput v-model={option.text} placeholder={`选项${index + 1}文字`} />
          </div>
        ))}
        <ElButton onClick={addOption}>增加选项</ElButton>
      </div>
    )
  },
})
