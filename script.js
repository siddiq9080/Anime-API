document.addEventListener("DOMContentLoaded", () => {
  const animeContainer = document.getElementById("anime-container");
  const API_URL = "https://api.jikan.moe/v4/top/anime";

  /**
   * Fetches data from the Jikan API.
   * @returns {Promise<Array>} A promise that resolves to an array of anime objects.
   */
  async function fetchAnimeData() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching anime data:", error);
      return [];
    }
  }

  /**
   * Creates a Bootstrap card element for an anime.
   * @param {Object} anime The anime data object.
   */
  function createAnimeCard(anime) {
    const card = document.createElement("div");
    card.className = "col-lg-4 col-md-6 col-sm-12 mb-4";

    const cardContent = `
      <div class="card">
        <div class="card-header text-center">
          ${anime.title}
        </div>
        <div class="card-body">
          <img src="${anime.images.jpg.image_url}" class="card-img-top " alt="${anime.title}">
          <p class="card-text mt-3"><strong>Episodes:</strong> ${anime.episodes}</p>
          <p class="card-text"><strong>Score:</strong> ${anime.score}</p>
          <p class="card-text"><strong>Type:</strong> ${anime.type}</p>
          <p class="card-text"><strong>Start Date:</strong> ${anime.aired.from}</p>
        </div>
      </div>
    `;

    card.innerHTML = cardContent;
    animeContainer.appendChild(card);
  }

  /**
   * Initializes the app by fetching anime data and displaying it.
   */
  async function init() {
    try {
      const animeData = await fetchAnimeData();
      animeData.forEach(createAnimeCard);
    } catch (error) {
      console.error("Error initializing app:", error);
    }
  }

  // Initialize the app on page load
  init();
});
