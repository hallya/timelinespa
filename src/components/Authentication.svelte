<script lang="ts">
  import { onMount } from 'svelte';
  import { AxiosResponse, default as axios } from 'axios';
  import { store } from '../store';
  import type { Credentials } from '../types/credentials';
  import { getCookie, setCookie } from '../utils/cookies';

  let invalidId = false;
  let invalidPassword = false;

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
        'max-age': 900,
      });

      store.update(() => ({
        projectUrl: data.url,
        isAuthenticated: true,
      }));
    } catch (e) {
      console.error(e);
    }
  }

  function tryGetProjectUrl() {
    const projectUrl = getCookie('projectUrl');

    if (projectUrl) {
      store.update(() => ({ projectUrl, isAuthenticated: true }));
      setCookie({ name: 'logged_in', value: 'yes', 'max-age': 900 });
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
  <div>
    <label class="label bodyMMedium">
      Identifiant
      <input
        class={`input bodyMLight ${invalidId ? 'invalid' : ''}`}
        name="id"
        type="text"
      />
    </label>
    <label class="label bodyMMedium">
      Mot de passe
      <input
        class={`input bodyMLight ${invalidPassword ? 'invalid' : ''}`}
        name="password"
        type="password"
      />
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

  .invalid {
    box-shadow: 0 0 2px 0px red;
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
