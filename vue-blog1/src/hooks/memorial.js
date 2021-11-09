import moment from 'moment'
const memorial = () => {
  let now = moment().locale('zh-cn').format('MM-DD');
  if (
    now === '04-04' || // 清明
    now === '05-12' || // 汶川大地震
    now === '12-13' // 南京大屠杀
  ) {
    document.getElementsByTagName('html')[0].style = 'filter: grayscale(100%);'
  }
}

export default memorial