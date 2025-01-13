import { defineComponent, ref, watchEffect } from 'vue'
import { ElInput, ElCheckbox, ElButton } from 'element-plus'
import type { PropType } from 'vue'
import styles from './index.module.css'

interface CheckBoxOption {
  label: string
  text: string
  checked: boolean
}

interface CheckBoxModelValue {
  title: string
  description: string
  options: CheckBoxOption[]
}

export default defineComponent({
  name: 'BaseCheckBox',
  props: {
    modelValue: {
      type: Object as PropType<CheckBoxModelValue>,
      required: true,
      default: () => ({
        title: '标题',
        description: '说明',
        options: [
          { label: '选项1', text: '', checked: false },
          { label: '选项2', text: '', checked: false },
        ],
      }),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const title = ref(props.modelValue?.title ?? '标题')
    const description = ref(props.modelValue?.description ?? '说明')
    const options = ref(
      props.modelValue?.options ?? [
        { label: '选项1', text: '', checked: false },
        { label: '选项2', text: '', checked: false },
      ],
    )

    watchEffect(() => {
      emit('update:modelValue', {
        title: title.value,
        description: description.value,
        options: options.value,
      })
    })

    const addOption = () => {
      options.value.push({
        label: `选项${options.value.length + 1}`,
        text: '',
        checked: false,
      })
    }

    return () => (
      <div class={styles.container}>
        <ElInput class={styles.input} v-model={title.value} placeholder="标题" />
        <ElInput class={styles.input} v-model={description.value} placeholder="说明" />
        {options.value.map((option, index) => (
          <div class={styles.optionRow} key={index}>
            <ElCheckbox v-model={option.checked}>{option.label}</ElCheckbox>
            <ElInput v-model={option.text} placeholder={`选项${index + 1}文字`} />
          </div>
        ))}
        <ElButton onClick={addOption} size="small">
          增加选项
        </ElButton>
      </div>
    )
  },
})
