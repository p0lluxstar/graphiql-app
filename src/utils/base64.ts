export const base64Encode = (str: string): string => {
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(str)));
  } else {
    return Buffer.from(str).toString('base64');
  }
};

export const base64Decode = (str: string): string => {
  if (typeof window !== 'undefined') {
    return decodeURIComponent(escape(atob(str)));
  } else {
    return Buffer.from(str, 'base64').toString('utf-8');
  }
};
