import { createSignal, onMount, onCleanup, JSX } from "solid-js";
import { iconPaths } from "./icons";

interface DockIconProps {
  children: JSX.Element;
  label: string;
  onClick?: () => void;
  isCopy?: boolean;
  copyText?: string;
  isDark: () => boolean;
  onSoundToggle?: () => void;
  playClickSound?: () => void;
}

function DockIcon(props: DockIconProps) {
  const [hovered, setHovered] = createSignal(false);
  const [copied, setCopied] = createSignal(false);

  const handleClick = () => {
    if (props.isCopy && props.copyText) {
      navigator.clipboard.writeText(props.copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
    if (props.onClick) props.onClick();
    if (props.onSoundToggle) props.onSoundToggle();
    if (props.playClickSound) props.playClickSound();
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        position: "relative",
        width: "36px",
        height: "36px",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "border-radius": "50%",
        cursor: props.onClick || props.isCopy ? "pointer" : "default",
        color: hovered()
          ? (props.isDark() ? "rgba(255,255,255,0.95)" : "rgba(23,23,23,0.95)")
          : (props.isDark() ? "rgba(163,163,163,1)" : "rgba(100,100,100,1)"),
        transform: hovered() ? "scale(1.12)" : "scale(1)",
        transition: "all 0.2s ease",
      }}
    >
      {props.children}

      {(hovered() || copied()) && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%) translateY(-6px)",
            padding: "4px 8px",
            "font-size": "11px",
            background: copied()
              ? "rgba(46, 204, 113, 0.95)"
              : "rgba(0,0,0,0.75)",
            color: "#fff",
            "border-radius": "6px",
            "white-space": "nowrap",
            "font-family": "Manrope, sans-serif",
            "pointer-events": "none",
            "z-index": "10000",
            transition: "all 0.2s ease",
          }}
        >
          {copied() ? "Copied" : props.label}
        </div>
      )}
    </div>
  );
}

function Divider(props: { isDark: () => boolean }) {
  return (
    <div
      style={{
        width: "1px",
        height: "28px",
        background: props.isDark() ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
        transition: "background 0.3s ease",
      }}
    />
  );
}

// Navigation icons
function HomeIcon() {
  return (
    <svg width="37.08" height="37.08" viewBox="0 0 37.08 37.08" fill="none">
      <path d={iconPaths.home} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.09" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="37.08" height="37.08" viewBox="0 0 37.08 37.08" fill="none">
      <path d={iconPaths.mail} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.09" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="30.9" height="30.9" viewBox="0 0 30.9 30.9" fill="currentColor">
      <path d={iconPaths.twitter} />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="37.08" height="37.08" viewBox="0 0 37.08 37.08" fill="none">
      <path d={iconPaths.volume} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.09" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="37.08" height="37.08" viewBox="0 0 37.08 37.08" fill="currentColor">
      <path d={iconPaths.moon} />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="37.08" height="37.08" viewBox="0 0 37.08 37.08" fill="none" stroke="currentColor" stroke-width="3.09" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18.54" cy="18.54" r="7.72" />
      <line x1="18.54" y1="3.09" x2="18.54" y2="6.18" />
      <line x1="18.54" y1="30.9" x2="18.54" y2="33.99" />
      <line x1="33.99" y1="18.54" x2="30.9" y2="18.54" />
      <line x1="6.18" y1="18.54" x2="3.09" y2="18.54" />
      <line x1="28.72" y1="8.36" x2="26.54" y2="10.54" />
      <line x1="10.54" y1="26.54" x2="8.36" y2="28.72" />
      <line x1="28.72" y1="28.72" x2="26.54" y2="26.54" />
      <line x1="10.54" y1="10.54" x2="8.36" y2="8.36" />
    </svg>
  );
}

interface NavProps {
  soundEnabled: () => boolean;
  setSoundEnabled: (value: boolean) => void;
  playClickSound: () => void;
}

export default function Nav(props: NavProps) {
  const [scale, setScale] = createSignal(1);
  const [isDark, setIsDark] = createSignal(true);

  const toggleTheme = () => {
    const newTheme = !isDark();
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Update CSS variables and body styling
    if (newTheme) {
      // Dark mode
      document.documentElement.style.setProperty('--background', '#171717');
      document.documentElement.style.setProperty('--foreground', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.4)');
      document.documentElement.style.setProperty('--text-muted', '#808080');
      document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
      document.body.style.backgroundColor = '#171717';
      document.body.style.color = '#ffffff';
    } else {
      // Light mode
      document.documentElement.style.setProperty('--background', '#f5f5f5');
      document.documentElement.style.setProperty('--foreground', '#171717');
      document.documentElement.style.setProperty('--text-primary', '#171717');
      document.documentElement.style.setProperty('--text-secondary', 'rgba(23, 23, 23, 0.6)');
      document.documentElement.style.setProperty('--text-muted', '#666666');
      document.documentElement.style.setProperty('--border-color', 'rgba(23, 23, 23, 0.1)');
      document.body.style.backgroundColor = '#f5f5f5';
      document.body.style.color = '#171717';
    }
  };

  onMount(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : true;
    
    if (shouldBeDark !== isDark()) {
      toggleTheme();
    }

    const handleResize = () => {
      const vw = window.innerWidth;
      const newScale = Math.min(Math.max(vw / 1920, 0.8), 1.5);
      setScale(newScale);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
    });
  });

  return (
    <>
      {/* Background blur element - behind navbar */}
      <div class="blur-overlay" />
      
      {/* Navbar */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: `translateX(-50%) scale(${scale()})`,
          "transform-origin": "center bottom",
          display: "flex",
          "align-items": "center",
          gap: "18px",
          padding: "14px 20px",
          background: isDark() ? "rgba(30,30,30,0.9)" : "rgba(255,255,255,0.9)",
          "border-radius": "999px",
          border: isDark() ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)",
          "backdrop-filter": "blur(12px)",
          "z-index": "9999",
          "font-family": "Manrope, sans-serif",
          transition: "transform 0.2s ease, background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <DockIcon
          label="Home"
          onClick={() => window.location.reload()}
          isDark={isDark}
          playClickSound={props.playClickSound}
        >
          <HomeIcon />
        </DockIcon>

        <DockIcon
          label="X"
          onClick={() =>
            window.open("https://twitter.com/uimorph", "_blank")
          }
          isDark={isDark}
          playClickSound={props.playClickSound}
        >
          <TwitterIcon />
        </DockIcon>

        <DockIcon label="Copy Email" isCopy={true} copyText="uixmorph@gmail.com" isDark={isDark} playClickSound={props.playClickSound}>
          <MailIcon />
        </DockIcon>

        <Divider isDark={isDark} />

        <DockIcon 
          label={props.soundEnabled() ? "Sound On" : "Sound Off"} 
          isDark={isDark}
          onSoundToggle={() => props.setSoundEnabled(!props.soundEnabled())}
          playClickSound={props.playClickSound}
        >
          <VolumeIcon />
        </DockIcon>

        <DockIcon label="Theme" onClick={toggleTheme} isDark={isDark} playClickSound={props.playClickSound}>
          {isDark() ? <MoonIcon /> : <SunIcon />}
        </DockIcon>
      </div>
    </>
  );
}
