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
      "Hastiludes is a medieval-themed game built on the Monad blockchain. You take up a knightly campaign, earn XP through play, and climb the ranks from Peasant Squire all the way to High Monarch.",
  },
  {
    question: "Do I need crypto or a wallet to start?",
    answer:
      "No. You can explore and start playing without any crypto. Connecting a wallet is optional and only unlocks on-chain progress and the rank tiers tied to MON.",
  },
  {
    question: "How does the XP and leveling system work?",
    answer:
      "You gain XP through play and on-chain activity. As your XP and MON grow, you advance through rank tiers, each with its own crest, oath, and standing in the realm.",
  },
  {
    question: "Does Hastiludes use real money?",
    answer:
      "Core play is free. On-chain features run on MON, Monad's native token, but you are never required to spend to take part.",
  },
  {
    question: "Is Hastiludes safe for beginners?",
    answer:
      "Yes. You can start with no wallet and no crypto experience, and any wallet connection is always opt-in. Your keys and funds stay in your own wallet.",
  },
  {
    question: "Is there a roadmap?",
    answer:
      "Yes — the full roadmap is on the way. Follow along for tournament seasons, new ranks, and on-chain items.",
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
