import { createSignal, onMount, Show } from 'solid-js';
import Profile from './components/Profile';
import Activity from './components/Activity';
import Nav from './components/Nav';
import ProjectLockie from './components/ProjectLockie';
import ProjectJamFM from './components/ProjectJamfm';
import './styles/globals.css'

export default function App() {
  const [soundEnabled, setSoundEnabled] = createSignal(true);
  const [currentPage, setCurrentPage] = createSignal<'home' | 'activity' | 'lockie' | 'jamfm'>('home');
  
  const playClickSound = () => {
    if (!soundEnabled()) return;
    
    const audio = new Audio('/clicking-sound.wav');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  };
  
  const navigateToActivity = () => {
    setCurrentPage('activity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const navigateToLockie = () => {
    setCurrentPage('lockie');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const navigateToJamFM = () => {
    setCurrentPage('jamfm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMount(() => {
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
        
        a, button, [role="button"], .pointer-events-auto, [data-clickable], input, select, textarea, label, [onclick] {
          cursor: url('/Clickable.svg') 24 12, auto;
        }
      `}</style>
      
      <Show when={currentPage() === 'home'}>
        <div class="w-full max-w-[460px] lg:max-w-[600px] xl:max-w-[700px] mx-auto px-6 pt-[30px] pb-[120px] sm:px-8 md:px-4 lg:px-6 xl:px-8">
          <Profile onNavigateToActivity={navigateToActivity} onNavigateToLockie={navigateToLockie} onNavigateToJamFM={navigateToJamFM} />
        </div>
      </Show>
      
      <Show when={currentPage() === 'activity'}>
        <Activity onBack={navigateToHome} />
      </Show>
      
      <Show when={currentPage() === 'lockie'}>
        <ProjectLockie onBack={navigateToHome} />
      </Show>
      
      <Show when={currentPage() === 'jamfm'}>
        <ProjectJamFM onBack={navigateToHome} />
      </Show>
      
      <Nav soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} playClickSound={playClickSound} />
    </div>
  );
}
