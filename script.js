var swiper = new Swiper(".mySwiper", {
  effect: "",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 2,
  spaceBetween: -50,
  initialSlide: 0,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  slideToClickedSlide: true,
});

// Define colors for each bottle
const bottleColors = {
  "Collagen": "#FFC0CB",    // Light Pink
  "Focus": "#E6E6FA",       // Lavender
  "Before Party": "#98FB98", // Pale Green
  "Power": "#FFD700",       // Gold
  "After Party": "#3e3e85"  // Sky Blue
};

// Function to change background color
function changeBackgroundColor(color) {
  document.querySelector('.curved-background').style.backgroundColor = color;
}

// Function to update slide scales
function updateSlideScales() {
  swiper.slides.forEach((slide, index) => {
    if (index === swiper.activeIndex) {
      slide.style.transform = 'scale(1.2) translateY(-20px)';
      slide.querySelector('.description').style.display = 'block';
    } else {
      slide.style.transform = 'scale(1) translateY(0)';
      slide.querySelector('.description').style.display = 'none';
    }
  });
}

// Function to get bottle name from image alt text
function getBottleName(slide) {
const img = slide.querySelector('img');
if (img && img.alt) {
  return img.alt.replace('Blendy ', '');
}
return null;
}

// Add click event listeners to slides
swiper.slides.forEach((slide, index) => {
  slide.addEventListener('click', () => {
    swiper.slideTo(index);
    
    // Change background color based on the clicked bottle
    const bottleName = getBottleName(slide);
  const color = bottleColors[bottleName];
  if (color) {
    changeBackgroundColor(color);
    }
  });
});


// Function to highlight specific words
function highlightWords() {
  const wordsToHighlight = ['NEGATIVE', 'ALCOHOL', 'ELIMINATES', 'FOCUS', 'DOPAMINE', 'YOUNG', 'BEAUTIFUL', 'ENERGY'];
  const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');

  document.querySelectorAll('.description').forEach(description => {
    description.innerHTML = description.innerHTML.replace(regex, match => `<span class="highlight">${match}</span>`);
  });
}

// Call the highlightWords function after the swiper is initialized
highlightWords();

// Set initial background color and slide scales
updateSlideScales();
const initialBottleName = getBottleName(swiper.slides[swiper.activeIndex]);
const initialColor = bottleColors[initialBottleName];
if (initialColor) {
changeBackgroundColor(initialColor);
}
// Update slide scales on slide change
swiper.on('slideChange', updateSlideScales);
