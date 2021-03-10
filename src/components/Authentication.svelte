<script lang="ts">
  import { auth } from '../store';
  import type { Project } from '../types/project';

  export let crendentials: Project['crendentials'];

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
      formData.get('email') === crendentials.email &&
      formData.get('password') === crendentials.password
    ) {
      console.log('auth success');
      auth.update(() => true);
    } else {
      console.log('auth failed');
      console.log(formData.get('email'));
      console.log(formData.get('password'));
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
