<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { store } from './store';
  import Header from './components/Header.svelte';
  import Timeline from './components/Timeline.svelte';
  import type { Project } from './types/project';
  import Authentication from './components/Authentication.svelte';
  import { registerSW } from './registerServiceWorker';

  onMount(() => {
    registerSW();
  });

  let project: Project | null = null;
  let isAuthenticated: boolean = false;

  async function getProject(projectUrl: string | null) {
    if (projectUrl) {
      const { data } = await axios.get(projectUrl);
      project = data;
    }
  }

  store.subscribe((store) => {
    isAuthenticated = store.isAuthenticated;
    const { projectUrl } = store;
    getProject(projectUrl);
  });
</script>

<main>
  {#if !isAuthenticated || !project}
    <Authentication />
  {:else if isAuthenticated && project}
    <Header projectStatus={project.status} />
    <Timeline
      startDate={project.startDate}
      events={project.events}
      lifeCycles={project.lifeCycles}
    />
  {/if}
</main>

<style>
  main {
    height: 100vh;
    position: relative;
  }
</style>
