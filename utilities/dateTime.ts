import moment from 'moment-timezone';

const appendLeadZero = (val: string | number) => (Number(val) > 9 ? val : `0${val}`);

const DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'April',
  'May', 'June', 'July', 'Aug',
  'Sept', 'Oct', 'Nov', 'Dec'
];

/**
 * recieve a date value and return true if the date is today. Otherwise, false.
 * @param {String} date
 * @returns {Boolean}
 */
export const isToday = (date: string): boolean | null => {
  const theDate = new Date(date);
  if (theDate.toString() === 'Invalid Date') return null;
  const today = new Date();
  return today.setHours(0, 0, 0, 0) === theDate.setHours(0, 0, 0, 0);
};

/**
 * recieve a date-time string and return date
 * @param {String} dateString
 * @returns {String} Format: Tues, Sept 24 2019
 */
export const formatDate = (dateString: string, showDay: boolean = true): string | null => {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return null;

  const day = showDay ? `${DAYS[date.getDay()]}, ` : '';

  return `${day}${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const getTime = (dateString: string): string | null => {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return null;

  return `${date.toLocaleString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`;
};

export const getCurrentDateTime = (dateString: string): string | null => {
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return null;
  const day = isToday(dateString) ? 'Today'
    : `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

  return `${day}
  ${date.toLocaleString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })}`;
};

export const formatSimpleDate = (date: string): string | null => {
  const d = new Date(date);
  if (d.toString() === 'Invalid Date') return null;
  return `${appendLeadZero(d.getDate())}/${appendLeadZero(d.getMonth() + 1)}/${d.getFullYear()}`;
};

export const formatApiDate = (date: string): string | null => {
  const d = new Date(date);
  if (d.toString() === 'Invalid Date') return null;
  return `${d.getFullYear()}-${appendLeadZero(d.getMonth() + 1)}-${appendLeadZero(d.getDate())}`;
};

export const getDaysFromDate = (date: string): number | null => {
  const now = moment();
  return moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').diff(now, 'days') + 1;
};

export const formatTimeFromNow = (date: string): string | null => moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').fromNow();

export const formatDateTime = (date: string): string | null => {
  if (!date) return null;

  if (date.match(/\d{2}\/\d{2}\/\d{4}/)) {
    return moment.tz(date, 'MM/DD/YYYY', 'Africa/Lagos').format('Do MMM YYYY, h:mm A');
  } if (date.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+/)) {
    return moment.tz(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Africa/Lagos').format('Do MMM YYYY, h:mm A');
  } if (date.match(/\d{4}-\d{2}-\d{2}/)) {
    return moment.tz(date, 'YYYY-MM-DD', 'Africa/Lagos').format('Do MMM YYYY, h:mm A');
  } return null;
};
