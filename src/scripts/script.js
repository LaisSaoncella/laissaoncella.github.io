document.addEventListener('DOMContentLoaded', () => {
  // Initialize map and reviews first
  initMap();

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

// Function to initialize the map and load reviews
function initMap() {
  const placeId = "ChIJGawnuz3l3JQRRY93EEXFlpk"; // Replace with your Place ID
  const service = new google.maps.places.PlacesService(document.createElement("div"));
  service.getDetails({
    placeId: placeId,
    fields: ["reviews", "rating", "user_ratings_total"]
  }, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place && place.reviews) {
      const reviewsContainer = document.getElementById("reviews-content"); // Corrected ID
      reviewsContainer.innerHTML = ""; // Clear previous content

      // Limit to 5 reviews
      const limitedReviews = place.reviews.slice(0, 5);

      // Render review cards
      limitedReviews.forEach(review => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        // User name and photo
        const reviewUser = document.createElement("div");
        reviewUser.classList.add("review-user");

        const reviewImage = document.createElement("img");
        reviewImage.src = review.profile_photo_url || "default-avatar.png";
        reviewImage.alt = `Profile photo of ${review.author_name}`;
        reviewImage.loading = "lazy";

        const reviewName = document.createElement("span");
        reviewName.textContent = review.author_name;

        reviewUser.appendChild(reviewImage);
        reviewUser.appendChild(reviewName);
        reviewCard.appendChild(reviewUser);

        // Stars
        const reviewStars = document.createElement("div");
        reviewStars.classList.add("review-stars");
        reviewStars.innerHTML = generateStars(review.rating);
        reviewCard.appendChild(reviewStars);

        // Review text
        const reviewText = document.createElement("p");
        reviewText.classList.add("review-text");
        reviewText.textContent = truncateText(review.text, 150);
        reviewCard.appendChild(reviewText);

        // Add card to container
        reviewsContainer.appendChild(reviewCard);
      });
    } else {
      console.error("Error loading reviews:", status);
      const reviewsContainer = document.getElementById("reviews-content");
      reviewsContainer.innerHTML = "Error loading reviews.";
    }
  });
}

// Function to generate stars
function generateStars(rating) {
  const fullStar = "★".repeat(Math.floor(rating));
  const emptyStar = "☆".repeat(5 - Math.floor(rating));
  return `${fullStar}${emptyStar}`;
}

// Function to truncate text
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

// Initialize map and reviews when the page loads - moved to DOMContentLoaded
// window.onload = initMap;

function updateYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

updateYear();
