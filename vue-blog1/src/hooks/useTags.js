import { reactive } from 'vue'

export default function (tags) {
  let tagsArr = reactive([])
  if (!tags) {
    return { tagsArr }
  } else {
    if (tags.indexOf('，') == -1) {
      // eslint-disable-next-line no-const-assign
      tagsArr[0] = tags
      return { tagsArr }
    } else {
      tagsArr = tags.split('，')
      return { tagsArr }
    }
  }
}