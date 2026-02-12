import { createSignal, onMount } from "solid-js";

interface ProjectJamFMProps {
  onBack: () => void;
}

function Animated(props: { children: any; delay?: number; duration?: number }) {
  const [isVisible, setIsVisible] = createSignal(false);
  const delay = props.delay ?? 0;
  const duration = props.duration ?? 0.6;

  onMount(() => {
    setTimeout(() => setIsVisible(true), delay * 1000);
  });

  return (
    <div
      style={{
        opacity: isVisible() ? 1 : 0,
        transform: isVisible() ? "translateY(0px)" : "translateY(20px)",
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      }}
    >
      {props.children}
    </div>
  );
}

export default function ProjectJamFM(props: ProjectJamFMProps) {
  return (
    <div class="w-full max-w-[460px] lg:max-w-[600px] xl:max-w-[700px] mx-auto px-6 pt-[30px] pb-[120px] sm:px-8 md:px-4 lg:px-6 xl:px-8">
      {/* Header with Avatar and Title */}
      <Animated delay={0.1} duration={0.6}>
        <div class="flex items-center gap-3 mb-3">
          <div class="flex-shrink-0">
            <img 
              src="/jamfm-logo.png" 
              alt="JamFM Logo" 
              class="w-[60px] h-[60px] rounded-[12px]"
            />
          </div>
          <div class="flex-1">
            <h1 class="font-['Inter',sans-serif] font-normal text-[17px] leading-[15px] mb-1" style={{ color: "var(--text-primary)" }}>
              JamFM
            </h1>
            <p class="font-['Inter',sans-serif] font-normal text-[15px] leading-[22px]" style={{ color: "var(--text-secondary)" }}>
              Music Streaming Platform
            </p>
          </div>
          <div class="flex items-center">
            <span 
              class="font-['Inter',sans-serif] font-normal text-[15px]"
              style={{ 
                color: "rgb(59, 130, 246)"
              }}
            >
              Live Project
            </span>
          </div>
        </div>
      </Animated>

      {/* Project Description */}
      <Animated delay={0.2} duration={0.6}>
        <div class="mb-6">
          <p class="font-['Inter',sans-serif] font-normal text-[15px] leading-[24px] mb-4" style={{ color: "var(--text-primary)" }}>
            JamFM is a modern music streaming platform designed to deliver a seamless listening experience. Built with a focus on discovery and personalization, it helps users explore new music while keeping their favorite tracks organized and accessible.
          </p>
          <p class="font-['Inter',sans-serif] font-normal text-[15px] leading-[24px]" style={{ color: "var(--text-primary)" }}>
            From curated playlists and smart recommendations to high-quality audio streaming, every feature is crafted with music lovers in mind. The platform offers intuitive controls, social sharing features, and cross-device synchronization to ensure your music follows you wherever you go.
          </p>
        </div>
      </Animated>

      {/* Main Preview Image */}
      <Animated delay={0.3} duration={0.6}>
        <div>
          <div 
            class="rounded-[16px] overflow-hidden"
            style={{ 
              "background-color": "var(--card-background)",
              border: "1px solid var(--border-color)"
            }}
          >
            <img 
              src="/jamfm-preview.png" 
              alt="JamFM Preview" 
              class="w-full"
            />
          </div>
        </div>
      </Animated>
    </div>
  );
}
