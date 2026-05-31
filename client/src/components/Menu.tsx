import { createSignal, onCleanup, onMount } from "solid-js";

export default function Menu() {
  const [isScrolled, setIsScrolled] = createSignal(false);
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 12);
  };

  onMount(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
  });

  onCleanup(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", handleScroll);
    }
  });

  const handleFaqClick = (event: MouseEvent) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    const faqSection = document.getElementById("faq");
    faqSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav class={`site-nav ${isScrolled() ? "scrolled" : ""}`} aria-label="Main navigation">
      <a href="/coming-soon" class="nav-launch-btn">Launch App</a>

      <button
        type="button"
        class={`nav-hamburger${mobileMenuOpen() ? " is-open" : ""}`}
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen()}
        aria-controls="mobile-nav-panel"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
      >
        <span class="nav-hamburger-line" />
        <span class="nav-hamburger-line" />
        <span class="nav-hamburger-line" />
      </button>

      <div id="mobile-nav-panel" class={`nav-main${mobileMenuOpen() ? " open" : ""}`}>
        <div class="nav-links">
          <a href="/coming-soon" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Docs</a>
          <a href="#faq" class="nav-link" onClick={handleFaqClick}>FAQ</a>
          <a href="#about" class="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#contact" class="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
