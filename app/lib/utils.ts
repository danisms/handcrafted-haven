// NOTE: This file contain utility functions for the app

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

// format numbers
export function formatNumber(number: number) {
  let formated_number = `${number}`;

  // Thousand (K)
  if (number >= 1e3) {
    formated_number = (number / 1e3).toFixed(1).replace(/\.0$/, '') + "K";  // To Thousand
  }
  // Million (M)
  if (number >= 1e6) {
    formated_number = (number / 1e6).toFixed(1).replace(/\.0$/, '') + "M";  // To Thousand
  }
  // Billion (B)
  if (number >= 1e9) {
    formated_number = (number / 1e9).toFixed(1).replace(/\.0$/, '') + "B";  // To Thousand
  }
  // Trillion and Above (T+)
  if (number >= 1e12) {
    formated_number = (number / 1e12).toFixed(1).replace(/\.0$/, '') + "T+";  // To Thousand
  }

  return formated_number;
}

export function sliceText(text: string, maxNameLength: number = 30, abbr: true | false = true) {
  if (abbr) {
    return text.length > maxNameLength ? `<abbr title="${text}">${text.slice(0, maxNameLength - 3)}...</abbr>` : text;
  } else {
    return text.length > maxNameLength ? `<abbr title="more">${text.slice(0, maxNameLength - 3)}...</abbr>` : text;
  }
}