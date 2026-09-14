import { AlertTriangle } from 'lucide-react';
import { getSeverity } from '../data/insights';

function SeverityBadge({ gap }) {
  const s = getSeverity(gap);
  if (s.level !== 'critical') return null; // only show a flag for critical, not every card

  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      <AlertTriangle size={11} /> Critical
    </span>
  );
}

export default SeverityBadge;