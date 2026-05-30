import faqSectionBg from "~/images/IMG_2519 (1).webp";

const faqItems = [
  "What is Hastiludes?",
  "What is Monad?",
  "Do I need crypto or a wallet to start?",
  "How does the XP and leveling system work?",
  "What are items and badges used for?",
  "Is Hastiludes competitive or cooperative?",
  "Does Hastiludes use real money?",
  "What makes Hastiludes different from other GameFi projects?",
  "Will there be NFTs or on-chain items?",
  "How do I invite friends?",
  "Who is Hastiludes for?",
  "Is Hastiludes a real investing platform?",
  "Is Hastiludes safe for beginners?",
  "Is Hastiludes available on mobile?",
  "Is there a roadmap?",
];

export default function TokenSection() {
  return (
    <section
      class="faq-section faq-section--tabs"
      id="faq"
      style={`background-image: url('${faqSectionBg}')`}
    >
      <div class="faq-backdrop"></div>
      <div class="faq-inner faq-inner--tabs">
        <div class="faq-panel">
          <p class="faq-eyebrow">Questions, answered</p>
          <h2 class="faq-heading">Frequently Asked Questions</h2>
          <p class="faq-body">
            Start here if you want the quick version of what Hastiludes is, how it works, and who
            it is built for.
          </p>

          <div class="faq-cards">
            <article class="faq-question-card">
              <p class="faq-card-label">Questions</p>
              <div class="faq-grid" aria-label="Frequently asked questions">
                {faqItems.map((item) => (
                  <div class="faq-question-item">
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
