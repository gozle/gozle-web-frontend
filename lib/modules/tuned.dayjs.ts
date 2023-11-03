import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/tk';
import calendar from 'dayjs/plugin/calendar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(calendar);

const getLocaleCalendarObject = (locale: string) => {
  if (locale === 'ru') {
    const days = [
      'воскресенье',
      'понедельник',
      'вторник',
      'среду',
      'четверг',
      'пятницу',
      'субботу',
    ];
    return {
      lastDay: '[Вчера, в] LT',
      sameDay: '[Сегодня, в] LT',
      nextDay: '[Завтра, в] LT',
      lastWeek: function (this: Dayjs) {
        return this.format(
          '[В прошл' +
            (this.day()
              ? [1, 2, 4].includes(this.day())
                ? 'ый'
                : 'ую'
              : 'ое') +
            '] ' +
            days[this.day()] +
            '[, в] LT',
        );
      },
      nextWeek: function (this: Dayjs) {
        return this.format(
          `[${this.day() === 2 ? 'Во' : 'В'}] ${days[this.day()]}[, в] LT`,
        );
      },
      sameElse: 'L',
    };
  } else if (locale === 'tk')
    return {
      lastDay: '[Düýn] LT',
      sameDay: '[Bu gün] LT',
      nextDay: '[Ertir] LT',
      lastWeek: '[Geçen] dddd, LT',
      nextWeek: '[Indiki] dddd, LT',
      sameElse: 'L',
    };
};

dayjs.updateLocale('ru', { calendar: getLocaleCalendarObject('ru') });
dayjs.updateLocale('tk', { calendar: getLocaleCalendarObject('tk') });

export const tunedDayjs = dayjs;
