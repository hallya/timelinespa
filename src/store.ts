import { writable } from 'svelte/store';
import type { Auth } from './types/auth';

export const auth = writable<Auth>({
  isAuthenticated: false,
  email: null,
  password: null,
});
