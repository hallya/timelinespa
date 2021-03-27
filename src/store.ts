import { writable } from 'svelte/store';
import type { Auth } from './types';

export const auth = writable<Auth>({
  isAuthenticated: false,
  id: null,
  password: null,
});
