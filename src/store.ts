import { writable } from 'svelte/store';
import type { Store } from './types';

export const store = writable<Store>({
  isAuthenticated: false,
  projectUrl: null,
});
