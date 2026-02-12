import { onMount } from 'solid-js';
import Swiper from 'swiper';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

interface ActivityProps {
  onBack: () => void;
}

export default function Activity(props: ActivityProps) {
  let swiperContainer: HTMLDivElement | undefined;

 const images = [
  { src: '/1.webp', alt: 'Card 1' },
  { src: '/2.webp', alt: 'Card 2' },
  { src: '/3.webp', alt: 'Card 3' },
  { src: '/4.webp', alt: 'Card 4' },
  { src: '/5.webp', alt: 'Card 5' },
  { src: '/6.webp', alt: 'Card 6' },
];

  onMount(() => {
    // Preload images in background
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });

    // Initialize Swiper
    if (swiperContainer) {
      new Swiper(swiperContainer.querySelector('.swiper') as HTMLElement, {
        modules: [EffectCards],
        effect: 'cards',
        grabCursor: true,
        loop: true,
        speed: 400,
      });
    }
  });

  return (
    <div class="flex h-screen w-full items-center justify-center relative">
      <style>{`
        .swiper {
          width: 260px;
          height: 380px;
        }
        .swiper-slide {
          border-radius: 24px;
          overflow: hidden;
        }
        .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Fade in animation */
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .swiper-container-animated {
          animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Swiper container with fade-in animation */}
      <div 
        ref={swiperContainer}
        class="swiper-container-animated"
      >
        <div class="swiper">
          <div class="swiper-wrapper">
            {images.map((image) => (
              <div class="swiper-slide">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
