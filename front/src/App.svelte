<script lang="ts">
  import http from "@/http";
  import Counter from "./lib/Counter.svelte";

  import SvelteLogo from "./assets/svelte.svg";
  import LaravelLogo from "./assets/laravel.svg";
  import TsLogo from "./assets/typescript.svg";
  import ViteLogo from "./assets/vite.svg";

  let promise = null;

  async function fetchPhotos() {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await http.get("");
          resolve(res);
        } catch (e) {
          reject(e.message);
        }
      }, 200);
    });
  }
  promise = fetchPhotos();
</script>

<main>
  <div class="logos">
    <img src={LaravelLogo} alt="Laravel Logo" />
    <img src={SvelteLogo} alt="Svelte Logo" />
    <img src={ViteLogo} alt="Vite Logo" />
    <img src={TsLogo} alt="TypeScript Logo" />
  </div>

  <h1>Laravel / Svelte / Vite / TypeScript<br />API Boilerplate</h1>

  <div class="intro">
    <p>
      Github: <a href="https://svelte.dev">https://svelte.dev</a>
    </p>
  </div>

  <div class="counter">
    <Counter />
  </div>

  {#await promise}
    <p class="loading">... Fetching Photos</p>
  {:then photos}
    <ul class="photo_list">
      {#each photos.data as photo, i}
        <li class="photo_item">
          <img src={photo.url} alt={photo.title} />
          <p>{photo.title}</p>
        </li>
      {/each}
    </ul>
  {:catch error}
    <p>{error}</p>
  {/await}
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 2rem;
    margin: 0 auto;

    .logos {
      display: flex;
      justify-content: center;

      img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        margin: 0 0.5rem;
      }
    }

    h1 {
      color: #ff3e00;
      font-weight: 100;
      font-size: 4rem;
      line-height: 1.1;
      margin: 2rem auto;
    }

    .intro {
      margin-bottom: 3rem;
    }

    .counter {
      margin-bottom: 3rem;
    }

    .loading {
      color: #ff3e00;
      font-weight: 400;
    }

    .photo_list {
      max-width: 800px;
      margin: 0 auto;
    }

    .photo_item {
      display: flex;
      align-items: center;
      padding: 0.25rem;
      margin-bottom: 0.5rem;

      img {
        width: 80px;
        object-fit: contain;
        margin-right: 1rem;
      }
    }
  }
</style>
