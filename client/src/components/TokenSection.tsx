import { For } from "solid-js";
import faqSectionBg from "~/images/IMG_2519 (1).webp";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "What is Hastiludes?",
    answer:
      "Hastiludes is a SocialFi platform wrapped in a high-fantasy narrative. It turns becoming financially literate into a game, built around an auction ROSCA and tabletop-inspired events on the Monad blockchain.",
  },
  {
    question: "What is an auction ROSCA?",
    answer:
      "A ROSCA (Rotating Savings and Credit Association) is a group savings circle: members contribute to a shared pool each round and one member receives the payout. In the auction version members bid for the pot, so saving and borrowing happen together. That circle is the engine at the heart of Hastiludes.",
  },
  {
    question: "How do I earn XP?",
    answer:
      "You earn XP by interacting with the platform and with other dapps across the Monad blockchain. The more you explore, save, and take part, the more your character progresses.",
  },
  {
    question: "What is the character sheet?",
    answer:
      "Every player gets a character sheet that tracks your XP, rank, and progress through the realm — a tabletop-style record of your journey as you grow more financially capable.",
  },
  {
    question: "Why the fantasy and tabletop theme?",
    answer:
      "Money habits are easier to build when they feel like play. Hastiludes pairs real financial tools with tabletop-style events and a high-fantasy story, so learning to save, bid, and manage funds plays like a campaign rather than a chore.",
  },
  {
    question: "Is there a roadmap?",
    answer:
      "Yes — the full roadmap is on the way. Follow along for ROSCA seasons, new events, and deeper character progression.",
  },
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
            The quick version of what Hastiludes is, how it works, and who it is built for.
          </p>

          <div class="faq-list" aria-label="Frequently asked questions">
            <For each={faqItems}>
              {(item) => (
                <details class="faq-item">
                  <summary>{item.question}</summary>
                  <p class="faq-answer">{item.answer}</p>
                </details>
              )}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}
