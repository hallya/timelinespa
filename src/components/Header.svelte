<script>
  export let projectStatus;
</script>

<header>
  <section aria-labelledby="statusLabel" aria-describedby="statusDescription">
    <p id="statusLabel" class="statusTitle fontRegular">Statut</p>
    <p id="statusDescription" class="statusDescription fontLight">
      {projectStatus}
    </p>
  </section>
  <picture>
    <img src="assets/icons/logo_h_black.svg" alt="brand logo" height="30px" width="30px" />
  </picture>
</header>

<style>
  header {
    position: fixed;
    left: 0;
    right: 0;
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    padding: 20px;
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
    font-size: 1.3rem;
    margin-bottom: 8px;
  }

  .statusDescription {
    font-size: 0.9rem;
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
