function initCarousel() {
  let carouselArrowRight = document.querySelector(`.carousel__arrow_right`);
  let carouselArrowLeft = document.querySelector(`.carousel__arrow_left`);
  let carouselInner = document.querySelector(`.carousel__inner`);
  let widthCarouselInner = carouselInner.offsetWidth;
  let levelCarouselInner = 1;
  carouselArrowLeft.style.display = 'none';

  carouselArrowRight.addEventListener(`click`, () => {
    levelCarouselInner += 1;
    carouselInner.style.transform = `translateX(-${(levelCarouselInner - 1) * widthCarouselInner}px)`;
    if (levelCarouselInner < 4) {
      carouselArrowRight.style.display = '';
      carouselArrowLeft.style.display = '';      
    } else {
      carouselArrowRight.style.display = 'none';
    }
    console.log(levelCarouselInner);
  });

  carouselArrowLeft.addEventListener(`click`, () => {
    levelCarouselInner -= 1;
    carouselInner.style.transform = `translateX(-${(levelCarouselInner - 1) * widthCarouselInner}px)`;
    if (levelCarouselInner <= 1) {
      carouselArrowLeft.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
      carouselArrowRight.style.display = '';
    }
    console.log(levelCarouselInner);
  });
}