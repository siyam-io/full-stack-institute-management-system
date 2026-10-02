interface LocationHeroProps {
  badge: string;
  heading: string;
  subheading: string;
}

export default function LocationHero({ badge, heading, subheading }: LocationHeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Obsidian Glass Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-lg border border-white/20">
          <span className="text-sm font-semibold text-amber-400">{badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {heading}
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {subheading}
        </p>
      </div>
    </section>
  );
}
