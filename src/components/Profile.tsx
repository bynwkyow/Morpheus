import { createSignal, onMount, JSX, createEffect } from "solid-js";
import avatarMint from '../assets/avatar.png';

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

// Text scrambler animation component
interface TextScramblerProps {
  text: string;
  speed?: number;
}

function TextScrambler(props: TextScramblerProps) {
  const [display, setDisplay] = createSignal("");
  const [iteration, setIteration] = createSignal(0);
  const speed = props.speed ?? 40;

  createEffect(() => {
    const currentIter = iteration();
    const text = props.text;

    const scrambled = text
      .split("")
      .map((char, i) => {
        if (i < currentIter) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join("");
    
    setDisplay(scrambled);

    if (currentIter < text.length) {
      const timer = setTimeout(() => setIteration(currentIter + 1), speed);
      return () => clearTimeout(timer);
    }
  });

  onMount(() => {
    setIteration(0);
  });

  return (
    <div
      class="flex flex-col font-['Manrope',sans-serif] font-normal h-[19px] justify-center text-[13.9px] tracking-[0.695px] w-[135px]"
      style={{ color: "var(--text-primary)" }}
    >
      <p class="leading-[normal] whitespace-pre-wrap" dir="auto">
        {display()}
      </p>
    </div>
  );
}

// Animated wrapper component with fade-in and slide-up animation
interface AnimatedProps {
  children: JSX.Element;
  delay?: number;
  duration?: number;
}

function Animated(props: AnimatedProps) {
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

// Profile image with click-to-expand animation
function ProfileImage() {
  const [isHovered, setIsHovered] = createSignal(false);
  const [isExpanded, setIsExpanded] = createSignal(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded());
  };

  const expandedScale = 7.5;
  const originalSize = 60;
  const expandedSize = originalSize * expandedScale;

  return (
    <div 
      style={{
        width: "100%",
        display: "flex",
        "justify-content": isExpanded() ? "center" : "flex-start",
        "align-items": "flex-start",
        "margin-bottom": isExpanded() ? `${expandedSize - originalSize + 20}px` : "0px",
        "margin-left": isExpanded() ? "120px" : "0px",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div
        class="rounded-[8px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        style={{
          width: `${originalSize}px`,
          height: `${originalSize}px`,
          cursor: "pointer",
          transform: isExpanded() 
            ? `scale(${expandedScale})` 
            : isHovered() 
              ? "scale(1.05)" 
              : "scale(1)",
          "transform-origin": isExpanded() ? "top center" : "top left",
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "border-radius": "8px",
        }}
      >
        <img
          src={avatarMint}
          alt="Profile avatar"
          class="w-full h-full object-cover"
          draggable={false}
          style={{ "border-radius": "8px" }}
        />
        <div 
          class="absolute inset-0 border border-[#e9e9e7] rounded-[8px] pointer-events-none"
          style={{ opacity: isExpanded() ? 0 : 1 }}
        />
      </div>
    </div>
  );
}

// Profile header with avatar, name, and title
function ProfileHeader() {
  return (
    <div class="flex flex-col gap-[8px] items-start" style={{ width: "100%" }}>
      <Animated delay={0} duration={0.5}>
        <ProfileImage />
      </Animated>
      <div class="h-[39px] leading-[0] relative shrink-0 w-full">
        <Animated delay={0.1} duration={0.5}>
          <TextScrambler text="Youssef Mahmoud" speed={50} />
        </Animated>
        <Animated delay={0.15} duration={0.5}>
          <div 
            class="flex flex-col font-['Manrope',sans-serif] font-medium h-[20px] justify-center text-[14px] tracking-[-0.09px] w-[58.679px] mt-1" 
            style={{ color: "var(--text-secondary)" }}
          >
            <p class="leading-[20px] whitespace-pre-wrap">Designer</p>
          </div>
        </Animated>
      </div>
    </div>
  );
}

// Bio section with animated paragraphs
function BioSection() {
  return (
    <div class="font-['Manrope',sans-serif] font-medium mt-[20px] text-[10px] tracking-[-0.09px]">
      <Animated delay={0.2} duration={0.6}>
        <div class="relative flex flex-col space-y-6 mb-8">
          <div class="flex flex-col space-y-4 w-full max-w-[459px]">
            <p class="text-[15px] leading-[24px] whitespace-normal" style={{ color: "var(--text-primary)" }}>
              <a href="https://www.behance.net/uimorph" target="_blank" rel="noopener noreferrer" class="text-[#09f] hover:underline">Graphic designer</a>
              <span> by day, </span>
              <a href="https://dribbble.com/uimorph" target="_blank" rel="noopener noreferrer" class="text-[#09f] hover:underline">UI designer</a>
              <span> by night, with a strong taste, and a growing intuition for design. Understanding how things are made helps me design products that feel right, not just look good.</span>
            </p>
          </div>
        </div>
      </Animated>

      <Animated delay={0.3} duration={0.6}>
        <div class="relative flex flex-col space-y-6 mb-8">
          <div class="flex flex-col space-y-3 w-full max-w-[395px]">
            <p class="text-[15px] leading-[24px] whitespace-normal" style={{ color: "var(--text-primary)" }}>
              I'm very passionate about the details, but ultimately, great products result from collaboration, smart thinking, and effective trade-offs.
            </p>
          </div>
        </div>
      </Animated>

      <Animated delay={0.4} duration={0.6}>
        <div class="relative flex flex-col space-y-6">
          <div class="flex flex-col space-y-3 w-full max-w-[444px]">
            <p class="text-[15px] leading-[24px] whitespace-normal" style={{ color: "var(--text-primary)" }}>
              I'm 22 years old and currently live in Mansoura, Egypt, working mostly remote. Most of my learning came from building, breaking, and shipping things on the internet.
            </p>
          </div>
        </div>
      </Animated>
    </div>
  );
}

// Work experience section
function WorkSection() {
  return (
    <Animated delay={0.5} duration={0.6}>
      <div class="mt-12">
        <p 
          class="font-['Manrope',sans-serif] font-semibold tracking-[-0.0638px] mb-6" 
          style={{ "font-size": "15px", color: "var(--text-primary)" }}
        >
          Work
        </p>
        
        <div class="flex items-center justify-between mb-4">
          <p class="font-['Manrope',sans-serif] font-normal" style={{ "font-size": "15px" }}>
            <span style={{ color: "var(--text-primary)" }}>Jam.fm</span>
            <span style={{ color: "var(--text-muted)" }}>      Music tracking service</span>
          </p>
          <span class="font-['Geist_Mono',monospace]" style={{ "font-size": "15px", color: "var(--text-secondary)" }}>
            2025 — ▒▒▒▒
          </span>
        </div>
        
        <div class="w-full h-px mb-4" style={{ background: "var(--border-color)" }} />
        
        <div class="flex items-center justify-between">
          <p class="font-['Manrope',sans-serif] font-normal" style={{ "font-size": "15px" }}>
            <span class="font-medium" style={{ color: "var(--text-primary)" }}>Lockie</span>
            <span style={{ color: "var(--text-secondary)" }}>      Personal password manager</span>
          </p>
          <span class="font-['Geist_Mono',monospace]" style={{ "font-size": "15px", color: "var(--text-secondary)" }}>
            2024 — 2025
          </span>
        </div>
      </div>
    </Animated>
  );
}

// Social links section
function SocialLinksSection() {
  const links = [
    { href: "https://x.com/uimorph", label: "X (Twitter): @uimorph" },
    { href: "https://linkedin.com/in/uimorph", label: "LinkedIn: /in/uimorph" },
    { href: "https://behance.net/uimorph", label: "Behance: @uimorph" },
  ];

  return (
    <Animated delay={0.6} duration={0.6}>
      <div class="mt-12">
        <p 
          class="font-['Manrope',sans-serif] font-semibold tracking-[-0.0671px] mb-6" 
          style={{ "font-size": "15px", color: "var(--text-primary)" }}
        >
          Elsewhere
        </p>
        
        <div class="flex flex-col gap-2">
          {links.map((link) => (
            <a 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              class="font-['Manrope',sans-serif] font-medium text-[#09f] tracking-[-0.0671px] hover:underline w-fit"
              style={{ "font-size": "15px" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Animated>
  );
}

// Main Profile component
export default function Profile() {
  return (
    <div class="relative w-full overflow-visible">
      <div class="pb-12 overflow-visible">
        <ProfileHeader />
        <BioSection />
      </div>
      <WorkSection />
      <SocialLinksSection />
    </div>
  );
}
