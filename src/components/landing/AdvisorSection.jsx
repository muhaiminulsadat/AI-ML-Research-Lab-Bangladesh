import {GraduationCap, Building2, BookOpen, Mail} from "lucide-react";

export default function AdvisorSection() {
  return (
    <section className="relative py-24 bg-[#090A0F] rounded-2xl overflow-hidden my-16">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">
            {"//"} Esteemed Guidance
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our Respected <span className="text-primary">Advisor</span>
          </h3>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
            The guiding mind behind our academic direction and research
            initiatives.
          </p>
        </div>

        <a
          href="https://ce.buet.ac.bd/profile-of-nishatee-binte-shahid/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative rounded-3xl p-8 md:p-10 max-w-md mx-auto flex flex-col items-center bg-[#0B0D14] border border-white/5 transition-colors hover:border-white/10 group cursor-pointer"
        >
          <div className="absolute top-6 right-8 text-6xl font-black text-white/[0.02] select-none pointer-events-none">
            01
          </div>

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border border-white/10 shrink-0 bg-linear-to-br from-white/5 to-transparent flex items-center justify-center p-1 relative overflow-hidden group-hover:border-primary/30 transition-colors duration-500 mt-2 mb-6">
            <div className="w-full h-full rounded-full bg-[#050508] border border-white/5 flex flex-col items-center justify-center text-primary/80">
              <GraduationCap className="w-10 h-10 opacity-50 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col items-center text-center space-y-2.5 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
              Nishatee Binte Shahid
            </h3>
            <p className="text-primary font-semibold uppercase tracking-widest text-[10px] md:text-xs">
              Assistant Professor
            </p>
          </div>

          <div className="w-full h-px bg-white/5 mb-8" />

          {/* Details List */}
          <div className="w-full flex flex-col gap-6 px-1 md:px-4">
            <div className="flex items-start gap-4">
              <Building2 className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed text-left">
                Bangladesh University of Engineering and Technology (BUET)
              </p>
            </div>

            <div className="flex items-start gap-4">
              <BookOpen className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed text-left">
                Civil Engineering (CE) & Structural Engineering
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <p className="text-sm md:text-[15px] text-zinc-400 text-left">
                nishatee@ce.buet.ac.bd
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
