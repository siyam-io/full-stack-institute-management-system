/**
 * Global red-noir backdrop: warm-black gradient, parallax star fields,
 * a soft red bloom and a masked grid — applied once at the layout root.
 * Purely decorative, so it is pointer-events-none and aria-hidden.
 */
const NoirBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Warm-black vertical gradient */}
      <div className="absolute inset-0 bg-noir-fade" />

      {/* Parallax star fields */}
      <div className="absolute top-0 left-0 w-px h-px bg-transparent stars-1 animate-anim-star" />
      <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-transparent stars-2 animate-anim-star [animation-duration:80s]" />

      {/* Red bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-red/5 rounded-full blur-[120px]" />

      {/* Masked blueprint grid */}
      <div
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]"
      />
    </div>
  );
};

export default NoirBackground;
