<script lang="ts">
  import Header from './components/Header.svelte';
  import Timeline from './components/Timeline.svelte';
  import project from './data/project.json';
</script>

<main>
  <Header projectStatus={project.status} />
  <Timeline
    startDate={project.startDate}
    events={project.events}
    lifeCycles={project.lifeCycles}
  />
</main>

<style>
  main {
    height: 100vh;
    position: relative;
  }
</style>
