// banner.js
const slides = document.querySelector('.banner-slides');
const im = slides.querySelectorAll('img');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

let currentSlide = 0;

function showSlide(index) {
  if (index >= im.length) currentSlide = 0;
  else if (index < 0) currentSlide = im.length - 1;
  else currentSlide = index;

  slides.style.transform = `translateX(-${currentSlide * 30}%)`;
}

nextSlide.addEventListener('click', () => showSlide(currentSlide + 1));
prevSlide.addEventListener('click', () => showSlide(currentSlide - 1));

setInterval(() => showSlide(currentSlide + 1), 5000); // Auto slide every 5s