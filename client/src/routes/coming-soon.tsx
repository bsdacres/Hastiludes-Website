import { Title } from "@solidjs/meta";
import { createSignal, onCleanup, onMount } from "solid-js";
import comingSoonBgA from "~/images/Auberon.jpeg";
import comingSoonBgB from "~/images/the necklace.jpg";
import comingSoonBgC from "~/images/enkos w halo.jpg";

const rotatingBackgrounds = [
  comingSoonBgA,
  comingSoonBgB,
  comingSoonBgC,
];

export default function ComingSoon() {
  const [backgroundIndex, setBackgroundIndex] = createSignal(0);

  onMount(() => {
    const timer = window.setInterval(() => {
      setBackgroundIndex((previous) => (previous + 1) % rotatingBackgrounds.length);
    }, 4800);

    onCleanup(() => {
      window.clearInterval(timer);
    });
  });

  return (
    <main
      class="coming-soon-page"
      style={`background-image: url('${rotatingBackgrounds[backgroundIndex()]}')`}
    >
      <Title>Coming Soon | Hastiludes</Title>
      <div class="coming-soon-overlay" aria-hidden="true" />

      <section class="coming-soon-shell">
        <p class="coming-soon-kicker">Hastiludes</p>
        <h1>Coming Soon</h1>
        <p class="coming-soon-copy">
          The next phase is almost live. Join the waitlist and send us your questions.
        </p>

        <div class="coming-soon-grid">
          <article class="coming-soon-card">
            <h2>Email Capture</h2>
            <p>Get launch updates and early access announcements.</p>
            <form
              class="coming-soon-form"
              action="mailto:contact@hastiludes.com"
              method="post"
              enctype="text/plain"
            >
              <input type="hidden" name="topic" value="Waitlist signup" />
              <label class="coming-soon-label" for="waitlist-email">Email</label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                required
                autocomplete="email"
                placeholder="you@example.com"
              />
              <button type="submit">Notify Me</button>
            </form>
          </article>

          <article class="coming-soon-card" id="contact">
            <h2>Contact</h2>
            <p>Send inquiries directly to contact@hastiludes.com.</p>
            <form
              class="coming-soon-form"
              action="mailto:contact@hastiludes.com"
              method="post"
              enctype="text/plain"
            >
              <label class="coming-soon-label" for="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" required placeholder="Your name" />

              <label class="coming-soon-label" for="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autocomplete="email"
                placeholder="you@example.com"
              />

              <label class="coming-soon-label" for="contact-message">Inquiry</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                placeholder="How can we help?"
              />

              <div class="coming-soon-actions">
                <button type="submit">Send Inquiry</button>
                <a
                  href="https://discord.gg/CP3DhrznJz"
                  target="_blank"
                  rel="noreferrer"
                  class="coming-soon-discord-btn"
                >
                  Join Discord
                </a>
              </div>
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}