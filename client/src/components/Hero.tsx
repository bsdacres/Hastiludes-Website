
import { Title } from "@solidjs/meta";
import { createSignal, onMount, onCleanup } from "solid-js";
import Menu from "~/components/Menu";
import backgroundImage from "~/images/background.webp";
import wilmerImage from "~/images/Wilmer-1.webp";

export default function Hero() {
  const [sunOpacity, setSunOpacity] = createSignal(1);

  onMount(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300;
      const opacity = Math.max(0, 1 - scrollY / maxScroll);
      setSunOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    onCleanup(() => window.removeEventListener("scroll", handleScroll));
  });

  return (
    <main class="landing">
      <Title>Hastiludes</Title>

      <Menu />

      <div class="sun-rays" style={`opacity: ${sunOpacity()}`}>
        <div class="sun-ray" style="--ray-delay: 0s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.08s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.16s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.24s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.32s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.4s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.48s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.56s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.64s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.72s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.8s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.88s;"></div>
        <div class="sun-ray" style="--ray-delay: 0.96s;"></div>
        <div class="sun-ray" style="--ray-delay: 1.04s;"></div>
        <div class="sun-ray" style="--ray-delay: 1.12s;"></div>
        <div class="sun-ray" style="--ray-delay: 1.2s;"></div>
      </div>

      <div class="landing-backdrop" aria-hidden="true">
        <img class="landing-backdrop-image" src={backgroundImage} alt="" />
      </div>

      <img
        class="landing-figure"
        src={wilmerImage}
        alt="Wilmer, standing in front of the Hastiludes scene"
      />

      <section class="landing-content">
        <div class="landing-title-stack">
          <h1>
            <span class="letter" style="--delay: 0s;">H</span>
            <span class="letter" style="--delay: 0.4s;">a</span>
            <span class="letter" style="--delay: 0.8s;">s</span>
            <span class="letter" style="--delay: 1.2s;">t</span>
            <span class="letter" style="--delay: 1.6s;">i</span>
            <span class="letter" style="--delay: 2s;">l</span>
            <span class="letter" style="--delay: 2.4s;">u</span>
            <span class="letter" style="--delay: 2.8s;">d</span>
            <span class="letter" style="--delay: 3.2s;">e</span>
            <span class="letter" style="--delay: 3.6s;">s</span>
          </h1>
          <p class="landing-subtitle" aria-label="Finance">
            <span class="finance-letter">F</span>
            <span class="finance-letter">I</span>
            <span class="finance-letter">N</span>
            <span class="finance-letter">A</span>
            <span class="finance-letter">N</span>
            <span class="finance-letter">C</span>
            <span class="finance-letter">E</span>
          </p>
        </div>
      </section>

      <div class="landing-scroll-cue" aria-hidden="true">
        <span>Scroll for more</span>
        <span class="landing-scroll-arrow">v</span>
      </div>
    </main>
  );
}