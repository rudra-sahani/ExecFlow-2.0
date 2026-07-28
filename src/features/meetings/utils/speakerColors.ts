export interface SpeakerColor {
  bg: string;
  text: string;
  border: string;
  ring: string;
  dot: string;
  badgeBg: string;
}

const PALETTE: SpeakerColor[] = [
  {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    ring: 'ring-emerald-500/40',
    dot: 'bg-emerald-400',
    badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
  },
  {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    ring: 'ring-purple-500/40',
    dot: 'bg-purple-400',
    badgeBg: 'bg-purple-950/60 text-purple-300 border-purple-800/60',
  },
  {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    ring: 'ring-cyan-500/40',
    dot: 'bg-cyan-400',
    badgeBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60',
  },
  {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    ring: 'ring-amber-500/40',
    dot: 'bg-amber-400',
    badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
  },
  {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    ring: 'ring-indigo-500/40',
    dot: 'bg-indigo-400',
    badgeBg: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60',
  },
  {
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30',
    ring: 'ring-rose-500/40',
    dot: 'bg-rose-400',
    badgeBg: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
  },
];

export function getSpeakerColor(speakerName: string): SpeakerColor {
  if (!speakerName) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < speakerName.length; i++) {
    hash = speakerName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE.length;
  return PALETTE[index];
}
