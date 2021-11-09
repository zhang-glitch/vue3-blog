
export default function handleTags (tags) {
  let tagsArr = []
  let tagsObj = []
  let tagColor = ["", "success", 'warning']
  if (tags?.includes('，')) {
    tagsArr = tags.split('，')
  } else if (tags?.includes(',')) {
    tagsArr = tags.split(',')
  } else {
    tagsArr = [tags]
  }
  for (let i in tagsArr) {
    tagsObj[i] = {
      colorText: tagColor[i],
      tagName: tagsArr[i]
    }
  }
  return tagsObj
}
