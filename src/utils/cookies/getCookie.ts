import type { Cookie } from "../../types/cookie";

export function getCookie(key: Cookie['name']) {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`));

  if (matches) {
    const [, match] = Array.from(matches);
    const formattedCookie = decodeURIComponent(match);
    return formattedCookie;
  }
  return null;
}
