import dayjs from 'dayjs';
export default function convertDate(seconds: number) {
  const dateInMillis = seconds * 1000;
  return dayjs(dateInMillis).format('YYYY.MM.DD HH:mm');
}
