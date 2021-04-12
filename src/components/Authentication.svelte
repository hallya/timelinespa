<script lang="ts">
  import { onMount } from 'svelte';
  import { default as axios } from 'axios';
  import { store } from '../store';
  import type { Credentials } from '../types/credentials';
  import { getCookie, setCookie } from '../utils/cookies';
  import { COOKIE_DURATION } from '../utils/constants';

  let invalidCredentials = false;

  function isAlreadyAuthenticated(): boolean {
    const isLogged = getCookie('logged_in');
    return isLogged === 'yes';
  }

  async function login(formData: Credentials) {
    try {
      const { data } = await axios.post<{ url: string }>(
        'https://jawhoidas0.execute-api.us-east-1.amazonaws.com/latest/login',
        formData,
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      setCookie({ name: 'logged_in', value: 'yes', 'max-age': 900 });
      setCookie({
        name: 'projectUrl',
        value: data.url,
        'max-age': COOKIE_DURATION,
      });

      store.update(() => ({
        projectUrl: data.url,
        isAuthenticated: true,
      }));
      invalidCredentials = false;
    } catch (e) {
      console.error(e);
      invalidCredentials = true;
    }
  }

  function tryGetProjectUrl() {
    const projectUrl = getCookie('projectUrl');

    if (projectUrl) {
      store.update(() => ({ projectUrl, isAuthenticated: true }));
      setCookie({
        name: 'logged_in',
        value: 'yes',
        'max-age': COOKIE_DURATION,
      });
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    const [id, password]: [
      HTMLInputElement,
      HTMLInputElement
    ] = (document.getElementById('authForm') as any)?.elements;

    login({ id: id.value, password: password.value });
  }

  onMount(() => {
    if (isAlreadyAuthenticated()) {
      tryGetProjectUrl();
    }
  });
</script>

<form class="form" on:submit={handleSubmit} id="authForm">
  <div class="fieldset">
    <label class="label bodyMMedium">
      Identifiant
      <input class={`input bodyMLight`} name="id" type="text" />
    </label>
    <label class="label bodyMMedium">
      Mot de passe
      <input class={`input bodyMLight`} name="password" type="password" />
    </label>
    {#if invalidCredentials}
      <p class="invalid bodySLight">Identifiants incorrects</p>
    {/if}
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

  .fieldset {
    position: relative;
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

  .invalid {
    color: red;
    margin: 0 auto;
    position: absolute;
    bottom: -15px;
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
