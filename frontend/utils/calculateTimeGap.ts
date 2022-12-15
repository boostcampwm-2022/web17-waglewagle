const calculateTimeGap = (timeData: string | undefined) => {
  if (timeData === undefined) {
    return '';
  }

  const now = new Date();
  const splitedTimeData = timeData.split('T');
  const [year, month, date] = splitedTimeData[0].split('-');
  const [hour, minute] = splitedTimeData[1].split(':');

  const yearGap = now.getFullYear() - Number(year);
  if (yearGap > 0) {
    return `${yearGap}년 전`;
  }

  const monthGap = now.getMonth() + 1 - Number(month);
  if (monthGap > 0) {
    return `${monthGap}달 전`;
  }

  const dateGap = now.getDate() - Number(date);
  if (dateGap > 0) {
    return `${dateGap}일 전`;
  }

  const hourGap = now.getHours() - Number(hour);
  if (hourGap > 0) {
    return `${hourGap}시간 전`;
  }

  const minuteGap = now.getMinutes() - Number(minute);
  if (minuteGap > 0) {
    return `${minuteGap}분 전`;
  }

  return '방금 전';
};

export default calculateTimeGap;
