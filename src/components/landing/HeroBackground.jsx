export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[80vh] w-full pointer-events-none flex justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "linear-gradient(to bottom, black 20%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 20%, transparent 100%)",
          }}
        />
        {/* Soft edge fading for hero grid */}
        <div
          className="absolute inset-0 bg-background/20"
          style={{
            maskImage:
              "radial-gradient(circle at center, transparent 30%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 30%, black 100%)",
          }}
        />
      </div>

      {/* Primary Glow in Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-60" />
    </>
  );
}
