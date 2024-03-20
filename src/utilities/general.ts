import moment from 'moment-timezone';

import { idTypes } from '../data/kyc';

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
    const val = Math.round(value * 100);
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
  ? console.log(...logs, `(Log time - ${moment().format('LLL')})`)
  : undefined);

export const format2Digits = (num: number) => {
  if (typeof num !== 'number' || Number.isNaN(num)) return 0;

  return num.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) || 0;
};

export const formatFileUrl = (path?: string) => {
  if (path) return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path?.replaceAll('\\', '/')}`;
  return undefined;
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

  return new Promise<string>((resolve, reject) => {
    file.onerror = () => {
      file.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    file.onload = () => {
      resolve(String(file.result));
    };
    file.readAsDataURL(inputFile);
  });
};

export const formatChannel = (channel: string) => {
  switch (channel) {
  case 'transfer': return 'Transfer';
  case 'virtualaccount': return 'Virtual Account';
  case 'escrow': return 'Escrow';
  case 'interbank': return 'Interbank';
  default: return channel;
  }
};

export const formatDisbursementType = (type: string) => {
  switch (type) {
  case 'onetime': return 'One Time';
  case 'installment': return 'Installment';
  default: return type;
  }
};

export const formatIDTypeLabel = (value: string) => idTypes
  .find((item) => item.value === value)?.label;

// export const base64ToFile = (base64String: string, fileName: string) => {
//   const base64Parts = base64String?.split(';base64,');
//   const contentType = base64Parts[0]?.split(':')[1];
//   const raw = window?.atob(base64Parts[1]);
//   const rawLength = raw?.length;
//   const uint8Array = new Uint8Array(rawLength);

//   for (let i = 0; i < rawLength; ++i) {
//     uint8Array[i] = raw?.charCodeAt(i);
//   }

//   const blob = new Blob([uint8Array], { type: contentType });

//   return new File([blob], fileName, { type: contentType });
// };
