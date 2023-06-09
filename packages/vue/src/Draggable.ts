import { defineComponent, h } from 'vue'
import { constants } from '@smooth-dnd/core'
import { getTagProps, validateTagProp } from './utils'

export default defineComponent({
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  render: function () {
    // wrap child
    const tagProps = getTagProps(this, constants.wrapperClass)
    return h(tagProps.value, Object.assign({}, tagProps.props), this.$slots.default())
  },
})
