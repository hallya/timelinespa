interface CookieOption {
  expires?: string;
  'max-age'?: number | 'session';
  path?: string;
}

interface LoggedCookie extends CookieOption {
  name: 'logged_in';
  value: 'yes' | 'no';
};

interface CredentialIdCookie extends CookieOption {
  name: 'id';
  value: string;
};

interface CredentialPasswordCookie extends CookieOption {
  name: 'password';
  value: string;
};

export type Cookie = LoggedCookie | CredentialIdCookie | CredentialPasswordCookie;
