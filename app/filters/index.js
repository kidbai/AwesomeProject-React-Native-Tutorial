export const tabFilter = (tabName) => {
  let newTabName
  switch(tabName.toLocaleLowerCase()) {
    case 'all': newTabName = '全部'; break;
    case 'good': newTabName = '精华'; break;
    case 'ask': newTabName = '问答'; break;
    case 'share': newTabName = '分享'; break;
    case 'job': newTabName = '招聘'; break;
    default: newTabName = '全部'; break;
  }
  return newTabName
}
