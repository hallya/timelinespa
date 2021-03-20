<script lang="ts">
  import { auth } from './store';
  import Header from './components/Header.svelte';
  import Timeline from './components/Timeline.svelte';
  import type { Project } from './types/project';
  import Authentication from './components/Authentication.svelte';

  let project: Project;
  let isAuthenticated: boolean;

  const unsubscribeAuth = auth.subscribe((auth) => {
    isAuthenticated = auth.isAuthenticated;
  });

  fetch('assets/project.json')
    .then((res) => res.json())
    .then((data) => {
      project = data;
    });
</script>

<main>
  {#if project && isAuthenticated}
    <Header projectStatus={project.status} />
    <Timeline
      startDate={project.startDate}
      events={project.events}
      lifeCycles={project.lifeCycles}
    />
  {:else if project && !isAuthenticated}
    <Authentication />
  {/if}
</main>

<style>
  main {
    height: 100vh;
    position: relative;
  }
</style>
