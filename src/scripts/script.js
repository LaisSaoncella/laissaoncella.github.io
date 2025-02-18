document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-section .menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  } else {
    console.error('Mobile menu elements not found!');
  }
});

// Função para inicializar o mapa e carregar as avaliações
function initMap() {
  const placeId = "ChIJGawnuz3l3JQRRY93EEXFlpk"; // Substitua pelo seu Place ID
  const service = new google.maps.places.PlacesService(document.createElement("div"));
  service.getDetails({
    placeId: placeId,
    fields: ["reviews", "rating", "user_ratings_total"]
  }, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place && place.reviews) {
      const reviewsContainer = document.getElementById("reviews-content"); // ID corrigido
      reviewsContainer.innerHTML = ""; // Limpa o conteúdo anterior

      // Limita a exibição a 5 avaliações
      const limitedReviews = place.reviews.slice(0, 5);

      // Renderiza os cards de avaliação
      limitedReviews.forEach(review => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        // Nome e foto do usuário
        const reviewUser = document.createElement("div");
        reviewUser.classList.add("review-user");

        const reviewImage = document.createElement("img");
        reviewImage.src = review.profile_photo_url || "default-avatar.png";
        reviewImage.alt = `Foto de perfil de ${review.author_name}`;
        reviewImage.loading = "lazy";

        const reviewName = document.createElement("span");
        reviewName.textContent = review.author_name;

        reviewUser.appendChild(reviewImage);
        reviewUser.appendChild(reviewName);
        reviewCard.appendChild(reviewUser);

        // Estrelas
        const reviewStars = document.createElement("div");
        reviewStars.classList.add("review-stars");
        reviewStars.innerHTML = generateStars(review.rating);
        reviewCard.appendChild(reviewStars);

        // Texto da avaliação
        const reviewText = document.createElement("p");
        reviewText.classList.add("review-text");
        reviewText.textContent = truncateText(review.text, 150);
        reviewCard.appendChild(reviewText);

        // Adiciona o card ao container
        reviewsContainer.appendChild(reviewCard);
      });
    } else {
      console.error("Erro ao carregar avaliações:", status);
      const reviewsContainer = document.getElementById("reviews-content");
      reviewsContainer.innerHTML = "Erro ao carregar as avaliações.";
    }
  });
}

// Função para gerar as estrelas
function generateStars(rating) {
  const fullStar = "★".repeat(Math.floor(rating));
  const emptyStar = "☆".repeat(5 - Math.floor(rating));
  return `${fullStar}${emptyStar}`;
}

// Função para truncar o texto
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

// Inicializa o mapa e as avaliações quando a página carrega
window.onload = initMap;

function updateYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

updateYear();