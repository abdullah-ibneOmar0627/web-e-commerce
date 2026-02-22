// reviews.js
const reviewSlides = document.querySelector('.review-slides');
const prevReview = document.getElementById('prevReview');
const nextReview = document.getElementById('nextReview');
let reviewIndex = 0;
let reviews = [];

async function fetchReviews() {
  const res = await fetch('data/reviews.json');
  reviews = await res.json();
  renderReviews();
}

function renderReviews() {
  reviewSlides.innerHTML = '';
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'w-full flex-shrink-0 text-center p-6';
    div.innerHTML = `
      <img src="${r.image}" class="w-16 h-16 mx-auto rounded-full mb-2">
      <h4 class="font-semibold">${r.name}</h4>
      <p class="text-sm text-gray-600 italic mb-1">"${r.comment}"</p>
      <p class="text-yellow-500">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p>
      <p class="text-xs text-gray-400">${r.date}</p>
    `;
    reviewSlides.appendChild(div);
  });
}

function showReview(index) {
  if (index >= reviews.length) reviewIndex = 0;
  else if (index < 0) reviewIndex = reviews.length - 1;
  else reviewIndex = index;

  reviewSlides.style.transform = `translateX(-${reviewIndex * 100}%)`;
}

nextReview.addEventListener('click', () => showReview(reviewIndex + 1));
prevReview.addEventListener('click', () => showReview(reviewIndex - 1));

setInterval(() => showReview(reviewIndex + 1), 6000);

fetchReviews();