import { Car } from 'lucide-react';

interface TravelTime {
  area: string;
  time: string;
  route: string;
}

interface TravelTimesProps {
  travelTimes: TravelTime[];
}

export default function TravelTimes({ travelTimes }: TravelTimesProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Travel Times From Around Dhaka
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {travelTimes.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/30 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-600/20 dark:bg-amber-500/30">
                  <Car className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {item.area}
                </h3>
                <p className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-1">
                  {item.time}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.route}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
