import type { DefineComponent } from 'vue'

const isArray = function (obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

interface TagProps {
  value: string
  props?: Record<string, any>
}

export function getTagProps(ctx: InstanceType<DefineComponent<{ tag?: string }>>, tagClasses?: string): TagProps {
  const tag = ctx.$props.tag
  if (tag) {
    if (typeof tag === 'string') {
      const result: TagProps = { value: tag }
      if (tagClasses) {
        result.props = { class: tagClasses }
      }

      return result
    } else if (typeof tag === 'object') {
      // @ts-expect-error is this ever called?
      const result = { value: tag.value || 'div', props: tag.props || {} }

      if (tagClasses) {
        if (result.props.class) {
          if (isArray(result.props.class)) {
            result.props.class.push(tagClasses)
          } else {
            result.props.class = [tagClasses, result.props.class]
          }
        } else {
          result.props.class = tagClasses
        }
      }

      return result
    }
  }
  return { value: 'div' }
}

export function validateTagProp(tag: any) {
  if (tag) {
    if (typeof tag === 'string') return true
    if (typeof tag === 'object') {
      if (typeof tag.value === 'string' || typeof tag.value === 'function' || typeof tag.value === 'object') {
        return true
      }
    }

    return false
  }

  return true
}
