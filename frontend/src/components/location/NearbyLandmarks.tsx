import { Landmark } from 'lucide-react';

interface NearbyLandmarksProps {
  landmarks: string[];
}

export default function NearbyLandmarks({ landmarks }: NearbyLandmarksProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Nearby Landmarks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {landmarks.map((landmark, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-lg bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-slate-800/60 transition-all duration-300"
          >
            <div className="flex-shrink-0">
              <Landmark className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {landmark}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
