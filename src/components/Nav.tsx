import { createSignal, onMount, onCleanup, JSX, Show } from "solid-js";
import { iconPaths } from "./icons";

// Global audio element for music playback
let musicAudio: HTMLAudioElement | null = null;

// No need for API keys here - they're in the serverless function!

interface DockIconProps {
  children: JSX.Element;
  label: string;
  onClick?: () => void;
  isCopy?: boolean;
  copyText?: string;
  isDark: () => boolean;
  onSoundToggle?: () => void;
  playClickSound?: () => void;
  hoverContent?: JSX.Element;
  noTooltipPadding?: boolean;
}
const [currentTrackName, setCurrentTrackName] = createSignal("");
const [currentTrackImage, setCurrentTrackImage] = createSignal("");
const [currentArtist, setCurrentArtist] = createSignal("");
const [currentTrackLength, setCurrentTrackLength] = createSignal("");

function DockIcon(props: DockIconProps) {
  const [hovered, setHovered] = createSignal(false);
  const [copied, setCopied] = createSignal(false);
  const [mouseY, setMouseY] = createSignal(0);
  let iconRef: HTMLDivElement | undefined;

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

  const handleMouseMove = (e: MouseEvent) => {
    if (iconRef && window.innerWidth > 768) {
      const rect = iconRef.getBoundingClientRect();
      const y = e.clientY - rect.top - rect.height / 2;
      setMouseY(y);
    }
  };

  const getScale = () => {
    if (!hovered()) return 1;
    const absY = Math.abs(mouseY());
    const maxDistance = 50;
    const clampedDistance = Math.min(absY, maxDistance);
    const scale = 1 + (0.3 * (1 - clampedDistance / maxDistance));
    return Math.max(1, Math.min(1.3, scale));
  };

  const getTranslateY = () => {
    if (!hovered()) return 0;
    const scale = getScale();
    return -((scale - 1) * 8);
  };

  return (
    <div
      ref={iconRef}
      data-clickable
      onMouseEnter={() => {
        if (window.innerWidth > 768) {
          setHovered(true);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHovered(false);
        setMouseY(0);
      }}
      onClick={handleClick}
      style={{
        position: "relative",
        width: "36px",
        height: "36px",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "border-radius": "50%",
        color: hovered()
          ? props.isDark()
            ? "rgba(255,255,255,0.95)"
            : "rgba(23,23,23,0.95)"
          : props.isDark()
            ? "rgba(163,163,163,1)"
            : "rgba(100,100,100,1)",
        transform: `scale(${getScale()}) translateY(${getTranslateY()}px)`,
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "visible",
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
            padding: props.noTooltipPadding === true ? "0" : "4px 8px",
            "font-size": "11px",
            background: copied()
              ? "rgba(46, 204, 113, 0.95)"
              : props.hoverContent && typeof props.hoverContent !== 'string'
              ? "transparent"
              : "rgba(0,0,0,0.75)",
            color: "#fff",

            "border-radius": "6px",
            "white-space": "nowrap",
            "font-family": "Inter, sans-serif",
            "min-width": "max-content",
            "pointer-events": "none",
            "z-index": "10000",
            transition: "all 0.2s ease",
            // Hide tooltip on mobile unless it's showing "Copied"
            display: window.innerWidth <= 768 && !copied() ? "none" : "block",
          }}
        >
          {props.hoverContent
            ? props.hoverContent
            : copied()
              ? "Copied"
              : props.label}
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
        background: props.isDark()
          ? "rgba(255,255,255,0.15)"
          : "rgba(0,0,0,0.15)",
        transition: "background 0.3s ease",
      }}
    />
  );
}

// Navigation icons
function HomeIcon() {
  return (
    <svg width="37.08" height="37.08" viewBox="0 0 37.08 37.08" fill="none">
      <path
        d={iconPaths.home}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3.09"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="37.08" height="37.08" viewBox="0 0 37.08 37.08" fill="none">
      <path
        d={iconPaths.mail}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3.09"
      />
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
      <path
        d={iconPaths.volume}
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3.09"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="37.08"
      height="37.08"
      viewBox="0 0 37.08 37.08"
      fill="currentColor"
    >
      <path d={iconPaths.moon} />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="37.08"
      height="37.08"
      viewBox="0 0 37.08 37.08"
      fill="none"
      stroke="currentColor"
      stroke-width="3.09"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
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

function SpotifyIcon(props: {
  isPlaying: () => boolean;
  isLoading: () => boolean;
}) {
  return (
    <Show
      when={props.isPlaying()}
      fallback={
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="currentColor"
          style={{
            animation: props.isLoading()
              ? "pulse 1.5s ease-in-out infinite"
              : "none",
          }}
        >
          <path d={iconPaths.spotify} />
        </svg>
      }
    >
      <img
        src="/animated-spotify.gif"
        alt="Playing"
        width="37"
        height="37"
        style={{ "border-radius": "50%" }}
      />
    </Show>
  );
}

function MuteIcon() {
  return (
    <svg
      width="37.08"
      height="37.08"
      viewBox="0 0 50 50"
      fill="none"
      style={{ transform: "scale(1.4)" }}
    >
      <path
        d={iconPaths.mute}
        stroke="currentColor"
        stroke-width="3.09"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
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
  const [isMusicPlaying, setIsMusicPlaying] = createSignal(false);
  const [isMusicLoading, setIsMusicLoading] = createSignal(false);
  const [isNavHovered, setIsNavHovered] = createSignal(false);

  // Toggle music playback - plays preview of recently played song from Last.fm
  const toggleMusic = async () => {
    if (isMusicPlaying()) {
      // Stop playing
      if (musicAudio) {
        musicAudio.pause();
        musicAudio.currentTime = 0;
      }
      setIsMusicPlaying(false);
    } else {
      try {
        setIsMusicLoading(true); // بداية التحميل

        // Get recently played track from serverless API (secure!)
        const lastfmResponse = await fetch("/api/lastfm");

        if (!lastfmResponse.ok) {
          const errorData = await lastfmResponse.json().catch(() => ({}));
          console.error("Last.fm API error:", errorData);
          setIsMusicLoading(false);
          return; // إيقاف بدون رسالة للـ user
        }

        const lastfmData = await lastfmResponse.json();
        const recentTrack = lastfmData?.recenttracks?.track?.[0];

        if (!recentTrack) {
          console.error("No recent tracks found");
          setIsMusicLoading(false);
          return; // إيقاف بدون رسالة للـ user
        }

        const artist = recentTrack.artist?.["#text"] || recentTrack.artist;
        const trackName = recentTrack.name;

        // Search for the track on iTunes to get preview URL (no CORS issues)
        const searchQuery = encodeURIComponent(`${trackName} ${artist}`);

        const itunesResponse = await fetch(
          `https://itunes.apple.com/search?term=${searchQuery}&media=music&limit=1`,
        );

        if (itunesResponse.ok) {
          const itunesData = await itunesResponse.json();
          const track = itunesData?.results?.[0];

          if (track?.previewUrl) {
            setCurrentTrackImage(track.artworkUrl30);
            setCurrentTrackName(track.trackName);
            setCurrentArtist(track.artistName);
            const trackLength = track.trackTimeMillis;

            const seconds = Math.floor(trackLength / 1000);

            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            setCurrentTrackLength(
              `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`,
            );

            // Create audio element if not exists
            if (!musicAudio) {
              musicAudio = new Audio();
              musicAudio.volume = 0.5;

              musicAudio.addEventListener("ended", () => {
                setIsMusicPlaying(false);
              });
            }

            musicAudio.src = track.previewUrl;
            await musicAudio.play();
            setIsMusicLoading(false); // انتهى التحميل
            setIsMusicPlaying(true);
            return;
          }
        }

        setIsMusicLoading(false); // إيقاف اللودينج في حالة عدم وجود بريفيو
        console.log("No preview available for:", trackName, "by", artist);
      } catch (error) {
        setIsMusicLoading(false); // إيقاف اللودينج في حالة الخطأ
        console.error("Error fetching music:", error);
        // مفيش رسالة للـ user - بس logging في console
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark();
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    // Update CSS variables and body styling
    if (newTheme) {
      // Dark mode
      document.documentElement.style.setProperty("--background", "#171717");
      document.documentElement.style.setProperty("--foreground", "#ffffff");
      document.documentElement.style.setProperty("--text-primary", "#ffffff");
      document.documentElement.style.setProperty(
        "--text-secondary",
        "rgba(255, 255, 255, 0.4)",
      );
      document.documentElement.style.setProperty("--text-muted", "#808080");
      document.documentElement.style.setProperty(
        "--border-color",
        "rgba(255, 255, 255, 0.08)",
      );
      document.body.style.backgroundColor = "#171717";
      document.body.style.color = "#ffffff";
    } else {
      // Light mode
      document.documentElement.style.setProperty("--background", "#f5f5f5");
      document.documentElement.style.setProperty("--foreground", "#171717");
      document.documentElement.style.setProperty("--text-primary", "#171717");
      document.documentElement.style.setProperty(
        "--text-secondary",
        "rgba(23, 23, 23, 0.6)",
      );
      document.documentElement.style.setProperty("--text-muted", "#666666");
      document.documentElement.style.setProperty(
        "--border-color",
        "rgba(23, 23, 23, 0.1)",
      );
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "#171717";
    }
  };

  onMount(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    const shouldBeDark = savedTheme ? savedTheme === "dark" : true;

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
      {/* CSS للـ Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(0.95);
            }
          }
        `}
      </style>

      {/* Background blur element - behind navbar */}
      <div class="blur-overlay" />

      {/* Navbar */}
      <div
        onMouseEnter={() => window.innerWidth > 768 && setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: `translateX(-50%) scale(${scale()})`,
          "transform-origin": "center bottom",
          display: "flex",
          "align-items": "center",
          gap: isNavHovered() ? "22px" : "18px",
          padding: isNavHovered() ? "16px 24px" : "14px 20px",
          background: isDark() ? "rgba(30,30,30,0.9)" : "rgba(255,255,255,0.9)",
          "border-radius": "999px",
          border: isDark()
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.1)",
          "backdrop-filter": "blur(12px)",
          "z-index": "9999",
          "font-family": "Manrope, sans-serif",
          transition:
            "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <DockIcon
          label=""
          onClick={() => window.location.reload()}
          isDark={isDark}
          playClickSound={props.playClickSound}
          hoverContent={"Home"}
        >
          <HomeIcon />
        </DockIcon>

        <DockIcon
          label=""
          onClick={() => window.open("https://twitter.com/uimorph", "_blank")}
          isDark={isDark}
          playClickSound={props.playClickSound}
          hoverContent={"X"}
        >
          <TwitterIcon />
        </DockIcon>

        <DockIcon
          label=""
          isCopy={true}
          copyText="uixmorph@gmail.com"
          isDark={isDark}
          playClickSound={props.playClickSound}
          hoverContent={"Copy Email"}
        >
          <MailIcon />
        </DockIcon>

        <Divider isDark={isDark} />

        <DockIcon
          label={isMusicPlaying() ? "" : ""}
          onClick={toggleMusic}
          isDark={isDark}
          playClickSound={props.playClickSound}
          hoverContent={
            isMusicLoading() ? (
              "Loading..."
            ) : isMusicPlaying() ? (
              isDark() ? (
                <div class="flex items-center gap-[10px] px-[10px] py-[10px] rounded-[10px] bg-[#1A1A1A] border border-[rgba(233,233,231,0.1)] min-w-[240px]">
                  <img 
                    src={currentTrackImage()} 
                    alt={currentTrackName()} 
                    class="w-[40px] h-[40px] rounded-[6px] object-cover"
                  />
                  <div class="flex-1 flex flex-col justify-center gap-[1px] min-w-0">
                    <h3 class="font-['Inter',sans-serif] font-medium text-[13px] leading-[16px] text-[#FFFFFF] truncate">
                      {currentTrackName()}
                    </h3>
                    <p class="font-['Inter',sans-serif] font-normal text-[11px] leading-[14px] text-[#A3A3A3] truncate">
                      {currentArtist()}
                    </p>
                  </div>
                  <span class="font-['Inter',sans-serif] font-normal text-[13px] leading-[16px] text-[#A3A3A3] whitespace-nowrap ml-[6px]">
                    {currentTrackLength()}
                  </span>
                </div>
              ) : (
                <div class="flex items-center gap-[10px] px-[10px] py-[10px] rounded-[10px] bg-[#FFFFFF] border border-[rgba(0,0,0,0.1)] min-w-[240px]">
                  <img 
                    src={currentTrackImage()} 
                    alt={currentTrackName()} 
                    class="w-[40px] h-[40px] rounded-[6px] object-cover"
                  />
                  <div class="flex-1 flex flex-col justify-center gap-[1px] min-w-0">
                    <h3 class="font-['Inter',sans-serif] font-medium text-[13px] leading-[16px] text-[#171717] truncate">
                      {currentTrackName()}
                    </h3>
                    <p class="font-['Inter',sans-serif] font-normal text-[11px] leading-[14px] text-[#646464] truncate">
                      {currentArtist()}
                    </p>
                  </div>
                  <span class="font-['Inter',sans-serif] font-normal text-[13px] leading-[16px] text-[#646464] whitespace-nowrap ml-[6px]">
                    {currentTrackLength()}
                  </span>
                </div>
              )
            ) : (
              "Play Music"
            )
          }
          noTooltipPadding={isMusicPlaying()}
        >
          <SpotifyIcon isPlaying={isMusicPlaying} isLoading={isMusicLoading} />
        </DockIcon>

        <DockIcon
          label={""}
          isDark={isDark}
          onSoundToggle={() => props.setSoundEnabled(!props.soundEnabled())}
          playClickSound={props.playClickSound}
          hoverContent={props.soundEnabled() ? "Sound On" : "Sound Off"}
        >
          {props.soundEnabled() ? <VolumeIcon /> : <MuteIcon />}
        </DockIcon>

        <DockIcon
          label=""
          onClick={() => {
            toggleTheme();
            window.dispatchEvent(new Event("theme-change"));
          }}
          isDark={isDark}
          playClickSound={props.playClickSound}
          hoverContent="Theme"
        >
          {isDark() ? <SunIcon /> : <MoonIcon />}
        </DockIcon>
      </div>
    </>
  );
}
