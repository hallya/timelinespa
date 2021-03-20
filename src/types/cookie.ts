interface CookieOption {
  expires?: string;
  'max-age'?: number | 'session';
  path?: string;
}

interface LoggedCookie extends CookieOption {
  name: 'logged_in';
  value: 'yes' | 'no';
};

interface EmailCookie extends CookieOption {
  name: 'email';
  value: string;
};

interface PasswordCookie extends CookieOption {
  name: 'password';
  value: string;
};

export type Cookie = LoggedCookie | EmailCookie | PasswordCookie;
