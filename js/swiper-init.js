const featuresSwiper = new Swiper('.features-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        }
    }
});

const partnersSwiper = new Swiper('.partners-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 57,
    loop: true,
    freeMode: true,
    speed: 5000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        1024: {
            slidesPerView: 6,
        }
    }
});

const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 32,
    loop: true,
    autoHeight: false,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

const pricingSwiper = new Swiper('.pricing-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    initialSlide: 1,
    autoHeight: true,
    pagination: {
        el: '.pricing-swiper .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.pricing-button-next',
        prevEl: '.pricing-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 32,
            centeredSlides: false,
            initialSlide: 0,
            autoHeight: false,
        }
    }
});

const blogSwiper = new Swiper('.blog-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.blog-navigation .swiper-button-next',
        prevEl: '.blog-navigation .swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 32,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});
