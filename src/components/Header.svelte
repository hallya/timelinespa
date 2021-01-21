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
    <source
      media="(min-width: 1200px)"
      srcset="assets/icons/logo_h_black_50px.png"
    />
    <source
      media="(min-width: 728px)"
      srcset="assets/icons/logo_h_black_30px.png"
    />
    <img src="assets/icons/logo_h_black_20px.png" alt="brand logo" />
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
    width: 20px;
  }

  @media screen and (min-width: 728px) {
    img {
      width: 30px;
    }
  }

  @media screen and (min-width: 1200px) {
    header {
      margin: auto;
      max-width: 800px;
    }
  }
</style>
