import moment from 'moment'


const today = moment.utc().startOf('day') //  获取今天的日期
console.log('today: ', today); // Moment<2021-05-31T00:00:00Z>


const todayDate = Number(today.format('YYYYMMDD')) // 格式化: 年月日
console.log('todayDate: ', todayDate); // 格式化 : 20210531


const sevenDays = ' '.repeat(7).split('').map((day, index) => today.clone().subtract(index + 1, 'days')) // 从 today开始，向前计算7天
console.log('sevenDays: ', sevenDays);  // 7天， 数组


const dates = [todayDate, ...sevenDays.map(day => Number(day.format('YYYYMMDD')))]  // 7天都是格式化: 年月日
console.log('dates: ', dates);  // 格式化后的7天
/**
 * dates:  [
 *   20210531, 20210530,
 *   20210529, 20210528,
 *   20210527, 20210526,
 *   20210525, 20210524
 * ]
 */


const sevenDates = sevenDays.map(day => day.format('MM.DD'))  // 格式化: 月.天
console.log('sevenDates: ', sevenDates);
/**
  * sevenDates:  [
  *   '05.30', '05.29',
  *   '05.28', '05.27',
  *   '05.26', '05.25',
  *   '05.24'
  * ]
  *
  */