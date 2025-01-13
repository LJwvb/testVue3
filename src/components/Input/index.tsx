import { defineComponent, ref, watchEffect } from 'vue'
import { ElInput } from 'element-plus'
import type { PropType } from 'vue'
import styles from './index.module.css' // 修改样式引入

interface InputModelValue {
  title: string
  description: string
  value: string
}

export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: {
      type: Object as PropType<InputModelValue>,
      required: true,
      default: () => ({
        title: '标题',
        description: '请输入',
        value: '',
      }),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const title = ref(props.modelValue?.title ?? '标题')
    const description = ref(props.modelValue?.description ?? '请输入')
    const value = ref(props.modelValue?.value ?? '')

    watchEffect(() => {
      emit('update:modelValue', {
        title: title.value,
        description: description.value,
        value: value.value,
      })
    })

    return () => (
      <div class={styles.container}>
        <ElInput class={styles.input} v-model={title.value} placeholder="标题" />
        <ElInput class={styles.input} v-model={description.value} placeholder="说明" />
        <ElInput class={styles.input} v-model={value.value} type="textarea" />
      </div>
    )
  },
})
