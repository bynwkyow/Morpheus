import { createSignal, onMount } from 'solid-js';
import Profile from './components/Profile';
import Nav from './components/Nav';

export default function App() {
  const [soundEnabled, setSoundEnabled] = createSignal(true);

  // Play click sound effect
  const playClickSound = () => {
    if (!soundEnabled()) return;
    
    const audio = new Audio('/clicking-sound.wav');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  onMount(() => {
    // Add global click listener to all clickable elements
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('[onclick], button, a, [role="button"], .pointer-events-auto, [data-clickable]')) {
        playClickSound();
      }
    }, true);
  });

  return (
    <div 
      class="relative min-h-screen transition-colors duration-300" 
      style={{ 
        "background-color": "var(--background)",
      }}
    >
      <style>{`
        .blur-overlay {
          position: fixed;
          width: 100%;
          height: 100px;
          left: 0px;
          bottom: 0px;
          backdrop-filter: blur(10px);
          mask-image: linear-gradient(
            to bottom, 
            rgba(0, 0, 0, 0) 0%,      
            rgba(0, 0, 0, 1) 50%,      
            rgba(0, 0, 0, 1) 100%      
          );
          -webkit-mask-image: linear-gradient(
            to bottom, 
            rgba(0, 0, 0, 0) 0%, 
            rgba(0, 0, 0, 1) 50%, 
            rgba(0, 0, 0, 1) 100%
          );
          z-index: 9998;
          pointer-events: none;
        }

        * {
          cursor: url('/Cursor.svg') 24 6, auto;
        }
        
        a, button, [role="button"], .pointer-events-auto {
          cursor: url('/Clickable.svg') 24 12, auto;
        }
      `}</style>
      <div class="w-full max-w-[460px] mx-auto px-6 pt-[30px] pb-[120px] sm:px-8 md:px-4">
        <Profile />
      </div>
      <Nav soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} playClickSound={playClickSound} />
    </div>
  );
}