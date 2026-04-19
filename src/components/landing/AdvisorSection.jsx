import {GraduationCap, Building2, BookOpen, Mail} from "lucide-react";
import Image from "next/image";

const ADVISORS = [
  {
    id: "01",
    name: "Nishatee Binte Shahid",
    designation: "Assistant Professor",
    institution: "Bangladesh University of Engineering and Technology (BUET)",
    department: "Civil Engineering (CE) & Structural Engineering",
    contact: "nishatee@ce.buet.ac.bd",
    contactIcon: Mail,
    link: "https://ce.buet.ac.bd/profile-of-nishatee-binte-shahid/",
  },
  {
    id: "02",
    name: "Hiron Saraj Devnath",
    designation: "PhD Student",
    institution: "The University of Queensland, Australia",
    department: "PhD Research",
    contact: "h.devnath@uq.edu.au",
    contactIcon: Mail,
    link: "https://www.researchgate.net/profile/Hiron-Devnath",
    image:
      "https://i1.rgstatic.net/ii/profile.image/11431281079629459-1660803288021_Q128/Hiron-Devnath.jpg",
  },
  {
    id: "03",
    name: "Mst. Sajia Afrin (Joya)",
    designation: "Lecturer",
    institution: "University of Chittagong",
    department: "Department of Zoology",
    contact: "BS (Honors), MS (Wildlife Biology), DU",
    contactIcon: GraduationCap,
    link: "https://cu.ac.bd/public_profile/index.php?ein=6327",
    image:
      "https://cu.ac.bd/assets/image/faculty_staff_users/1259_ITBE6QE66D.jpg",
  },
];

export default function AdvisorSection() {
  return (
    <section className="relative py-24 bg-[#090A0F] rounded-2xl overflow-hidden my-16">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">
            {"//"} Esteemed Guidance
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our Respected <span className="text-primary">Advisors</span>
          </h3>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
            The guiding minds behind our academic direction and research
            initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {ADVISORS.map((advisor) => {
            const ContactIcon = advisor.contactIcon;
            return (
              <a
                key={advisor.id}
                href={advisor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-3xl p-6 md:p-8 flex flex-col items-center bg-[#0B0D14] border border-white/5 transition-colors hover:border-white/10 group cursor-pointer"
              >
                {/* Avatar */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 shrink-0 bg-linear-to-br from-white/5 to-transparent flex items-center justify-center p-1 relative overflow-hidden group-hover:border-primary/30 transition-colors duration-500 mt-2 mb-4 md:mb-6">
                  <div className="w-full h-full rounded-full bg-[#050508] border border-white/5 flex flex-col items-center justify-center text-primary/80 overflow-hidden relative">
                    {advisor.image ? (
                      <Image
                        src={advisor.image}
                        alt={`${advisor.name}'s profile picture`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized // Adding unoptimized to avoid loader issues with external domains
                      />
                    ) : (
                      <GraduationCap className="w-8 h-8 md:w-10 md:h-10 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col items-center text-center space-y-2 mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {advisor.name}
                  </h3>
                  <p className="text-primary font-semibold uppercase tracking-widest text-[10px]">
                    {advisor.designation}
                  </p>
                </div>

                <div className="w-full h-px bg-white/5 mb-6" />

                {/* Details List */}
                <div className="w-full flex flex-col gap-4 px-1 md:px-2">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-400 leading-relaxed text-left">
                      {advisor.institution}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-400 leading-relaxed text-left">
                      {advisor.department}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <ContactIcon className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                    <p className="text-sm text-zinc-400 text-left truncate">
                      {advisor.contact}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
