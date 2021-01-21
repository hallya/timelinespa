<script lang="ts">
  import Header from './components/Header.svelte';
  import Timeline from './components/Timeline.svelte';
  let project;

  fetch('assets/project.json')
    .then(res => res.json())
    .then(data => {
      project = data;
    });
</script>

<main>
  {#if project}
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
