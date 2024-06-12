import 'dayjs/locale/es';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(utc);
dayjs.locale('es');
dayjs.extend(updateLocale);
dayjs.updateLocale('es', {
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
});

export const expiredFormatDate = (date: string) => {
  return dayjs(date, 'DD/MM/YYYY').format('[Vence el] D [de] MMM YYYY');
};

export const formatDate = (dateString: string) => {
  return dayjs.utc(dateString).local().format('dddd DD MMM - h:mm a');
};
