<script lang="ts">
  import type { Project } from '../types/project';

  export let projectStatus: Project['status'];
</script>

<header>
  <section aria-labelledby="statusLabel" aria-describedby="statusDescription">
    <p id="statusLabel" class="statusTitle bodyXLRegular">Statut</p>
    <p id="statusDescription" class="statusDescription bodySLight">
      {projectStatus}
    </p>
  </section>
  <picture>
    <img
      src="assets/icons/logo_h_black.svg"
      alt="brand logo"
      height="30px"
      width="30px"
    />
  </picture>
</header>

<style>
  header {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    left: 0;
    padding: 20px;
    position: fixed;
    right: 0;
    z-index: 1;
  }
  section {
    max-width: 65%;
  }

  .statusTitle,
  .statusDescription {
    margin: 0;
    letter-spacing: 2px;
  }

  .statusTitle {
    margin-bottom: 8px;
  }

  .statusDescription {
    line-height: 1.5rem;
  }

  img {
    position: relative;
    top: 5px;
    height: 30px;
    width: 30px;
  }

  @media screen and (min-width: 1200px) {
    header {
      margin: auto;
      max-width: 800px;
    }
  }
</style>
