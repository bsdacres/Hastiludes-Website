import { createSignal, onCleanup, onMount } from "solid-js";
import venftImageOne from "~/images/IMG_2371 (1).jpg";
import venftImageTwo from "~/images/the necklace.jpg";
import venftImageThree from "~/images/background.webp";

export default function VeNFTSection() {
  const cards = [
    {
      title: "Save Together, Learn Together",
      body: "Connect with your friends to save money and learn finance through shared quests and guided challenges.",
      image: venftImageOne,
    },
    {
      title: "Collectibles, Real Incentives",
      body: "Earn collectibles with real-world incentives as you progress and complete meaningful milestones.",
      image: venftImageTwo,
    },
    {
      title: "Compete Local Or Global",
      body: "Challenge your friends or the global community on live leaderboards and seasonal goals.",
      image: venftImageThree,
    },
  ];

  const handleCardMove = (event: MouseEvent & { currentTarget: HTMLElement }) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    const rotateY = (x - 50) / 9;
    const rotateX = (50 - y) / 10;

    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
  };

  const handleCardLeave = (event: MouseEvent & { currentTarget: HTMLElement }) => {
    const card = event.currentTarget;
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  const [revealedCards, setRevealedCards] = createSignal<Record<number, boolean>>({});
  const cardRefs: Array<HTMLElement | undefined> = [];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const cardIndex = Number((entry.target as HTMLElement).dataset.cardIndex ?? "-1");
          if (cardIndex >= 0) {
            setRevealedCards((prev) => ({ ...prev, [cardIndex]: true }));
          }

          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    for (const cardRef of cardRefs) {
      if (cardRef) {
        observer.observe(cardRef);
      }
    }

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return (
    <section class="venft-section">
      <div class="venft-inner">
        <div class="venft-pillars">
          {cards.map((card, index) => (
            <article
              ref={(el) => {
                cardRefs[index] = el;
              }}
              class={`venft-glass-card${revealedCards()[index] ? " is-visible" : ""}`}
              data-card-index={index}
              style={`background-image: url('${card.image}')`}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <div class="venft-glass-layer">
                <h3 class="venft-pillar-title">{card.title}</h3>
                <p class="venft-pillar-body">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
