export interface Auth {
  isAuthenticated: boolean;
  email: string | null;
  password: string | null;
}
