import artistSectionBg from "~/images/IMG_2519 (1).webp";

export default function ArtistCollabSection() {
  return (
    <section class="artist-section" id="about" style={`background-image: url('${artistSectionBg}')`}>
      <div class="artist-blur-overlay"></div>
      <div class="artist-inner">
        <div class="artist-copy">
          <p class="artist-eyebrow">Made By Humans</p>
          <h2 class="artist-heading">No AI Art. Real Collaboration.</h2>
          <p class="artist-body">
            Hastiludes is built with a clear creative standard: our visual identity comes from real
            artists, not generated shortcuts. We collaborate directly with illustrators, world
            builders, and designers so every artifact, character, and environment reflects
            intentional craft.
          </p>
          <p class="artist-body">
            That means artist credits are first-class, co-creation is part of production, and the
            aesthetic grows through people who shape culture, not prompts that flatten it.
          </p>
          <p class="artist-body">
            This philosophy extends to our player-driven economy. Players aren't just consuming
            content—they're shaping culture through gameplay, earning real value, and directly
            supporting the artists behind Hastiludes. Every in-game purchase fuels a creative
            ecosystem where human talent thrives, and player decisions drive what gets built next.
          </p>
        </div>
      </div>
    </section>
  );
}
