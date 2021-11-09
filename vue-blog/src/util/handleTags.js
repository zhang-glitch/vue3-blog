
export default function handleTags (tags) {
  let tagsArr = []
  if (tags?.includes('，')) {
    tagsArr = tags.split('，')
  } else if (tags?.includes(',')) {
    tagsArr = tags.split(',')
  } else {
    tagsArr = [tags]
  }
  return tagsArr
}
