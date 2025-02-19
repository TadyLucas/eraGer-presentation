let currentIndex = 0;
let activeSlides = [];

// Show only the selected category slides
function showSlides(category, specific = null) {
    const allSlides = document.querySelectorAll('.slide');

    // Hide all slides
    allSlides.forEach(slide => slide.style.display = 'none');

    // Get relevant slides
    if (specific) {
        activeSlides = [...document.querySelectorAll(`.slide.${specific}`)];
    } else {
        activeSlides = [...document.querySelectorAll(`.slide.${category}, .slide.${category}-1w, .slide.${category}-2w`)];
    }

    // Reset index and show first slide
    currentIndex = 0;
    if (activeSlides.length > 0) {
        activeSlides[currentIndex].style.display = 'flex';
    }
}



// Slide left or right
function changeSlide(direction) {
    if (activeSlides.length === 0) return;

    // Hide current slide
    activeSlides[currentIndex].style.display = 'none';

    // Change index
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = activeSlides.length - 1;
    if (currentIndex >= activeSlides.length) currentIndex = 0;

    // Show new slide
    activeSlides[currentIndex].style.display = 'block';
}

// Show home slides by default
document.addEventListener("DOMContentLoaded", function () {
    showSlides('home');
});
