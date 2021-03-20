<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '../store';
  import type { Credentials } from '../types/credentials';
  import { getCookie, setCookie } from '../utils/cookies';

  let credentials: Credentials;

  const unsubscribeAuth = auth.subscribe((auth) => {
    const { email, password } = auth;
    credentials = {
      email,
      password,
    };
  });

  function isAlreadyAuthenticated(): boolean {
    const isLogged = getCookie('logged_in');
    return isLogged === 'yes';
  }

  async function authFromNetwork() {
    const res = await fetch('assets/auth.json');
    const { email, password }: Credentials = await res.json();

    if (email && password) {
      auth.update((auth) => ({ ...auth, email, password }));
      setCookie({ name: 'email', value: email });
      setCookie({ name: 'password', value: password });
    }
  }

  function authFromCookie() {
    const email = getCookie('email');
    const password = getCookie('password');

    return { email, password };
  }

  function fetchAuth() {
    const { email, password } = authFromCookie();

    if (email && password) {
      auth.update((auth) => ({ ...auth, email, password }));
    } else {
      authFromNetwork();
    }
  }

  onMount(() => {
    if (isAlreadyAuthenticated()) {
      auth.update((auth) => ({ ...auth, isAuthenticated: true }));
      setCookie({ name: 'logged_in', value: 'yes', 'max-age': 900 });
    } else {
      fetchAuth();
    }
  });

  function handleSubmit<T>(
    event: Event & {
      currentTarget: EventTarget & T;
    }
  ) {
    event.preventDefault();

    const formData = new FormData(
      document.getElementById('authForm') as HTMLFormElement
    );

    if (
      formData.get('email') === credentials.email &&
      formData.get('password') === credentials.password
    ) {
      console.log('auth success');
      setCookie({ name: 'logged_in', value: 'yes', 'max-age': 900 });
      auth.update((auth) => ({ ...auth, isAuthenticated: true }));
    } else {
      console.log('auth failed');
      console.log(`form email : ${formData.get('email')}`);
      console.log(`form password : ${formData.get('password')}`);
    }
  }
</script>

<form class="form" on:submit={handleSubmit} id="authForm">
  <div>
    <label class="label bodyMMedium">
      Email
      <input class="input bodyMLight" name="email" type="email" />
    </label>
    <label class="label bodyMMedium">
      Mot de passe
      <input class="input bodyMLight" name="password" type="password" />
    </label>
  </div>
  <button
    class="submitButton bodyMMedium"
    on:click={handleSubmit}
    type="submit"
  >
    Valider
  </button>
</form>

<style>
  .form {
    align-content: center;
    display: grid;
    grid-template-rows: max-content max-content max-content;
    height: 100vh;
    justify-content: center;
    margin: auto;
    row-gap: 20px;
  }

  .label {
    display: grid;
    row-gap: 8px;
    grid-template-rows: auto auto;
  }

  .input {
    border: grey;
    width: 256px;
  }

  .input:focus {
    outline: none;
  }

  .submitButton {
    border: 1px solid grey;
    border-radius: 4px;
    margin: 0 auto;
    transition: 0.2s;
    width: 256px;
  }
  .submitButton:active {
    background-color: white;
  }
</style>
