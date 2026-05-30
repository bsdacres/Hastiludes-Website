import { createMemo } from "solid-js";

type ExperienceBarProps = {
  account: string;
  monBalance: string;
  isOnMonad: boolean;
};

type ExperienceSnapshot = {
  level: number;
  currentXp: number;
  requiredXp: number;
  progressPct: number;
  totalXp: number;
  title: string;
};

function requirementForLevel(level: number): number {
  return 220 + level * 120 + level * level * 20;
}

function titleForLevel(level: number): string {
  if (level >= 35) return "Grand Archon";
  if (level >= 25) return "High Warden";
  if (level >= 15) return "Rune Captain";
  if (level >= 8) return "Field Adept";
  return "Initiate";
}

function computeExperience(account: string, monBalance: string, isOnMonad: boolean): ExperienceSnapshot {
  if (!account) {
    const requiredXp = requirementForLevel(1);
    return {
      level: 1,
      currentXp: 0,
      requiredXp,
      progressPct: 0,
      totalXp: 0,
      title: titleForLevel(1),
    };
  }

  const normalizedBalance = Number.parseFloat(monBalance);
  const safeBalance = Number.isFinite(normalizedBalance) ? Math.max(0, normalizedBalance) : 0;
  const balanceXp = Math.floor(Math.min(40000, safeBalance * 115));

  const compact = account.replace(/^0x/, "").toLowerCase();
  let entropy = 0;
  for (let i = 0; i < compact.length; i += 2) {
    entropy += Number.parseInt(compact.slice(i, i + 2), 16) || 0;
  }

  const totalXp = balanceXp + entropy * 2 + (isOnMonad ? 520 : 0);

  let level = 1;
  let remaining = totalXp;
  let requiredXp = requirementForLevel(level);

  while (remaining >= requiredXp && level < 99) {
    remaining -= requiredXp;
    level += 1;
    requiredXp = requirementForLevel(level);
  }

  const progressPct = Math.min(100, Math.max(0, Math.round((remaining / requiredXp) * 100)));

  return {
    level,
    currentXp: remaining,
    requiredXp,
    progressPct,
    totalXp,
    title: titleForLevel(level),
  };
}

export default function ExperienceBar(props: ExperienceBarProps) {
  const snapshot = createMemo(() =>
    computeExperience(props.account, props.monBalance, props.isOnMonad),
  );

  return (
    <section class="xp-card" aria-label="Character experience">
      <div class="xp-head">
        <p class="xp-level">LV {snapshot().level}</p>
        <p class="xp-title">{snapshot().title}</p>
        <p class="xp-total">Total XP: {snapshot().totalXp.toLocaleString()}</p>
      </div>

      <div class="xp-track-wrap" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={snapshot().progressPct}>
        <div class="xp-track">
          <span class="xp-fill" style={{ width: `${snapshot().progressPct}%` }} />
        </div>
        <p class="xp-progress-text">
          {snapshot().currentXp.toLocaleString()} / {snapshot().requiredXp.toLocaleString()} XP
        </p>
      </div>
    </section>
  );
}
