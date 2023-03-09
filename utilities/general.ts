import moment from 'moment-timezone';

export const formatCurrency = (value: any, showCurrency: boolean = true, currency: string = 'NGN') => {
  if (value) {
    let val = value;
    val = val ? parseFloat(val).toFixed(2) : 0.00;
    return val === 0
      ? `${showCurrency ? `${currency} ` : ''}0.00`
      : `${showCurrency ? `${currency} ` : ''}${Number(val).toLocaleString('en-US')}`;
  }
  if (value === 0) return `${showCurrency ? `${currency} ` : ''}0.00`;
  return undefined;
};

export const formatPercent = (value: number) => {
  if (value >= 0) {
    let val = Math.round(value * 100);
    return `${val}%`;
  }
  return null;
};

export const capitalize = (text: string) => {
  const val = decodeURIComponent(text);
  return val?.split(' ')?.map((item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`).join(' ');
};

export const concealEmail = (email = '') => email.replace(/(?<=.{2}).(?=[^@]+@)/g, '*');

export const concealPhoneNo = (phone = '') => phone.replace(/(?<=\d{4})\d(?=\d{2})/g, '*');

export const concealValue = (value = '') => (value ? value.replace(/\w/g, '*') : '');

export const logger = (...logs: any) => (process.env.NODE_ENV === 'development'
  // eslint-disable-next-line no-console
  ? console.log(...logs, `(Log time - ${moment().format('LLL')})`) :
  undefined);

export const format2Digits = (num: number) => {
  if (typeof num !== 'number' || Number.isNaN(num)) return 0;

  return num.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) || 0;
};

export const formatFileUrl = (path: string) => {
  if (path) return `${process.env.REACT_APP_API_BASE_URL}/${path}`;
  return null;
};

export const toggleScroll = () => {
  const overlays = document.querySelectorAll('.overlay');

  if (overlays.length > 0) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};

export const convertImgToBase64 = (inputFile: File) => {
  if (inputFile === undefined) return '';
  const file = new FileReader();

  return new Promise((resolve, reject) => {
    file.onerror = () => {
      file.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    file.onload = () => {
      resolve(file.result);
    };
    file.readAsDataURL(inputFile);
  });
};

export const formatChannel = (channel: string) => {
  switch (channel) {
  case 'transfer': return 'Transfer';
  case 'virtualaccount': return 'Virtual Account';
  case 'escrow': return 'Escrow';
  default: return channel;
  }
};
