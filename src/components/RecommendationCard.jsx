import { Sparkles } from 'lucide-react';
import { getRecommendation } from '../data/insights';

function RecommendationCard({ breakdown, id }) {
  const rec = getRecommendation(breakdown, id);

  return (
    <div className="bg-white border border-[#EDEBE6] rounded-2xl p-4 flex gap-3">
      <div className="w-9 h-9 rounded-full bg-[#F4F3EF] flex items-center justify-center shrink-0">
        <Sparkles size={16} className="text-[#14140F]" />
      </div>
      <div>
        <p className="text-xs text-[#A8A59C] mb-0.5">Suggested action &middot; {rec.source}</p>
        <p className="text-sm font-semibold text-[#14140F]">{rec.title}</p>
        <p className="text-sm text-[#5B5850] mt-1">{rec.blurb}</p>
      </div>
    </div>
  );
}

export default RecommendationCard;