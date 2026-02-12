import { createSignal, onMount } from 'solid-js';

interface MediaProps {
  onBack: () => void;
}

export default function Media(props: MediaProps) {
  const [pageVisible, setPageVisible] = createSignal(false);

  onMount(() => {
    // Show page with animation
    setTimeout(() => setPageVisible(true), 50);
  });

  return (
    <div 
      class="w-full max-w-[460px] lg:max-w-[600px] xl:max-w-[700px] mx-auto px-6 pt-[30px] pb-[120px] sm:px-8 md:px-4 lg:px-6 xl:px-8 transition-all duration-700"
      style={{
        opacity: pageVisible() ? '1' : '0',
        transform: pageVisible() ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Title with animation */}
      <h1 
        class="font-['Inter',sans-serif] font-medium text-[24px] mb-8 animate-fade-in"
        style={{ 
          color: "var(--text-primary)",
          "animation-delay": "0.1s",
          opacity: '0'
        }}
      >
        Movies & Games
      </h1>

      {/* Iframe container with smooth animation */}
      <div 
        class="w-full rounded-lg overflow-hidden animate-fade-in"
        style={{ 
          "background-color": "var(--background)",
          "animation-delay": "0.2s",
          opacity: '0'
        }}
      >
        <iframe
          src="https://skiper-ui.com/v1/skiper48"
          class="w-full border-0"
          style={{ 
            height: '80vh',
            "min-height": '600px',
            "border-radius": '8px'
          }}
          title="Movies and Games"
          loading="eager"
        />
      </div>

      {/* Optional description with animation */}
      <p 
        class="mt-6 font-['Inter',sans-serif] font-normal text-[15px] leading-[24px] animate-fade-in"
        style={{ 
          color: "var(--text-secondary)",
          "animation-delay": "0.3s",
          opacity: '0'
        }}
      >
        Explore my favorite movies and games collection.
      </p>
    </div>
  );
}
