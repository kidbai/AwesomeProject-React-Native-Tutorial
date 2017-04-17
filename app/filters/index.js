export const tabFilter = (tabName) => {
  let newTabName
  if(tabName !== undefined) {
    switch(tabName.toLocaleLowerCase()) {
      case 'all': newTabName = '全部'; break;
      case 'good': newTabName = '精华'; break;
      case 'ask': newTabName = '问答'; break;
      case 'share': newTabName = '分享'; break;
      case 'job': newTabName = '招聘'; break;
      default: newTabName = '未分类'; break;
    }
  }
  return newTabName
}
