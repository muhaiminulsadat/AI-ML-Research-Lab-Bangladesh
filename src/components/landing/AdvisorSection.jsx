import {
  GraduationCap,
  Building2,
  Sparkles,
  Award,
  BookOpen,
  Briefcase,
  FileText,
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdvisorSection() {
  return (
    <section className="relative rounded-2xl py-24 bg-[#090A0F] overflow-hidden my-16">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">
            {"//"} Esteemed Guidance
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our Respected Advisor
          </h3>
        </div>

        <div className="relative rounded-2xl p-6 md:p-10 h-full flex flex-col md:flex-row gap-10 bg-white/[0.02] border border-white/5">
          {/* Left Column: Image & Quick Info */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left space-y-6 shrink-0 relative z-10 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
            <div className="w-40 h-40 rounded-full border-4 border-[#090A0F] shadow-[0_0_0_2px_rgba(var(--primary),0.3)] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center p-1 relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(var(--primary),0.2)] transition-shadow duration-500 mx-auto md:mx-0">
              <div className="w-full h-full rounded-full bg-[#050508] border border-white/5 flex flex-col items-center justify-center text-primary/80">
                <GraduationCap className="w-16 h-16 opacity-50 mb-1" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Nishatee Binte Shahid
              </h3>
              <p className="text-primary font-medium mt-1 uppercase tracking-widest text-xs">
                Assistant Professor
              </p>
              <div className="flex flex-col gap-3 mt-5">
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-lg shadow-inner">
                  <Building2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-foreground">
                      Department of Civil Engineering
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">
                      BUET, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 font-normal bg-white/5 text-xs"
                  >
                    Specialization: Structural Engineering
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Details Tabs */}
          <div className="md:w-2/3 flex flex-col space-y-6 relative z-10">
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm xl:text-base leading-relaxed">
                Nishatee Binte Shahid is currently working as an Assistant
                Professor of Structural Engineering at the Civil Engineering
                department at BUET. She completed her M.Sc. in Civil and
                Structural Engineering and B.Sc. in Civil Engineering from BUET
                in 2024 and 2021, respectively. Her research interests include
                using supplementary cementitious materials in concrete to reduce
                carbon footprint, fiber-reinforced concrete, and the use of
                construction and demolition waste in concrete.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="w-full space-y-3"
              defaultValue="education"
            >
              {/* EDUCATION & AWARDS */}
              <AccordionItem
                value="education"
                className="border border-white/10 bg-white/5 rounded-xl px-4 overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold tracking-wide">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Education & Awards
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm space-y-4 pb-4">
                  <ul className="list-disc list-inside space-y-1.5 ml-1">
                    <li>
                      M.Sc. in Civil and Structural Engineering, BUET, Dhaka,
                      Bangladesh, 2024.
                    </li>
                    <li>
                      B.Sc. in Civil Engineering, BUET, Dhaka, Bangladesh, 2021.
                    </li>
                  </ul>
                  <div className="pt-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
                      <Award className="w-3 h-3 text-primary" /> Academic Awards
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 ml-1 text-xs">
                      <li>
                        Dean’s List Award of BUET in All Consecutive Levels,
                        2016-2021
                      </li>
                      <li>
                        University Merit Scholarship of BUET in All Consecutive
                        Terms, 2016-2021
                      </li>
                      <li>
                        Cumilla Education Board Scholarship – Talent Pool
                        (2015-2021) in HSC Examination
                      </li>
                      <li>
                        Cumilla Education Board Scholarship – General
                        (2013-2015) in SSC Examination.
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* RESEARCH & PROFESSIONAL */}
              <AccordionItem
                value="research"
                className="border border-white/10 bg-white/5 rounded-xl px-4 overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold tracking-wide">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Research & Professional Work
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm space-y-4 pb-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider">
                      Research Interest
                    </h4>
                    <p className="text-xs leading-relaxed">
                      Fiber-reinforced concrete, recycled concrete, low-carbon
                      concrete, and steel-concrete composite materials.
                    </p>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider">
                      Professional Work (National & International)
                    </h4>
                    <p className="text-xs leading-relaxed">
                      Routinely involved in laboratory testing through the
                      Bureau of Research, Testing and Consultation (BRTC), BUET.
                      Testing services include routine and conventional
                      laboratory tests for civil engineering materials and
                      machine calibration since 2022.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* PUBLICATIONS */}
              <AccordionItem
                value="publications"
                className="border border-white/10 bg-white/5 rounded-xl px-4 overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-4 text-sm font-semibold tracking-wide">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Selected Publications
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs space-y-6 pb-4">
                  {/* Journals */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-[11px] uppercase tracking-wider border-b border-white/10 pb-1">
                      Journal Articles
                    </h4>
                    <ul className="space-y-4">
                      <li className="leading-relaxed">
                        <span className="font-medium text-foreground">
                          Binte Shahid, N., Mutsuddy, R., & Islam, Sk. R.
                          (2025).
                        </span>{" "}
                        Synergistic impact of supplementary cementitious
                        materials (silica fume and fly ash) and nylon fiber on
                        properties of recycled brick aggregate concrete. Case
                        Studies in Construction Materials, 22, e04484. Quartile:
                        Q1, Impact Factor: 6.5.
                      </li>
                      <li className="leading-relaxed">
                        <span className="font-medium text-foreground">
                          Islam, S. R., Mutsuddy, R., & Binte Shahid, N. (2025).
                        </span>{" "}
                        Gray Correlation Coefficient Analysis on the Mechanical
                        Properties of Nylon Fiber Reinforced Recycled Aggregate
                        Concrete with GGBS. Civil Engineering Journal, 11(3),
                        Article 3. Quartile: Q1, Impact Factor: 4.3.
                      </li>
                    </ul>
                  </div>

                  {/* Conferences */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-[11px] uppercase tracking-wider border-b border-white/10 pb-1">
                      Conference Proceedings & Presentations
                    </h4>
                    <ul className="space-y-3">
                      <li className="leading-relaxed">
                        <span className="font-medium text-foreground">
                          Binte Rahman, E., Sakib, S., Binte Shahid, N. (2023).
                        </span>{" "}
                        “A Review of The Effect of Fly Ash on Durability
                        Properties of Fiber Reinforced Concrete,” 2nd
                        International Conference on Advances in Civil
                        Infrastructure and Construction Materials.
                      </li>
                      <li className="leading-relaxed">
                        <span className="font-medium text-foreground">
                          Chowdhury, M.S.S., Tamanna, N., Binte Shahid, N.
                          (2023).
                        </span>{" "}
                        “Different Types of Probable Measures in Preventing the
                        Padma River Erosion: A Review,” 9th International
                        Conference on Water and Flood Management-ICWFM 2023.
                      </li>
                      <li className="leading-relaxed">
                        <span className="font-medium text-foreground">
                          Zahid, T.B., Islam, S.R., Binte Shahid, N. (2022).
                        </span>{" "}
                        “A Review on the Durability of Concrete Structures from
                        the Perspective of Bangladesh,” 5th Annual Paper Meet
                        and 2nd Civil Engineering Congress.
                      </li>
                      <li className="leading-relaxed">
                        <span className="font-medium text-foreground">
                          Alam, J., Tabassum, F., Aninda, S.S., Binte Shahid, N.
                          (2022).
                        </span>{" "}
                        “Identifying Contributing Factors for Bicycle Riding in
                        Institutional Area of Dhaka City,” 5th Annual Paper Meet
                        and 2nd Civil Engineering Congress.
                      </li>
                      <li className="leading-relaxed">
                        <span className="font-medium text-foreground">
                          Presentation: (2021).
                        </span>{" "}
                        “Ride Sharing Bike Service in a Developing Urban
                        Society: Safety Perspective – A Structural Equation
                        Modeling Approach,” 100th Annual Meeting of
                        Transportation Research Board (TRB).
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
