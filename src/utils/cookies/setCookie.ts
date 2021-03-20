import type { Cookie } from './../../types/cookie';

export function setCookie(cookie: Cookie) {
  const { name, value, ...options } = cookie;
  
  const cookieReady = Object.entries(options).reduce((cookie, [optionName, optionValue]) => {
    if(optionValue) {
      return `${cookie}; ${optionName}=${optionValue}`;
    }
    return cookie;
  }, encodeURIComponent(name) + '=' + encodeURIComponent(value));
  
  document.cookie = cookieReady;
}
