interface CookieOption {
  expires?: string;
  'max-age'?: number | 'session';
  path?: string;
}

interface LoggedCookie extends CookieOption {
  name: 'logged_in';
  value: 'yes' | 'no';
};

interface ProjectURLCookie extends CookieOption {
  name: 'projectUrl';
  value: string;
};

export type Cookie = LoggedCookie | ProjectURLCookie;
